const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.end('hi luke');
})

app.listen(23334);