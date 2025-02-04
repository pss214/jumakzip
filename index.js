// 공통 부분 레이아웃 공유 라이브러리
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const fs = require("fs");
const http = require("http");

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
