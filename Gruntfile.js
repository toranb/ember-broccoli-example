module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    shell: {
        broccoli: {
            command: "broccoli build assets/dist"
        }
    },
    clean: {
      build: {
        src: [ 'assets/dist' ]
      },
    },
    watch: {
      scripts: {
        files: ['assets/css/*.css', 'assets/js/*.coffee', 'assets/js/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    }
  });

  grunt.task.registerTask('dev', ['clean', 'shell']);
  grunt.task.registerTask('local', ['dev', 'watch']);
}
