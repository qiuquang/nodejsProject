const path = require('path');

const mod = require('./02_cusmod');

console.log(mod.testVar);

console.log('__dirname'    , __dirname);
console.log('process.cwd()', process.cwd());
console.log('./           ', path.resolve('./'));

const buf = Buffer.from('this is a test');
