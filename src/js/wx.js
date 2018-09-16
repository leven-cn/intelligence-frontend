/**
 * WeChat API
 */

// 微信登录接口
function wxlogin(callback, arg){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    token = getQueryParam("wxAuthToken");
    if(token == null){
      _wxlogin();
    }else{
      localStorage.setItem("wxAuthToken", token);
    }
  }
  callback(arg);
}

function _wxlogin(){
  localStorage.removeItem("wxAuthToken");
  window.location.href = "/wx/login/?auth=token&next="
      + window.location.pathname + window.location.search
      + window.location.hash;
}

/**
 * 微信支付接口
 */
function wxpay(summary, fee, details){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    _wxlogin();
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/order/rest/pay/?payment=wx", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", token);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      var status = xhr.status;
      if(status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.code == 0){
          console.log(data.params);

          // 微信支付弹框
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            data.params,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request：ok"){
                alert('支付成功，正在处理订单');
              }
            }
          );
        }else{
          alert(data.msg);
        }

      }else if(xhr.status == 401){
        if(confirm("微信登录超时，确认刷新页面")){
          _wxlogin();
        }
      }
    }
  }
  xhr.send(JSON.stringify({
    "details": details,
    "fee" : fee,
    "summary": summary
  }));
}
