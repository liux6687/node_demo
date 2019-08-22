const express = require('express');
const loginRouter = require('./router/login');
const path = require('path');
const badyParser = require('body-parser');
let app = express();
app.use(badyParser.urlencoded({extended: false}));
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  //让options尝试请求快速结束
    }
    else {
        next();
    }
})
app.use(loginRouter); //登录相关
app.listen(3000, function() {
    console.log('打开localhost:3000')
})