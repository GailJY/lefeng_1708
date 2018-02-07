<?php

$id=isset($_GET['id'])? $_GET['id']:'';

$path="data/goods1.json";

$file=fopen($path,'r');

$content=fread($file, filesize($path));

$content=json_decode($content);
$obj;

for($i=0;$i<count($content);$i++){
    if($content[$i]->id ===$id){
        $obj=$content[$i];
        break;
    }
}
fclose($file);

echo json_encode($obj,JSON_UNESCAPED_UNICODE);


?>