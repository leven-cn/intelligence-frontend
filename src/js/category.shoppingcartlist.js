// 购车列表
var showShopping = document.getElementById("shoppingcart");
var mask = document.getElementById("mask");
var shoppingMallList = document.getElementById("shopping-mall");
var shoppingListUl = document.getElementById("shopping-mall-list");

// 显示购车列表
showShopping.onclick = function(){
  if(sessionStorage.length-1 == 0){
    return false;
  }
  mask.style.display = "block";
  shoppingMallList.style.display = "block";
  shoppingListUl.innerHTML = "";
  for(var i=0;i<sessionStorage.length-1;i++){
    var userJsonStr = sessionStorage.getItem(sessionStorage.key(i));
    userEntity = JSON.parse(userJsonStr);
    shoppingListUl.innerHTML += '<li data-name="'+userEntity.name+'" data-unit-price="'+userEntity.unitPrice+'" data-count="'+userEntity.count+'">'+
      '<img src="img/'+userEntity.name.toLowerCase()+'.svg" alt="'+userEntity.name.toLowerCase()+'" />'+
      '<h3>'+userEntity.name+'</h3>'+
      '<section><em>'+userEntity.count+'</em>'+userEntity.unit+'</section>'+
      '<button><img src="img/x.svg"/></button>'+
    '</li>'
  }

  // 删除购物车
  var deleteShoppingList = shoppingListUl.querySelectorAll("button");
  for(var i=0; i<deleteShoppingList.length; i++){
    deleteShoppingList[i].onclick =function(){
      this.parentNode.remove(this.parentNode);
      var parents = this.parentElement;
      var name = parents.dataset.name;
      var s = JSON.parse(sessionStorage.getItem(name));
      var total_fee = parseInt(sessionStorage.getItem("total_fee"));
      total_fee -= parseInt(parents.dataset.unitPrice*100) * s.count;
      sessionStorage.setItem("total_fee", total_fee);
      shoppingMallList.querySelector("h2").innerHTML = "<em>&yen;"+total_fee/100+"</em>元";
      sessionStorage.removeItem(name);

      var sumList = document.querySelector("header").querySelector("button").querySelector("em");
      sumList.innerHTML = sessionStorage.length-1;

      for(var i=0; i<categoryList.querySelectorAll("li").length; i++) {
        var c = categoryList.querySelectorAll("li")[i];
        if(c.dataset.name == name){
          c.querySelector("section").getElementsByTagName("em")[1].innerHTML = 0;
        }
      }

      if(sessionStorage.length-1 == 0){
        sumList.style.display = "none";
        shoppingMallList.style.display = "none";
        mask.style.display = "none";
      }
    }
  }
}



// 关闭购物车
mask.onclick = function(){
  this.style.display = "none";
  shoppingMallList.style.display = "none";
}




