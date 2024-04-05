import * as path from 'path'
import { executeNgPackagrBuilder } from '@angular-devkit/build-angular'
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { Observable, concat, defer } from 'rxjs'
import { tap } from 'rxjs/operators'
import { rollup } from 'rollup'
import { discoverPackages as ngPackagrDiscoverPackages } from 'ng-packagr/lib/ng-package/discover-packages'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

function ngPackagrThenAmd(options: any, context: BuilderContext): Observable<BuilderOutput> {
  return concat(
    executeNgPackagrBuilder(options, context).pipe(
      tap(x => {
        if (x.error) {
          context.logger.error(x.error)
        }
      })
    ),
    defer(() => rollupFesmToAmd(options, context))
  )
}

async function rollupFesmToAmd(options: any, context: BuilderContext): Promise<BuilderOutput> {
  const root = context.workspaceRoot
  const ngPackagePath = path.resolve(root, options.project)
  const packages = await ngPackagrDiscoverPackages({ project: ngPackagePath })
  const destDir = packages.dest
  const fesm2020Path = packages.primary.destinationFiles.fesm2020
  const fesm2020UmdName = `${packages.primary.flatModuleFile}.fesm2020.amd.js`
  const fesm2020AmdPath = path.resolve(destDir, fesm2020UmdName)
  context.logger.info(`rolling FESM2020 to AMD ${JSON.stringify({
    fesm2020Path,
    fesm2020AmdPath
  }, null, 2)}`)
  try {
    const roller = await rollup({
      input: fesm2020Path,
      plugins: [
        nodeResolve({
          resolveOnly: moduleId => {
            const external = false
              || moduleId.startsWith('@angular/')
              || moduleId.startsWith('@ng-plugins/')
              || /^rxjs(\/.+)?/.test(moduleId)
            return !external
          },
          preferBuiltins: false
        }),
        commonjs()
      ],
    })
    const rolled = await roller.write({
      format: 'amd',
      file: fesm2020AmdPath
    })
    for (const rollOut of rolled.output) {
      context.logger.info(`rolled ${rollOut.name} ${rollOut.type} ${rollOut.fileName}`)
    }
    return {
      success: true
    } as BuilderOutput
  }
  catch (err) {
    context.logger.error('error creating amd module from fesm: ' + err)
    console.error(err)
    return {
      success: false,
      error: err
    } as BuilderOutput
  }
}

export default createBuilder(ngPackagrThenAmd)