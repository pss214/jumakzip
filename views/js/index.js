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

const amenitysSubHeading = document.querySelector(".amenitys .subHeading");
const amenitysSubHeadingY = amenitysSubHeading.getBoundingClientRect().y;

const amenitys1 = document.querySelector(".amenitys1");
const amenitys1Y = amenitys1.getBoundingClientRect().y;
const amenitys2 = document.querySelector(".amenitys2");
const amenitys3 = document.querySelector(".amenitys3");
const amenitys3Y = amenitys3.getBoundingClientRect().y;
const amenitys4 = document.querySelector(".amenitys4");
const amenitys5 = document.querySelector(".amenitys5");
const amenitys5Y = amenitys5.getBoundingClientRect().y;
const amenitys6 = document.querySelector(".amenitys6");

const touristSpotsSubHeading = document.querySelector(
  ".touristSpots .subHeading"
);
const touristSpotsSubHeadingY =
  touristSpotsSubHeading.getBoundingClientRect().y;

const touristSpot1 = document.querySelector(".touristSpot1");
const touristSpot1Y = touristSpot1.getBoundingClientRect().y;
const touristSpot2 = document.querySelector(".touristSpot2");
const touristSpot3 = document.querySelector(".touristSpot3");
const touristSpot3Y = touristSpot3.getBoundingClientRect().y;
const touristSpot4 = document.querySelector(".touristSpot4");

const wayToComeSubHeading = document.querySelector(".wayToCome .subHeading");
const wayToComeSubHeadingY = wayToComeSubHeading.getBoundingClientRect().y;

const wayToComeMap = document.querySelector(".wayToCome .map #map");
const wayToComeMapY = wayToComeMap.getBoundingClientRect().y;
const wayToComeLocation = document.querySelector(".wayToCome .map p");
const wayToComeLocationY = wayToComeLocation.getBoundingClientRect().y;

let lastScrollY = 0;

//렌더링시 상단으로 이동
window.addEventListener("load", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
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
    mainVideoDiv.style.margin = "200px auto 50px auto";
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

  lastScrollY = scroll;

  // 펜션 정보 애니메이션
  if (room1ImgY < scroll + screenHeight) {
    room1Img.style.opacity = "1";
    room1Img.style.transform = "translateY(0%)";
    room1Text.style.opacity = "1";
    room1Text.style.transform = "translateY(0%)";
  } else {
    room1Img.style.opacity = "0";
    room1Img.style.transform = "translateY(15%)";
    room1Text.style.opacity = "0";
    room1Text.style.transform = "translateY(15%)";
  }
  if (room2ImgY < scroll + screenHeight) {
    room2Img.style.opacity = "1";
    room2Img.style.transform = "translateY(0%)";
    room2Text.style.opacity = "1";
    room2Text.style.transform = "translateY(0%)";
  } else {
    room2Img.style.opacity = "0";
    room2Img.style.transform = "translateY(15%)";
    room2Text.style.opacity = "0";
    room2Text.style.transform = "translateY(15%)";
  }

  // 펜션 시설 애니메이션
  if (amenitysSubHeadingY < scroll + screenHeight) {
    amenitysSubHeading.style.opacity = "1";
    amenitysSubHeading.style.transform = "translateY(0%)";
  } else {
    amenitysSubHeading.style.opacity = "0";
    amenitysSubHeading.style.transform = "translateY(15%)";
  }

  if (amenitys1Y < scroll + screenHeight) {
    amenitys1.style.opacity = "1";
    amenitys1.style.transform = "translateY(0%)";
    amenitys2.style.opacity = "1";
    amenitys2.style.transform = "translateY(0%)";
  } else {
    amenitys1.style.opacity = "0";
    amenitys1.style.transform = "translateY(15%)";
    amenitys2.style.opacity = "0";
    amenitys2.style.transform = "translateY(15%)";
  }

  if (amenitys3Y < scroll + screenHeight) {
    amenitys3.style.opacity = "1";
    amenitys3.style.transform = "translateY(0%)";
    amenitys4.style.opacity = "1";
    amenitys4.style.transform = "translateY(0%)";
  } else {
    amenitys3.style.opacity = "0";
    amenitys3.style.transform = "translateY(15%)";
    amenitys4.style.opacity = "0";
    amenitys4.style.transform = "translateY(15%)";
  }

  if (amenitys5Y < scroll + screenHeight) {
    amenitys5.style.opacity = "1";
    amenitys5.style.transform = "translateY(0%)";
    amenitys6.style.opacity = "1";
    amenitys6.style.transform = "translateY(0%)";
  } else {
    amenitys5.style.opacity = "0";
    amenitys5.style.transform = "translateY(15%)";
    amenitys6.style.opacity = "0";
    amenitys6.style.transform = "translateY(15%)";
  }

  //부대 시설 애니메이션
  if (touristSpotsSubHeadingY < scroll + screenHeight) {
    touristSpotsSubHeading.style.opacity = "1";
    touristSpotsSubHeading.style.transform = "translateY(0%)";
  } else {
    touristSpotsSubHeading.style.opacity = "0";
    touristSpotsSubHeading.style.transform = "translateY(15%)";
  }

  if (touristSpot1Y < scroll + screenHeight) {
    touristSpot1.style.opacity = "1";
    touristSpot1.style.transform = "translateY(0%)";
    touristSpot2.style.opacity = "1";
    touristSpot2.style.transform = "translateY(0%)";
  } else {
    touristSpot1.style.opacity = "0";
    touristSpot1.style.transform = "translateY(15%)";
    touristSpot2.style.opacity = "0";
    touristSpot2.style.transform = "translateY(15%)";
  }

  if (touristSpot3Y < scroll + screenHeight) {
    touristSpot3.style.opacity = "1";
    touristSpot3.style.transform = "translateY(0%)";
    touristSpot4.style.opacity = "1";
    touristSpot4.style.transform = "translateY(0%)";
  } else {
    touristSpot3.style.opacity = "0";
    touristSpot3.style.transform = "translateY(15%)";
    touristSpot4.style.opacity = "0";
    touristSpot4.style.transform = "translateY(15%)";
  }

  //오시는 길 애니메이션
  if (wayToComeSubHeadingY < scroll + screenHeight) {
    wayToComeSubHeading.style.opacity = "1";
    wayToComeSubHeading.style.transform = "translateY(0%)";
  } else {
    wayToComeSubHeading.style.opacity = "0";
    wayToComeSubHeading.style.transform = "translateY(15%)";
  }

  if (wayToComeMapY < scroll + screenHeight) {
    wayToComeMap.style.opacity = "1";
    wayToComeMap.style.transform = "translateY(0%)";
    wayToComeLocation.style.opacity = "1";
    wayToComeLocation.style.transform = "translateY(0%)";
  } else {
    wayToComeMap.style.opacity = "0";
    wayToComeMap.style.transform = "translateY(15%)";
    wayToComeLocation.style.opacity = "0";
    wayToComeLocation.style.transform = "translateY(15%)";
  }
});
//네이버 지도 api 호출
let mapOptions = {
  center: new naver.maps.LatLng(37.207713, 127.034744),
  zoom: 10,
};

let map = new naver.maps.Map("map", mapOptions);

let marker = new naver.maps.Marker({
  position: new naver.maps.LatLng(37.207713, 127.034744),
  map: map,
});
