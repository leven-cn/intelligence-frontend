// 点击下拉出现
var asideImg = document.querySelector("aside").querySelector("img");
var sectionElement = document.querySelector("section");

asideImg.onclick = function(){
	var asideMenu = this.parentElement;
	if(asideMenu.dataset.menu == "true"){
		document.querySelector("aside").querySelector("ul").style.right = "0";
		asideMenu.dataset.menu = "false";
	}else{
		document.querySelector("aside").querySelector("ul").style.right = "-2rem";
		asideMenu.dataset.menu = "true";
	}
}

sectionElement.onclick = function(){
	if(this.dataset.share == "true"){
		this.style.transition="all 1s";
		this.style.width="3.1rem";
		setTimeout(function(){
			document.querySelector("div").style.display = "block";
		},1000)
		this.dataset.share = "false";
	}else{
		this.style.transition="all 1s";
		this.style.width="0.8rem";
		this.querySelector("div").style.display = "none";
		this.dataset.share = "true";
	}
}