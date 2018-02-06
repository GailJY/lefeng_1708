document.addEventListener('DOMContentLoaded',function(){

})


$(function(){
	$('#header').load('head.html');




	var price = 0;
	$('.dity-m').on('click',function(){
		price=$('#dity-input').val();
		if($('#dity-input').val()==2){
			return
		}else{
			price--;
		}
		
		$('#dity-input').val(price);
	})
	$('.dity-p').on('click',function(){
		price=$('#dity-input').val();
		price++;
		$('#dity-input').val(price);
	})


})