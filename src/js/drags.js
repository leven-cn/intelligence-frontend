/**
 * 拖拽效果
 */

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


// post
function drags(prefix,userEntity){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    return;
  }
  var xmlhttp = new XMLHttpRequest;
  xmlhttp.open("POST", prefix+"/rest/technology-type/", true);
  xmlhttp.setRequestHeader("Authorization", token);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      if(xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        if(data.code == 0){
          window.location.href  = "home.html";
        }
      }
    }
  }
  xmlhttp.send(JSON.stringify({
    "stars":userEntity
  }));

}

iconFont.onclick = function(){
  var starsList = [];
  var stars = sessionStorage.getItem("stars");
  if(stars != null){
    starsList = JSON.parse(stars);
  }
  drags(PREFIX, starsList);
}
