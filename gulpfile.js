var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');

gulp.task('minify', function () {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}));
});
gulp.task('css', function () {
    gulp.src('app/css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('app/cssmin'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('browserSync', function() {
  browserSync({
		 server: {
		 baseDir: 'app'
	 },
	 notify: false
  });
});
gulp.task('watch', ['browserSync', 'css'], function() {
	gulp.watch('app/css/style.css', ['css']);
});