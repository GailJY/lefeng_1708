document.addEventListener('DOMContentLoaded',function(){
	var form=document.querySelector('form');
	var tel=document.querySelector('#tel');
	var password=document.querySelector('#password');
	var repassword=document.querySelector('#repassword');

	var tels = document.querySelector('.tels');
	var ps = document.querySelector('.ps');
	var ps1 = document.querySelector('.ps1');

	form.onsubmit=function(e)
        {
            
            var password=checkPassWord();
            if(!password)
            {
                return false;
            }
            var rePassWord=checkRePassWord();
            if(!rePassWord)
            {
                return false;
            }
      
     
            var tel=checkTel();
            if(!tel)
            {
                return false;
            }
          
        };

        // if(tel.onfocus){
        // 	tels.style.display = 'block';
        // }else{
        // 	tels.style.display = 'none';
        // }



      // //onblur失去焦点事件 

      tel.onblur=function(e)
        {
            checkTel();
        };

      password.onblur=function(e)
        {
            checkpassword();
        };

      repassword.onblur=function(e)
        {
            checkrepassword();
        };

       



        //手机号（）
        function checkTel(e)
        {
            if(tel.value.length==0)
            {
                tels.innerText='手机号不能为空';
                
                return false;
            }
            var pattern=/^1[34578]\d{9}$/;
            if(!pattern.test(tel.value))
            {
                tels.innerText='手机号码格式错误，请重新输入';
            
                return false;
            }
            tels.innerText='手机号输入正确';
            
            return true;
        }






         //登录密码
        function checkpassword(e)
        {
            if(password.value.length==0)
            {
                ps.innerText='密码不能为空';
           
                return false;
            }
            var pattern=/^[A-Za-z0-9]{6,16}$/;
            if(!pattern.test(password.value))
            {
                ps.innerText='密码不符合格式，请重新输入';
           
                return false;
            }
            	ps.innerText='密码输入正确';
            
            return true;
        }


        //重复登录密码
        function checkrepassword(e)
        {
            if(repassword.value.length==0)
            {
                ps1.innerText='重复密码不能为空';

                return false;
            }
            if(repassword.value!=password.value)
            {
                ps1.innerText='两次输入的密码不一致，请重新输入';

                return false;
            }
            	ps1.innerText='两次密码一致';

            return true;
        }

       

})


$(document).ready(function(){
        $("#tel").focus(function(){
            $('.tels').css({"display":'block'});
        });
  		$('#password').focus(function(){
  			$('.ps').css({'display':'block'});
  		})
  		$('#repassword').focus(function(){
  			$('.ps1').css({'display':'block'});
  		})
  		


        $('.btnReg').on('click',function(){
            
                
                $.ajax({
                    url:'../mysql/reg.php',
                    dataType:'json',
                    data:{
                        tel:$('#tel').val(),
                        password:$('#password').val()
                    },
                    success:function(data){
                        console.log(data);
                        if(data === 'null'){
                            location.href = 'login.html';
                        }else if(data === 'fail'){
                            $('#tel').css({'color':'red'});
                        }
                    }
        })
                
            })
        })