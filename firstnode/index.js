const yargs = require('yargs');
const Server = require('./app_promisify')

const argv = yargs
.usage('anywhere [options]')
.option('p', {
    alias: prompt,
    describe: '端口号',
    default: 8089,
})
.option('h', {
    alias: 'host',
    describe: '主机名',
    default: '127.0.0.1',
})
.option('d', {
    alias: 'root',
    describe: 'root path',
    default: process.cwd(),
})
.version()
.alias('v', 'version')
.help()
.argv()

const server = new Server(argv);
server.start();