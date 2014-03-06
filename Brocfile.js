module.exports = function (broccoli) {
  var concat = require('broccoli-concat')
  var filterTemplates = require('broccoli-template')
  var pickFiles = require('broccoli-static-compiler')

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    })
    return tree
  }

  var sourceTree = broccoli.makeTree('js');
  var templates = pickFiles(sourceTree, {
    srcDir: '/templates/',
    destDir: '/compiled'
  })
  var appTemplates = preprocess(templates);

  var sourceTree = broccoli.makeTree('js');
  var appJs = concat(sourceTree, {
    inputFiles: [
      'vendor/jquery/jquery.js',
      'vendor/handlebars/handlebars.min.js',
      'vendor/ember/ember.js',
      'app.js',
      'other.js'
    ],
    outputFile: '/deps.min.js'
  });

  return [appJs, appTemplates];
}
