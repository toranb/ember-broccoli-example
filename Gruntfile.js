module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    shell: {
        broccoli: {
            command: "rm -rf assets/dist; broccoli build assets/dist"
        }
    },
    watch: {
      scripts: {
        files: ['assets/css/*.css', 'assets/js/*.coffee', 'assets/js/templates/*.handlebars'],
        tasks: ['dev'],
        options: {
          interrupt: true,
          debounceDelay: 100,
          livereload: true
        }
      }
    }
  });

  grunt.task.registerTask('dev', ['shell']);
  grunt.task.registerTask('local', ['dev', 'watch']);
}
