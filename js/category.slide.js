function  slide(element, titleElement){
  var startX = 0;
  var leftRem = 13;
  element.style.left = _rem(leftRem);
  element.addEventListener("touchstart", function(event){
    startX = event.targetTouches[0].pageX;
  });
  element.addEventListener("touchend", function(event){
    var touchLength = event.changedTouches[0].pageX - startX;
    var backgroundColorTop = [
      "rgb(86, 196, 236)","rgb(226, 198, 85)","rgb(230, 127, 89)","rgb(153, 177, 56)","rgb(126, 109, 213)"
    ];
    var backgroundColorBottom = [
      "rgb(129,212,242)","rgb(242,216,115)","rgb(233,148,118)","rgb(170,189,93)","rgb(138,123,248)"
    ]; 
    var backgroundColorOpacity = [
      "rgba(86, 196, 236,1)","rgba(226, 198, 85,1)","rgba(230, 127, 89,1)","rgba(153, 177, 56,1)","rgba(126, 109, 213,1)"
    ];
    var backgroundColorOpacity1 = [
      "rgba(86, 196, 236,0)","rgba(226, 198, 85,0)","rgba(230, 127, 89,0)","rgba(153, 177, 56,0)","rgba(126, 109, 213,0)"
    ]; 
    // 右滑
    if(touchLength > 30){
      var liList = element.getElementsByTagName("li");
      var index = _currentSlideIndex(liList);
      var random = Math.floor((Math.random()*backgroundColorTop.length));
      if(index>0){
        liList[index].className = "";
        liList[index-1].className = "active";
        leftRem += 50;
        element.style.left = _rem(leftRem);
        element.style.transition = "all 1s";
        
        // 随机更换背景颜色
        document.body.style.background  = "linear-gradient("+backgroundColorTop[random]+","+backgroundColorBottom[random]+")";
        for(var i=0;i<categoryList.getElementsByTagName("li").length;i++){
          categoryList.getElementsByTagName("li")[i].getElementsByTagName("section")[0].style.background = backgroundColorTop[random];
        }
        document.getElementsByTagName("div")[0].style.background = "linear-gradient(to left,"+backgroundColorOpacity[random]+","+backgroundColorOpacity1[random]+")";

        // 同步服务名称显示
        titleElement.innerHTML = liList[index-1].dataset.name;
      }
    }

    // 左滑
    if(touchLength < -30){
      var liList = element.getElementsByTagName("li");
      var index = _currentSlideIndex(liList);
      var random = Math.floor((Math.random()*backgroundColorTop.length));
      if(index<liList.length-1){
        liList[index].className = "";
        liList[index+1].className = "active";
        leftRem -= 50;
        element.style.left = _rem(leftRem);
        element.style.transition = "all 1s";
        
        // 随机变更背景颜色 
        document.body.style.background  = "linear-gradient("+backgroundColorTop[random]+","+backgroundColorBottom[random]+")";
        for(var i=0;i<categoryList.getElementsByTagName("li").length;i++){
          categoryList.getElementsByTagName("li")[i].getElementsByTagName("section")[0].style.background = backgroundColorTop[random];
        }
        document.getElementsByTagName("div")[0].style.background = "linear-gradient(to left,"+backgroundColorOpacity[random]+","+backgroundColorOpacity1[random]+")";

        // 同步服务名称显示
        titleElement.innerHTML = liList[index+1].dataset.name;
      }
    }
  });
  element.addEventListener("touchmove", function(event){
    event.preventDefault();
  });
}

function _currentSlideIndex(liList){
  for(var i=0; i<liList.length; i++){
    liList[i].style.transition = "all 0.5s";
    if(liList[i].className == "active") {
      return i;
    }
  }
}

function _rem(n){
  return (n/10).toFixed(1) + "rem";
}

var categoryList = document.getElementById("category-list");
var titleElement = document.getElementsByTagName("h2")[0];
slide(categoryList, titleElement);
