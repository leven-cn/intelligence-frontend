function home(prefix){
  var xmlhttp = new XMLHttpRequest;
  xmlhttp.open("GET", prefix+"/rest/home/", true);
  xmlhttp.setRequestHeader("Authorization", token);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      if(xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        if(data.code !=0){
          alert("error");
          return;
        }
        
        alert(data.points);
      }else if(xmlhttp.status == 401){
        wxlogin(prefix, home, prefix);
      }
    }
  }
}

var prefix = "http://t1.zhiliaokeji.com";
wxlogin(prefix, home, prefix);

// 点击下拉出现
var homeList = document.querySelector("ul").querySelectorAll("li");
for(var i=0;i<homeList.length;i++){
	homeList[i].onclick = function(ev){
		var oEvent = ev || event;
    var liElementEm = this.querySelectorAll("em");
    if(this.dataset.offon == "true"){
      liElementEm[0].style.display = "none";
      liElementEm[1].style.display = "block";
      this.dataset.offon = "false";
      this.querySelector("ul").style.display = "block";
    }else{
      this.querySelector("ul").style.display = "none";
      liElementEm[0].style.display = "block";
      liElementEm[1].style.display = "none";
      this.dataset.offon = "true";
    }
	}
	homeList[i].querySelectorAll("em")[1].onclick = function(ev){
    var oEvent = ev || event;
		oEvent.cancelBubble = true; 
  }
  var deleteImg = homeList[i].getElementsByClassName("delete");
  for(var j=0;j<deleteImg.length;j++){
    deleteImg[j].onclick = function(ev){
      var oEvent = ev || event;
      oEvent.cancelBubble = true; 
    }
  }
}