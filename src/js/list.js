$(window).scroll(function() {
    //$(document).scrollTop()    滚动条位置距页面顶部的距离；
    //$(document).height()         整个页面的总高度；
    //$(window).height()             当前窗口的高度；
    var upprice=false;
    var uppdate=true;
    if ($(document).scrollTop() >= 0 && $(window).scrollTop()<=4800) {   //判断是否已经滚动到页面底部；
        // $("#loading").css("display", "block"); 
        console.log($(window).scrollTop())         
        $.ajax({                   
            url: '../api/data/goods3.json',  //请求路径，这里的路径是一个json文件；
            dataType:'json',
            success: function(data) {        //当请求成功时执行的回调函数；
                var str = ""                                                                                         
                $.each(data, function(i, item) {       //遍历出来json里边的内容；i，表示当前遍历到第几条内容；item，表示当前遍历的对象；
                str +="<div data-id='"+item.id+"' class='pruwrap'><dl><dt><a href='#'><img src='"+item.imgurl+
                "'/></a></dt><dd class='nam'><a href='#'><span>"+item.name+
                "</span></a></dd><dd class='pri'><span class='price-tags'>￥</span><span class='price'>"+item.price+"</span><b>"+item.agio+
                "</b><del class='spri'>￥"+item.sale+"</del><a class='add-to-cart' href='#'>立即购买</a></dd></dl></div>"
                
                });
                     $(".makeup").append(str);           //把遍历到的内容追击到id为makeup的div中；
                    // $("#loading").css("display", "none");  
                                $('.p1').on('click',function(){
                    if(upprice == false){
                        data.sort(function(a,b){
                            return a['agio']-b['agio'];
                        })
                    }
                })                                               
                }

          

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


   

    // p1.onclick = function(){
    //     if(upprice == false){
    //         list.sort(function(a,b){
    //             return a['sale']-b['sale'];
    //         })
    //     }
    // }


    //点击跳转
    var makeup = document.querySelector('.makeup');

    makeup.onclick = function(e){
        if(e.target.nodeName.toLowerCase() === 'dl'){
            let id = e.target.parentNode.dataset.id;

            location.href= '1.html?' + id;
        }
        e.preventDefault();
    }


 })