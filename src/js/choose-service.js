// li选中样式

var chooseServiceList = document.querySelector("ul").getElementsByTagName("li")

for(var i=0; i<chooseServiceList.length;i++){
  chooseServiceList[i].onclick = function(){
    if(this.className == ""){
      this.className = "active";
    }else{
      this.className = "";
    }
  }
}