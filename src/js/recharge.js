// 情报交易
var rechargeList = document.querySelector("ul").querySelectorAll("li");

function rechargeByWxpay(){
  for(var i=0;i<rechargeList.length;i++){
    rechargeList[i].onclick = function(){
        var product = this.dataset.product;
        var fee =parseInt(this.dataset.fee);
        wxpay("情报交易",fee,[{"name":product,"count":1}]);
    }
  }
}
wxlogin(rechargeByWxpay);
