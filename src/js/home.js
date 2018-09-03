function home(prefix){
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
        // 点数
        var homeH2 = document.querySelector("h2");
        homeH2.innerHTML = data.points + "<em>点</em>";

        // 订阅列表填充
        var ulList = document.querySelector("ul");
        var articleElement = document.querySelector("article");
        ulList.innerHTML = "";
        
        for(var i=0; i<data.stars.length; i++){
          var dataStars = data.stars[i];
          ulList.innerHTML += '<li data-offon="true" class="homeList">'+
          '<img src="img/x.svg" class="delete" alt="删除">'+
          '<section>'+
          '<img src="img/'+dataStars.techType.toLowerCase()+'.svg" alt="HTMl"/>'+
          '<h3>'+dataStars.techType+'</h3>'+
          '<em>共'+dataStars.total+'条</em>'+
          '<em>机密档案</em>'+
          '<em>'+dataStars.unread+'</em>'+
          '</section>'+
          '<ul></ul>'+
          '</li>';

        } 
        if(data.stars.length == 0){
          articleElement.style.display = "block";
        }
        
        // 点击下拉出现
        // var homeList = ulList.querySelectorAll("li"); intelligence
        var homeList = ulList.getElementsByClassName("homeList");
        for(var i=0;i<homeList.length;i++){
          homeList[i].onclick = function(ev){
            var oEvent = ev || event;
            var $this = this.querySelector("ul");
            var h3Text = this.querySelector("h3").innerHTML;
            var spinnerhttp = new XMLHttpRequest;
            spinnerhttp.open("GET", prefix + "/rest/intelligence/?tech-type=" + h3Text, true);
            spinnerhttp.setRequestHeader("Authorization", token);
            spinnerhttp.send();
            spinnerhttp.onreadystatechange = function(){
              if(spinnerhttp.readyState == 4){
                if(spinnerhttp.status == 200){
                  var spinnerData = JSON.parse(spinnerhttp.responseText);
                  console.log(spinnerData.intelligence);
                  if(spinnerData.code == 0){
                    $this.innerHTML = "";
                    for(var i=0; i<spinnerData.intelligence.length;i++){
                      var intelligence = spinnerData.intelligence[i];
                      $this.innerHTML += '<li'
                      if(intelligence.isRead){
                        $this.innerHTML += ' class="active"';
                      }
                      $this.innerHTML += '><a href="details.html"><em>'+intelligence.version+' 版本更新</em><em>'+intelligence.releaseTime+'</em></a></li>'
                    }
                  }else{
                    alert(spinnerData.msg);
                  }
                }
              }
            }
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
              var $t = this.parentElement;
              var oEvent = ev || event;
              oEvent.cancelBubble = true; 
              var h3Text = this.parentElement.querySelector("h3").innerHTML;
              var deletehttp = new XMLHttpRequest;
              deletehttp.open("DELETE", prefix + "/rest/home/?tech-type=" + h3Text, true);
              deletehttp.setRequestHeader("Authorization", token);
              deletehttp.send();
              deletehttp.onreadystatechange = function(){
                if(deletehttp.readyState == 4){
                  if(deletehttp.status == 200){
                    $t.remove($t);
                    if(homeList.length == 0){
                      articleElement.style.display = "block";
                    }
                  }
                }
              }
            }
          }
        }

      }else if(xmlhttp.status == 401){
        _wxlogin(prefix);
      }
    }
  }
}

var prefix = "http://t1.zhiliaokeji.com";
wxlogin(home, prefix, prefix);