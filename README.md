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
