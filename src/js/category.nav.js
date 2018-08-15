/**
 * 服务类别滑动
 * @param {Element} element 服务类别区域<ul>
 */
function  slideNav(element){
  var startX = 0;
  element.addEventListener("touchstart", function(event){
    startX = event.targetTouches[0].pageX;
  });
  element.addEventListener("touchend", function(event){
    var touchLength = event.changedTouches[0].pageX - startX;
    var liList = this.getElementsByTagName("li");
    var mr = Math.round(window.getComputedStyle(liList[0], null)["margin-right"].slice(0, -2));
    var width = null;

    // 右滑
    if(touchLength > 30 && navIndex > 0){
      navIndex--;
      width = element.offsetLeft + liList[navIndex].offsetWidth + mr;
    }

    // 左滑
    if(touchLength < -30 && navIndex < liList.length-1){
      width = element.offsetLeft - liList[navIndex].offsetWidth - mr;
      navIndex++;
    }

    if(width != null){
      element.style.left = flexible.px2rem(String(width)) + "rem";
      element.style.transition = "all 0.5s";
    }
  });
  element.addEventListener("touchmove", function(event){
    event.preventDefault();
  });
}
