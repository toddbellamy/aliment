// Karma configuration
// Generated on Thu Feb 26 2015 19:51:32 GMT-0500 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: [
        'public/vendor/jquery/dist/jquery.js',
        'public/vendor/bootstrap/dist/js/bootstrap.js',
        'public/vendor/angular/angular.js',
        'public/vendor/toastr/toastr.js',
        'public/vendor/angular-resource/angular-resource.js',
        'public/vendor/angular-route/angular-route.js',
        'public/vendor/angular-animate/angular-animate.js',
        'public/vendor/ui-utils-0.2.1/ui-utils.min.js',
        'public/vendor/ui-bootstrap/ui-bootstrap-0.12.1.js',
        'public/vendor/ui-bootstrap/ui-bootstrap-tpls-0.12.1.js',

        'test/test-app.js',

        'public/app/common/ui-bootstrap-aliment.js',
        'public/app/common/custom-filters.js',
        'public/app/common/validate-directives.js',
        'public/app/common/notifier.js',
        'public/app/common/ng-really.js',
        'public/app/main/MainController.js',
        'public/app/main/BaseFormController.js',
        'public/app/clients/ClientResource.js',
        'public/app/clients/ClientListController.js',
        'public/app/clients/ClientDetailController.js',
        'public/app/families/FamilyResource.js',
        'public/app/families/FamilyListController.js',
        'public/app/families/FamilyDetailController.js',
        'public/app/visits/VisitResource.js',
        'public/app/visits/VisitListController.js',
        'public/vendor/angular-mocks/angular-mocks.js',

        'test/specs/**/*.js'
        //'public/app/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'public/app/app.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
