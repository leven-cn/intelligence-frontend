// 搜索效果
var search = document.getElementsByTagName("header")[0].getElementsByTagName("input");
search[1].onclick = function(){
  var searchStyle = search[0].style;
  if(this.dataset.ok == "true"){
    searchStyle.width= "4.4rem";
    searchStyle.transition = "all 1s";
    searchStyle.marginLeft = "0.62rem";
    searchStyle.marginRight = "0.15rem";
    this.dataset.ok = "false";
  }else{
    searchStyle.width = "0";
    searchStyle.transition = "all 1s";
    searchStyle.marginLeft = "-0.33rem";
    searchStyle.marginRight = "0.53rem";
    this.dataset.ok = "true";
  }
}
