<?php
	/*
		分页获取数据
		参数：
			* pageNo:分页，默认第一页
			* qty:每页显示数量，默认显示10个

			pageNo => index
			1	 =>	0
			2	 => 10
			3	 => 20
			index = (pageNo-1)*qty
	 */
	
	// get请求
	// $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	// $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;

	// post请求
	$pageNo = isset($_REQUEST['pageNo']) ? $_REQUEST['pageNo'] : 1;
	$qty = isset($_REQUEST['qty']) ? $_REQUEST['qty'] : 10;	

	// 读取文件
	// 1.打开文件
	// 2.读取内容
	// 		* filesize()
	$file_path = 'data/goods.json';

	$file = fopen($file_path, 'r');

	$content = fread($file, filesize($file_path));

	// 把json字符串转成数组
	$arr = json_decode($content);


	// 设置返回数据信息
	// * 总数total
	// * 数据data
	// * 分页page
	// * 每页数量qty
	$res = array(
		'data' => array_slice($arr, ($pageNo-1)*$qty,$qty), 
		'total' => count($arr),
		'pageNo' => $pageNo,
		'qty' => $qty
	);
	fclose($file);


	// 把相应的数据传给前端
	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>