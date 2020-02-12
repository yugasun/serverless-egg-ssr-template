const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {
    env: 'prod', // 推荐云函数的 egg 运行环境变量修改为 prod
    rundir: '/tmp'
  };

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: '/tmp'
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };

  return exports;
};
