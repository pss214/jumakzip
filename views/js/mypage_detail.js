

function edit() {
    let asd = "zzz"
    asd.length
    let isck = false
    let newnickname = document.getElementById("nickname")
    let newpassword = document.getElementById("password")
    let newpasswordck = document.getElementById("passwordck")
    let newisad = document.getElementById("isad").checked
    if(newnickname.value.length == 0 && newpassword.value.length == 0){
        
    }else{
        
    }
}
function ckedit(pw1, pw2) {
    if (pw1 == 0 && pw == 0) {
        return false
    }
    return pw1.value === pw2.value
}

function del() {
    if(confirm("정말로 탈퇴하시겠습니까?")){
        fetch("/mypage",{
            method: "delete",
            headers: { "Content-Type": "application/json" }
        }).then(res=>{
            if(res.status==200){
                alert("탈퇴가 완료되었습니다!")
                location.replace("/logout")
            }else{
                alert("문제가 발생되었습니다! 다시 시도해주세요!")
                location.replace("/")
            }
        })
    }
}