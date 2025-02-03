const path = require('path')
const express = require('express')
const app = express()
const bodyparser = require("body-parser");
const fs=require("fs");
const http=require('http');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static("./"))
app.listen(3000,function(err){
    if(err) throw err;
    console.log("start3000");
});

//메인페이지 로드
app.get('/', function(req, res){
    res.render('index', {title : 'main'})
})

//예약페이지 로드
app.get('/reservation', function(req, res){
    res.render('reservation', {title : 'reservation'})
})

//소개페이지 로드
app.get('/info', function(req, res){
    res.render('info', {title : 'info'})
})