const http = require('http');

const PORT = 8088;
const HOSTNAME = '127.0.0.1';
const serverHandle = require('../app.js');

const server = http.createServer(serverHandle);

server.listen(PORT, HOSTNAME);