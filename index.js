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
});

//레이아웃 사용 설정
app.use(expressLayouts);

app.set("layout", "layouts/layout");
app.set("layout extractScripts", true);
app.set("layout extractStyle", true);

//비밀번호 함수
async function password_hash(pw) {
  let res = "";
  const salt = await bcrypt.genSalt(10);
  res = await bcrypt.hash(pw, salt);
  return res;
}
// 페이지 로드 코드들 ----------------------------------------------------------

//메인페이지 로드
app.get("/", function (req, res) {
  res.render("index", {
    title: "main",
    style: "",
  });
});

//로그인페이지 로드
app.get("/signin", function (req, res) {
  res.render("signin", { title: "로그인" });
});

//예약페이지 로드
app.get("/reservation/detail", function (req, res) {
  var roomid = req.query.room;
  var imgUrl = req.query.img;
  var name = req.query.name;
  var price = req.query.price;
  var h_max = req.query.h_max;
  var h_cnt = req.query.count;
  var start = req.query.start;
  var end = req.query.end;
  var sql = `select * from room_op where roop_id = (select roop_id from room where room_id = '${roomid}')`;
  dbconn.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500);
      return;
    }
    res.render("reservation_detail", {
      title: "reservation_detail",
      roomid: roomid,
      imgUrl: imgUrl,
      name: name,
      price: price,
      h_max: h_max,
      data: results[0],
      count: h_cnt,
      start: start,
      end: end,
    });
  });
});

//소개페이지 로드
app.get("/info", function (req, res) {
  res.render("info", { title: "info" });
});

//회원가입페이지 로드
app.get("/signup", function (req, res) {
  res.render("signup", { title: "회원가입" });
});

//아이디찾기페이지 로드
app.get("/idfind", function (req, res) {
  res.render("idfind", { title: "아이디 찾기" });
});
//비밀번호찾기페이지 로드
app.get("/passwordfind", function (req, res) {
  res.render("passwordfind", { title: "비밀번호 찾기" });
});
//관리자 페이지 로드
app.get("/admin", function (req, res) {
  res.render("admin", {
    title: "admin",
  });
});
//카카오 단건결제 승인 페이지
app.get("/KakaopayApproval", function (req, res) {
  var token = req.query.pg_token
  var user = req.cookies.id
  var now = new Date().toISOString().substring(0, 10)
  var sql = `update reservation SET pay_ck='1',payment='${token}' 
  where user_id=(select user_id from account where username='${user}') and create_date='${now}'`
  dbconn.query(sql, (err,results)=>{
    if(err){
      console.error(err)
      res.send("오류가 발생되었습니다")
      return
    }
    res.render("KakaopayApproval", {
      title: "KakaopayApproval",
    });
  })
});
//카카오 단건결제 취소 페이지
app.get("/KakaopayCancel", function (req, res) {
  var sql = `delete from reservation where 
  user_id=(select user_id from account where username='${user}') and create_date='${now}'`
  dbconn.query(sql, (err,results)=>{
    if(err){
      console.error(err)
      res.send("오류가 발생되었습니다")
      return
    }
    res.render("KakaopayCancel", {
      title: "KakaopayCancel",
    });
  })
  
});
//카카오 단건결제 실패 페이지
app.get("/KakaopayFail", function (req, res) {
  var sql = `delete from reservation where 
  user_id=(select user_id from account where username='${user}') and create_date='${now}'`
  dbconn.query(sql, (err,results)=>{
    if(err){
      console.error(err)
      res.send("오류가 발생되었습니다")
      return
    }
    res.render("KakaopayFail", {
      title: "KakaopayFail",
    });
  })
});
//아이디찾기 결과창 로드
app.post("/idfind", function (req, res) {
  var phone = req.body.phone;
  var sql = `SELECT username from account where phone='${phone}'`;
  dbconn.query(sql, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).render("result", {
        title: "아이디찾기",
        data: "회원을 찾지 못했습니다",
        st: "실패",
      });
      return;
    }
    if (results.length == 0) {
      res.status(400).render("result", {
        title: "아이디찾기",
        data: "회원을 찾지 못했습니다",
        st: "실패",
      });
      return;
    }
    res.status(200).render("result", {
      title: "아이디찾기",
      data: results[0],
      st: "아이디",
    });
  });
});
//비밀번호찾기 결과창 로드
app.post("/passwordfind", function (req, res) {
  var username = req.body.id;
  var phone = req.body.phone;
  var sql = `SELECT username,nickname from account where phone='${phone}' and username = '${username}'`;
  dbconn.query(sql, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).render("result", {
        title: "비밀번호찾기",
        data: "회원을 찾지 못했습니다",
        st: "실패",
      });
      return;
    }
    if (results.length == 0) {
      res.status(400).render("result", {
        title: "비밀번호찾기",
        data: "회원을 찾지 못했습니다",
        st: "실패",
      });
      return;
    }
    res.status(200).render("result", {
      title: "비밀번호찾기",
      data: results[0],
      st: "비밀번호",
    });
  });
});
//비밀번호찾기 비밀번호변경하는 코드
app.post("/newpassword", async function (req, res) {
  var user = req.body.id;
  var pw = req.body.pw;
  try {
    if (pw != "") {
      pw = await password_hash(pw);
    }
    sql = `UPDATE jumakzip.account SET 
    password=IF(? = '', password, '${pw}') WHERE username='${user}'`;
    var results = dbconn.query(sql, [pw]);
    if (results.affectedRows > 0) {
      res.status(201).json({ msg: "회원 정보가 저장되었습니다" });
      return;
    } else {
      res.status(200).json({ msg: "회원 정보가 저장되었습니다" });
      return;
    }
  } catch {
    res.status(500);
  }
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
  password_hash(pw, (hash) => {
    var sql = `insert into account(username,password,phone,nickname,usertype,isad) 
      value ('${id}','${hash}','${phone}','${nickname}', 'user','${isad}')`;
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
//로그인 성공 이후 세션쿠키 전달하는 코드
app.post("/signin", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  var sql = `select password,usertype from account where username='${id}'`;

  dbconn.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "오류 발생" });
      return;
    }
    if (results.length == 0) {
      res.status(400).json({ msg: "로그인을 실패했습니다." });
      return;
    }
    bcrypt.compare(pw, results[0].password, (err, ispassword) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "오류 발생" });
        return;
      }
      if (ispassword) {
        res.cookie("id", id, { maxAge: 60000 * 60 * 3 });
        res.cookie("usertype", results[0].usertype, { maxAge: 60000 * 60 * 3 });
        res.status(200).json({ msg: "로그인 성공" });
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
    style: "",
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
app.post("/mypage_detail", function (req, res) {
  var user = req.cookies.id;
  var pw = req.body.pw;
  var now = new Date().toISOString().substring(0, 10);
  var sql = `select * from account where username='${user}'`;
  dbconn.query(sql, function (err, results, fields) {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "오류 발생" });
      return;
    }
    bcrypt.compare(pw, results[0].password, (err, ispassword) => {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: "오류 발생" });
        return;
      }
      if (results.length > 0 && ispassword) {
        // res.status(200).json({ msg: "비밀번호 확인 성공", data: results[0] });
        var sql2 = `select * from jumakzip.reservation r 
                    join jumakzip.room rm on rm.room_id = r.room_id  
                    join jumakzip.room_op op on op.roop_id = rm.roop_id
                    WHERE user_id = '${results[0].user_id}'and end_date >= '${now}' `;
        dbconn.query(sql2, (err, reservation) => {
          if (err) {
            console.error(err);
            res.status(500).json({ msg: "오류 발생" });
            return;
          }
          res.render("mypage_detail", {
            title: "",
            data: results[0],
            reservation: reservation[0],
          });
        });
      } else {
        res.status(400).json({ msg: "비밀번호 확인 실패" });
        return;
      }
    });
  });
});
//마이페이지에서 정보 수정 코드
app.post("/mypageedit", async function (req, res) {
  var user = req.cookies.id;
  var isad = req.body.ad;
  var nickname = req.body.nickname;
  var pw = req.body.password;
  try {
    if (pw != "") {
      pw = await password_hash(pw);
    }
    sql = `UPDATE jumakzip.account SET 
    nickname=IF(? = '', nickname, '${nickname}'),isad= '${isad}',password=IF(? = '', password, '${pw}') WHERE username='${user}'`;
    var results = dbconn.query(sql, [nickname, pw]);
    if (results.affectedRows > 0) {
      res.status(201).json({ msg: "회원 정보가 저장되었습니다" });
      return;
    } else {
      res.status(200).json({ msg: "회원 정보를 저장할 내용이 없습니다" });
      return;
    }
  } catch {
    res.status(500);
  }
});
//마이페이지에서 유저 삭제 코드
app.delete("/mypage", function (req, res) {
  var user = req.cookies.id;
  if (user == undefined) {
    res.redirect("/login");
  }
  var sql = `delete from account where username='${user}'`;
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
//예약 리스트 조회
app.get("/reservation/list", function (req, res) {
  var h_cnt = req.query.count;
  var start = req.query.start;
  var end = req.query.end;
  var sql1 = `SELECT name,img,price,h_max,room_id FROM room r join room_op ro on ro.roop_id = r.roop_id 
              WHERE r.room_id NOT IN  (select room_id from reservation
              where st_date >= '${start}' and end_date <= '${end}') and ${h_cnt} <= ro.h_max ;`;
  dbconn.query(sql1, (err, results1) => {
    if (err) {
      res.status(500);
      return;
    }
    var sql2 = `SELECT name,img,price,h_max,room_id FROM room r join room_op ro on ro.roop_id = r.roop_id 
              WHERE r.room_id IN  (select room_id from reservation
              where st_date >= '${start}' and end_date <= '${end}') and ${h_cnt} <= ro.h_max ;`;
    dbconn.query(sql2, (err, results2) => {
      if (err) {
        res.status(500);
        return;
      }
      res.render("reservation", {
        title: "reservation",
        style: "",
        data: results1,
        reservation: results2,        
        start:start,
        end:end,
        count:h_cnt
      });
    });
  });
});
//kakaopay 단건 결제
app.post("/kakaopay", function (req, res) {
  var total = req.body.total;
  var room = req.body.room;
  var h_cnt = req.body.count;
  var bbq = req.body.bbq;
  var animal = req.body.animal;
  var start = req.body.start;
  var end = req.body.end;
  var bbaji = req.body.bbaji;
  var user = req.cookies.id;
  var name = req.body.name;
  var now = new Date().toISOString().substring(0, 10)
  var sql = `INSERT INTO jumakzip.reservation 
            (st_date,end_date,h_cnt,bbq_ck,animal_ck,bbaji_ck,total_price,pay_ck,user_id,room_id,create_date)
            VALUES ('${start}','${end}',${h_cnt},${bbq},${animal},${bbaji},${total},0,
            (select user_id from account where username='${user}'),'${room}','${now}')`
        dbconn.query(sql, (err,results)=>{
          if (err) {
            res.status(500);
            console.error(err)
            return;
          }
        })
  fetch(
    "https://open-api.kakaopay.com/online/v1/payment/ready",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `SECRET_KEY DEV1E308B4362AF928B7B25CA38E5D1E9F7E5E93`,
      },
      body: JSON.stringify({
        cid: "TC0ONETIME",
        partner_order_id: "1234",
        partner_user_id: "jumakzip",
        item_name: name,
        quantity: "1",
        total_amount: total,
        tax_free_amount: "0",
        approval_url: "http://localhost:3000/KakaopayApproval",
        cancel_url: "http://localhost:3000/KakaopayCancel",
        fail_url: "http://localhost:3000/KakaopayFail",
      }),
    }).then(response=>{
      response.json().then(json=>{
          res.status(201).json({ url: json.next_redirect_pc_url });
      })
  }).catch(err=>{
    console.error(err)
  })
})
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
