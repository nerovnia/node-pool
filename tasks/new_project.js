const {
	src,
	dest
} = require('gulp');

gulp.task('directories', function () {
  return gulp.src('*.*', {read: false})
      .pipe(gulp.dest('./css'))
      .pipe(gulp.dest('./img'))
      .pipe(gulp.dest('./img/content'))
      .pipe(gulp.dest('./img/icons'))
      .pipe(gulp.dest('./fonts'))
      .pipe(gulp.dest('./js'));
});