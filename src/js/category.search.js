// 搜索效果
var searchInput = document.getElementsByTagName("header")[0].getElementsByTagName("input");
searchInput[1].onclick = function(){
  var searchStyle = searchInput[0].style;
  if(this.dataset.ok == "true"){
    searchStyle.width= "4.4rem";
    searchStyle.transition = "all 1s";
    searchStyle.marginLeft = "0.62rem";
    searchStyle.marginRight = "0.15rem";
    this.dataset.ok = "false";

    searchInput[0].value = "";  // 清空搜索框
  }else{
    searchStyle.width = "0";
    searchStyle.transition = "all 1s";
    searchStyle.marginLeft = "-0.33rem";
    searchStyle.marginRight = "0.53rem";
    this.dataset.ok = "true";
  }

  var searchText = searchInput[0].value;
  if(searchText != ""){
    displayServiceList(categoryList, "", searchText);
  }
}

searchInput[0].onfocus = function(){
  categoryList.style.display = "none";
}

searchInput[0].onblur = function(){
  if(this.value == ""){
    categoryList.style.display = "block";
  }
}
