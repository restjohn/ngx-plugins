import { EgPlugin } from '@ng-plugins/eg-core-lib';
import { Plugin1Component } from './lib/plugin1.component';
/*
 * Public API Surface of plugin1
 */

export * from './lib/plugin1.service';
export * from './lib/plugin1.component';
export * from './lib/plugin1.module';
export const plugin: EgPlugin = {
  id: '@eg2/plugin1',
  title: '@eg2/plugin1',
  component: Plugin1Component,
}

