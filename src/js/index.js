var wxIntroduceCode = localStorage.getItem("wx-introduce-code");
var toUrl = "home.html";
if(wxIntroduceCode == null){
  localStorage.removeItem("wxAuthToken");
}else{
  toUrl += "?/wx-introduce-code=" + wxIntroduceCode;
}

setInterval(function(){
  window.location.href = toUrl;
},5000)

document.body.onclick = function(){
  window.location.href = toUrl;
}
