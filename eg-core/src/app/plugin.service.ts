import { Injectable, Compiler, Injector, PlatformRef, NgModuleRef } from '@angular/core';
import { EgPlugin } from '@ng-plugins/eg-core-lib';
import { loadRemoteModule } from '@angular-architects/module-federation'


interface PluginModule {
  plugin: EgPlugin
}

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  // constructor(private compiler: Compiler, private injector: Injector, private app: PlatformRef) { }
  constructor(private app: PlatformRef) { }

  loadPlugin(id: string): Promise<ResolvedPlugin> {
    return this.loadPluginByModuleFederation(id)
  }

  private async loadPluginByModuleFederation(id: string): Promise<ResolvedPlugin> {
    const pluginHandle: EgPlugin = await loadRemoteModule({
      type: 'module',
      remoteEntry: id,
      exposedModule: 'eg-plugin.hooks'
    }).then(x => x.plugin)
    console.log('imported plugin', pluginHandle)
    // TODO: is this even necessary? see https://angular.io/guide/deprecations#jit-api-changes.
    // supposedly angular ivy JIT compiles implicitly - not sure if that means
    // just creating a component also compiles its enclosing module and whatever
    // services/providers that module injects to the component
    // const moduleRef = await this.app.bootstrapModule(pluginHandle.module)
    return {
      ...pluginHandle,
      // moduleRef,
    }
  }
}

export interface ResolvedPlugin extends EgPlugin {
  // moduleRef: NgModuleRef<unknown>
}

