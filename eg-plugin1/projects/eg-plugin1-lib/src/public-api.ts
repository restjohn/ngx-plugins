/*
 * Public API Surface of eg-plugin1-lib
 */

import { EgPlugin } from '@ng-plugins/eg-core-lib'
import { EgPlugin1LibModule } from './lib/eg-plugin1-lib.module'
import { EgPlugin1LibComponent } from './lib/eg-plugin1-lib.component'

export * from './lib/eg-plugin1-lib.service';
export * from './lib/eg-plugin1-lib.component';
export * from './lib/eg-plugin1-lib.module';

const plugin: EgPlugin = {
  id: '@ng-plugins-other/eg-plugin1',
  title: 'E.g. Plugin 1',
  module: EgPlugin1LibModule,
  component: EgPlugin1LibComponent
}

export { plugin }
