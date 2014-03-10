module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
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

  grunt.task.registerTask('dev', ['broccoli:build:js/dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
}
