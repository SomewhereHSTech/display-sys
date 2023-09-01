<?php

require_once "../util/FilePathManager.php";

header("Content-Type: application/json");
header("charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

echo file_get_contents(FilePathManager::WS_STATUS_PATH);