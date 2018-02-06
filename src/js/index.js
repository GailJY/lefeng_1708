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
        //渲染数据集合dom
        var list=$("#list");
        //加载更多dom
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
            var html = '',result = data.list, len = result.length,i = 0;
            //循环数据
            for(; i<len;i++){
                var rs = result[i], title = rs.title,id=rs.id,desc = rs.desc;
            html+='<li data-id="'+id+'" title="'+desc+'">'+title+'</li>';
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
         loadData();
        /*
            点击加载更多
        */
        loadingBtn.click(function(){
            //是否加载数据
            if(isLoad)
                loadData();
        });



     
      console.log($(window).scrollTop())
 // if($(document).scrollTop()>=200){
 //        $('#scroll-to-top').css({'display':'block'})
 //      }else{
 //        $('#scroll-to-top').css({'display':'none'})
 //      }


        $('#pagefooter').load('html/footer.html');





 $("#scroll-to-top").click(function() {
      $("html,body").animate({scrollTop:0}, 400);
  }); 




});

document.addEventListener('DOMContentLoaded',function(){
	let content = document.querySelector('#content');

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




	let content2 = document.querySelector('#content2');

	var xhr_2 = new XMLHttpRequest();

	xhr_2.onreadystatechange = function(){
		if(xhr_2.readyState === 4){
			var goodslist2 = JSON.parse(xhr_2.responseText).list
			var div2 = document.createElement('div');
			div2.className = 'content content-3';
			div2.innerHTML = goodslist2.map(function(item,idx){
				return`
					<div class="pro-list pro-list-" data-id="${item.id}">
						<dl>
							<dt class="pro-pic"><a href="#"><img src="${item.imgurl}" alt="" /></a></dt>
							<dd class="pro-nam"><b>${item.agio}/</b><a href="#">${item.name}</a></dd>
							<dd class="pro-pri"><span>￥${item.price}</span><b>￥${item.sale}</b><a href="#" class="add-to-cart hide">加入购物车</a></dd>
						</dl>
					</div>
				`
			}).join('');

			content2.appendChild(div2);
		}
	}

	xhr_2.open('get','api/data/goods2.json',true);

	xhr_2.send();



	//点击跳转
    content2.onclick = function(e){
            if(e.target.nodeName.toLowerCase() === 'img'){console.log(666)
                let id = e.target.parentNode.parentNode.parentNode.dataset.id;
               
               
                location.href= '1.html?' + id;
}



            }


      
})