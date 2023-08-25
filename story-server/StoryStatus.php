<?php

require_once "StoryScript.php";
require_once "util/FilePathManager.php";

class StoryStatus {

	private int $route_need_time = 900;  // 900seconds = 15min.

	private int $start_time;
	private array $data;

	public function __construct(string $raw_data){
		$this->data = json_decode($raw_data,true);
		$this->start_time = $this->data["start_time"]; // UNIX TIME
	}

	public function genNextStoryScript(int $left, int $right) : void {
		if ($left > $right) {
			$this->addRoute($this->getNowStoryScript()->getRouteLeft());
		}else {
			$this->addRoute($this->getNowStoryScript()->getRouteRight());
		}
	}

	private function addRoute(string $route) :void{
		$this->data["route"][] = $route;
		file_put_contents(FilePathManager::STORY_STATUS_PATH,json_encode($this->data));
	}

	public function getNextRouteConfirm() : int {
		return $this->start_time + (count($this->data["route"]) * $this->route_need_time);
	}

	public function getNowStoryScript() : StoryScript {
		$route_latest = $this->data["route"][count($this->data["route"])-1];
		$file = file_get_contents(FilePathManager::STORY_SCRIPT_PATH.$route_latest.".json",true);
		return new StoryScript($file,$this);
	}
	/**
	 * @return int
	 */
	public function getRouteNeedTime(): int {
		return $this->route_need_time;
	}


}