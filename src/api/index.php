<?php

$path="data/goods.json";
$file=fopen($path,'r');
$content=fread($file, filesize($path));
fclose($file);
echo $content;

?>