/**
 * @file Setup of gulp tasks
 */
const gulp = require('gulp');
const rename = require('gulp-rename');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './src/',
    port: process.env.PORT || 3400,
    open: false,
    ghostMode: false
  });
});

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
  .pipe(browserify())
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('./jasmine'));
});

gulp.task('test', () => {
  browserSync.init({
    server: {
      baseDir: ['./jasmine', './src/js'],
      port: 3120,
      index: 'SpecRunner.html'
    },
    ghostMode: false
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], browserSync.reload);
});

gulp.task('default', ['browser-sync'], () => {
  const filesToWatch = ['**/*.js', '**/*.css', '**/*.html'];
  gulp.watch(filesToWatch).on('change', browserSync.reload);
});
