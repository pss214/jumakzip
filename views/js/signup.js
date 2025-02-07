let msgiderr = document.getElementById("iderr") // "iderr" 라는 div를 불러옴
let msgpwerr = document.getElementById("pwerr") 
let msgpwckerr = document.getElementById("pwckerr") 
let msgnicknameerr = document.getElementById("nicknameerr") 
let msginforerr = document.getElementById("inforerr") 
let msgphoneerr = document.getElementById("phoneerr")
let msgidckerr = document.getElementById("idckerr")
msgpwerr.style.display= 'none'
msgiderr.style.display= 'none'
msgpwckerr.style.display= 'none'
msgnicknameerr.style.display='none'
msginforerr.style.display='none'
msgphoneerr.style.display='none'
msgidckerr.style.display='none'
let id_ck = false
function idck() {
    let elinputUsername = document.getElementById("id");
    if(idlength(elinputUsername.value)){
        msgiderr.style.display= 'none'
        fetch("/idck",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                "id":elinputUsername.value
            })
        }).then(res=>{
            res.json().then(json=>{
                if(res.status==200){
                    if(json.data==null){
                        id_ck=true
                        msgidckerr.style.display='none'
                    }else{
                        msgidckerr.style.display='block'
                    }
                    alert(json.msg)
                }else{
                    alert("오류가 발생되었습니다!")
                }
            })
        })
    }else{
        msgiderr.style.display= 'block'  //block : 띄우게한다.
        isck = false
    }
    
}
function ok(){ //  ok가 클릭됐을때 실행됨
    let elinputUsername = document.getElementById("id");  
    let elinputPassword = document.getElementById("pw"); 
    let elinputPasswordck = document.getElementById("pwck");  // pwck : (비밀번호 확인) 에 값을 가져온다.
    let elinputnickname = document.getElementById("nickname"); //닉네임에 값을 가져온다.
    let elinphonenum2 = document.getElementById("num2")
    let elinphonenum3 = document.getElementById("num3")
    let adck = document.getElementById("ad")
    let ad = "0"
    let phone = ""
    let isck = true
    //id 입력이 잘못된 경우
    if(idlength(elinputUsername.value)){
        msgiderr.style.display= 'none'
    }else{
        msgiderr.style.display= 'block'  //block : 띄우게한다.
        isck = false
    }
    if(Pw(elinputPassword.value)){
        msgpwerr.style.display='none'
    }
    else{
        msgpwerr.style.display='block'
        isck = false
    }
    if(pwck(elinputPasswordck.value,elinputPassword.value)){
        msgpwckerr.style.display= 'none'
    }
    else{
        msgpwckerr.style.display= 'block'
        isck = false
    }
    if(nickname(elinputnickname.value)){
        msgnicknameerr.style.display='none'
    }
    else{
        msgnicknameerr.style.display='block'
        isck = false    
    }
    if(document.getElementById("im").checked){
        msginforerr.style.display='none'
    }
    else{
        msginforerr.style.display='block'
        isck = false
    }
    if(elinphonenum2.value.length==4 && elinphonenum3.value.length ==4){
        msgphoneerr.style.display='none'
    }else{
        msgphoneerr.style.display='block'
        isck = false
    }
    if(id_ck){
        msgphoneerr.style.display='none'
    }else{
        msgphoneerr.style.display='block'
        isck = false
    }
    phone = document.getElementById("num1").value+"-"+elinphonenum2.value+"-"+elinphonenum3.value
    if(adck){
        ad="1"
    }else{
        ad="0"
    }
    if(isck){
        fetch("/signup",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({
                "id":elinputUsername.value,
                "pw":elinputPassword.value,
                "nickname":elinputnickname.value,
                "phone":phone,
                "ad":ad
            })
        }).then(res=>{
            res.json().then(json=>{
                if(res.status==201){
                    alert(json.msg)
                    location.replace("/signin")
                }else{
                    alert(json.msg, "다시 입력해주세요")
                }
            })
        })
    }
    
}
function idlength (value){  //value.length 문자열 또는 배열의 길이를 반환하는 속성성
    return value.length >=4 && value.length <=12 && /^[A-Za-z0-9][A-Za-z0-9]*$/.test(value)

     //onlynumberandEnglish =
        // 문자열이 영문 대소문자[A-Z, a-z]와 숫자[0-9]로만 이루어져 있는지를 검사하는 함수
     
        // 영어또는 숫자가 들어간 경우 , true 아닌경우 false 값을 리턴한다.
        // test() : 문자열에 일치하는 부분이 있는지 확인한다.

}
function Pw(value){  //function : 함수를 선언하는 키워드
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
    //? value에 문자열(정규식) , .: 문자열의 시작 , ＊:문자열의 끝 , |d : 숫자 정수 , (?=.*[@$!%*#?&]) : 시작부터 끝까지 특수문자 포함 () : 하나이상
//8, : 8글자 이상   ->  최소 8글자 이상이면서, 알파벳과 숫자 및 특수문자(@$!%*#?&)가 하나 이상 포함될 경우 true, 아니면 false를 리턴한다.
}
function pwck(pw,pwck){  // === : 값이 같고 문자열
    return pw === pwck   // 비밀번호와 비밀번호 확인이 일치할 경우 true, 아니면 false를 리턴한다.   
}
function nickname(value){
    return value.length <=10 
}