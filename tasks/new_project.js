/*
  Task:        new-project
  Description: Create directories for new project 
  Command:     gulp new-project --prj <project-name>
*/

const gulp = require('gulp');
const fs = require('fs-extra');

const cfg_path = './prj-conf.json'

gulp.task('new-project', function (done) {
  const cfg_obj = fs.readJsonSync(cfg_path, { throws: false });
  if(cfg_obj !== null) {
    let act_arg = '';
    for(let arg of process.argv) {
      if ((arg.length != 0) && (arg.substring(0,2) != '--') && (act_arg === '--prj')) {
        if(!cfg_obj.prj.all.some(e => e.name === arg)) {
          cfg_obj.prj.cfg.arr_src_dir.forEach(element => fs.ensureDirSync(cfg_obj.prj.cfg.prj_dir + element  + '/'  + arg));
          cfg_obj.prj.all.push({
              name: arg
          });
          fs.writeJsonSync(cfg_path, cfg_obj)        
        } else {
          console.log('Project with name "' + arg + '" already exist!')
        }  
      }
      if(arg.substring(0,2) === '--') {
        act_arg = arg;
      } else {
        act_arg = "";
      }
    }
  }
  done();
  return;
});
