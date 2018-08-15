// 购物车增加/删除事件处理函数
function _addRemoveItemEventHandler(itemList){
  for(var i=0; i<itemList.length; i++){
    e = itemList[i].getElementsByTagName("section")[0].getElementsByTagName("em");
    var sumList = document.querySelector("header").querySelector("button").querySelector("em");
    // 删除
    e[0].onclick = function(){
      var item = this.parentElement.parentElement.dataset;
      var count = 0;
      var c = sessionStorage.getItem(item.name);
      if( c != null ){
        c = JSON.parse(c);
        count = parseInt(c.count) - 1;
        var category = {
          "name": item.name,
          "unitPrice": item.unitPrice,
          "unit": item.unit,
          "count": count
        };
        if (category.count == 0){
          sessionStorage.removeItem(item.name);
        }else{
          sessionStorage.setItem(item.name, JSON.stringify(category));
        }
        var total_fee = parseInt(sessionStorage.getItem("total_fee"));
        total_fee -= category.unitPrice*100;
        sessionStorage.setItem("total_fee", total_fee);
        if(sessionStorage.length-1 == 0){
          sumList.style.display = "none";
        }
        sumList.innerHTML = sessionStorage.length-1;
        this.parentElement.getElementsByTagName("em")[1].innerHTML = count;
      }
    }
  
    // 增加
    e[2].onclick = function(){
      sumList.style.display = "block";
      var item = this.parentElement.parentElement.dataset;
      var count = 0;
      var c = sessionStorage.getItem(item.name);
      if(c == null){
        count = 1;
      }else{
        c = JSON.parse(c);
        count = parseInt(c.count) + 1;
      }
      var category = {
        "name": item.name,
        "unitPrice": item.unitPrice,
        "unit": item.unit,
        "count": count
      };
      this.parentElement.getElementsByTagName("em")[1].innerHTML = count;
      sessionStorage.setItem(item.name, JSON.stringify(category));
      
      sumList.innerHTML = sessionStorage.length-1;
      var total_fee = parseInt(sessionStorage.getItem("total_fee"));
      total_fee += category.unitPrice*100;
      sessionStorage.setItem("total_fee", total_fee);
    }
  } 
}


/**
 * 后端接口: 显示服务列表
 */
function displayServiceList(categoryList, category){
  category = category || "";

  var xmlhttp = new XMLHttpRequest;
  xmlhttp.open("GET", API_PREFIX+"/backend/order/api/service/?category="+category, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var data = JSON.parse(xmlhttp.responseText);
      var errElement = document.getElementsByTagName("main")[0].getElementsByTagName("section")[1];
      var h2Element = document.getElementsByTagName("h2")[0];
      if(!data.ok){
        errElement.style.display = "block";
        errElement.innerHTML = data.msg;
      }else{
        if(data.service_list.length == 0){
          errElement.style.display = "block";
          errElement.innerHTML = "暂无服务选择";
        }else{
          errElement.style.display = "none";
          
          // 获取service_list所有列表
          categoryList.innerHTML = "";
          for(var i=0; i<data.service_list.length;i++){
            var dataList = data.service_list[i];
            categoryList.innerHTML += '<li data-name="'+dataList.name+'" data-unit-price="'+dataList.unit_price/100+'" data-unit="'+dataList.unit+'">'+
              '<img src="img/'+dataList.name.toLowerCase()+'.svg" alt="'+dataList.name.toLowerCase()+'"/>'+
              '<p><em>&yen;'+dataList.unit_price/100+'</em>/'+dataList.unit+'</p>'+
              '<section><em>-</em><em>0</em><em>+</em></section>'+
            '</li>';            
          }
          var itemList = categoryList.getElementsByTagName("li");
          itemList[0].className = "active";
          h2Element.innerHTML = data.service_list[0].name;
          _addRemoveItemEventHandler(itemList);
          sessionStorage.setItem("total_fee", "0");
        }
      }
    }
  }
}

