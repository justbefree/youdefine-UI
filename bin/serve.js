/*
* @Author: Just be free
* @Date:   2020-05-26 16:09:34
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-26 16:32:50
* @E-mail: justbefree@126.com
*/

const { execFile } = require('child_process');
const fs = require("fs");

fs.chmod('build/serve.sh', 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "build/serve.sh" have been changed!');
});

const child = execFile('build/serve.sh', [], { shell: true }, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
