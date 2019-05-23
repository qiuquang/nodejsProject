const http = require('http');
const conf = require('./config/defaultConfig');
const path = require('path');
const chalk = require('chalk');
const route = require('./config/helper/router.js')

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config)
  }
  start(){
    const server = http.createServer((req, res) => {
      // const url = req.url;
      const filePath = path.join(this.conf.root, req.url);
      route(req, res, filePath, this.conf);
      // res.statusCode = 200;
      // res.setHeader('Content-Type', 'text/html');
      // // res.write('<html>')
      // // res.write('<body>')
      // // res.write('Hello World!')
      // // res.write('</body>')
      // // res.write('</html>')
      // res.end(filePath);
    });
    
    server.listen(this.conf.post, this.conf.hostname, () => {
      const addr =  `http://${this.conf.hostname}:${this.conf.post}`;
      console.info(`Server Started at ${chalk.green(addr)}`)
    });
  }
}
