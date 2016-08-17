var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', ['connect', 'sass', 'services', 'controller', 'watch'],
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
  gulp.watch('./lib/app/services/*.js', ['services']);
  gulp.watch('./lib/app/**/*controller.js', ['controller']);
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

gulp.task('services', function () {
  return gulp.src('./lib/app/services/*.js')
    .pipe(concat('services-master.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./lib/app/'))
    .pipe(connect.reload());
});

gulp.task('controller', function () {
  return gulp.src('./lib/app/**/*controller.js')
    .pipe(concat('controller-master.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./lib/app/'))
    .pipe(connect.reload());
});
