/**
 * 拖拽效果
 */

var iconFont = document.querySelector("#icon-font");
var iconFontEm = iconFont.querySelector("em"); 
var maxW=document.body.clientWidth-iconFont.offsetWidth;
var maxH=document.body.clientHeight-iconFont.offsetHeight;

iconFont.addEventListener('touchstart',function(e){
  var ev = e || window.event;
  var touch = ev.targetTouches[0];
  oL = touch.clientX - iconFont.offsetLeft;
  oT = touch.clientY - iconFont.offsetTop;
  document.addEventListener("touchmove",function(){},false);
})

iconFont.addEventListener('touchmove',function(e){
  var ev = e || window.event;
  var touch = ev.targetTouches[0];
  var oLeft = touch.clientX - oL;
  var oTop = touch.clientY - oT;
  if(oLeft<0){
    oLeft=0;
  }else if (oLeft>=maxW) {
    oLeft=maxW;
  }
  if(oTop<0){
    oTop=0;
  }else if (oTop>=maxH) {
    oTop=maxH;
  }

  iconFont.style.left = oLeft + 'px';
  iconFont.style.top = oTop + 'px';

})
iconFont.addEventListener('touchend',function(){ 
  document.removeEventListener("touchmove",function(){});
})
function defaultEvent(e) {


  e.preventDefault();
}
