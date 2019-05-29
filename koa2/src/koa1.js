var Koa = require('koa');
var app = new Koa();
var logger = require('koa-logger');

var tab = function(n) {
    return 
}

var mid1 = function() {
    return function*() {
        this.body = '<h3>请求=>第一层中间件</h3>';
        yield next
        this.body = '<h3>响应=>第一层中间件</h3>';
    }
}

var mid2 = function() {
    return function*() {
        this.body = '<h3>请求=>第2层中间件</h3>';
        yield next
        this.body = '<h3>响应=>第2层中间件</h3>';
    }
}

var mid3 = function() {
    return function*() {
        this.body = '<h3>请求=>第3层中间件</h3>';
        yield next
        this.body = '<h3>响应=>第3层中间件</h3>';
    }
}

app.use(logger());
app.use(mid1);
app.use(mid2);
app.use(mid3);


app.use(function *(next) {
    this.body += '<p>' + indent(12) + 'koa 核心 处理业务</p>'
})

app.listen(23333)

