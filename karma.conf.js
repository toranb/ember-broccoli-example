module.exports = function(karma) {
    karma.set({
        basePath: 'js',

        files: [
          "lib/deps.min.js",
          "tests/karma/karma_qunit_helpers.js",
          "tests/*.js",
          "tests/karma/qunit_karma_launch.js"
        ],

        logLevel: karma.LOG_ERROR,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false,

        frameworks: ["qunit"]
    });
};
