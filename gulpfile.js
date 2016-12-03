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
  gulp.src(['./src/js/inverted-index.js', './src/js/utils.js'])
  .pipe(gulp.dest('./jasmine/spec'));
  browserSync.init({
    server: 'jasmine',
    index: 'SpecRunner.html'
  });
  gulp.watch(['./jasmine/spec/inverted-index-test.js'], browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch-test'], () => {
  const filesToWatch = ['**/*.js', '**/*.css', '**/*.html'];
  gulp.watch(filesToWatch).on('change', browserSync.reload);
});
