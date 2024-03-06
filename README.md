# ngx-plugins

This project is an example of a dynamic plugin architecture for [Angular](https://angular.io) apps.  The architecture consists of a host application, a shared library with services and/or components that the host application both consumes and exposes to plugins, and one or more plugin libraries that the host app can load dynamically based on external configuration.

The host app and shared library exist in one [Angular CLI workspace](https://angular.io/cli) so
developers can maintain those elements concurrently.  The plugins can reside in separate code
repositories in their own Angular CLI workspace.  The plugin references the host shared
library as a dependency and can interact and extend the host app via whatever services and hooks
the host app requirements dictate.

This example project draws inspiration from the [fine work](https://indepth.dev/posts/1263/building-an-extensible-dynamic-pluggable-enterprise-application-with-angular) of
[@alexzuza](https://github.com/alexzuza/angular-plugin-architecture) and [@jfgouda](https://github.com/jfgouda/angular-plugin-architecture).
Many thanks to them for their time and contributions to the community.

# Angular 13+ Update

Angular 13's new [package format](https://angular.io/guide/angular-package-format) no longer [generates UMD bundles](https://github.com/ng-packagr/ng-packagr/blob/main/CHANGELOG.md#1300-2021-11-03).
Therefore, this project needs a new way to build and dynamically load libraries in a host app.  The main output format
of ng-packagr now is the Flattened ECMA Script Module (FESM), which is essentially a concatenated bundle of the
library's transpiled JavaScript with `import` statements left intact, as Angular assumes the library will eventually
be incorporated and transpiled in a host app's build process.  With dynamic plugins, however, that is not the case.

The problem now is how to make shared libraries available from the host app to the plugin libraries at runtime.  The
app previously used SystemJS to accomplish this, because all the plugin libraries were UMD/[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
modules and SystemJS injected the resolved shared libraries the plugins required by bare module ID, such as
`@angular/common`.  With FESM,  There is no way to inject dependency resolution for bare module IDs because the
compiled library still contains ESM import statements like `import '@angular/core'`, for which the browser natively
controls resolution.  Further, the browser has no inherent mechanism to resolve these bare IDs, so the host app must
provide an [`importmap`](https://github.com/WICG/import-maps).  An import map is conceptually similar to what MAGE's
[plugin service](https://github.com/ngageoint/mage-server/blob/6.2.0/web-app/src/app/plugin/plugin.service.ts)
accomplished by explicitly loading and registering all shared libraries so SystemJS could provide them to plugins at
runtime.  The difference is that the bundler (Angular's Webpack builder) mostly took care of this at build time, so the
transpiled plugin service actually had static references to resolved modules, whereas an import map can only map a bare
module ID to a URL, like `"@angular/core": "/shared/@angular/core"` or `"@angular/core": "https://some.cdn/@angular/core"`.
The problem with that is now the host app build must produce separate ESM modules for every shared library module, and
the browser must load them all with separate requests, rather than all in one JavaScript bundle like a non-ESM app.
With HTTP/2 enabled, the overhead of multiple module requests is not so much of a concern because HTTP/2 multiplexing
handles multiple resources on a single connection.  More research into broad support for HTTP/2 is necessary.

Alternatively to ESM/FESM and HTTP/2, Angular Architects has created the
[Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation) (AAMF) plugin, which wraps
[Webpack's Module Federation](https://webpack.js.org/concepts/module-federation/) (WMF).  The AAMF plugin is a build-
time bundling tool and run-time API that more-or-less replicates the capabilities of the former SystemJS mechanism.
The drawback is that the MFP would be coupled to Angular's Webpack build chain.  This is not a significant issue
currently (2023 May), but Angular is working on a new build chain [using esbuild](https://angular.io/guide/esbuild#trying-the-esm-build-system-in-an-angular-cli-application).
Angular Architects has an updated variation of AAMF called [Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation),
which uses Angular's new (currently beta) esbuild tool chain along with browser-native ES module loading.  The new
Angular esbuild system is still in beta as of Angular version 16.

In the interest of stability, the best solution right now is to use Angular Architects' Webpack-based Module Federation
Plugin.  After Angular transitions the esbuild system from beta to stable release, migrating the host application to
esbuild with Native Federation should be relatively painless.

# Transition to Module Federation

After deciding on Module Federation (MF), the task now is to transition an existing Angular library plugin to build
with the Angular Architects Module Federation (AAMF) Angular build plugin.  I started by following the steps of the
[tutorial](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/tutorial/tutorial.md).
In brief, I performed the following steps.
1. Add the MF Plugin to the Angular build in the `eg-core` workspace, which in MF terms is the "shell".
   ```
   cd eg-core
   ng add @angular-architects/module-federation@^14.0.0 --project eg-core --type dynamic-host --port 4200
   ```
1. Create a wrapper Angular application in the `eg-plugin1` workspace.  [See commit](d3e1629f8c542b447b0a3c490c2646572d4dec36).
   See below for an explanation of this step.
   ```
   cd eg-plugin1
   ng generate application main
   ```
1. Add the MF Plugin to the Angular build in the `eg-plugin1` workspace, which in MF terms is the "remote" or micro
   frontend (MFE).  [See commit](d47efff96ae6c18fdeed25b691c2a6942659258f).
   ```
   cd eg-plugin1
   ng add @angular-architects/module-federation@^14.0.0 --project eg-plugin1 --type remote --port 4201
   ```
1. Move the substantial `eg-plugin1` source files from the library project to the application project.
   [See commit](670f43da481a5f75cea2389c82828481a7d3bc89).
1. Add the `eg-plugin1` hook module to the TypeScript compilation in [`tsconfig.app.json`](./eg-plugin1/projects/main/tsconfig.app.json).
   [See commit](d025726314145935a778b6b66bbb58a9fe605f09).
1. Remove the import statement from the eg-plugin1 `main.ts` module that AAMF plugin schematic generated.
   [See commit](b965522531e1db21da2f54d7dc2a5152224ad496).  This avoids an error described [below](#adapting-module-federation-to-dynamic-plugins).
1. Change the exposed module in the `eg-plugin1` [webpack config](./eg-plugin1/projects/main/webpack.config.js) to reference the
   [plugin hook module](./eg-plugin1/projects/main/src/app/eg-plugin.hooks.ts).
   [See commit](56f0adc3ea9aa9a2a8f578ef1ff4298c9089154f).
1.

## Adapting Module Federation to Dynamic Plugins

Note above that the AAMF plugin expects a port parameter even for the plugin (remote MFE) project.  This is because
AAMF assumes the MFE module resides in a separate, standalone app endpoint, rather than as a resource within the shell
app's context as this plugin example project does.  This highlights a key difference between the original dynamic
plugin implementation and how AAMF works.  While the former used the Angular library project schematic, the latter
builds with the Angular application schematic, incorporating the plugin library code into a separately deployed app.
The reason for this is that the Angular library schematic uses the [Rollup](https://rollupjs.org/) bundler to bundle
the library code, while the application schematic uses webpack.  Therefore, in order to apply webpack Module
Federation, AAMF builds on the Angular application schematic's webpack configuration and bundling.  This is a bit
counterintuitive to the goal of this project because these dynamic plugins are not meant to stand alone, but must hook
into the host app's defined plugin points, like other conventional dynamic shared library systems.

I experimented with removing the unnecessary wrapper application artifacts from the plugin bundle.  These include the
standard `index.html`, `app.module.ts`, `app.component.ts`, `main.ts`, etc. that Angular CLI creates when running
`ng generate application eg-plugin1`.  Without those, I adjusted the `main` entry in the Angular project in the
workspace file `angular.json` to point directly to the root plugin hooks module rather than `main.ts`, as well as
removing the reference to `index.html`:
```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "main": {
      ...
      "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
          "options": {
            "index": "",
            "main": "projects/main/src/app/eg-plugin.hooks.ts",
            ...
          }
        }
      }
    }
  }
}
```
However, this configuration resulted in a runtime error when the host attempted to load the `remoteEntry.js` module of
the plugin: [`Shared module is not available for eager consumption`](https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption).
The fix for this error was to use an empty, no-op main module, without any references to other modules in the plugin
package.  I am still not fully certain why this error occurred.  I modified the tutorial to eagerly load the MFE
component similarly to this project, as opposed to using the tutorial's Angular Router method, but the MFE loaded
successfully.  The only remaining significant difference I can see is that this project shares a
[locally built library](./eg-core/projects/eg-core-lib/) to the dynamically loaded MFE module.
