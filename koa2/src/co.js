const co = require('co')
const fetch = require('node-fetch')

co(function *() {
    const res = yield fetch('http://api.douban.com/v2/movie/1291843')
    const movie = yield res.json();
    const summary = movie.summary;

    console.log('summary', summary)
})
