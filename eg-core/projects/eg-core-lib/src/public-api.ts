import { Type } from '@angular/core';

/*
 * Public API Surface of eg-core-lib
 */

export * from './lib/eg-core-lib.service'
export * from './lib/eg-core.model'
export * from './lib/eg-core-lib.component'
export * from './lib/eg-core-lib.module'

export interface EgPlugin {
  id: string
  title: string
  component: Type<unknown>
}