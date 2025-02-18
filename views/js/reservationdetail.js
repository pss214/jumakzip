var bbqli = document.getElementById("bbqli")
var animalli = document.getElementById("animalli")
var bbajili = document.getElementById("bbajili")
var spanbbq = document.createElement("span")
var spananimal = document.createElement("span")
var spanbbaji = document.createElement("span")
spanbbq.setAttribute("class","PaymentHistory0")
spananimal.setAttribute("class","PaymentHistory0")
spanbbaji.setAttribute("class","PaymentHistory0")
bbqli.append(spanbbq)
animalli.append(spananimal)
bbajili.append(spanbbaji)
var total = 0
var url = new URL(window.location.href).searchParams
var price = url.get("price")
var count = url.get("count")
var room = url.get("room")
var roomname = url.get("name")
var start = new Date(url.get("start"))
var end = new Date(url.get("end"))
var totalid = document.getElementById("total")
var totalH2 = document.createElement("h2")
totalH2.innerHTML= `${price}원`
totalid.append(totalH2)

function getpayment(room,count,start,end) {
  
}
function ckbbq(cnt) {
  var bbq = document.getElementById("bbq").checked
  if(bbq){
    bbqli.style.display = 'block'
    spanbbq.innerText=`바베큐 이용 금액 10000 * ${cnt} = ${10000*cnt}원`
  }else{
    bbqli.style.display = 'none'
    spanbbq.innerText=``
  }
  total_price()
}
function ckanimal() {
  var animal = document.getElementById("animal").checked
  if(animal){
    animalli.style.display = 'block'
    spananimal.innerText=`동물 놀이터 이용 금액 50000원`
  }else{
    animalli.style.display = 'none'
    spananimal.innerText=``
  }
  total_price()
}
function ckbbaji(cnt) {
  var bbaji = document.getElementById("bbaji").checked
  if(bbaji){
    bbajili.style.display = 'block'
    spanbbaji.innerText=`빠지 이용 금액 50000 * ${cnt} = ${50000*cnt}원`
  }else{
    bbajili.style.display = 'none'
    spanbbaji.innerText=``
  }
  total_price()
}
function total_price(){
  var bbq = document.getElementById("bbq").checked? 1:0
  var animal = document.getElementById("animal").checked ? 1:0
  var bbaji = document.getElementById("bbaji").checked? 1:0
  total = price * count + (bbq*10000*count) + (animal*50000)+(bbaji*count*50000)
  totalH2.innerHTML= `${total}원`
}

function getpayment(){
  var bbq = document.getElementById("bbq").checked? 1:0
  var animal = document.getElementById("animal").checked ? 1:0
  var bbaji = document.getElementById("bbaji").checked? 1:0
    fetch("/kakaopay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        total: total,
        room:room,
        count:count,
        bbq: bbq,
        animal:animal,
        bbaji:bbaji,
        start: start.toISOString().substring(0, 10),
        end: end.toISOString().substring(0, 10),
        name:roomname
      }),
    }).then(res=>{
      res.json().then(json=>{
        if (res.status == 200 || res.status == 201) {
          location.replace(json.url);
        }
      })
    })
    
}
