function  slideNav(element){
  var startX = 0;
  element.addEventListener("touchstart", function(event){
    startX = event.targetTouches[0].pageX;
  });
  element.addEventListener("touchend", function(event){
    var touchLength = event.changedTouches[0].pageX - startX;
    var liList = this.getElementsByTagName("li");
    var width = null;

    // 右滑
    if(touchLength > 30 && navIndex > 0){
      navIndex--;
      width = element.offsetLeft + liList[navIndex].offsetWidth + 12;
    }

    // 左滑
    if(touchLength < -30 && navIndex < liList.length-1){
      width = element.offsetLeft - liList[navIndex].offsetWidth - 12;
      navIndex++;
    }

    if(width != null){
      element.style.left = width + "px";
      element.style.transition = "all 1s";
    }
  });
  element.addEventListener("touchmove", function(event){
    event.preventDefault();
  });
}


var navUl = document.getElementsByTagName("nav")[0].getElementsByTagName("ul")[0];
var navIndex = 0;
slideNav(navUl);
