var isck = false
idck()
function ok() {
  let elinputitem = document.getElementById("id").value;
  let dlinputpw = document.getElementById("pw").value;
  if(isck){
    fetch("/signin",{
      method:"POST",
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
    }).catch(err=>{
    })
  }
}

function idck() {
  let elinputitem = document.getElementById("id").value;
  let dlinputpw = document.getElementById("pw").value;
  let submit = document.getElementById("submit")

  if (elinputitem.length > 0 && dlinputpw.length > 0) {
    isck = true
    submit.className="input_id submiton"
  }else{
    isck = true
    submit.className="input_id submitoff"
  }
}
function enter(event) {
  if(event.key=="Enter"){
    ok()
  }
}