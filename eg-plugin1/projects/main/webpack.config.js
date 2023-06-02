const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'main',

  exposes: {
    './EgPlugin': './projects/main/src/app/eg-plugin.hooks.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    '@ng-plugins/eg-core-lib': { singleton: true, strictVersion: true, requiredVersion: '^14.0.0' }
  },

});
