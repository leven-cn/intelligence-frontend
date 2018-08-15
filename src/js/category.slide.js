/**
 * 服务选择滑动
 */

/**
 * 滑动效果
 * @param {Element} element 服务显示块
 * @param {Element} titleElement 服务名称（标题）显示
 */
function slide(element, titleElement){
  var startX = 0;
  element.addEventListener("touchstart", function(event){
    startX = event.targetTouches[0].pageX;
  });
  element.addEventListener("touchend", function(event){
    var touchLength = event.changedTouches[0].pageX - startX;

    // 右滑
    if(touchLength > 30){
      var liList = element.getElementsByTagName("li");
      var index = _currentSlideIndex(liList);
      if(index>0){
        liList[index].className = "";
        liList[index-1].className = "active";
        element.style.left = (flexible.px2rem(element.offsetLeft) + 5) + "rem";
        element.style.transition = "all 1s";

        // 随机不重复选择背景颜色
        _changeBgColor(BG_COLOR_NUMS);

        // 同步服务名称显示
        titleElement.innerHTML = liList[index-1].dataset.name;
      }
    }

    // 左滑
    if(touchLength < -30){
      var liList = element.getElementsByTagName("li");
      var index = _currentSlideIndex(liList);
      if(index<liList.length-1){
        liList[index].className = "";
        liList[index+1].className = "active";
        element.style.left = (flexible.px2rem(element.offsetLeft) - 5) + "rem";
        element.style.transition = "all 1s";

        // 随机不重复选择背景颜色
        _changeBgColor(BG_COLOR_NUMS);

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

// 随机不重复更新背景颜色
function _changeBgColor(n){

  // 随机不重复
  while(true){
    var random = Math.floor((Math.random()*n));
    if(random != bgColorIndex){
      bgColorIndex = random;
      break;
    }
  }

  document.body.style.background  = "linear-gradient("+BG_COLOR_TOP[bgColorIndex]+","+BG_COLOR_BOTTOM[bgColorIndex]+")";
  for(var i=0;i<categoryList.getElementsByTagName("li").length;i++){
    categoryList.getElementsByTagName("li")[i].getElementsByTagName("section")[0].style.background = BG_COLOR_TOP[bgColorIndex];
  }
  document.getElementsByTagName("div")[0].style.background = "linear-gradient(to left,"+BG_COLOR_OPACITY_FROM[bgColorIndex]+","+BG_COLOR_OPACITY_TO[bgColorIndex]+")";
}

var bgColorIndex = 0;
var BG_COLOR_TOP = [
  "rgb(86, 196, 236)","rgb(226, 198, 85)","rgb(230, 127, 89)","rgb(153, 177, 56)","rgb(126, 109, 213)"
];
var BG_COLOR_BOTTOM = [
  "rgb(129,212,242)","rgb(242,216,115)","rgb(233,148,118)","rgb(170,189,93)","rgb(138,123,248)"
];
var BG_COLOR_OPACITY_FROM = [
  "rgba(86, 196, 236,1)","rgba(226, 198, 85,1)","rgba(230, 127, 89,1)","rgba(153, 177, 56,1)","rgba(126, 109, 213,1)"
];
var BG_COLOR_OPACITY_TO = [
  "rgba(86, 196, 236,0)","rgba(226, 198, 85,0)","rgba(230, 127, 89,0)","rgba(153, 177, 56,0)","rgba(126, 109, 213,0)"
];
var BG_COLOR_NUMS = BG_COLOR_TOP.length;
