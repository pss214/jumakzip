const menus = document.querySelectorAll(".menu");
const detailMenu = document.querySelector(".detailMenuBackground");

detailMenu.addEventListener("mouseover", () => {
  detailMenu.style.display = "flex";
});
detailMenu.addEventListener("mouseout", () => {
  detailMenu.style.display = "none";
});
menus.forEach((menu) => {
  menu.addEventListener("mouseover", () => {
    detailMenu.style.display = "flex";
  });
  menu.addEventListener("mouseout", () => {
    detailMenu.style.display = "none";
  });
});
