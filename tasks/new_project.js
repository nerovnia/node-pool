/*
  Task:        new-project
  Description: Create directories for new project 
  Command:     gulp new-project --prj <project-name>
*/

const gulp = require('gulp');
const fs = require('fs');

const cfg_path = './prj-conf.json';
  
gulp.task('new-project', function (done) {
  const cfg_obj = JSON.parse(fs.readFileSync(cfg_path, { throws: false }));
  if(cfg_obj !== null) {
    let act_arg = '';
    for(let arg of process.argv) {
      if ((arg.length != 0) && (arg.substring(0,2) != '--') && (act_arg === '--prj')) {
        // Add project to config file
        let cfg_projects = "";
        try {
          cfg_projects = JSON.parse(fs.readFileSync(cfg_obj.prj.cfg.projects_cfg));
        } catch (err) {  
          cfg_projects = {
            all: []
          };
        }
        if(!cfg_projects.all.some(e => e.name === arg)) {
          // Create directories for complete project
          cfg_obj.prj.cfg.arr_src_dir.forEach(element => fs.mkdirSync(cfg_obj.prj.cfg.prj_dir + element  + '/'  + arg));
          cfg_projects.all.push({
            name: arg
          });
          fs.writeFileSync(cfg_obj.prj.cfg.projects_cfg, JSON.stringify(cfg_projects), {flag: 'w'});
          // Initialise a routes object and create a start routes file
          let rout_obj = {routes:[]};
          rout_obj.prj_name = arg;
          let route = {};
          route.name = "home";
          route.route = cfg_obj.prj.cfg.start_route + arg;
          route.path = "proj-dir/" + arg + "/index"
          rout_obj.routes.push(route);
          fs.writeFileSync(cfg_obj.prj.cfg.prj_dir + cfg_obj.prj.cfg.prj_route_path + arg + '/' + cfg_obj.prj.cfg.prj_route_file, JSON.stringify(rout_obj));
          // Copy views templates
          let tmpl_views_dir = cfg_obj.prj.cfg.tmpl_dir + "views";
          let tmpl_dir = fs.readdirSync(tmpl_views_dir);
          for(let tmpl_file of tmpl_dir) {
            let tmpl_path = tmpl_views_dir + '/' + tmpl_file;
            let prj_view_path = cfg_obj.prj.cfg.prj_dir + "views/proj-dir/" + arg + '/' + tmpl_file;
            if(!fs.statSync(tmpl_path).isDirectory()) {
              fs.copyFileSync(tmpl_path, prj_view_path, fs.constants.COPYFILE_EXCL);
            }
          }
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
