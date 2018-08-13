function  slide(element){
  var startX = 0;
  var leftRem = 13;
  element.style.left = _rem(leftRem);
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
        leftRem += 50;
        element.style.left = _rem(leftRem);
        element.style.transition = "all 1s";
      }
    }

    // 左滑
    if(touchLength < -30){
      var liList = element.getElementsByTagName("li");
      var index = _currentSlideIndex(liList);
      if(index<liList.length-1){
        liList[index].className = "";
        liList[index+1].className = "active";
        leftRem -= 50;
        element.style.left = _rem(leftRem);
        element.style.transition = "all 1s";
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
slide(categoryList);
