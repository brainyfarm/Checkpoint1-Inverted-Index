/**
 * @file Setup of gulp tasks
 */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('browser-sync', () => {
  browserSync.init({
    server: './src/',
    port: process.env.PORT || 3400,
    open: false
  });
});

gulp.task('test', () => {
  browserSync.init({
    server: {
      baseDir: ['./jasmine', './src/js'],
      port: 3120,
      index: 'SpecRunner.html'
    }
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], browserSync.reload);
});

gulp.task('default', ['browser-sync'], () => {
  const filesToWatch = ['**/*.js', '**/*.css', '**/*.html'];
  gulp.watch(filesToWatch).on('change', browserSync.reload);
});
