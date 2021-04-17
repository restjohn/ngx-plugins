/*
 * Public API Surface of eg-plugin1
 */

export * from './lib/eg-plugin1.service';
export * from './lib/eg-plugin1.component';
export * from './lib/eg-plugin1.module';
import { EgPlugin1Component } from './lib/eg-plugin1.component'
import { EgPlugin1Module } from './lib/eg-plugin1.module'
import { EgPlugin } from '@ng-plugins/eg-core-lib'

const plugin: EgPlugin = {
  id: '@ng-plugins-other/eg-plugin1',
  title: 'E.g. Plugin 1',
  module: EgPlugin1Module,
  component: EgPlugin1Component
}
export default plugin