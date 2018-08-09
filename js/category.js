// 微信登录
_wxAuthToken = localStorage.getItem("wxAuthToken");
if(_wxAuthToken == null){
  _wxAuthToken = getQueryVariable("wxAuthToken");
  if(_wxAuthToken == null){
    wxlogin();
  } else {
    localStorage.setItem("wxAuthToken", _wxAuthToken);
  }
}
// localStorage.removeItem("wxAuthToken");


// 遮罩
var mask = document.getElementById("mask");

mask.onclick = function(){
  this.style.display = "none";
  shoppingList.style.display = "none";
  addCategory.style.display = "none";
  footer.style.display = "block"
}

var footer = document.getElementsByTagName("footer")[0];

// 购物车
var shopping = document.getElementById("shoppingcart");
var shoppingEm = shopping.getElementsByTagName("em")[0];
var shoppingList = document.getElementById("shopping_list");
var removeList = document.getElementById("remove");
var removeListEm = removeList.getElementsByTagName("em");
var shoppingListUl = shoppingList.getElementsByTagName("ul")[0];
var shoppingListLi = shoppingList.getElementsByTagName("li");

// 没有我想要的（点单）
var pointlist = document.getElementById("pointlist");
var addCategory = document.getElementById("add_category");
pointlist.onclick = function(){
  footer.style.display = "none";
  shoppingList.style.display = "none";
  mask.style.display = "block";
  addCategory.style.display = "block";
}



/**
 * 后端接口
 */
var API_PREFIX = "http://test.zhiliaokeji.com";

// 门类列表
var categoryList = document.getElementById("category_list");
var categoryLi = categoryList.getElementsByTagName("li");
var settlement = document.getElementById("settlement");
var iconP = document.getElementsByClassName("icon-p");
var iconPlus = document.getElementsByClassName("icon-plus");
var iconReduce = document.getElementsByClassName("icon-reduce");

var total_fee = 0;
var serviceChosenList = [];
var xmlhttp = new XMLHttpRequest;
xmlhttp.open("GET", API_PREFIX+"/backend/order/api/service", true);
xmlhttp.send();
xmlhttp.onreadystatechange = function(){
  if(xmlhttp.readyState==4 && xmlhttp.status==200){
    var data = JSON.parse(xmlhttp.responseText);
    var errElement = document.getElementById("error");
    if(!data.ok){
      errElement.style.display = "block";
      errElement.innerHTML = data.msg;
    }

    if(data.service_list.length == 0){
      errElement.style.display = "block";
    }

    // 获取service_list所有列表
    for(var i=0; i<data.service_list.length;i++){
      var dataList = data.service_list[i];
      categoryList.innerHTML += '<li data-name="'+dataList.name+'" data-unit-price="'+dataList.unit_price/100+'" data-unit="'+dataList.unit+'" data-count="0">'+
        '<img class="icon_logo" src="img/'+dataList.name.toLowerCase()+'.svg" alt="'+dataList.name.toLowerCase()+'" />'+
        '<article>'+
          '<h2>'+dataList.name+'</h2>'+
          '<p><em>¥'+dataList.unit_price/100+'</em>/<strong>'+dataList.unit+'</strong></p>'+
        '</article>'+
        '<section class="icon-p"><img src="img/icon_reduce.svg" class="icon-reduce" alt="减"/><em>0</em><img src="img/icon_plus.svg" class="icon-plus" alt="加"/></section>'+
      '</li>';
    }

    // 选中服务类别
    var offon = true;

    // 加
    for(var i=0;i<iconPlus.length;i++){
      iconPlus[i].onclick = function(){
        var parent = this.parentElement;
        var grandParent = parent.parentElement;
        var name = grandParent.dataset.name;
        grandParent.dataset.count++;
        var category = {
          "name": name,
          "unit_price": grandParent.dataset.unitPrice,
          "unit": grandParent.dataset.unit,
          "count": grandParent.dataset.count
        };
        total_fee += parseInt(category.unit_price*100);
        settlement.innerHTML = "&yen;" + total_fee/100;

        sessionStorage.setItem(name, JSON.stringify(category));
        shoppingEm.innerHTML = sessionStorage.length;
        parent.getElementsByTagName("em")[0].innerHTML = grandParent.dataset.count;
        offon = true;
      }
    }

    // 减
    for(var i=0;i<iconReduce.length;i++){
      iconReduce[i].onclick = function(){
        var parent = this.parentElement;
        var grandParent = parent.parentElement;
        var name = grandParent.dataset.name;
        if(grandParent.dataset.count != 0){
          grandParent.dataset.count--;
          var category = {
            "name": name,
            "unit_price": grandParent.dataset.unitPrice,
            "unit": grandParent.dataset.unit,
            "count": grandParent.dataset.count
          };
          if (grandParent.dataset.count == 0){
            sessionStorage.removeItem(name);
          } else{
            sessionStorage.setItem(name, JSON.stringify(category));
          }

          total_fee -= parseInt(category.unit_price*100);
          if(total_fee == 0) {
            settlement.innerHTML = "&yen;0";
          }else{
            settlement.innerHTML = "&yen;" + total_fee/100;
          }

          shoppingEm.innerHTML = sessionStorage.length;
          parent.getElementsByTagName("em")[0].innerHTML = grandParent.dataset.count;
        }
      }
    }

    // 显示选中服务类别列表
    shopping.onclick = function(){
      // console.log(sessionStorage.length)
      if(sessionStorage.length == 0){
        return false;
      }
      shoppingListUl.innerHTML = "";
      for(var i=0;i<sessionStorage.length;i++){
        var userJsonStr = sessionStorage.getItem(sessionStorage.key(i));
        userEntity = JSON.parse(userJsonStr);
        shoppingListUl.innerHTML += '<li data-name="'+userEntity.name+'" data-unit-price="'+userEntity.unit_price+'">'+
          '<p><img src="img/'+userEntity.name.toLowerCase()+'.svg" alt="'+userEntity.name.toLowerCase()+'" /><strong>'+userEntity.name+'</strong></p>'+
          '<p><em>¥'+userEntity.unit_price+'</em>/'+userEntity.unit+' 数量：'+userEntity.count+'</p>'+
          '<p class="delete"><img src="img/delete.svg" alt="删除" /></p>'+
        '</li>';
        shoppingEm.innerHTML =  shoppingListLi.length;
      }
      
      if(offon){
        shoppingList.style.display = "block";
        mask.style.display = "block";
        offon = false;
      }else{
        mask.style.display = "none";
        shoppingList.style.display = "none";
        offon = true;
      }

      // 删除购物车列表
      var deleteShoppingList = document.getElementsByClassName("delete");
      for(var i=0; i<deleteShoppingList.length; i++){
        deleteShoppingList[i].onclick =function(){
          var ed =this;
          this.parentNode.remove(this.parentNode);
          var parents = this.parentElement;
          var name = parents.dataset.name;
          var s = JSON.parse(sessionStorage.getItem(name));
          total_fee -= parseInt(parents.dataset.unitPrice*100) * s.count;
          sessionStorage.removeItem(name);
          shoppingEm.innerHTML = sessionStorage.length;

          for(var i=0; i<categoryLi.length; i++) {
            var c = categoryLi[i];
            if(c.dataset.name == name){
              c.dataset.count = 0;
              c.getElementsByClassName("icon-p")[0].getElementsByTagName("em")[0].innerHTML = 0;
            }
          }

          if(sessionStorage.length == 0){
            total_fee = 0;
            shoppingList.style.display = "none";
            mask.style.display = "none";
          }

          if(total_fee == 0) {
            settlement.innerHTML = "&yen;0";
          }else{
            settlement.innerHTML = "&yen;" + total_fee/100;
          }

        }
      }

      // 清空购物车
      removeListEm[0].onclick = function(){
        sessionStorage.clear();
        if(sessionStorage.length == 0){
          shoppingEm.innerHTML = sessionStorage.length;
          total_fee = 0;
          settlement.innerHTML = "&yen;" + total_fee/100;
          shoppingList.style.display = "none";
          mask.style.display = "none";
          for(var i=0; i<categoryLi.length; i++) {
            var c = categoryLi[i];
            c.getElementsByClassName("icon-p")[0].getElementsByTagName("em")[0].innerHTML = 0;
            c.dataset.count = 0;
          }
        }
      }
    }
  }
};

// 支付
settlement.onclick = function(){
  if(total_fee == 0){
    return false;
  }

  var details = [];
  for(var i=0; i<sessionStorage.length;i++){
    var data = JSON.parse(sessionStorage.getItem(sessionStorage.key(i)));
    var item = {
      "name": data.name,
      "count": parseInt(data.count)
    }
    details.push(item);
  }
  
  var user = localStorage.getItem("user");
  if(user == null){
    window.location.href = "/backend/wx/login/?next=/intelligence/";
  }
  wxpay(this.dataset.product, total_fee, details);
}


// 标语
var slogan = document.getElementById("slogan");
var sloganLogo = document.getElementById("slogan-logo");
var sloganImg = slogan.getElementsByTagName("img");

var sloganName = localStorage.getItem("sloganname");


if(sloganName == null){
  sloganName = 1;
  sloganShow();
}else{
  sloganImg.style.display = "block";
}

function sloganShow(){
  setTimeout(function(){
    slogan.style.opacity = "1";
  },500)
  setTimeout(function(){
    sloganImg[0].style.opacity = "1";
  },2000)
  setTimeout(function(){
    sloganImg[1].style.opacity = "1";
  },1500)
}

slogan.onclick = function(){
  this.style.opacity = "0";
  this.style.zIndex = "-1";
  for(var i=0; i<sloganImg.length; i++){
    sloganImg[i].style.opacity = "0";
  }
  sloganLogo.style.display = "block";
}

sloganLogo.onclick = function(){
  this.style.display = "none";
  slogan.style.zIndex = "3";
  sloganShow();
}