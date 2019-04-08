const express = require("express");
const os = require("os");
const path = require('path');
const app = express();

app.use(express.static("dist"));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/dist/index.html'));
});

app.listen(8040, () => console.log("Listening on port 8040!"));