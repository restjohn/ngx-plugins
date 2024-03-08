const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const config = {
  ...withModuleFederationPlugin({
    name: 'main',
    exposes: {
      'eg-plugin.hooks': './projects/main/src/app/eg-plugin.hooks.ts',
    },
    shared: share({
      "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "rxjs": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      '@ng-plugins/eg-core-lib': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    }),
  }),
}

module.exports = config

console.info('WEBPACK CONFIG', config)
console.info('MF PLUGIN OPTS', config.plugins[0])
