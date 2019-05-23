const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => { // post请求
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);

    // 设置返回格式为JSON
    res.setHeader('Content-Type', 'application/json'); // text/html
    // 返回数据
    const resData ={
        method, url, path, query
    }

    //返回数据
    if(method === 'GET') {
        res.end( // 返回永远是字符串！！！
            JSON.stringify(resData)
        )
    }
    if(method === 'POST') {
        let postdata = '';
        req.on('data', chunk => {
            postdata += chunk.toString();
        })
        req.on('end', () => {
            resData.postData = postdata;
            res.end(
                JSON.stringify(resData)
            ) // 返回永远是字符串！！！
        })
    }
})

server.listen(8089, '127.0.0.1');
console.log('OK');