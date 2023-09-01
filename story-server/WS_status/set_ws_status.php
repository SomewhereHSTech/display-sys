<?php
require_once "../util/FilePathManager.php";

file_put_contents(FilePathManager::WS_STATUS_PATH,$_POST["url"]);
echo "wrote: ".$_POST["url"];