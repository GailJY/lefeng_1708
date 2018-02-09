document.addEventListener('DOMContentLoaded',function(){
			var tab = document.getElementsByClassName('f-service')[0];
			var tabItem = tab.children[1].children;
			var tabItem1 = tabItem.children;
			var tabContent = tab.children[2].children;
			console.log(tabItem)


			var len = tabItem.length;

			for(var i=0;i<len;i++){
				if(i===0){
					tabItem[i].className='f-s-img1';
				}else{
					tabContent[i].style.display='none';
				}

		
				(function(i){
					tabItem[i].onmouseover = function(){
						// * 高亮显示当前tab,去除其他高亮
						// * 切换相应的图片，隐藏其他图片
						console.log()

						for(var j=0;j<len;j++){
							if(j === i){
								tabItem[j].className = 'f-s-img1';
								// tabItem[j].className = 'h';
								tabContent[j].style.display = 'block';
							}else{
								tabItem[j].className = '';
								tabContent[j].style.display = 'none';
							}
						}
					}
				})(i)

			}



})


$(function(){
	$('#header').load('head.html');

	$('#foot').load('footer.html');


	var price = 0;
	$('.bigpro').on('click','.dity-m',function(e){
		price=$('#dity-input').val();
		if($('#dity-input').val()==2){
			return
		}else{
			price--;
		}
		
		$('#dity-input').val(price);
	})
	$('.bigpro').on('click','.dity-p',function(e){
		price=$('#dity-input').val();
		price++;
		$('#dity-input').val(price);
	})
	
console.log($('.dity-m'))

	



  //获取url中的参数
  function getUrlParam(name) {
   	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   	var r = window.location.search.substr(1).match(reg); //匹配目标参数
   	if (r != null) return unescape(r[2]);  //返回参数值
  	}
  //接收URL中的参数
  	var id = getUrlParam('id');
  	console.log(id);
  	$.ajax({
  		async:false,
  		url:'../api/data/goods3.json',
		dataType:'json',
		success:function(res,status){
		console.log(status)
	$.each(res.shop, function(idx,item) {
		    //根据id获取详情数据
		    if(id == item.id){
		     var str = "<dl><dd class='dity-brand-time'><span class='dity-brand-logo'><img src='../img/buy-logo.jpg'></span></dd><dd><h1><i>蜂购全球</i>"+item.name
		     +"</h1><p>两件起售，韩方成分，掀起健康染发新风潮（新旧包装随机发货）</p></dd><dt><div class='dity-pic' id='dity-pic'><div class='sm'><img src="+item.imgurl2+"></div><div class='big'></div><div class='dity-tags'><span>染发</span><span>中药</span><div class='dity-share'></div></div><div class='dity'><div class='dity-cont'><div class='dity-price-c'><span class='dity-title'>价格</span><span><b class='lighten'>￥</b><strong>"+item.price
		     +"</strong><b class='dity-countdown'>"+item.agio+"</b><b class='markPrices-s'>￥"+item.sale
		     +"</b></span></div><div class='dity-promotions'><span class='dity-title'>优惠</span><div class='dity-prts'><div class='dity-promotion'><i class='l2'></i>满159减30上不封顶</div></div></div><div class='dity-sendtime'><span class='dity-title'>配送</span><span class='dity-send-time'>预计<span style='color:red'>2月11日</span>送达</span></div><div class='dity-size clearfix'><ol><li class='dity-size-l'>购买数量</li><li class='dity-size-r'><span class='dity-m'></span><input type='text' id='dity-input' value='2'/><span class='dity-p'></span></li><li class='dity-size-x' style='margin-left:10px'>2件起售</li><li class='dity-size-x'></li></ol></div><a href='car.html' id='qianggou' class='db2'><b class='add-to-cart'>立即购买</b></a><span class='pollen-text'>购买最多可获得<b>22个</b>花粉</span></div></div></dt></dl>"
		     console.log('index:'+idx);
		    }
		    $('.bigpro').append(str);
		   });
		  }
		  

	
})




//内容信息导航吸顶
		
			var navHeight= $("#detail-nav").offset().top; 
			// var navFix=$("#nav-wrap"); 
			$(window).scroll(function(){ 
				if($(this).scrollTop()>navHeight){ 
					$('#detail-nav').css({'position':'fixed','top':'0'}) 
				} 
				else{ 
					$('#detail-nav').css({'position':'absolute','top':'820px'})
				} 
				}) 









			})









