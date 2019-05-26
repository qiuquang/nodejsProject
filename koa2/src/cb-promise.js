const fs = require('fs');


// callback方式
// fs.readFile('./package.json',(err, data) => {
//     if(err) return console.log(err);
//     data = JSON.parse(data);
//     console.log(data.name);
// })

// promise方式
// function readFileSync(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path,(err, data) => {
//             if(err) {
//                 reject(err);
//             } else {
//                 resolve(data)
//             }
//         })
//     })
// }

// readFileSync('./package.json').then(data => {
//     data = JSON.parse(data);
//     console.log(data.name);
// }).catch(( err=> {
//     console.log(err);
// }))

// 方法3
const util = require('util');
util.promisify(fs.readFile)('./package.json')
.then(JSON.parse).then(data => {
    console.log(data.name);
}).catch((err) => {
    console.log(err);
})