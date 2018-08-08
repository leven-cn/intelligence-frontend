/**
 * WeChat Pay
 */

var _wxpayList = document.getElementsByClassName("wxpay");
var _wxpayDetails = null;
function wxpay(_d){
  _wxpayDetails = _d
}
for(var i=0; i<_wxpayList.length; i++){
  _wxpayList[i].onclick = function(){
    var product = this.dataset.product;
    var fee = parseInt(this.dataset.fee);

    xhr = new XMLHttpRequest();
    xhr.open("POST", "/backend/order/api/order/?payment=wx", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
      if (xhr.readyState==4 && xhr.status==200){
        data = JSON.parse(xhr.responseText);
        if(data.ok){
          console.log(data.params);

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
        }else{
          alert(data.msg);
        }
      }
    }
    xhr.send(JSON.stringify({
      "details": _wxpayDetails,
      "fee" : fee,
      "product": product
    }));
  };
}
