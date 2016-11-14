'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
});

gulp.task('start', ['browserSync'], function () {
    // Reload browser when files change
    gulp.watch('src/css/**/*.css', browserSync.reload);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('jasmine/spec/**/*.js', browserSync.reload);
});