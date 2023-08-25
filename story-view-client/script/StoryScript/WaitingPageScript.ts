import {StoryScript} from "./StoryScript.js";
import {StoryScriptManager} from "../StoryScriptManager.js";

// TODO: いろいろ


export class WaitingPageScript implements StoryScript {

    private element : HTMLDivElement;
    private ScriptManager: StoryScriptManager;

    constructor(ScriptManager :StoryScriptManager) {
        this.element = <HTMLDivElement>document.getElementById("waiting_wrapper");
        this.ScriptManager = ScriptManager;
    }

    appear(callback?: () => void): void {
        this.element.style.display = "block";
        if (callback !== undefined) callback();
    }

    disappear(callback?: () => void): void {
        this.element.style.display = "none";
        if (callback !== undefined) callback();
        console.log("disappear_loading")
    }

}