<?php
declare(strict_types=1);

require_once "../StoryScript.php";
require_once "../StoryStatus.php";

header("Content-Type: application/json");
header("charset: utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
if (empty($_POST)) exit();
$stat = file_get_contents(FilePathManager::STORY_STATUS_PATH);

if ($stat == false) exit();

$postdata = json_decode(file_get_contents('php://input'),true);
$story_stat = new StoryStatus($stat);
$story_stat->genNextStoryScript($postdata["left"],$postdata["right"]);
$stat = file_get_contents(FilePathManager::STORY_STATUS_PATH);
if ($stat == false) exit();
$story_stat = new StoryStatus($stat);
echo  json_encode($story_stat->getNowStoryScript()->getDataForDisplay());