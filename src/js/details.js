// 点击下拉出现
var asideImg = document.querySelector("aside").querySelector("img");
var sectionElement = document.querySelector("section");

asideImg.onclick = function(){
	var asideMenu = this.parentElement;
	var asideUl = document.querySelector("aside").querySelector("ul");
	if(asideMenu.dataset.menu == "true"){
		asideUl.style.right = "1.8rem";
		asideUl.style.transition="all 1s";
		asideMenu.dataset.menu = "false";
	}else{
		asideUl.style.transition="all 1s";
		asideUl.style.right = "-13rem";
		asideMenu.dataset.menu = "true";
	}
}

sectionElement.onclick = function(){
	if(this.dataset.share == "true"){
		this.style.transition="all 1s";
		this.style.width="16rem";
		document.querySelector("div").style.display = "block";
		this.dataset.share = "false";
	}else{
		this.style.transition="all 1s";
		this.style.width="4.8rem";
		this.querySelector("div").style.display = "none";
		this.dataset.share = "true";
	}
}


// 语法高亮
hljs.initHighlightingOnLoad();


/**
 * 微信分享
 **/
function wxShare(){
  var xhr = new XMLHttpRequest;
  xhr.open("GET", "/rest/home/", true);
  xhr.setRequestHeader("Authorization", token);
  xhr.send();
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var data = JSON.parse(xhr.responseText);
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

wx.config({
  debug: true,
  appId: 'appId',
  timestamp: '', // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
});

wx.ready(function(){

  // 分享给微信朋友或QQ
  wx.updateAppMessageShareData({
      title: 'HTML 5.0 - 技术情报站', // 分享标题
      desc: '', // 分享描述
      link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
  },function(res){
    alert('分享成功');
  });

  // 分享给朋友圈或QQ空间
  wx.updateTimelineShareData({
    title: '', // 分享标题
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
  }, function(res) {
    alert('分享成功');
  });
});

wx.error(function(res){
  console.log(res);
  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
});
