<?php

require_once "FilePathManager.php";

class ScriptsUtil {

	public const initial_script_name = "";

	static public function resetStotyStats() :void{
		$new = [
			"start_time" => time(),
			"route" => [
				self::initial_script_name
			]
		];

		file_put_contents(FilePathManager::STORY_STATUS_PATH,json_encode($new));
	}

}