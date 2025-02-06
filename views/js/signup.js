let msgiderr = document.getElementById("iderr") // "iderr" 라는 div를 불러옴
let msgpwerr = document.getElementById("pwerr") 
let msgpwckerr = document.getElementById("pwckerr") 
let msgnicknameerr = document.getElementById("nicknameerr") 
let msginforerr = document.getElementById("inforerr") 
msgpwerr.style.display= 'none'
msgiderr.style.display= 'none'
msgpwckerr.style.display= 'none'
msgnicknameerr.style.display='none'
msginforerr.style.display='none'
function ok(){ //  ok가 클릭됐을때 실행됨
    let elinputUsername = document.getElementById("id").value;  
    let elinputPassword = document.getElementById("pw").value; 
    let elinputPasswordck = document.getElementById("pwck").value;  // pwck : (비밀번호 확인) 에 값을 가져온다.
    let elinputnickname = document.getElementById("nickname").value; //닉네임에 값을 가져온다.
    //id 입력이 잘못된 경우
    if(idlength(elinputUsername)){
        msgiderr.style.display= 'none'
    }else{
        msgiderr.style.display= 'block'  //block : 띄우게한다.
    }
    if(Pw(elinputPassword)){
        msgpwerr.style.display='none'
    }
    else{
        msgpwerr.style.display='block'
    }
    if(pwck(elinputPasswordck,elinputPassword)){
        msgpwckerr.style.display= 'none'
    }
    else{
        msgpwckerr.style.display= 'block'
    }
    if(nickname(elinputnickname)){
        msgnicknameerr.style.display='none'
    }
    else{
        msgnicknameerr.style.display='block'    
    }
    if(document.getElementById("im").checked){
        msginforerr.style.display='none'

    }
    else{
        msginforerr.style.display='block'
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
