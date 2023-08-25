<?php
require_once "../StoryStatus.php";
require_once "../util/FilePathManager.php";
header("Content-Type: application/json");
header("charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$stat = file_get_contents(FilePathManager::STORY_STATUS_PATH);

if ($stat == false) {
	// waiting script
} else {
	$StoryStatus = new StoryStatus($stat);
	echo json_encode($StoryStatus->getNowStoryScript()->getData());
}