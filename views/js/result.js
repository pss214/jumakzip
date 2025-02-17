let msgpwerr = document.getElementById("pwerr");
let msgpwckerr = document.getElementById("pwckerr");
msgpwerr.style.display = "none";
msgpwckerr.style.display = "none";
function ok(id) {
  let elinputPassword = document.getElementById("pw");
  let elinputPasswordck = document.getElementById("pwck");
  let isck = true;

  if (Pw(elinputPassword.value)) {
    msgpwerr.style.display = "none";
  } else {
    msgpwerr.style.display = "block";
    isck = false;
  }
  if (pwck(elinputPasswordck.value, elinputPassword.value)) {
    msgpwckerr.style.display = "none";
  } else {
    msgpwckerr.style.display = "block";
    isck = false;
  }
  if (isck) {
    fetch("/newpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id : id,
        pw: elinputPassword.value
      }),
    }).then((res) => {
      res.json().then((json) => {
        if (res.status == 201 || res.status == 200) {
          alert(json.msg);
          location.replace("/signin");
        } else {
          alert(json.msg, "다시 입력해주세요");
        }
      });
    });
  }
}

function Pw(value) {
  //function : 함수를 선언하는 키워드
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    value
  );
  //? value에 문자열(정규식) , .: 문자열의 시작 , ＊:문자열의 끝 , |d : 숫자 정수 , (?=.*[@$!%*#?&]) : 시작부터 끝까지 특수문자 포함 () : 하나이상
  //8, : 8글자 이상   ->  최소 8글자 이상이면서, 알파벳과 숫자 및 특수문자(@$!%*#?&)가 하나 이상 포함될 경우 true, 아니면 false를 리턴한다.
}

function pwck(pw, pwck) {
  // === : 값이 같고 문자열
  return pw === pwck; // 비밀번호와 비밀번호 확인이 일치할 경우 true, 아니면 false를 리턴한다.
}