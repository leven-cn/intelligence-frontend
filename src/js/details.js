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