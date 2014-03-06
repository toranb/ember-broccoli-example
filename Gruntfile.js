module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ember-template-compiler');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-hashres');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      scripts: {
        files: ['index.html', 'js/*.js', 'js/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    },
    hashres: {
      options: {
        renameFiles: true
      },
      prod: {
        src: ['js/lib/deps.min.js'],
        dest: 'index.html'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    concat: {
      dist: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'js/app.js',
            'js/lib/tmpl.min.js'],
          dest: 'js/lib/deps.min.js'
      },
      test: {
          src: [
            'js/vendor/jquery/jquery.min.js',
            'js/vendor/handlebars/handlebars.js',
            'js/vendor/ember/ember.js',
            'js/vendor/jquery-mockjax/jquery.mockjax.js',
            'js/app.js',
            'js/lib/tmpl.min.js'],
          dest: 'js/lib/deps.min.js'
      }
    },
    emberhandlebars: {
        compile: {
            options: {
                templateName: function(sourceFile) {
                    var newSource = sourceFile.replace('js/templates/', '');
                    return newSource.replace('.handlebars', '');
                }
            },
            files: ['js/templates/*.handlebars'],
            dest: 'js/lib/tmpl.min.js'
        }
    }
  });

  grunt.task.registerTask('dev', ['emberhandlebars', 'concat:dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
  grunt.task.registerTask('deploy', ['emberhandlebars', 'concat:dist', 'hashres']);
  grunt.task.registerTask('test', ['emberhandlebars', 'concat:test', 'karma']);
}
