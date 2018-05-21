// Karma configuration
// Generated on Fri Mar 23 2018 14:33:19 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: ['PhantomJS', 'Chrome'],
    frameworks: ['jasmine'],
    files: [
    'src/**/*.js',
    'test/**/*.spec.js'
    ],
    exclude: [
      'node_modules'
    ],
    preprocessors: {
      'src/*.js': ['coverage', 'webpack'],
      'test/*.js': ['webpack']
    },
    reporters: ['progress', 'coverage', 'coverage-istanbul'],
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
      {
        type: 'json',
        subdir: '.',
        file: 'coverage.json',
      },
       {
        type: 'lcov',
        subdir: '.'
      },
      {
        type: 'text-summary'
      }, 
    {
      type: 'html',
    }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
      webpack:{
          module: {
              rules: [{
                  test: /\.js$/,
                  use: {
                      loader: 'istanbul-instrumenter-loader',
                      options: { esModules: true }
                  },
                  enforce: 'pre',
                  exclude: /node_modules|\.spec\.js$/,
              },
                  {
                      test: /\.js$/,
                      use: {
                          loader: 'babel-loader',
                          options: {
                              presets: ['env', 'es2015'],
                              plugins: ['istanbul']
                          }
                      },
                      exclude: /node_modules/
                  }]
          }
      },
  })
}
