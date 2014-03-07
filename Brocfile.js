module.exports = function (broccoli) {
  var concat = require('broccoli-concat')
  var templateCompiler = require('broccoli-template-compiler')
  var pickFiles = require('broccoli-static-compiler')

  function preprocess (tree) {
    tree = templateCompiler(tree, {
      extensions: ['hbs', 'handlebars']
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

  var allJS = new broccoli.MergedTree([appJs, appTemplates]);
  var merged = concat(allJS, {
    inputFiles: [
      'deps.min.js',
      'compiled/*.js'
    ],
    outputFile: '/fin.min.js'
  });

  return [merged];
}
