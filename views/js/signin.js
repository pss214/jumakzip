var isck = false;
idck();
function ok() {
  let elinputitem = document.getElementById("id").value;
  let dlinputpw = document.getElementById("pw").value;
  if (isck) {
    fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({
        "id":elinputitem,
        "pw":dlinputpw
    })
    }).then(res=>{
      if(res.status==200){
        location.replace("/")
      }else{
        alert("아이디와 비밀번호를 다시 확인해주세요")
      }
    })
      .then((res) => {
        if (res.status == 200) {
          location.replace("/");
        } else {
          alert("아이디와 비밀번호를 다시 확인해주세요");
        }
      })
      .catch((err) => {});
  }
}

function idck() {
  let elinputitem = document.getElementById("id").value;
  let dlinputpw = document.getElementById("pw").value;
  let submit = document.getElementById("submit");

  if (elinputitem.length > 0 && dlinputpw.length > 0) {
    isck = true;
    submit.className = "input_id submiton";
    // 성수형 여기에서 지금 로그인하기 버튼에 클래스 "input_id" 이거 넣은거 때문에
    // CSS가 이상하게 먹히는데, 이거 꼭 있어야 되는거에요?
    // submit인데 input_id가 들어가는게 좀 이상함요
  } else {
    isck = false;
    submit.className = "input_id submitoff";
  }
}
function enter(event) {
  if (event.key == "Enter") {
    ok();
  }
}
