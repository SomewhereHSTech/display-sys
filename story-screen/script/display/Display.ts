import {TreeEffect} from "./TreeEffect.js";
import {CountDisplay} from "./CountDisplay.js";
import {SelectText} from "./SelectText.js";

import {FileManager} from "../resource/FileManager.js";

export class Display {

    public readonly treeEffect :TreeEffect;

    public readonly countDisplay :CountDisplay;

    public readonly selectText :SelectText;


    constructor(Select_prefix :"L"|"R", fileManager :FileManager) {
        let count_wrapper;
        count_wrapper = <HTMLDivElement>document.getElementById("count_wrapper_" + Select_prefix);
        this.countDisplay = new CountDisplay(count_wrapper,fileManager);
        this.treeEffect = new TreeEffect(<HTMLDivElement>document.getElementById("find_block_"+Select_prefix));
        this.selectText = new SelectText(<HTMLDivElement>document.getElementById(`route_text_${Select_prefix}`));
    }



}