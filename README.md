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

Angular 13's new [package format]() no longer [generates UMD bundles](https://github.com/ng-packagr/ng-packagr/blob/main/CHANGELOG.md#1300-2021-11-03).
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
[Module Federation](https://www.npmjs.com/package/@angular-architects/module-federation) plugin (MFP).  The plugin is a
build-time bundling tool and run-time API that essentially replicates the capabilities of the former SystemJS
mechanism.  The drawback is that the MFP would be coupled to Angular's Webpack build chain.  This is not a significant
issue currently (2023 May), but Angular is working on a new build chain [using esbuild](https://angular.io/guide/esbuild#trying-the-esm-build-system-in-an-angular-cli-application).
Angular Architects has an updated variation of their MFP called [Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation),
which uses Angular's new (currently beta) esbuild tool chain along with browser-native ES module loading.  The new
Angular esbuild system is still in beta as of Angular version 16.

In the interest of stability, the best solution right now is to use Angular Architects' Webpack-based Module Federation
Plugin.  After Angular transitions the esbuild system from beta to stable release, migrating the host application to
esbuild with Native Federation should be relatively painless.

