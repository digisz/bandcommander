var gulp = require('gulp')
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass')

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('sass/*.sass', ['sass']);
});
