// 搜索效果
var header = document.getElementsByTagName("header")[0];
var input = header.getElementsByTagName("input");

input[1].onclick = function(){
  if(this.dataset.ok == "true"){
    input[0].style.width= "4.4rem";
    input[0].style.transition = "all 1s";
    input[0].style.marginLeft = "0.62rem";
    input[0].style.marginRight = "0.15rem";
    this.dataset.ok = "false";
  }else{
    input[0].style.width = "0";
    input[0].style.transition = "all 1s";
    input[0].style.marginLeft = "-0.33rem";
    input[0].style.marginRight = "0.53rem";
    this.dataset.ok = "true";
  }
}