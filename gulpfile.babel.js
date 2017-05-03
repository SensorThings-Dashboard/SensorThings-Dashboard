var babelRegister = require('babel-core/register');
var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var beautify = require('gulp-jsbeautify');
var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.babel');
var WebpackDevServer = require('webpack-dev-server');
var istanbul = require('gulp-babel-istanbul');
var injectModules = require('gulp-inject-modules');
gulp.task('default', ['webpack']);

gulp.task('babel', () => {
    del([
        'dist/**/*'
    ]);
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('target'));
});

gulp.task('coverage', function(cb) {
    gulp.src('src/**/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules()) 
        .on('finish', function() {
            gulp.src('test/**/*.js')
                .pipe(babel())
                .pipe(injectModules())
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .on('end', cb);
        });
});

gulp.task('report-html', function(cb) {
    gulp.src('src/**/*.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire()) // or you could use .pipe(injectModules()) 
        .on('finish', function() {
            gulp.src('test/**/*.js')
                .pipe(babel())
                .pipe(injectModules())
                .pipe(mocha())
                .pipe(istanbul.writeReports({
                    reporters: ['lcov', 'json', 'text', 'text-summary', 'html']
                }))
                .on('end', cb);
        });
});

gulp.task('test', ['babel'], () => {
    return gulp.src('./test/**/*.js')
        .pipe(mocha({
            compilers: {
                js: babel
            }
        }))
        .on('error', () => {
            gulp.emit('end');
        });
});

gulp.task('beautify', function() {
    gulp.src('./src/**/*.js')
        .pipe(beautify({}))
        .pipe(gulp.dest('./src/'));
    gulp.src('./test/**/*.js')
        .pipe(beautify({}))
        .pipe(gulp.dest('./test/'));
});

gulp.task('watch', () => {
    return gulp.watch(['src/**/*', 'test/**/*'], ['webpack', 'test']);
});

gulp.task('webpack', ['test'], function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin()
    ];

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            colors: true,
            progress: true
        }));
        callback();
    });
});

gulp.task('server', ['webpack', 'watch'], function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/' + myConfig.output.publicPath,
        stats: {
            colors: true
        },
        hot: true
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/public/index.html');
    });
});