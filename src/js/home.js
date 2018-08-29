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
}