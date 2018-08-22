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