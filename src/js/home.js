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
              '<em>共<strong>'+dataStars.total+'</strong>条</em>'+
              '<em>历史档案</em>'+
              '<em>'+dataStars.unread+'</em>'+
              '</section>'+
              '<ul></ul>'+
              '</li>';
        }
        if(data.stars.length == 0){
          articleElement.style.display = "block";
        }

        var homeList = ulList.getElementsByClassName("homeList");
        // 点击下拉出现
        for(var i=0;i<homeList.length;i++){
          homeList[i].onclick = function(ev){
            var oEvent = ev || event;
            var liElementEm = this.querySelectorAll("em");
            var strongElement = this.querySelector("strong"); 
            var $this = this.querySelector("ul");
            var h3Text = this.querySelector("h3").innerHTML;
            if(strongElement.innerHTML == 0){
              alert("暂无情报");
            }else{
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
              var spinnerhttp = new XMLHttpRequest;
              spinnerhttp.open("GET", prefix + "/rest/intelligence/?tech-type="+h3Text+"?release=1", true);
              spinnerhttp.setRequestHeader("Authorization", token);
              spinnerhttp.send();
              spinnerhttp.onreadystatechange = function(){
                if(spinnerhttp.readyState == 4){
                  if(spinnerhttp.status == 200){
                    var spinnerData = JSON.parse(spinnerhttp.responseText);
                    if(spinnerData.code == 0){
                      $this.innerHTML = "";
                      for(var i=0; i<spinnerData.intelligence.length;i++){
                        var intelligence = spinnerData.intelligence[i];
                        var elemntStr = "<li";
                        if(intelligence.isRead){
                          elemntStr += ' class="active"';
                        }
                        elemntStr += '><a href="details.html"><em>'+intelligence.version+' 版本更新</em><em>'+intelligence.releaseTime+'</em></a></li>';
                        $this.innerHTML += elemntStr;
                      }
                    }else{
                      alert(spinnerData.msg);
                    }
                  }
                }
              }
            }
          }
          homeList[i].querySelectorAll("em")[1].onclick = function(ev){
            var oEvent = ev || event;
            oEvent.cancelBubble = true;
            console.log(this.parentElement);
            var xhr = new XMLHttpRequest;
            var h3Text = this.parentElement.querySelector("h3").innerHTML;
            xhr.open("GET", prefix + "/rest/intelligence/?tech-type="+h3Text+"?release=1", true);
            xhr.setRequestHeader("Authorization", token);
            xhr.send();
            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                if(xhr.status == 200){
                  var data = JSON.parse(xhr.responseText);
                  console.log(data);
                  if(data.code == 0){
                    $this.innerHTML = "";
                    for(var i=0; i<data.intelligence.length;i++){
                      var intelligence = data.intelligence[i];
                      var elemntStr = "<li";
                      if(intelligence.isRead){
                        elemntStr += ' class="active"';
                      }
                      elemntStr += '><a href="details.html"><em>'+intelligence.version+' 版本更新</em><em>'+intelligence.releaseTime+'</em></a></li>';
                      $this.innerHTML += elemntStr;
                    }
                  }else{
                    alert(data.msg);
                  }
                }
              }
            }
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