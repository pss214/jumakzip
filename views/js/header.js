const submitButton = document.querySelector(".submitButton");
const logOnTags = document.querySelector("#log_on");
const logOffTags = document.querySelector("#log_off");
const searchButton = document.querySelector(".search > button");
const startDay = document.querySelector("#startDay");
const endDay = document.querySelector("#endDay");
const today = new Date();
const defaultStartDay = new Date().toISOString().substring(0, 10);
const defaultEndDay = new Date(today.setDate(today.getDate() + 1))
  .toISOString()
  .substring(0, 10);

startDay.value = defaultStartDay;
endDay.value = defaultEndDay;

function getCookie(cookiename) {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookiename + "=")) {
      return cookie.substring(cookiename.length + 1);
    }
  }
  return null;
}
let session = getCookie("id");
if (session != null) {
  logOnTags.style.display = "flex";
  logOffTags.style.display = "none";
  submitButton.setAttribute("type", "submit");
} else {
  logOnTags.style.display = "none";
  logOffTags.style.display = "flex";
  submitButton.setAttribute("type", "button");
}
function logout() {
  if (confirm("로그아웃하시겠습니까?")) {
    location.replace("/logout");
  }
}
submitButton.addEventListener("click", () => {
  if (session == null) {
    alert("로그인 시 이용 가능합니다.");
  }
});
