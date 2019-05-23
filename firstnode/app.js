const http = require('http');
const conf = require('./config/defaultConfig');
const path = require('path');
const fs = require('fs'); // 文件流
const chalk = require('chalk');

const server = http.createServer((req, res) => {
  // const url = req.url;
  const filePath = path.join(conf.root, req.url);
  fs.stat(filePath, (err, stats) => {
    if(err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${filePath} is not a diectory or file`);
      return;
    }
    if (stats.isFile()) { // 是文件
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      // fs.readFile(filePath, (err, data) => { // 速度慢，判断
      //   res.end(data);
      // });
      fs.createReadStream(filePath).pipe(res); // 方法2：创建流并返回给res，速度快
    } else if (stats.isDirectory()) { // 是文件夹
      fs.readdir(filePath, (err, files) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(files.join(','));
      })
    }
  });
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/html');
  // // res.write('<html>')
  // // res.write('<body>')
  // // res.write('Hello World!')
  // // res.write('</body>')
  // // res.write('</html>')
  // res.end(filePath);
});

server.listen(conf.post, conf.hostname, () => {
  const addr =  `http://${conf.hostname}:${conf.post}`;
  console.info(`Server Started at ${chalk.green(addr)}`)
});