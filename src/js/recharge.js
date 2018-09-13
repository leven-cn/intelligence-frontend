// 情报交易
function recharge(fee){
    var token = localStorage.getItem("wxAuthToken");
    if(token == null){
      return;
    }
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("POST", "/wx/pay/?payment=wx", true);
    xmlhttp.setRequestHeader("Authorization", token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4){
        if(xmlhttp.status == 200){
          var data = JSON.parse(xmlhttp.responseText);
          if(data.code != 0){
            alert(data.msg);
          }else{
            console.log(data.params)
            // 微信支付弹框
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                data.params,
                function(res){
                if(res.err_msg == "get_brand_wcpay_request：ok"){
                    alert('支付成功，等待处理');
                }
                }
            );
          }
        }else if(xmlhttp.status == 401){
          _wxlogin();
        }
      }
    }
    xmlhttp.send(JSON.stringify({
      "fee":fee
    }));
  
  }

  var rechargeList = document.querySelector("ul").querySelectorAll("li");

  function testWxPay(){
    for(var i=0;i<rechargeList.length;i++){
      rechargeList[i].onclick = function(){
          console.log(this.innerHTML);
          var fee =parseInt(this.innerHTML);
          console.log(typeof fee);
          recharge(fee);
      }
    }
  }

  wxlogin(testWxPay);