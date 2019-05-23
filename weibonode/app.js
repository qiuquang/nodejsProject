const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user')

//用于处理postdata
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') { // 不是post请求
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') { // 是post请求，但不是app/json格式
            resolve({});
            return;
        }
        let postdata = '';
        req.on('data', chunk => {
            postdata += chunk.toString();
        })
        req.on('end', () => {
            if(!postdata) {
                resolve({});
                return;  
            }
            resolve(
                JSON.parse(postdata)
            )
        })
    })
    return promise;
}

const serverHandle = (req, res) => {
    // 设置数据格式
    res.setHeader('Content-Type', 'application/json');
    
    // 获得url
    const url = req.url;
    req.path = url.split('?')[0];

    req.query = querystring.parse(url.split('?')[1]);

    // 处理postdata获取postdata，post请求的数据
    getPostData(req).then(postdata => {
        req.body = postdata;

        // 处理blog路由
        const blogData = handleBlogRouter(req, res);
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return;
        }

        // 处理user路由
        const userData = handleUserRouter(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return;
        }

        // 未命中路由，返回404 jj
        res.writeHead(404, {"Content-Type": "text/plain"}); // 写404头
        res.write("404 Not Found\n");
        res.end();
    })


    // const resData ={ 
    //     name: '双越100',
    //     site: 'imooc',
    //     env: process.env.NODE_ENV
    // }

    // res.end(
    //     JSON.parse(resData)
    // )
}

module.exports = serverHandle;
