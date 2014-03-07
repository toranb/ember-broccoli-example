module.exports = function (broccoli) {
  var concat = require('broccoli-concat');
  var templateCompiler = require('broccoli-template-compiler');
  var pickFiles = require('broccoli-static-compiler');
  var filterCoffeeScript = require('broccoli-coffee');

  function precompile (tree) {
    tree = templateCompiler(tree);
    return tree;
  }

  function preprocess (tree) {
    tree = filterCoffeeScript(tree, {
      bare: true
    });
    return tree;
  }

  var sourceTree = broccoli.makeTree('assets');
  var app = pickFiles(sourceTree, {
    srcDir: 'js',
    destDir: '/app'
  });
  var appJs = preprocess(app);

  var templates = pickFiles(sourceTree, {
    srcDir: 'js/templates',
    destDir: '/templates'
  })
  var appTemplates = precompile(templates);

  var vendorJs = concat(sourceTree, {
    inputFiles: [
      'js/vendor/jquery/jquery.js',
      'js/vendor/handlebars/handlebars.min.js',
      'js/vendor/ember/ember.js'
    ],
    outputFile: '/vendor.min.js'
  });

  var allJS = new broccoli.MergedTree([vendorJs, appJs, appTemplates]);
  var merged = concat(allJS, {
    inputFiles: [
      'vendor.min.js',
      'app/*.js',
      'templates/*.js'
    ],
    outputFile: '/js/deps.min.js'
  });

  var styleTree = broccoli.makeTree('assets');
  var allCSS = concat(styleTree, {
    inputFiles: [
      'css/*.css'
    ],
    outputFile: '/css/everything.min.css'
  });

  return [allCSS, merged];
}
