// 情报交易
var rechargeList = document.querySelector("ul").querySelectorAll("li");
var button = document.querySelector("button");
var popupElement = document.getElementsByClassName("popup")[0];
var maskElement = document.getElementsByClassName("mask")[0];

button.onclick = function(){
  popupElement.style.display = "block";
  maskElement.style.display = "block";
}

maskElement.onclick = function(){
  popupElement.style.display = "none";
  this.style.display = "none";
}


function rechargeByWxpay(){
  for(var i=0;i<rechargeList.length;i++){
    rechargeList[i].onclick = function(){
        var product = this.dataset.product;
        var fee =parseInt(this.dataset.fee);
        wxpay("情报交易",fee,[{"name":product,"count":1}]);
    }
  }

  popupElement.querySelectorAll("a")[0].onclick = function(){
    var product = this.dataset.product;
    var fee =parseInt(this.dataset.fee);
    wxpay("情报交易",fee,[{"name":product,"count":1}]);
  }
}
wxlogin(rechargeByWxpay, null, true);