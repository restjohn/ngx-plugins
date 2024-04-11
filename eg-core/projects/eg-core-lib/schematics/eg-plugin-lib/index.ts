import { Rule } from '@angular-devkit/schematics'
import { Schema as BaseLibraryOptions } from '@schematics/angular/library/schema'

export function egPluginLib(options: EgPluginLibraryOptions): Rule {
  console.log(options)
  return tree => tree
}

export interface EgPluginLibraryOptions extends BaseLibraryOptions {

}
