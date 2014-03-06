module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    shell: {
        broccoli: {
            command: "broccoli build js/dist"
        }
    },
    watch: {
      scripts: {
        files: ['js/*.js', 'js/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 250
        }
      }
    }
  });

  grunt.task.registerTask('dev', ['shell']);
  grunt.task.registerTask('local', ['dev', 'watch']);
}
