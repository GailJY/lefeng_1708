<?php
    //接收
    $username = isset($_GET['yh1'])?$_GET['yh1']:null;

    $list=array('abc','qwe','zxc');

    if(in_array($username,$list){
        echo "no";
    }else{echo "yes";}


?>