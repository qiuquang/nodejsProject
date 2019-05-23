const fs = require('fs');
// 引用内置模块
const result = fs.readFile('./06_fs.js', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data.toString());
  }
})

console.log(result);
