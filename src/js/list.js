$(window).scroll(function() {
    //$(document).scrollTop()    滚动条位置距页面顶部的距离；
    //$(document).height()         整个页面的总高度；
    //$(window).height()             当前窗口的高度；
    if ($(document).scrollTop() >= $(document).height() - $(window).height() && $(window).scrollTop()<=8000) {   //判断是否已经滚动到页面底部；
        // $("#loading").css("display", "block"); 
        console.log($(window).scrollTop())         
        $.ajax({                   
            url: '../api/data/goods3.json',  //请求路径，这里的路径是一个json文件；
            success: function(data) {        //当请求成功时执行的回调函数；
                var str = ""                                                                                         
                $.each(data, function(i, item) {       //遍历出来json里边的内容；i，表示当前遍历到第几条内容；item，表示当前遍历的对象；
                str +="<div data-id='"+item.id+"' class='pruwrap'><dl><dt><a><img src='"+item.imgurl+
                "'/></a></dt><dd class='nam'><a><span>"+item.name+
                "</span></a></dd><dd class='pri'><span class='price-tags'>￥</span><span class='price'>"+item.price+"</span><b>"+item.agio+
                "</b><del class='spri'>￥"+item.sale+"</del><a class='add-to-cart'>立即购买</a></dd></dl></div>"
                });
                     $(".makeup").append(str);           //把遍历到的内容追击到id为makeup的div中；
                    // $("#loading").css("display", "none");                                                 
                }
            });
        }

    }); 
 $(function(){
    $('#header').load('head.html');



 })          