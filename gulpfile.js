// 'use strict';

// const build = require('@microsoft/sp-build-web');

// build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

// build.initialize(require('gulp'));

'use strict';

const build = require('@microsoft/sp-build-web');

build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

build.configureWebpack.mergeConfig({
  additionalConfiguration: function (generatedConfiguration) {

    if (generatedConfiguration.plugins) {
      generatedConfiguration.plugins =
        generatedConfiguration.plugins.filter(function (plugin) {
          return !(
            plugin &&
            plugin.constructor &&
            plugin.constructor.name === 'UglifyJsPlugin'
          );
        });
    }

    return generatedConfiguration;
  }
});

build.initialize(require('gulp'));