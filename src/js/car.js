
document.addEvnetListener('DOMContentLoaded',function(){



var oCarList = document.getElementsByClassName('carList')[0];
var oSubPrice = oCarList.parentElement.nextElementSibling;
var btnClear = document.getElementById('btnClear');
console.log(oSubPrice)
var carList;
var cookies = document.cookie.split('; ');
for(var i=0;i<cookies.length;i++){
var arr = cookies[i].split('=');
if(arr[0] === 'carlist'){
console.log(JSON.parse(arr[1]));
carList = JSON.parse(arr[1]);
}
}

var subPrice = 0;

if(carList){
var ul = document.createElement('tbody');
for(var i=0;i<carList.length;i++){
var li = document.createElement('tr');
// 给每个li添加data-guid属性
li.setAttribute('data-id',carList[i].guid);

// 商品图片
var title = document.createElement('td');
var strong = document.createElement('strong');
var img = document.createElement('img');


img.src = carList[i].imgUrl;

// strong.appendChild(img);
console.log(title)
// title.appendChild(strong);
title.appendChild(strong);
strong.appendChild(img);
// 商品名


var p = document.createElement('p');
p.innerHTML = carList[i].name;
title.appendChild(p);
// 商品价格
var price = document.createElement('td');
price.className = 'price';
price.innerHTML = carList[i].price
 // + '&times;' + carList[i].qty;
//商品数量
var qty = document.createElement('td');

qty.innerHTML = carList[i].qty;



// 添加删除按钮
var btnClose = document.createElement('span');
btnClose.innerHTML = '&times;';
btnClose.className = 'btn-close';
console.log(btnClose)
// 计算总价
subPrice += carList[i].price*carList[i].qty;
console.log(subPrice)
li.appendChild(title);

li.appendChild(price);
li.appendChild(qty);
li.appendChild(btnClose);

ul.appendChild(li);
}

// 写入页面
oCarList.appendChild(ul);

// 写入总价
// toFixed(n)获取小数点后n位（自动四舍五入，Number类型的方法）
oSubPrice.innerHTML = '<span class="price">' + subPrice.toFixed(2) + '</span>';
}


// 删除商品
oCarList.onclick = function(e){
e = e || window.event;
var target = e.target || e.srcElement;

// 是否点击了删除按钮
if(target.className === 'btn-close'){
var currentLi = target.parentElement;
console.log(currentLi)
// 获取当前guid
var currentGUID = currentLi.getAttribute('data-id');

// 删除cookie中对应的商品
// 根据guid取对比
for(var i=0;i<carList.length;i++){
// 找出要删除的商品
if(carList[i].guid === currentGUID){
carList.splice(i,1);
break;
}
}

// 更新cookie
document.cookie = 'carlist=' + JSON.stringify(carList);

// 删除li节点
currentLi.parentElement.removeChild(currentLi);
}
}

// 清空购物车
// 1、删除DOM节点
// 2、删除cookie
btnClear.onclick = function(){
oCarList.innerHTML = '';
oSubPrice.innerHTML = '';

// 利用设置有效期位过期事件来达到删除cookie的效果
var now = new Date();
now.setDate(now.getDate()-7);
document.cookie = 'carlist=xx;expires=' + now;
}




})

