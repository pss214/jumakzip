const tagsOnVideo = document.querySelector(".tagsOnVideo");
const mainVideoDiv = document.querySelector(".mainVideoDiv");
const videoWrap = document.querySelector(".videoWrap");
const mainVideo = document.querySelector(".videoWrap > video");
const mainDiv = document.querySelector(".mainDiv");
const screenHeight = screen.height;

const room1Img = document.querySelector(".room1Img");
const room1ImgY = room1Img.getBoundingClientRect().y;
const room1Text = document.querySelector(".room1Text");

const room2Img = document.querySelector(".room2Img");
const room2ImgY = room2Img.getBoundingClientRect().y;
const room2Text = document.querySelector(".room2Text");

let lastScrollY = 0;

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  if (scroll > lastScrollY && scroll < 100) {
    mainVideoDiv.style.width = "1400px";
    mainVideoDiv.style.position = "static";
    mainVideo.style.height = "auto";
    mainVideo.style.transform = "translateY(-50%)";
    mainVideoDiv.style.margin = "200px auto 0 auto";
    videoWrap.style.height = "380px";
    videoWrap.style.position = "relative";
    tagsOnVideo.style.opacity = "0";
    mainDiv.style.opacity = "1";
    mainDiv.style.margin = "-600px auto 0 auto";
  }
  if (scroll <= lastScrollY && scroll < 100) {
    window.scrollTo(0, 0);
    mainVideo.style.height = "100%";
    mainVideo.style.transform = "translateY(0%)";
    mainVideoDiv.style.margin = "auto";
    mainVideoDiv.style.width = "100%";
    mainVideoDiv.style.position = "relative";
    videoWrap.style.height = "auto";
    videoWrap.style.position = "static";
    tagsOnVideo.style.opacity = "1";
    mainDiv.style.opacity = "0";
    mainDiv.style.margin = "0 auto";
  }
  if (room1ImgY < scroll + screenHeight) {
    room1Img.style.opacity = "1";
    room1Img.style.transform = "translateY(0%)";
    room1Text.style.opacity = "1";
    room1Text.style.transform = "translateY(0%)";
  } else {
    room1Img.style.opacity = "0";
    room1Img.style.transform = "translateY(30%)";
    room1Text.style.opacity = "0";
    room1Text.style.transform = "translateY(30%)";
  }
  if (room2ImgY < scroll + screenHeight) {
    room2Img.style.opacity = "1";
    room2Img.style.transform = "translateY(0%)";
    room2Text.style.opacity = "1";
    room2Text.style.transform = "translateY(0%)";
  } else {
    room2Img.style.opacity = "0";
    room2Img.style.transform = "translateY(30%)";
    room2Text.style.opacity = "0";
    room2Text.style.transform = "translateY(30%)";
  }
  // 스크롤 올림 내림 확인
  lastScrollY = scroll;
});
