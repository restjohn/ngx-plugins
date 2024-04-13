import { Rule, chain, externalSchematic, SchematicsException,  } from '@angular-devkit/schematics'
import { Schema as BaseLibraryOptions } from '@schematics/angular/library/schema'
import { getWorkspace, updateWorkspace,  } from '@schematics/angular/utility/workspace'
import { insertImport, insertAfterLastOccurrence, findNodes } from '@schematics/angular/utility/ast-utils'
import { applyToUpdateRecorder } from '@schematics/angular/utility/change'
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript'
import { JsonObject } from '@angular-devkit/core'

function addPluginHookToEntryPoint(options: EgPluginLibraryOptions): Rule {
  const entryFile = options.entryFile
  if (!entryFile) {
    throw new SchematicsException('missing entryFile')
  }
  return async (tree, context) => {
    const workspace = await getWorkspace(tree)
    const project = workspace.projects.get(options.name)
    if (!project) {
      throw new SchematicsException(`project not found in workspace: ${project}`)
    }
    const entryFilePath = `${project.sourceRoot}/${entryFile}.ts`
    const entryFileText = tree.readText(entryFilePath)
    const entrySource = ts.createSourceFile(entryFilePath, entryFileText, ts.ScriptTarget.Latest, true)
    const importChange = insertImport(entrySource, entryFilePath, 'EgPlugin', '@ng-plugins/eg-core-lib')
    const packageJson = tree.readJson(`${project.root}/package.json`) as JsonObject
    const packageName = packageJson.name as string
    const pluginExport =
`
export const plugin: EgPlugin = {
  id: '${packageName}',
  title: '${packageName}',
  component: null,
}
`
    type ExportNodes = ts.ExportAssignment | ts.ExportDeclaration | ts.ExportSpecifier | ts.NamedExports
    const exportNodes = findNodes<ExportNodes>(entrySource, ((x: ts.Node) => {
      return [
        ts.SyntaxKind.ExportAssignment,
        ts.SyntaxKind.ExportDeclaration,
        ts.SyntaxKind.ExportSpecifier,
        ts.SyntaxKind.NamedExports,
      ].includes(x.kind)
    }) as ((node: ts.Node) => node is ExportNodes))
    .sort((a, b) => a.getStart() - b.getStart())
    console.log(exportNodes)
    const pluginExportChange = insertAfterLastOccurrence(exportNodes, pluginExport, entryFilePath, entrySource.end)
    const edit = tree.beginUpdate(entryFilePath)
    applyToUpdateRecorder(edit, [ importChange, pluginExportChange ])
    tree.commitUpdate(edit)
    console.log(exportNodes)
    context.logger.info(`--- entry file ${entryFilePath}\n${entryFileText}`)
  }
}

function usePluginBuilder(options: EgPluginLibraryOptions): Rule {
  return updateWorkspace(workspace => {
    const projName = options.name
    const project = workspace.projects.get(projName)
    if (!project) {
      throw new SchematicsException(`project not found in workspace: ${projName}`)
    }
    const target = project.targets.get('build')
    project.targets.set('build', {
      ...target,
      builder: '@ng-plugins/eg-plugin-builder:amd'
    })
    workspace.projects.set(projName, project)
  })
}

export function egPluginLib(options: EgPluginLibraryOptions): Rule {
  if (!options.name) {
    throw new SchematicsException('missing name')
  }
  return chain([
    (_tree, context) => {
      context.logger.info(`creating EgPluginLibrary ${options.name}`)
    },
    externalSchematic('@schematics/angular', 'library', options),
    usePluginBuilder(options),
    addPluginHookToEntryPoint(options),
  ])
}

export interface EgPluginLibraryOptions extends BaseLibraryOptions {

}
