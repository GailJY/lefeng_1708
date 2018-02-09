<?php
	// 引入其他文件
	require('connect.php');//include 'connect.php'

	$tel = isset($_GET['tel']) ? $_GET['tel'] : null;
	$password = isset($_GET['password']) ? $_GET['password'] : null;

	// 判断用户名是否存在
	$data = $conn->query("select * from reg where password='$password'");


	if($data->num_rows == 0){
		// // 密码md5加密
		// $password = md5($password);
		
		// 写入数据sql语句
		$sql = "insert into reg(password,tel) values('$password','$tel')";
        echo $sql;
		$res = $conn->query($sql);

		if($res){
			echo "success";
		}else{
			echo "fail";
		}
	}
?>