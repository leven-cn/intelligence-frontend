// 点击下拉出现
var homeList = document.querySelector("ul").querySelectorAll("li");
for(var i=0;i<homeList.length;i++){
	homeList[i].onclick = function(ev){
		var oEvent = ev || event;
		console.log(this);
	}
	homeList[i].querySelectorAll("em")[0].onclick = function(ev){
		var oEvent = ev || event;
		console.log(this);
		oEvent.cancelBubble = true; 
	}
}