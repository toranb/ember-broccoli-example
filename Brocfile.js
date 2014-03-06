module.exports = function (broccoli) {
  var filterTemplates = require('broccoli-template')
  var concat = require('broccoli-concat')

  function preprocess (tree) {
    tree = filterTemplates(tree, {
      extensions: ['hbs', 'handlebars'],
      compileFunction: 'Ember.Handlebars.compile'
    })
    return tree
  }

  var sourceTree = broccoli.makeTree('js');
  var appTemplates = preprocess(sourceTree, {
    inputFiles: [
      'templates/*.handlebars'
    ],
    outputFile: '/js/dist/tmpls.min.js'
  });

  var appJs = concat(sourceTree, {
    inputFiles: [
      'vendor/jquery/jquery.js',
      'vendor/handlebars/handlebars.min.js',
      'vendor/ember/ember.js',
      'app.js',
      'other.js'
    ],
    outputFile: '/js/dist/deps.min.js'
  });

  return [appJs, appTemplates];
}
