// 공통 부분 레이아웃 공유 라이브러리
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const fs = require("fs");
const http = require("http");
var mysql = require("mysql2");
//데이터베이스 연결 함수
function dbcon() {
  db = null;
  try {
    file = fs.readFileSync("dbcon.json", "utf8");
    db = JSON.parse(file);
  } catch (err) {
    console.log("읽기 에러");
    throw err;
  }
  const con = mysql.createConnection({
    host: db.name,
    user: db.id,
    password: db.pw,
    database: "jumakzip",
    port: "3306",
  });
  con.connect();
  console.log('db connect');
  return con
}
const dbconn = dbcon();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyparser.urlencoded({extend:false}));
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

// 페이지 로드 코드들 ----------------------------------------------------------

//메인페이지 로드
app.get("/", function (req, res) {
  res.render("index", {
    title: "main",
    style: '<link rel="stylesheet" href="/css/index.css">',
  });
});

//로그인페이지 로드
app.get("/logIn", function (req, res) {
  res.render("logIn", { title: "logIn", style: "" });
});

//예약페이지 로드
app.get("/reservation", function (req, res) {
  res.render("reservation", { 
    title: "reservation",
    style:""

   });
});
//예약페이지 로드
app.get("/reservation/detail", function (req, res) {
  res.render("reservation_detail", { 
    title: "reservation",
    style:""

   });
});
//예약페이지 로드
app.get("/reservation/detail/confirmationandpayment", function (req, res) {
  res.render("reservation_confirmationandpayment", { 
    title: "reservation",
    style:""

   });
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
//회원가입 이후 데이터를 db에 저장하는 코드
app.post("/signup", async function(req,res){
  var id = req.body.id
  var pw = req.body.pw
  var phone = req.body.phone
  var nickname = req.body.nickname
  var isad = req.body.ad
  
  var sql = `insert into account(username,password,phone,nickname,usertype,isad) 
  value ('${id}','${pw}','${phone}','${nickname}', 'user','${isad}')`
  dbconn.query(sql, function(err,results,fields){
    if(err){
      console.error("회원가입 데이터 기입 실패 : ",err)
      res.status(400).send(`회원가입이 실패되었습니다. 다시 입력해주세요.`)
    }
    res.status(201).send("완료되었습니다!")
  })
})

app.post("/signin", function(req,res){
  var id = req.body.id
  var pw = req.body.pw
  var sql = `select * from account where id='${id}'`

  dbconn.query(sql, function(err,results, fields){
    if (err) {
      console.log('회원을 찾을 수 없음!')
    }
    if (results.password != pw) {
      res.status(400).send(`로그인이 실패되었습니다. 다시 입력해주세요.`)
    }
  })
})

//파일 가져오기 ------------------------------

//video 가져오는 경로
app.get("/video/:name", function (req, res) {
  var name = req.params.name;
  console.log("이미지 요청: " + "./views/video/" + name);
  res.sendFile(path.join(__dirname, "views", "/video/" + name));
});

//image 가져오는 경로
app.get("/image/:name", function (req, res) {
  var name = req.params.name;
  res.sendFile(path.join(__dirname, "views", "/image/" + name));
});
//css 가져오는 경로
app.get("/css/:name", function (req, res) {
  var name = req.params.name;
  res.sendFile(path.join(__dirname, "views", "/css/" + name));
});
//js 가져오는 경로
app.get("/js/:name", function (req, res) {
  var name = req.params.name;
  res.sendFile(path.join(__dirname, "views", "/js/" + name));
});
