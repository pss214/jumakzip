function ok() {
  let elinputitem = document.getElementById("id").value;
  let dlinputpw = document.getElementById("pw").value;
  idlength(elinputitem);
  console.log(idlength(elinputitem));
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
  })
}
function idlength(value) {
  return value.length > 0;
}

function idlength(value) {
  return value.length > 0;
}
