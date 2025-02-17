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

if(session == null){
  if(confirm("로그인이 필요한 서비스입니다! 로그인 하시겠습니까?")){
      location.replace("/signin")
  }else{
    location.replace("/")
  }
}