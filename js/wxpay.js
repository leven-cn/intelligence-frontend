/**
 * WeChat Pay
 */

function wxpay(_product, _fee, _d,){
  var _xhr = new XMLHttpRequest();
  _xhr.open("POST", "/backend/order/api/order/?payment=wx", true);
  _xhr.setRequestHeader("Content-Type", "application/json");
  _xhr.onreadystatechange = function(){
    if (_xhr.readyState==4){
      var _status = _xhr.status;
      if(_status == 200){
        var _data = JSON.parse(_xhr.responseText);
        if(_data.ok){
          console.log(_data.params);

          // 微信支付弹框
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            _data.params,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request：ok"){
                alert('支付成功，等待处理');
              }
            }
          );
        }else{
          alert(_data.msg);
        }
      } else if(_status == 0){  // 302跨域
        window.location.href = "/backend/wx/login/";
      }
    }
  }
  _xhr.send(JSON.stringify({
    "details": _d,
    "fee" : _fee,
    "product": _product
  }));
}
