// 공통 부분 레이아웃 공유 라이브러리
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const fs = require("fs");
const http = require("http");
var mysql=require('mysql2');
//데이터베이스 연결 함수
function dbcon(){
  db = null;
  try{
    file = fs.readFileSync("dbcon.json",'utf8')
    db = JSON.parse(file)
  }catch(err){
    console.log("읽기 에러")
    throw err;
  }
  const con=mysql.createConnection({
      host: db.name,
      user: db.id, password: db.pw,
      database:'jumakzip',port:'3306'
  });
  con.connect();
  console.log('db connect');
}
const dbconn = dbcon()

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", express.static("./"));
app.listen(3000, function (err) {
  if (err) throw err;
  console.log("start3000");
});

//레이아웃 사용 설정
app.use(expressLayouts);

app.set("layout", "layouts/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyle", true);

//메인페이지 로드
app.get("/", function (req, res) {
  res.render("index", {
    title: "main",
    style: "",
  });
});

//예약페이지 로드
app.get("/reservation", function (req, res) {
  res.render("reservation", { title: "reservation" });
});

//소개페이지 로드
app.get("/info", function (req, res) {
  res.render("info", { title: "info" });
});

//회원가입페이지 로드
app.get("/signup", function (req, res) {
  res.render("signup", { title: "회원가입" ,
    style: ""
  });
});

//image 가져오는 경로
app.get("/image/:name", function (req, res) {
  var name = req.params.name;
  console.log("이미지 요청: " + "./views/image/" + name);
  res.sendFile(path.join(__dirname, "views", "/image/" + name));
});

//css 가져오는 경로
app.get("/css/:name", function (req, res) {
  var name = req.params.name;
  console.log("css 요청: " + "./views/css/" + name);
  res.sendFile(path.join(__dirname, "views", "/css/" + name));
});
//js 가져오는 경로
app.get("/js/:name", function (req, res) {
  var name = req.params.name;
  console.log("js 요청: " + "./views/js/" + name);
  res.sendFile(path.join(__dirname, "views", "/js/" + name));
});
