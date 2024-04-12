import { Rule, chain, externalSchematic, SchematicsException,  } from '@angular-devkit/schematics'
import { Schema as BaseLibraryOptions } from '@schematics/angular/library/schema'
import {} from '@schematics/angular/utility/paths'
import { updateWorkspace } from '@schematics/angular/utility/workspace'
import {} from '@schematics/angular/utility/workspace-models'

// async function generatePluginHooks(options: EgPluginLibraryOptions, tree: Tree, context: SchematicContext): Promise<Rule> {
//  throw new Error('todo')
// }

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
    throw new SchematicsException('eg-plugin-lib generator requires a project name')
  }
  return chain([
    (_tree, context) => {
      context.logger.info(`creating EgPluginLibrary ${options.name}`)
    },
    externalSchematic('@schematics/angular', 'library', options),
    usePluginBuilder(options),
  ])
}

export interface EgPluginLibraryOptions extends BaseLibraryOptions {

}
