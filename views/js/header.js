let logon = document.getElementById("log_on");
let profile = document.getElementById("profile");
let logoff = document.getElementById("log_off");
let p_on = document.getElementById("p_logon");
let p_off = document.getElementById("p_logoff");
const searchButton = document.querySelector(".search > button");
const today = new Date();
const todayIso = new Date().toISOString().substring(0, 10);
const tomorrowIso = new Date(today.setDate(today.getDate() + 1))
  .toISOString()
  .substring(0, 10);

document.querySelector("#startDay").value = todayIso;
document.querySelector("#endDay").value = tomorrowIso;
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
  logon.className = "log_on";
  p_logon.innerHTML = "로그아웃";
  p_logon.className = "on";
  p_logoff.innerHTML = "";
  p_logoff.className = "off";
  profile.className = "login_profile";
  logoff.className = "log_off";
} else {
  logon.className = "log_off";
  p_logoff.innerHTML = "로그인";
  p_logon.className = "off";
  p_on.innerHTML = "";
  p_logoff.className = "on";
  profile.className = "logout_profile";
  logoff.className = "log_on";
}
function logout() {
  if (confirm("로그아웃하시겠습니까?")) {
    location.replace("/logout");
  }
}
