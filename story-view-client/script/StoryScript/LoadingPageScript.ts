import {StoryScript} from "./StoryScript.js";
import {getTextWrapper} from "../util/DomUtil.js";
import {StoryScriptManager} from "../StoryScriptManager";

export class LoadingPageScript implements StoryScript {

    private element : HTMLDivElement;
    private ScriptManager: StoryScriptManager;

    constructor(ScriptManager :StoryScriptManager) {
        this.element = document.createElement("div");
        this.element.classList.add("screen_text","screen_text_hide");
        this.element.textContent = "loading...";
        this.ScriptManager = ScriptManager;
        getTextWrapper().appendChild(this.element);
    }

    appear(callback?: () => void): void {
        this.element.classList.remove("screen_text_hide");
        if (callback !== undefined) callback();
    }

    disappear(callback?: () => void): void {
        this.element.remove();
        if (callback !== undefined) callback();
        console.log("disappear_loading")
    }

}