// li选中样式
// technology-type

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

function chooseList(prefix){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    return;
  }

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

        // 门类选择
        var chooseUl = document.querySelector("ul");
        console.log(data)
        // for(){

        // }
      }
    }else if(xmlhttp.status == 401){
      _wxlogin(prefix);
    }
  }
}

var prefix = "http://t1.zhiliaokeji.com";
wxlogin(chooseList, prefix, prefix);