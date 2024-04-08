import { Injectable, PlatformRef } from '@angular/core';
import { EgPlugin } from '@ng-plugins/eg-core-lib';
import { loadRemoteModule } from '@angular-architects/module-federation'
import * as ngCore from '@angular/core'
import * as ngCommon from '@angular/common'
import * as ngPlatformBrowser from '@angular/platform-browser'
import * as ngAnimations from '@angular/animations'
import * as ngCdk from '@angular/cdk'
import * as ngCdkA11y from '@angular/cdk/a11y'
import * as ngCdkCoercion from '@angular/cdk/coercion'
import * as ngCdkLayout from '@angular/cdk/layout'
import * as ngRouter from '@angular/router'
import * as egCoreLib from '@ng-plugins/eg-core-lib'
import * as rxjs from 'rxjs'
import * as rxjsOperators from 'rxjs/operators'

const system = (window as any).System as SystemJS
system.register('@angular/core', [], _export => {
  return {
    execute: () => {
      _export(ngCore)
    }
  }
})
system.register('@angular/common', [], _export => {
  return {
    execute: () => {
      _export(ngCommon)
    }
  }
})
system.register('@angular/platform-browser', [], _export => {
  return {
    execute: () => {
      _export(ngPlatformBrowser)
    }
  }
})
system.register('@angular/animations', [], _export => {
  return {
    execute: () => {
      _export(ngAnimations)
    }
  }
})
system.register('@angular/cdk', [], _export => {
  return {
    execute: () => {
      _export(ngCdk)
    }
  }
})
system.register('@angular/cdk/a11y', [], _export => {
  return {
    execute: () => {
      _export(ngCdkA11y)
    }
  }
})
system.register('@angular/cdk/coercion', [], _export => {
  return {
    execute: () => {
      _export(ngCdkCoercion)
    }
  }
})
system.register('@angular/cdk/layout', [], _export => {
  return {
    execute: () => {
      _export(ngCdkLayout)
    }
  }
})
system.register('@angular/router', [], _export => {
  return {
    execute: () => {
      _export(ngRouter)
    }
  }
})
system.register('@ng-plugins/eg-core-lib', [], _export => {
  return {
    execute: () => {
      _export(egCoreLib)
    }
  }
})
system.register('rxjs', [], _export => {
  return {
    execute: () => {
      _export(rxjs)
    }
  }
})
system.register('rxjs/operators', [], _export => {
  return {
    execute: () => {
      _export(rxjsOperators)
    }
  }
})

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
    const delim = id.indexOf(':')
    const moduleScheme = id.slice(0, delim)
    const modulePath = id.slice(delim + 1)
    if (moduleScheme === 'mf') {
      return this.loadPluginByModuleFederation(modulePath)
    }
    if (moduleScheme === 'amd') {
      return this.loadPluginBySystemJs(modulePath)
    }
    throw new Error(`failed to determine module scheme for plugin id ${id}`)
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

  private async loadPluginBySystemJs(id: string): Promise<ResolvedPlugin> {
    const pluginHandle: PluginModule = await system.import(id)
    console.log('imported plugin', pluginHandle)
    // const moduleFactory = await this.compiler.compileModuleAsync(pluginHandle.plugin.module)
    // const moduleRef = moduleFactory.create(this.injector)
    return {
      ...pluginHandle.plugin,
      // moduleRef,
    }
  }
}

export interface ResolvedPlugin extends EgPlugin {
  // moduleRef: NgModuleRef<unknown>
}

/*
The following type definitions are adaptations from
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/systemjs
*/
// Type definitions for SystemJS 6.1
// Project: https://github.com/systemjs/systemjs
// Definitions by: Joel Denning <https://github.com/joeldenning>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5

interface SystemJS {
  /**
   * Loads a javascript module from either a url or bare specifier that is in an import map.
   * You may optionally provide a parentUrl that will be used for resolving relative urls.
   */
  import: SystemJS.ImportFn;

  /**
   * Inserts a new module into the SystemJS module registry. The System.register format is
   * the underlying implementation that allows for ESM emulation.
   * See https://github.com/systemjs/systemjs/blob/master/docs/system-register.md for more details.
   * Register may be called with a name argument if you are using the named-register extra. (See
   * https://github.com/systemjs/systemjs#extras).
   */
  register(dependencies: string[], declare: SystemJS.DeclareFn): void;
  register(name: string, dependencies: string[], declare: SystemJS.DeclareFn): void;

  /**
   * Resolve any moduleId to its full URL. For a moduleId that is in the import map, this will resolve
   * the full import map URL. For a moduleId that is a relative url, the returned url will be resolved
   * relative to the parentUrl or the current browser page's base url. For a full url, resolve() is
   * a no-op.
   */
  resolve(moduleId: string, parentUrl?: string): string;

  /**
   * Delete a module from the module registry. Note that the moduleId almost always must be a full url and that
   * you might need to call System.resolve() to obtain the moduleId for modules in an import map.
   * The returned function is intended for use after re-importing the module. Calling the function
   * will re-bind all the exports of the re-imported module to every module that depends on the module.
   */
  delete(moduleId: string): false | SystemJS.UpdateModuleFn;

  /**
   * Get a module from the SystemJS module registry. Note that the moduleId almost always must be a full url
   * and that you might need to call System.resolve() to obtain the moduleId. If the module does not exist in
   * the registry, null is returned.
   */
  get(moduleId: string): SystemJS.Module | null;
  // eslint-disable-next-line
  get<T>(moduleId: string): T | null;

  /**
   * Indicates whether the SystemJS module registry contains a module. Note that the moduleId almost always
   * must be a full url and that you might need to call System.resolve() to obtain the moduleId.
   */
  has(moduleId: string): boolean;

  /**
   * An alternative to System.register(), this allows you to insert a module into the module registry. Note that
   * the moduleId you provide will go straight into the registry without being resolved first.
   */
  set(moduleId: string, module: SystemJS.Module): void;

  /**
   * Use for (let entry of System.entries()) to access all of the modules in the SystemJS registry.
   */
  entries(): Iterable<[string, SystemJS.Module]>;
}

declare namespace SystemJS {
  // eslint-disable-next-line
  type ImportFn = <T extends Module>(moduleId: string, parentUrl?: string) => Promise<T>;

  type DeclareFn = (_export: ExportFn, _context: Context) => Declare;
  interface Declare {
    setters?: SetterFn[];
    execute?(): any;
  }
  type SetterFn = (moduleValue: Module) => any;
  type ExecuteFn = () => any;

  interface ExportFn {
    (exportName: string, value: any): void;
    (exports: object): void;
  }

  type UpdateModuleFn = () => void;

  type GetFn = GetFnModule | GetFnGeneric;
  type GetFnModule = (moduleId: string) => Module;
  // eslint-disable-next-line
  type GetFnGeneric = <T>(moduleId: string) => T;

  interface Context {
    import: ImportFn;
    meta: {
      url: string;
    };
  }

  interface Module {
    default?: any;
    [exportName: string]: any;
  }
}

