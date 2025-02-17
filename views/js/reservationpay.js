function pay(price) {
    try{
        fetch("http://open-api.kakaopay.com/online/v1/payment/ready",{
            method:"POST",
            headers: { "Content-Type": "application/json", "Authorization": `SECRET_KEY DEV1E308B4362AF928B7B25CA38E5D1E9F7E5E93` },
            body: JSON.stringify({
                  cid:"TC0ONETIME",
                  partner_order_id:"1234",
                  partner_user_id : "jumakzip",
                  item_name : "105호",
                  quantity : "1",
                  total_amount : price,
                  tax_free_amount : "0",
                  approval_url : "http://localhost:3000/",
                  cancel_url : "http://localhost:3000/",
                  fail_url : "http://localhost:3000/"
              })
            }).then(response=>{
              console.log(response)
              response.json(json=>{
                    
                })
                if(response.status>= 400){
                  res.status(response.status).json({data : response.body})
                  return
              }
              res.status(response.status).json({data : response.body})
            })
    }catch{

    }
}