const sidebarNavis = document.querySelectorAll(".sidebar > ul li");
const bulletinBoards = document.querySelectorAll(".contentArea .bulletinBoard");
sidebarNavis.forEach((sidebarNavi, index) => {
  let moveLocs = 0;
  for (i = 1; i <= index; i++) {
    moveLocs += bulletinBoards[index].getBoundingClientRect().height + 50;
  }
  sidebarNavi.addEventListener("click", (e) => {
    window.scroll({
      top: moveLocs,
      left: 0,
      behavior: "smooth",
    });
  });
});
