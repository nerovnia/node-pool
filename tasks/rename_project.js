/*
  Rename directories for project 
*/
const fs = require('fs');

const arr_dir = [
  './src/public/javascripts/',
  './src/public/stylesheets/',
  './src/views/',
  './src/public/images/'
];

gulp.task('rename-project', function () {
  let act_arg = '';
  let old_name = '';
  let new_name = '';
  for(let arg of process.argv) {
    if(arg.substring(0,2) === '--') {
      act_arg = arg;
    } else {
      if(arg.length() != 0) {
        switch(act_arg) {
          case '--old-name':
            old_name = arg;
            break;
          case '--new-name':
            new_name = arg;
            break;
          }
      }
      act_arg = "";
    }
    if ((old_name.length != 0) && (new_name.length != 0)) {
      for(dir of arr_dir){
        rename(dir, old_name, new_name);
      }
      break;    
    }
  }
  return;
});

function rename(dir, prj_old_name, prj_new_name) {
  fs.rename(dir + prj_old_name, dir + prj_new_name, function (err) {
    if (err) {
      throw err;
    }
  });
}