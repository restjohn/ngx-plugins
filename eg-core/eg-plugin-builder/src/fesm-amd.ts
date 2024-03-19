import * as path from 'path'
import { executeNgPackagrBuilder } from '@angular-devkit/build-angular'
import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect'
import { Observable, concat, defer } from 'rxjs'
import { rollup } from 'rollup'
import { discoverPackages as ngPackagrDiscoverPackages } from 'ng-packagr/lib/ng-package/discover-packages'

function ngPackagrThenAmd(options: any, context: BuilderContext): Observable<BuilderOutput> {
  return concat(
    executeNgPackagrBuilder(options, context),
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
  const fesm2020UmdPath = path.resolve(destDir, fesm2020UmdName)
  context.logger.info(`rolling FESM2020 to UMD ${JSON.stringify({
    fesm2020Path,
    fesm2020UmdPath
  }, null, 2)}`)
  try {
    const roller = await rollup({
      input: fesm2020Path,
      external: (moduleId: string) => {
        context.logger.info(`test module id ${moduleId}`)
        return false
          || moduleId.startsWith('@angular/')
          || moduleId.startsWith('@ng-plugins/')
          || /^rxjs(\/.+)/.test(moduleId)
      }
    })
    const rolled = await roller.write({
      format: 'amd',
      file: fesm2020UmdPath
    })
    for (const rollOut of rolled.output) {
      context.logger.info(`rolled ${rollOut.name} ${rollOut.type} ${rollOut.fileName}`)
    }
    return {
      success: true
    } as BuilderOutput
  }
  catch (err) {
    return {
      success: false,
      error: err
    } as BuilderOutput
  }
}

export default createBuilder(ngPackagrThenAmd)