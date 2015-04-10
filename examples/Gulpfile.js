var browserify = require('browserify');
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var vinylSourceStream = require('vinyl-source-stream');

function build() {
  var bundler = browserify('./app.js', { cache: {}, packageCache: {}, fullPaths: false, debug: true });

  bundler.bundle()
    .on('error', gulpUtil.log)
    .on('end', function () {gulpUtil.log('Bundle complete');})
    .pipe(vinylSourceStream('bundle.js'))
    .pipe(gulp.dest('./public'));
}

gulp.task('build', function () {
  build();
});
