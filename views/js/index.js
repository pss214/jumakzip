const tagsOnVideo = document.querySelector(".tagsOnVideo");
const mainVideoDiv = document.querySelector(".mainVideoDiv");
const videoWrap = document.querySelector(".videoWrap");
const mainVideo = document.querySelector(".videoWrap > video");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 0) {
    window.scrollY = 100;
    mainVideoDiv.style.width = "1400px";
    mainVideoDiv.style.position = "static";
    mainVideoDiv.style.margin = "250px auto";
    videoWrap.style.width = "100%";
    videoWrap.style.height = "380px";
    videoWrap.style.position = "relative";
    mainVideo.style.height = "auto";
    mainVideo.style.transform = "translateY(-50%) scale(0.8)";
    tagsOnVideo.style.opacity = "0";
  } else if (scroll <= 0) {
    mainVideoDiv.style.width = "100%";
    mainVideoDiv.style.position = "relative";
    mainVideoDiv.style.margin = "auto";
    videoWrap.style.width = "auto";
    videoWrap.style.height = "auto";
    videoWrap.style.position = "static";
    mainVideo.style.height = "100%";
    mainVideo.style.transform = "translateY(0%) scale(1)";
    tagsOnVideo.style.opacity = "1";
  }
});
