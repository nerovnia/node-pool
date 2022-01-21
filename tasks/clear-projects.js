/*
  Task:        clear-projects
  Description: Remove all projects
  Command:     gulp clear-projects
*/

const gulp = require('gulp');
const fs = require('fs');

const cfg_path = './prj-conf.json'

gulp.task('test', function (done) {
  fs.readFile(cfg_path, 'utf8', (err, data) => {
    if (err) throw err;
    const cfg_obj = JSON.parse(data);
    if(Array.isArray(cfg_obj.prj.all) && (cfg_obj.prj.all.length !== 0)) {
      let arr_ind_del_prg = [];
      cfg_obj.prj.all.forEach((prj_obj, i_prj_obj) => {
        cfg_obj.prj.cfg.arr_src_dir.forEach(element => {
          fs.rmSync(element + prj_obj.name, { recursive: true });
          arr_ind_del_prg.push(i_prj_obj);
        });
      });
      arr_ind_del_prg.forEach(ind => {
        cfg_obj.prj.all.splice(ind);
      });
      fs.writeFile(cfg_path, JSON.stringify(cfg_obj), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    } else {
      console.log('Projects not found!');
    }
  });
  done();
  return;
});
