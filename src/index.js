"use strict";
const express = require('express');
const app = express();
const port = 3010;
app.get('/', (req, res) => {
    let helloMessage = 'Hello world!!!';
    res.send(helloMessage);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
