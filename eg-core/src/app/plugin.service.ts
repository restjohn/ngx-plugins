import { Injectable, Compiler, Injector, ApplicationRef, PlatformRef, NgModuleRef, ComponentRef } from '@angular/core';
import { EgPlugin } from '@ng-plugins/eg-core-lib';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor(private compiler: Compiler, private injector: Injector, private app: PlatformRef) { }

  async loadPlugin(id: string): Promise<ResolvedPlugin> {
    // TODO: systemjs import
    const plugin: EgPlugin = await import(id)
    console.log('imported plugin', plugin)
    const moduleFactory = await this.compiler.compileModuleAsync(plugin.module)
    const moduleRef = moduleFactory.create(this.injector)
    return {
      ...plugin,
      moduleRef,
    }
  }
}

export interface ResolvedPlugin extends EgPlugin {
  moduleRef: NgModuleRef<unknown>
}
