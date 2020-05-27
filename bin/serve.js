/*
* @Author: Just be free
* @Date:   2020-05-26 16:09:34
* @Last Modified by:   Just be free
* @Last Modified time: 2020-05-27 15:19:24
* @E-mail: justbefree@126.com
*/
const path = require("path");
const fs = require("fs");
const serve = require("../build/serve");
const previousPrefix = serve.getPreviousPrefix(path.join(__dirname, "../examples/layout/layout.vue"));
const { execFile } = require('child_process');
// console.log("之前的前缀是什么", previousPrefix);
fs.chmod('build/serve.sh', 0o775, (err) => {
  if (err) throw err;
  console.log('The permissions for file "build/serve.sh" have been changed!');
});

const child = execFile('build/serve.sh', ["-P", previousPrefix], { shell: true }, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
