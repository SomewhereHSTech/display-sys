import {StoryScript} from "./StoryScript.js";
import {StoryScriptManager} from "../StoryScriptManager.js";

// TODO: いろいろ


export class WaitingPageScript implements StoryScript {

    private element : HTMLDivElement;
    private ScriptManager: StoryScriptManager;
    private upd_time :Date;

    constructor(ScriptManager :StoryScriptManager,upd :number) {
        this.element = <HTMLDivElement>document.getElementById("waiting_wrapper");
        this.ScriptManager = ScriptManager;
        this.upd_time = new Date(upd * 1000 + 1000*60*60*9);
        (<HTMLDivElement>document.getElementById("waiting_time_display")).innerText
            = `${this.upd_time.getHours()}:${this.upd_time.getMinutes()}`
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