const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = {
  ...withModuleFederationPlugin({

    name: 'main',

    exposes: {
      'EgPlugin': './projects/main/src/app/eg-plugin.hooks.ts',
    },

    shared: share({
      "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "rxjs": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@ng-plugins/eg-core-lib': { singleton: true, strictVersion: true, requiredVersion: '^14.0.0' },
    })
  }),
}
