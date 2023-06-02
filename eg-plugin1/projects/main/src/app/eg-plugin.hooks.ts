/*
 * Public API Surface of eg-plugin1
 */

import { EgPlugin1Component } from './eg-plugin1.component'
import { EgPlugin1Module } from './eg-plugin1.module'
import { EgPlugin } from '@ng-plugins/eg-core-lib'

/**
 * TODO: tried to `export default ...` here but for some reason the umd
 * bundle from ng-packagr just creates a variable for the default export
 * then never actually exports anything.
 */
export const plugin: EgPlugin = {
  id: '@ng-plugins-other/eg-plugin1',
  title: 'E.g. Plugin 1',
  module: EgPlugin1Module,
  component: EgPlugin1Component
}