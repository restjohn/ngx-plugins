// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const mfBase = mf.withModuleFederationPlugin({
  sharedMappings: [
    '@ng-plugins/eg-core-lib'
  ],
  shared: share({
    "@angular/core": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@angular/common": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@angular/common/http": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "@angular/router": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
    "rxjs": { singleton: true, strictVersion: false, requiredVersion: 'auto', eager: false },
  }),
})

module.exports = {
  ...mfBase,
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'plugins')
    }
  },
}
