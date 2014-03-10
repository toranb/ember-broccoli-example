module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      options: {
          spawn: false,
          livereload: true
      },
      sources: {
          files: ['js/*.coffee', 'js/templates/*.handlebars', 'css/*.css'],
          tasks: ['dev']
      }
    }
  });

  grunt.task.registerTask('dev', ['broccoli:build:js/dist']);
  grunt.task.registerTask('local', ['dev', 'watch']);
}
