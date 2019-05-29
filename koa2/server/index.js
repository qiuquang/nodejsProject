const Koa = require('koa');
const app = new Koa();

const mid1 = async(ctx, next) => {
    ctx.type = 'text/html; charset=utf-8';
    await next();
    ctx.body = ctx.body + 'there';
}

const mid2 = async(ctx, next) => {
    ctx.body = 'Hi';
    await next();
}

const mid3 = async(ctx, next) => {
    ctx.body = ctx.body + 'Luke';
    await next();
}

app.use(mid1);
app.use(mid2);
app.use(mid3);
// app.use(async (ctx, next) => {
//     console.log(ctx);
//     ctx.type = 'text/html; charset=utf-8'
//     ctx.body = 'Hi Qiuquan';
// })

app.listen(23333)
