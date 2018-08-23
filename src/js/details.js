// 点击下拉出现
var detailsList = document.querySelector("ul").querySelectorAll("li");
var detailsArticle = document.querySelector("main").querySelectorAll("article");
for(var i=0;i<detailsList.length;i++){
	detailsList[i].index = i;
	detailsList[i].onclick = function(){
		for(var i=0;i<detailsList.length;i++){
			detailsList[i].className = "";
			detailsArticle[i].style.display = "none";
		}
		this.className = "active";
		detailsArticle[this.index].style.display = "block";
	}
}

var detailsUl = document.querySelector("ul");

document.body.onscroll = function(){
	if(document.documentElement.scrollTop > 742){
		detailsUl.style.position = "fixed";
		detailsUl.style.top = "0.4rem";
	}else if(document.documentElement.scrollTop < 742){
		detailsUl.style.position = "static";
		detailsUl.style.top = "";
	}
}