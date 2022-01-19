/*
  Task:        new-project
  Description: Create directories for new project 
  Command:     gulp new-project --prj <project-name>
*/

const gulp = require('gulp');

gulp.task('new-project', function (done) {
  let act_arg = '';
  for(let arg of process.argv) {
    if ((arg.length != 0) && (arg.substring(0,2) != '--') && (act_arg === '--prj')) {
        return gulp.src('*.*', {read: false})
            .pipe(gulp.dest('./src/public/javascripts/' + arg))
            .pipe(gulp.dest('./src/public/stylesheets/' + arg))
            .pipe(gulp.dest('./src/views/' + arg))
            .pipe(gulp.dest('./src/public/images/' + arg));
    }
    if(arg.substring(0,2) === '--') {
      act_arg = arg;
    } else {
      act_arg = "";
    }
  }
  return;
});