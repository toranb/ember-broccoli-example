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

  var sourceTree = broccoli.makeTree('js');
  var app = pickFiles(sourceTree, {
    srcDir: '/',
    destDir: '/app'
  });
  var appJs = preprocess(app);

  var templates = pickFiles(sourceTree, {
    srcDir: '/templates',
    destDir: '/templates'
  })
  var appTemplates = precompile(templates);

  var vendorJs = concat(sourceTree, {
    inputFiles: [
      'vendor/jquery/jquery.js',
      'vendor/handlebars/handlebars.min.js',
      'vendor/ember/ember.js'
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
    outputFile: '/deps.min.js'
  });

  return [merged];
}
