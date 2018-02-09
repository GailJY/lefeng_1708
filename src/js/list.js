$(window).scroll(function() {
    //$(document).scrollTop()    滚动条位置距页面顶部的距离；
    //$(document).height()         整个页面的总高度；
    //$(window).height()             当前窗口的高度；
    var upprice=false;
    var uppdate=true;
    if ($(document).scrollTop() >= 200 && $(window).scrollTop()<=4800) {   //判断是否已经滚动到页面底部；
        // $("#loading").css("display", "block"); 
        console.log($(window).scrollTop())         
        $.ajax({   
            async:false,                
            url: '../api/data/goods3.json', 
            dataType:'json',
            success: function(data) {        
                var str = ""                                                                                         
                $.each(data.shop, function(i, item) {       
                str +="<div data-id='"+item.id+"' class='pruwrap'><dl><dt><a href='detail.html?id="+item.id+"'><img src='"+item.imgurl+
                "'/></a></dt><dd class='nam'><a href='detail.html?id="+item.id+"'><span>"+item.name+
                "</span></a></dd><dd class='pri'><span class='price-tags'>￥</span><span class='price'>"+item.price+"</span><b>"+item.agio+
                "</b><del class='spri'>￥"+item.sale+"</del><a class='add-to-cart' href='car.html'>立即购买</a><button>加入购物车</button></dd></dl></div>"
                
                });
                     $(".makeup").append(str);           //把遍历到的内容追击到id为makeup的div中；
                    // $("#loading").css("display", "none");  
                               
                                                             
                }

          $('#scroll-to-top').css("display",'block');

            });
        }

    }); 




 $(function(){
    $('#header').load('head.html');

    $('#footer').load('footer.html');


         $("#scroll-to-top").click(function() {
      $("html,body").animate({scrollTop:0}, 500);
   
  }); 


    if($(document).scrollTop() >=500){
        $('#scroll-to-top').css('display','block');
      }else{
        $('#scroll-to-top').hide();
      }

 });          

 document.addEventListener('DOMContentLoaded',function(){
    let p1 = document.querySelector('.p1');
    let p2 = document.querySelector('.p2');
    let p3 = document.querySelector('.p3');
    var upprice=false;
    var uppdate=true;
    




    //点击跳转
    var makeup = document.querySelector('.makeup');

    // makeup.onclick = function(e){
    //     if(e.target.nodeName.toLowerCase() === 'img' || e.target.nodeName.toLowerCase() === 'span'){
    //         let id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.id;

    //         location.href= 'detail.html?shopid=' + id;
    //     }
    //     e.preventDefault();
    // }



// 用于保存购物车商品信息
var carList = [];


var cookies = document.cookie.split('; ');
for(var i=0;i<cookies.length;i++){
    var arr = cookies[i].split('=');
    if(arr[0] === 'carList'){
        carList = JSON.parse(arr[1]);
    }
}   

makeup.onclick = function(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    if(target.tagName.toLowerCase() === 'button'){

        var currentLi = target.parentNode.parentNode.parentNode;
        
        var children = currentLi.children[0].children;
        var currentGUID = currentLi.getAttribute('data-id');

        console.log(currentLi)
        var goodsObj = {};
        goodsObj.guid = currentGUID;
        goodsObj.qty = 1;
        goodsObj.name = children[1].children[0].children[0].innerHTML;
        goodsObj.price = children[2].children[0].nextSibling.innerHTML;
        goodsObj.imgUrl = children[0].children[0].children[0].src;
        console.log(goodsObj.price)
        if(carList.length===0){
            carList.push(goodsObj);
        }else{

            for(var i=0;i<carList.length;i++){

                if(carList[i].guid === currentGUID){
                    carList[i].qty++;
                    break;
                }
            }

            if(i===carList.length){
                carList.push(goodsObj);
            }
        }

        document.cookie = 'carlist=' + JSON.stringify(carList);
    }
}

        var scroll_to_top = document.getElementById('scroll-to-top');
var shopcar = document.getElementsByClassName('shopcar')[0];
    window.onscroll =function(){

      if(window.scrollY > 1000){
        scroll_to_top.style.display = 'block';
        shopcar.style.display = 'block';
      }
      else{
        scroll_to_top.style.display = 'none';
        shopcar.style.display = 'none';
      }
    }


 })