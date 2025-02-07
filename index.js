// 공통 부분 레이아웃 공유 라이브러리
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const fs = require("fs");
const http = require("http");
var mysql = require("mysql2");
const cookieParser = require("cookie-parser");
const cookie = require("cookie");
const { title } = require("process");
var ejs = require("ejs");
const bcrypt = require("bcrypt");
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
  console.log("db connect");
  return con;
}
const dbconn = dbcon();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyparser.urlencoded({ extend: false }));
app.use(cookieParser("jumakzip"));
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
app.get("/signin", function (req, res) {
  res.render("signin", { title: "로그인", style: "" });
});

//예약페이지 로드
app.get("/reservation", function (req, res) {
  res.render("reservation", { title: "reservation",style:"" });
});
//예약페이지 로드
app.get("/reservation/detail", function (req, res) {
  res.render("reservation_detail", { title: "reservation_detail",style:"" });
});
//예약페이지 로드
app.get("/reservation/pay", function (req, res) {
  res.render("reservation_pay", { title: "reservation_pay",style:"" });
});

//소개페이지 로드
app.get("/info", function (req, res) {
  res.render("info", { title: "info" });
});

//회원가입페이지 로드
app.get("/signup", function (req, res) {
  res.render("signup", { title: "회원가입", style: "" });
});
//회원가입 이후 데이터를 db에 저장하는 코드
app.post("/idck", function (req, res) {
  var sql = `select username from account where username='${req.body.id}'`;
  dbconn.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).json(err);
      return;
    }
    if (results.length === 0) {
      res.status(200).json({ data: null, msg: "사용 가능한 아이디입니다" });
    } else {
      res
        .status(200)
        .json({ data: results, msg: "이미 사용중인 아이디입니다" });
    }
  });
});
app.post("/signup", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  var phone = req.body.phone;
  var nickname = req.body.nickname;
  var isad = req.body.ad;
  var hashpw = "";
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error(err);
      return;
    }
    bcrypt.hash(pw, salt, (err, hash) => {
      if (err) {
        console.error(err);
        return;
      }
      hashpw = hash;
      var sql = `insert into account(username,password,phone,nickname,usertype,isad) 
      value ('${id}','${hashpw}','${phone}','${nickname}', 'user','${isad}')`;
      dbconn.query(sql, function (err, results, fields) {
        if (err) {
          console.error("회원가입 데이터 기입 실패 : ", err);
          res.status(400).json({ msg: "회원가입이 실패되었습니다" });
          return;
        }
        res.status(201).json({ msg: "회원가입이 완료되었습니다!" });
      });
    });
  });
});
//로그인 성공 이후 세션쿠키 전달하는 코드
app.post("/signin", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  var sql = `select password,usertype from account where username='${id}'`;

  dbconn.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).json({"msg":"오류 발생"})
      return;
    }
    bcrypt.compare(pw, results[0].password, (err, ispassword) => {
      if (err) {
        console.error(err);
        res.status(500).json({"msg":"오류 발생"})
        return;
      }
      if (results.length > 0 && ispassword) {
        res.cookie("id", id, { maxAge: 60000 * 60 * 3 });
        res.cookie("usertype", results[0].usertype, { maxAge: 60000 * 60 * 3 });
        res.status(200).json({"msg":"로그인 성공"})
      } else {
        res.status(400).json({ msg: "로그인을 실패했습니다." });
        return;
      }
    });
  });
});
//로그아웃 하면 쿠키(세션) 삭제
app.get("/logout", function (req, res) {
  res.clearCookie("id");
  res.clearCookie("usertype");
  res.redirect("/");
});
//마이페이지 조회 코드
app.get("/mypage", function (req, res) {
  var user = req.cookies.id;
  if (user == undefined) {
    res.redirect("/login");
    return;
  }
  res.render("mypage", {
    title: "mypage",
    style: ""
  });
  
});
//에러 페이지로 이동
app.get("/error", function (req, res) {
  fs.readFile(
    path.join(__dirname, "views") + "/error.ejs",
    "utf-8",
    function (err, data) {
      if (err) throw err;
      res.send(ejs.render(data, { title: "error" }));
    }
  );
});
//이 외의 페이지로 이동할 경우 notfound페이지로 이동
app.get("/:url", function (req, res) {
  res.redirect("/");
});
//마이페이지에서 비밀번호 확인 코드
app.post("/pwck",function(req,res){
  var user = req.cookies.id
  var pw = req.body.pw

  var sql = `select password,usertype from account where username='${user}'`;
  dbconn.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).json({"msg":"오류 발생"})
      return;
    }
    bcrypt.compare(pw, results[0].password, (err, ispassword) => {
      if (err) {
        console.error(err);
        res.status(500).json({"msg":"오류 발생"})
        return;
      }
      if (results.length > 0 && ispassword) {
        res.status(200).json({"msg":"비밀번호 확인 성공","data": results[0]})
      } else {
        res.status(400).json({ msg: "비밀번호 확인 실패" });
        return;
      }
    });
  });
})
//마이페이지에서 정보 수정 코드
app.post("/mypage", function(req,res){
  var user = req.cookies.id
  var isad = req.body.ad
  var nickname = req.body.nickname
  var pw = req.body.pw

  var sql = `select user_id from account where username='${user}'`;
  dbconn.query(sql,function(err,results,fields){
    if(err){
      console.error("mypage"+err)
      res.status(400).json({ msg: "회원 조회를 실패했습니다." });
      return;
    }
    var id = results[0].user_id
    sql = `UPDATE jumakzip.account SET 
    nickname='${nickname}',isad= '${isad}',password='${pw}' WHERE user_id=${id}`
    dbconn.query(sql,function(err,results,fields){
      if(err){
        console.error("mypage"+err)
        res.status(400).json({ msg: "회원 조회를 실패했습니다." });
        return;
      }
      if(results.affectedRows > 0){
        res.status(201).json({msg:"회원 정보가 저장되었습니다"})
      }else{
        res.status(400).json({ msg: "회원 정보 저장이 실패했습니다." });
      }
    })
  })
})
//마이페이지에서 유저 삭제 코드
app.delete("/mypage", function (req, res) {
  var user = req.cookies.id;
  if (user == undefined) {
    res.redirect("/login");
  }
  var sql = `delete * from account where username='${user.id}'`;
  dbconn.query(sql, function (err, results, fields) {
    if (err || results.length == 0) {
      res.status(400).json({ msg: "회원 조회를 실패했습니다." });
      return;
    }
    res.status(200).json({
      msg: "회원 조회 성공",
      user: results[0],
    });
  });
});
//파일 가져오기 ------------------------------

//video 가져오는 경로
app.get("/video/:name", function (req, res) {
  var name = req.params.name;
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
