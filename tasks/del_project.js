/*
  Task:        del-project
  Description: Delete directories for old project 
  Command:     gulp del-project --prj <project-name>
*/

const gulp = require('gulp');
const del = require('del');

gulp.task('del-project', function () {
  let act_arg = '';
  for(let arg of process.argv) {
    if ((arg.length != 0) && (arg.substring(0,2) != '--') && (act_arg === '--prj')) {
        return del(['./src/public/javascripts/' + arg,
            './src/public/stylesheets/' + arg,
            './src/views/' + arg,
            './src/public/images/' + arg], {force:true});
    }
    if(arg.substring(0,2) === '--') {
      act_arg = arg;
    } else {
      act_arg = "";
    }
  }
  return;
});
