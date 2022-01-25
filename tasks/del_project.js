/*
  Task:        del-project
  Description: Delete directories for old project 
  Command:     gulp del-project --prj <project-name>
*/

const gulp = require('gulp');
const fs = require('fs');
//const fs = require('fs-extra');

const cfg_path = './prj-conf.json'

gulp.task('del-project', function (done) {
  const cfg_obj = JSON.parse(fs.readFileSync(cfg_path));
  if(cfg_obj !== null) {
    let act_arg = '';
    for(let arg of process.argv) {
      if ((arg.length != 0) && (arg.substring(0,2) != '--') && (act_arg === '--prj')) {
        let cfg_projects = JSON.parse(fs.readFileSync(cfg_obj.prj.cfg.projects_cfg));
        if(cfg_projects) {
          if(cfg_projects.all.some(e => e.name === arg)) {
            // Delete project directories
            cfg_obj.prj.cfg.arr_src_dir.forEach(element => fs.rmSync(cfg_obj.prj.cfg.prj_dir + element + '/' + arg, {recursive: true}));
            // Delete project name from config file
            cfg_projects.all.splice(cfg_projects.all.findIndex((element) => element.name === arg),1);
            fs.writeFileSync(cfg_obj.prj.cfg.projects_cfg, JSON.stringify(cfg_projects));
          } else {
            console.log('Project with name "' + arg + '" not exist!')
          }  
        } else {
          console.log('Project file ' + cfg_obj.prj.cfg.projects_cfg + ' not exist!');
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
