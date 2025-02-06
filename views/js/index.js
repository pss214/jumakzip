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

const amenitysTitle = document.querySelector(".amenitys h3");
const amenitysTitleY = amenitysTitle.getBoundingClientRect().y;

const amenitys1 = document.querySelector(".amenitys1");
const amenitys1Y = amenitys1.getBoundingClientRect().y;
const amenitys2 = document.querySelector(".amenitys2");
const amenitys3 = document.querySelector(".amenitys3");
const amenitys3Y = amenitys3.getBoundingClientRect().y;
const amenitys4 = document.querySelector(".amenitys4");
const amenitys5 = document.querySelector(".amenitys5");
const amenitys5Y = amenitys5.getBoundingClientRect().y;
const amenitys6 = document.querySelector(".amenitys6");

let lastScrollY = 0;

window.addEventListener("load", () => {
  window.scroll({
    //윈도우의 어디로 가주세요
    top: 0, // y축 px
    left: 0, // x축 px
    behavior: "smooth", // auto, smooth
  });
});

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;

  // 동영상 애니메이션
  if (scroll > lastScrollY && scroll < 50) {
    window.scroll({
      top: 50,
      left: 0,
    });

    mainVideoDiv.style.width = "1400px";
    mainVideoDiv.style.position = "static";
    mainVideo.style.height = "auto";
    mainVideo.style.transform = "translateY(-50%)";
    mainVideoDiv.style.margin = "300px auto 0 auto";
    videoWrap.style.height = "380px";
    videoWrap.style.position = "relative";
    tagsOnVideo.style.opacity = "0";
    tagsOnVideo.style.position = "static";
    mainDiv.style.opacity = "1";
    mainDiv.style.margin = "-600px auto 0 auto";
  }
  if (scroll <= lastScrollY && scroll < 50) {
    window.scroll({
      top: 0,
      left: 0,
    });
    mainVideo.style.height = "100%";
    mainVideo.style.transform = "translateY(0%)";
    mainVideoDiv.style.margin = "auto";
    mainVideoDiv.style.width = "100%";
    mainVideoDiv.style.position = "relative";
    videoWrap.style.height = "auto";
    videoWrap.style.position = "static";
    tagsOnVideo.style.opacity = "1";
    tagsOnVideo.style.position = "absolute";
    mainDiv.style.opacity = "0";
    mainDiv.style.margin = "0 auto";
  }

  // 펜션 정보 애니메이션
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

  // 펜션 시설 애니메이션
  if (amenitysTitleY < scroll + screenHeight) {
    amenitysTitle.style.opacity = "1";
    amenitysTitle.style.transform = "transitionY(0%)";
  } else {
    amenitysTitle.style.opacity = "0";
    amenitysTitle.style.transform = "translateY(30%)";
  }

  if (amenitys1Y < scroll + screenHeight) {
    amenitys1.style.opacity = "1";
    amenitys1.style.transform = "translateY(0%)";
    amenitys2.style.opacity = "1";
    amenitys2.style.transform = "translateY(0%)";
  } else {
    amenitys1.style.opacity = "0";
    amenitys1.style.transform = "translateY(30%)";
    amenitys2.style.opacity = "0";
    amenitys2.style.transform = "translateY(30%)";
  }

  if (amenitys3Y < scroll + screenHeight) {
    amenitys3.style.opacity = "1";
    amenitys3.style.transform = "translateY(0%)";
    amenitys4.style.opacity = "1";
    amenitys4.style.transform = "translateY(0%)";
  } else {
    amenitys3.style.opacity = "0";
    amenitys3.style.transform = "translateY(30%)";
    amenitys4.style.opacity = "0";
    amenitys4.style.transform = "translateY(30%)";
  }

  if (amenitys5Y < scroll + screenHeight) {
    amenitys5.style.opacity = "1";
    amenitys5.style.transform = "translateY(0%)";
    amenitys6.style.opacity = "1";
    amenitys6.style.transform = "translateY(0%)";
  } else {
    amenitys5.style.opacity = "0";
    amenitys5.style.transform = "translateY(30%)";
    amenitys6.style.opacity = "0";
    amenitys6.style.transform = "translateY(30%)";
  }

  lastScrollY = scroll;
});
