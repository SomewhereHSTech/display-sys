<?php
require_once "StoryStatus.php";


class StoryScript {

	private string $raw_data;
	private array $data;
	private StoryStatus $status;

	public function __construct(string $raw_data,StoryStatus $status){
		$this->data = json_decode($raw_data,true);
		$this->raw_data = $raw_data;
		$this->status = $status;
	}

	private function getHash(){
		return md5($this->raw_data);
	}

	public function getRouteLeft() :string{
		return $this->data["route"]["left"];
	}

	public function getRouteRight() :string{
		return $this->data["route"]["right"];
	}

	public function getData() : array{
		$result = $this->data;
		$result["hash"] = $this->getHash();
		$result["next_update"] = ($this->status->getNextRouteConfirm()+rand(1,5));
		return $result;
	}

	public function getDataForDisplay() :array{
		$result = array();
		$result["left"] = [
			"text" => $this->data["route"]["left_disp"]
		];
		$result["right"] = [
			"text" => $this->data["route"]["right_disp"]
		];
		$result["update"] = $this->status->getNextRouteConfirm();
		return $result;
	}
}