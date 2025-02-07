let data = null;

function checkPassword() {
  let checkPasswordAtMy = document.querySelector(".checkPassword #pw");
  if (checkPasswordAtMy.value.length > 0) {
    fetch("/pwck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pw: checkPasswordAtMy.value,
      }),
    }).then((res) => {
      res.json().then((json) => {
        if (res.status == 200) {
          if (json.data != null) {
            data = json.data;
          } else {
          }
        } else {
          alert("오류가 발생되었습니다!");
        }
      });
    });
  } else {
    //비밀번호를 입력하지 않은 경우
    msgiderr.style.display = "block"; //block : 띄우게한다.
  }
}
