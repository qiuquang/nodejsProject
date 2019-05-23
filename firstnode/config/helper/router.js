const fs = require('fs'); // 文件流
const path = require('path');
const Handlebars = require('handlebars');
const promisify = require('util').promisify; // 引入promisify
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
// const config = require('../defaultConfig');
const range = require('./range');
const isFresh = require('./cache');

const tplPath = path.join(__dirname, '../template/dir.tpl'); // 拼接路径
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());

module.exports = async function(req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) { // 是文件
          res.setHeader('Content-Type', 'text/plain');
          if (isFresh(stats, req, res)) {
            res.statusCode = 304;
            res.end();
            return;
          }
          let rs;
          const { code, start, end } = range(stats.size, req, res);
          if (code === 200) {
            rs = fs.createReadStream(filePath);
          } else {
            rs = fs.createReadStream(filePath, {start, end}); // 读部分内容
          }
         rs.pipe(res); // 方法2：创建流并返回给res，速度快
        } else if (stats.isDirectory()) { // 是文件夹
          // fs.readdir(filePath, (err, files) => {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const dir = path.relative(config.root, filePath);
            const data = {
              title: path.basename(filePath),
              dir: dir ? `/${dir}` : '', // 相对路径
              files,
            }
            res.end(template(data));
            // res.end(files.join(','));
          // });
        }
      } catch(ex) {
        res.end(ex);
        console.error(ex);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a diectory or file`);
        return;
      }
}