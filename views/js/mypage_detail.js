async function edit(isad) {
    let ad = (isad=='1')? true : false
    let newnickname = document.getElementById("nickname").value
    let newpassword = document.getElementById("password").value
    let newpasswordck = document.getElementById("passwordck").value
    let newisad = document.getElementById("isad").checked

    //변경이 없을 경우
    if(newnickname.length == 0 && newpassword.length == 0 && (ad == newisad)){
        alert("수정이 완료되었습니다!")
        location.replace("/")
        return
    }
    //비번에서 유효성이 안맞거나 ck가 잘못된 경우
    if(ckedit(newpassword,newpasswordck) == false){
        alert("비밀번호가 맞지 않거나 유효하지 않습니다! 다시 입력해주세요.")
        return
    }
    //비밀번호와 광고동의, 닉네임을 썼을 경우
    try{
        var res = await fetch("/mypageedit",{
                    method:"POST",
                    headers:{ "Content-Type": "application/json" },
                    body:JSON.stringify({
                        ad: (newisad) ? 1 : 0,
                        password : newpassword,
                        nickname : newnickname
                    })
                })
        if(res.status == 200 || res.status == 201){
            alert("수정이 완료되었습니다!")
            location.replace("/mypage")
        }
    }catch{
        alert("오류가 발생되었습니다! 다시 시도해주세요!")
    }
}
function ckedit(pw1, pw2) {
    if (pw1 == 0 && pw2 == 0) {
        return true
    }
    return pw1 == pw2
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