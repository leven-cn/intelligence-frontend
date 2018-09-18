/**
 * 情报详情页 - 详情内容
 */
function _details_section(section, contents){
  if(contents == undefined){
    return;
  }

  for(var i=0;i<contents.length;i++){

    // 文本
    if(contents[i].text != undefined){
      section.innerHTML += '<p>'+contents[i].text+'</p>';
    }

    // 代码示例
    var sample = contents[i].sample
    if(sample != undefined){
      for(var j=0;j<sample.length;j++){

        // 代码描述
        var desc = sample[j].description;
        if(desc != undefined && desc != ''){
          section.innerHTML += '<p>'+desc+'</p>';
        }

        // 源代码
        var code = sample[j].code;
        if(code != undefined && code != ''){
          section.innerHTML += '<pre><code class="'+sample[j].lang.toLowerCase()+'">'+code+'</code></pre>';
        }
      }
    }
  }
}

function details(){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    return;
  }

  // 情报详情页 - 标题栏
  var techType = getQueryParam("tech-type");
  var version = getQueryParam("version");
  document.querySelector("header").innerHTML = '<p><em><strong>Release Date：</strong> '+getQueryParam("release-date")+'</em><img src="img/pc.svg" alt="pc"></p><h1>'+techType+' <em>'+version+'</em></h1>';

  // 情报详情页 - 内容
  var xmlhttp = new XMLHttpRequest;
  xmlhttp.open("GET", "/rest/intelligence-details/?tech-type="+techType+"&version="+version, true);
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
        var mainSection = document.querySelector("main").getElementsByTagName("section");
        _details_section(mainSection[0], data.details.new);
        _details_section(mainSection[1], data.details.improvement);
        _details_section(mainSection[2], data.details.bugfix);
        _details_section(mainSection[3], data.details.removed);
        _details_section(mainSection[4], data.details.deprecation);
  
        // 语法高亮
        hljs.initHighlighting();
      }else if(xmlhttp.status == 401){
        _wxlogin();
      }else if(xmlhttp.status == 404){
        window.location.href = "home.html";
      }
    }
  }
}

wxlogin(details);


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


/**
 * 微信分享
 **/
function wxShare(){
  var token = localStorage.getItem("wxAuthToken");
  if(token == null){
    return;
  }

  var xhr = new XMLHttpRequest;
  xhr.open("GET", "/wx/rest/jsapi-ticket/", true);
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

        // 微信JS-SDK配置
        wx.config({
          debug: true,
          appId: data.params.appid,
          timestamp: data.params.timestamp,
          nonceStr: data.params.noncestr,
          signature: data.params.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
        });

        wx.ready(function(){

          // 分享给微信朋友或QQ
          wx.updateAppMessageShareData({
              title: '技术情报站 - 选择比努力更重要',
              desc: '第一手技术情报, 非新闻式，15分钟新鲜度',
              link: '',
              imgUrl: '', // 分享图标
          },function(res){
            alert('分享成功');
          });
        
          // 分享给朋友圈或QQ空间
          wx.updateTimelineShareData({
            title: '技术情报站 - 选择比努力更重要',
            link: '',
            imgUrl: '', // 分享图标
          }, function(res) {
            alert('分享成功');
          });
        });

        wx.error(function(res){
          console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });

      }else if(xhr.status == 401){
        _wxlogin();
      }
    }
  }
}

// wxlogin(wxShare);
