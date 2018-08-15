function  slideNav(element){
  var startX = 0;
  element.addEventListener("touchstart", function(event){
    startX = event.targetTouches[0].pageX;
  });
  element.addEventListener("touchend", function(event){
    var touchLength = event.changedTouches[0].pageX - startX;

    // 右滑
    if(touchLength > 30 && navIndex > 0){
      navIndex--;
      var width = (element.offsetLeft + element.getElementsByTagName("li")[navIndex].offsetWidth) + 12;
      element.style.left = width + "px";
      element.style.transition = "all 1s";
    }

    // 左滑
    if(touchLength < -30 && navIndex < element.getElementsByTagName("li").length-1){
      var width = (element.offsetLeft - element.getElementsByTagName("li")[navIndex].offsetWidth) - 12;
      navIndex++;
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
