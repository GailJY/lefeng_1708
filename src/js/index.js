$(function(){

	//商品分类

	$('.all-goods .item').hover(function(){

		$(this).addClass('active').find('s').hide();

		$(this).find('.product-wrap').show();

	},function(){

		$(this).removeClass('active').find('s').show();

		$(this).find('.product-wrap').hide();

	});




	//轮播
      $('.mainbanner').each(function() {
          var $_root = $(this);
          var $window_b = $_root.find('.mainbanner_window');
          var $list = $_root.find('.mainbanner_list');
          var $items = $list.children();
          var $window_ul = $window_b.find('#slideContainer');
          var count = $items.length;
          var item_size = 2000;
          var dur_ms = 1000;
          var autoplay_interval = 3000;
          var cur_idx = 0;
          var fix_idx = function(_idx) {
              if (_idx < 0)
                  return (count - 1);
              if (_idx >= count)
                  return 0;
              return _idx;
          }
          var goto = function(_idx) {
              var idx = fix_idx(_idx);
              $items.eq(idx).addClass('active').siblings().removeClass('active');
              if (cur_idx != idx) {
                  var offset_x = -idx * item_size;
                  $window_ul.stop().animate({
                      'left': offset_x
                  }, dur_ms);
                  cur_idx = idx;
              }
          }
          $items.each(function(index, element) {
              var $cur_item = $(this);
              var $cur_a = $cur_item.find('a');
              $cur_a.data('index', index);
              $cur_a.mouseover(function() {
                  var index = $(this).data('index');
                  goto(index);
                  return false;
              });
          });

          var autoplay_flag = true;

          window.setInterval(function() {
              if (autoplay_flag) {
                  goto(cur_idx + 1);
              }
          }, autoplay_interval);

          $_root.hover(function() {
              autoplay_flag = false;
          }, function() {
              autoplay_flag = true;
          });
          goto(0);
      });



      //请求数据接口
        var url="./api/data/goods2.json";
      
        var list=$("#content2");
       
        var loadingBtn=$("#loading");
        //是否需要加载
        var isLoad =true;
        //当前查询第几页
        var currentPage = 1;
        //没有更多数据
        var nomore_Text = '';
        /*
            请求数据接口
        */
        function loadData(){
            //发送ajax
             $.ajax({
                 //url
                 url: url,
                 //请求方式
                 type:'POST',
                 async:false,
                 //参数
                 data: {currentPage:currentPage},
                 //成功回调
                 success: sucessCallback,
                 //失败回调
                 error: function(e, e2, e3){
                     //
                    alert('请求失败，原因：'+e3);
                }
             });
        }
        /*
            成功回调函数
        */
        function sucessCallback(data){
            //当前页自增
            currentPage++;
            //
            var html = '',result = data.list, len = result.length;
            //循环数据
            for(i=0;i<len;i++){
                var rs = result[i], name = rs.name,agio = rs.agio,id=rs.id,price = rs.price,sale = rs.sale,img = rs.imgurl;
            html+='<div class="pro-list pro-list-" data-id='+id+'><dl><dt class="pro-pic"><a href="html/detail.html?id='+id+'"><img src="'+img+
                '"/></a></dt><dd class="pro-nam"><a href="detail.html?id='+id+'"><b>'+agio+
                '</b><span>'+name+
                '</span></a></dd><dd class="pro-pri"><span class="price-tags">￥</span><span class="price">'+price+'</span><del class="spri">￥'+sale+'</del><a href="car.html"></a><button class="add-to-cart">加入购物车</button></dd></dl></div>';
            }
            //渲染数据
            list.append(html);
            //接口是否查询完毕
            if(data.pageCount == data.pageNo || currentPage > data.pageCount){
                //数据全部加载完毕
            isLoad = false;
            //
            loadingBtn.html(nomore_Text);
            }
        }
        /*
            判断是否要加载接口
        */
        function isScrollLoad(){
            //加载更多距离
            var btn_top = loadingBtn.offset().top;
            //窗体高度
            var window_height = $(window).height();
            //滚动距离
            var scroll_Top = $(window).scrollTop();
            //加载更多高度
            var loading_height = loadingBtn.height();
            //是否需要加载(底部距离是否小于窗口高度+滚动的距离)
            return btn_top < scroll_Top + window_height - (loading_height - 5) ? true : false;
        }
        /*
            滚动事件监听
        */
        $(window).scroll(function(){
            //是否滚动到底部
            var _needload = isScrollLoad();
            //
            if(_needload && isLoad){
                //加载数据
            loadData();
            }
        });
        
        /*
            页面加载完毕执行一次查询
        */
        window.onload = function(){
            //加载数据
            loadData(); 
        };
        
        /*
            点击加载更多
        */
        loadingBtn.click(function(){
            //是否加载数据
            if(isLoad)
                loadData();
        });



     
      // console.log($(window).scrollTop())





 $("#scroll-to-top").click(function() {
      $("html,body").animate({scrollTop:0}, 400);
  }); 





 var offset = $(".shopcar").offset(); 
  $("#content2").click('button',function(event){  
    var addcar = $(this);
    var img = addcar.parent().parent().find('.pro-pic img').attr('src');
    var flyer = $('<img class="u-flyer" src="'+img+'">');
    console.log(img)
    flyer.fly({
      start: {
        left: event.pageX-500,
        top: event.pageY-500
      },
      end: {
        left: offset.left+30,
        top: offset.top+30,
        width: 0,
        height: 0
      },
     
    });
  });







});

document.addEventListener('DOMContentLoaded',function(){
	let content = document.querySelector('#content');
  let main = document.querySelector('.main');
  console.log(main)
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			var goodlist =JSON.parse(xhr.responseText)

			var div = document.createElement('div');	
			div.className = 'content content-l'
			div.innerHTML = goodlist.map(function(item,idx){
				return`
					<div class="con-pro-${idx+1} pro-list">
					<a href="#"><img src="${item.imgurl}" alt="" /></a>	
					<i></i>
					<a href="#"><h4><b>${item.agio} /</b>${item.name}</h4></a>
					<span><strong>￥${item.price}</strong><b>￥${item.sale}</b></span>
					<a href="#" class="add-to-cart hide">加入购物车	</a>
					</div>	
				`
			}).join('');

			content.appendChild(div);
		}
	}

	xhr.open('get','api/data/goods.json',true);

	xhr.send();



	let content1 = document.querySelector('#content1');

	var xhr_1 = new XMLHttpRequest();

	xhr_1.onreadystatechange = function(){
		if(xhr_1.readyState === 4){
			var goodslist1 = JSON.parse(xhr_1.responseText)
			var div1 = document.createElement('div');
			div1.className = 'content content-2';
			div1.innerHTML = goodslist1.map(function(item,idx){
				return`
					<div class="brand-item">
						<a href="#"><img src="${item.imgurl}"/>
						<div class="pms-wrap"><p>${item.name}</p></div>
						</a>
						<p class="brand-info"><span>${item.agio}</span>${item.title}</p>
					</div>
				`
			}).join('');

			content1.appendChild(div1);
		}
	}

	xhr_1.open('get','api/data/goods1.json',true);

	xhr_1.send();




	// let content2 = document.querySelector('#content2');

	// var xhr_2 = new XMLHttpRequest();

	// xhr_2.onreadystatechange = function(){
	// 	if(xhr_2.readyState === 4){
	// 		var goodslist2 = JSON.parse(xhr_2.responseText).list
	// 		var div2 = document.createElement('div');
	// 		div2.className = 'content content-3';
	// 		div2.innerHTML = goodslist2.map(function(item,idx){
	// 			return`
	// 				<div class="pro-list pro-list-" data-id="${item.id}">
	// 					<dl>
	// 						<dt class="pro-pic"><img src="${item.imgurl}" alt="" /></dt>
	// 						<dd class="pro-nam"><b>${item.agio}/</b><a href="#">${item.name}</a></dd>
	// 						<dd class="pro-pri"><span>￥</span><span>${item.price}</span><b>￥${item.sale}</b><button class="add-to-cart1 hide">加入购物车</button></dd>
	// 					</dl>
	// 				</div>
	// 			`
	// 		}).join('');

	// 		content2.appendChild(div2);
	// 	}
	// }

	//xhr_2.open('get','api/data/goods2.json',true);

	//xhr_2.send();



	//点击跳转
    content2.onclick = function(e){
            if(e.target.nodeName.toLowerCase() === 'img'){console.log(666)
                let id = e.target.parentNode.parentNode.parentNode.dataset.id;
               
               
                location.href= 'html/detail.html?' + id;
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

carcookie();
    function carcookie(){
              // 用于保存购物车商品信息

              var carList = [];


              var cookies = document.cookie.split('; ');
              for(var i=0;i<cookies.length;i++){
                  var arr = cookies[i].split('=');
                  if(arr[0] === 'carList'){
                      carList = JSON.parse(arr[1]);
                  }
              }   

              content2.onclick = function(e){
                  e = e || window.event;
                  var target = e.target || e.srcElement;
                  
                  if(target.tagName.toLowerCase() === 'button'){

                      var currentLi = target.parentNode.parentNode.parentNode;
                      
                      var children = currentLi.children[0].children;
                      var currentGUID = currentLi.getAttribute('data-id');

                      console.log(children)
                      var goodsObj = {};
                      goodsObj.guid = currentGUID;
                      goodsObj.qty = 1;
                      goodsObj.name = children[1].children[0].children[1].innerHTML;
                      goodsObj.price = children[2].children[1].innerHTML;
                      goodsObj.imgUrl = children[0].children[0].children[0].src;
                      console.log(goodsObj.imgUrl)
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
            }



            // main.onclick = e=>{
            //     if(e.target.tagName.toLowerCase()==='button'){
            //         // 获取当前所在li
            //         let currentLi = e.target.parentNode.parentNode;
                    
            //         // 1>复制当前商品图片(用于实现动画效果)
            //         let currentImg = currentLi.children[0].children[0].querySelector('img');console.log(currentImg);
            //         let copyImg = currentImg.cloneNode();

            //         // 把复制的图片写入页面，并设置样式（定位到当前商品图片所在的位置）
            //         copyImg.style.position = 'absolute';
            //         copyImg.style.left = currentImg.offsetLeft + 'px';
            //         copyImg.style.top = currentImg.offsetTop + 'px';
            //         copyImg.style.width = currentImg.clientWidth + 'px';

            //         document.body.appendChild(copyImg);

            //         let target = {
            //             left:shopcar.offsetLeft+shopcar.offsetLeft,
            //             top:shopcar.offsetTop+shopcar.offsetTop + shopcar.offsetHeight,
            //             width:10
            //         }
            //         animate(copyImg,target,()=>{
            //             // 2>复制当前商品所有信息(用于往购物车添加)，等飞入动画完成后添加到购物车
            //             let copyLi = currentLi.cloneNode(true);

            //             // 2)删除购物车中的“添加到购物车”按钮

            //             shopcar.appendChild(copyLi);
            //             let btnAdd2Car = copyLi.querySelector('button').parentNode;
            //             copyLi.removeChild(btnAdd2Car);

            //             // 3)在购物车列表中添加移除按钮
            //             let btnDel = document.createElement('span');
            //             btnDel.innerHTML = '&times;'
            //             btnDel.className = 'btn-close';
            //             copyLi.appendChild(btnDel);

            //             // 删除动画图片
            //             document.body.removeChild(copyImg);
            //         });

            //     }
            // }





      
})