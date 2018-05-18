// Karma configuration
// Generated on Fri Mar 23 2018 14:33:19 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({
      basePath: '',
      browsers: ['PhantomJS'],
      frameworks: ['jasmine'],
      files: [
      'src/**/*.js',
      'test/**/*.js'
    ],
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      singleRun: false,
      concurrency: Infinity
  })
}
