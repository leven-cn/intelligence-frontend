/**
 * WeChat API
 */

function getQueryVariable(variable) {
  var query = window.location.search.substr(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return null;
}

// 微信登录接口
function wxlogin(prefix, callback, args){
  prefix = prefix || "";

  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    token = getQueryVariable("wxAuthToken");
    if(token == null){
      _wxlogin(prefix);
    }else{
      localStorage.setItem("wxAuthToken", token);
    }
  }
  callback(args);
}

function _wxlogin(prefix){
  localStorage.removeItem("wxAuthToken");
  window.location.href = prefix + "/wx/login/?auth=token&next="
      + window.location.pathname + window.location.search
      + window.location.hash;
}

function wxpay(product, fee, details){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    _wxlogin();
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/backend/order/api/order/?payment=wx", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", token);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      var status = xhr.status;
      if(status == 200){
        var data = JSON.parse(xhr.responseText);
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
    "product": product
  }));
}
