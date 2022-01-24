/*
  Task:        backup-projects
  Description: Backup all projects
  Command:     gulp backup-projects
*/

const gulp = require('gulp');
const fs = require('fs');

const cfg_path = './prj-conf.json';

function copytDir(path_start, path_end) {
  dir = fs.readdirSync(path_start);
  for(let file of dir) {
    let l_path_src = path_start + '/' + file;
    let l_path_dest = path_end + '/' + file;
    if(fs.statSync(l_path_src).isDirectory()) {
      fs.mkdirSync(l_path_dest);
      copytDir(l_path_src, l_path_dest);
    } else {
      fs.copyFileSync(l_path_src, l_path_dest, fs.constants.COPYFILE_EXCL);
    }
  }
}

gulp.task('backup-projects', function (done) {
  fs.readFile(cfg_path, 'utf8', (err, data) => {
    if (err) throw err;
    const cfg_obj = JSON.parse(data);
    if((cfg_obj.prj.cfg.arr_src_dir.length !== 0)&&(cfg_obj.prj.cfg.backup_dir)) {
      let path_dest = cfg_obj.prj.cfg.backup_dir + '/' + new Date().toISOString();
      for(let path_src of cfg_obj.prj.cfg.arr_src_dir) {
        path_src = cfg_obj.prj.cfg.prj_dir + path_src;
        let tarr_path = path_src.split('/');
        let tpath_dest = path_dest + '/' + tarr_path[tarr_path.length-2] + '/' + tarr_path[tarr_path.length-1];
        fs.mkdirSync(tpath_dest, { recursive: true });
        copytDir(path_src, tpath_dest);
      }
      console.log('Backup save successful in ' + path_dest);
    }
  });
  done();
  return;
});
