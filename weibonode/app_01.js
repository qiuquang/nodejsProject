const http = require('http');
// const querystring = require('querystring');

// const server = http.createServer((req, res) => { // get请求
//     console.log('method', req.method);
//     const url = req.url;
//     console.log('url', url);
//     res.query = querystring.parse(url.split('?')[1]);
//     console.log('query', res.query);
//     res.end(
//         JSON.stringify(res.query)
//     )
// })

const server = http.createServer((req, res) => { // post请求
    if (req.method === 'POST') {
        // 数据格式
        console.log('content-type', req.headers['content-type']);
        // 接收数据
        let postdata = '';
        req.on('data', chunk => { // 随时来了数据，随时触发，chunk是二进制数据，需要toString
            postdata += chunk.toString();
        })
        req.on('end', () => {
            console.log('postdata:', postdata);
            res.end('hello world!')
        })
    }
})

server.listen(8089, '127.0.0.1');
console.log('OK');