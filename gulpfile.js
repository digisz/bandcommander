var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rename = require('gulp-rename');

gulp.task('default', ['connect', 'sass', 'scripts', 'watch'],
  function () {});

gulp.task('sass', function () {
  gulp.src('./lib/assets/css/sass/**/*.scss')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./lib/assets/css'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('./lib/assets/css/sass/*.scss', ['sass']);
  gulp.watch('./lib/assets/css/sass/**/*.scss', ['sass']);
  gulp.watch(['./lib/**/*.html'], ['html']);
  gulp.watch('./lib/**/*.js', ['scripts']);
});

gulp.task('connect', function () {
  connect.server({
    root: 'lib',
    livereload: true,
    port: 3001,
  });
});

gulp.task('html', function () {
  gulp.src('./dist/*.html')
    .pipe(connect.reload());
});

gulp.task('scripts', function () {
  gulp.src('./lib/*.js')
    .pipe(connect.reload());
});
