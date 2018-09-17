function home(){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    return;
  }

  var xmlhttp = new XMLHttpRequest;
  xmlhttp.open("GET", "/rest/home/", true);
  xmlhttp.setRequestHeader("Authorization", token);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4){
      if(xmlhttp.status == 200){
        var data = JSON.parse(xmlhttp.responseText);
        if(data.code !=0){
          alert(data.msg);
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
              '<img src="img/'+dataStars.techType.toLowerCase()+'.svg" alt="'+dataStars.techType+'"/>'+
              '<h3>'+dataStars.techType+'</h3>'+
              '<em>共<strong>'+dataStars.total+'</strong>条</em>'+
              '<em>历史档案</em>'+
              '<em>'+dataStars.unread+'</em>'+
              '</section>'+
              '<ul></ul>'+
              '</li>';
        }
        if(data.stars.length == 0){
          ulList.style.display = "none";
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
                liElementEm[1].innerHTML = "历史档案";
                this.dataset.offon = "false";
                this.querySelector("ul").style.display = "block";
                intelligenceList(h3Text,"1",token,$this);
              }else{
                this.querySelector("ul").style.display = "none";
                liElementEm[0].style.display = "block";
                liElementEm[1].style.display = "none";
                this.dataset.offon = "true";
              }
            }
          }
          homeList[i].querySelectorAll("em")[1].onclick = function(ev){
            var oEvent = ev || event;
            oEvent.cancelBubble = true;
            var $this = this.parentElement.parentElement.querySelector("ul");
            var h3Text = this.parentElement.querySelector("h3").innerHTML;
            if(this.innerHTML == "历史档案"){
              intelligenceList(h3Text,"0",token,$this);
              this.innerHTML = "最新情报";
            }else{
              this.innerHTML = "历史档案";
              intelligenceList(h3Text,"1",token,$this);
            }
          }
          var deleteImg = homeList[i].getElementsByClassName("delete");
          for(var j=0;j<deleteImg.length;j++){
            deleteImg[j].onclick = function(ev){
              var remove = confirm("确认取消关注吗？");
              var $t = this.parentElement;
              var oEvent = ev || event;
              oEvent.cancelBubble = true; 
              var h3Text = this.parentElement.querySelector("h3").innerHTML;
              if(remove == true){
                var deletehttp = new XMLHttpRequest;
                deletehttp.open("DELETE", "/rest/home/?tech-type=" + h3Text, true);
                deletehttp.setRequestHeader("Authorization", token);
                deletehttp.send();
                deletehttp.onreadystatechange = function(){
                  if(deletehttp.readyState == 4){
                    if(deletehttp.status == 200){
                      $t.remove($t);
                      if(homeList.length == 0){
                        articleElement.style.display = "block";
                      }
                    }else if(xmlhttp.status == 401){
                      _wxlogin();
                    }
                  }
                }
              }
            }
          } 
        }
      }else if(xmlhttp.status == 401){
        _wxlogin();
      }
    }
  }
}

/**
 * 情报关注列表
 * @param {string} techType 
 * @param {string} release 
 * @param {string} token 
 * @param {string} box 
 */
function intelligenceList(techType, release, token, box){
  var xhr = new XMLHttpRequest;
  xhr.open("GET", "/rest/intelligence/?tech-type="+techType+"&release="+release, true);
  xhr.setRequestHeader("Authorization", token);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
        if(data.code == 0){
          box.innerHTML = "";
          for(var i=0; i<data.intelligence.length;i++){
            var intelligence = data.intelligence[i];
            var elemntStr = "<li";
            if(intelligence.isRead){
              elemntStr += ' class="active"';
            }
            elemntStr += '><a href="details.html"><em>'+intelligence.version+' 版本更新</em><em>'+intelligence.releaseTime+'</em></a></li>';
            box.innerHTML += elemntStr;
          }
        }else{
          alert(data.msg);
        }
      }else if(xmlhttp.status == 401){
        _wxlogin();
      }
    }
  }
}

wxlogin(home);
