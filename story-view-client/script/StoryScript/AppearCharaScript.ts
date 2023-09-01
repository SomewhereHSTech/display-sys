import {CharacterTextScript} from "./CharacterTextScript.js";
import {StoryScriptManager} from "../StoryScriptManager";

export class AppearCharaScript extends CharacterTextScript {

    protected character_name_raw :string;

    constructor(ScriptManager :StoryScriptManager, text :string, character_name :string) {
        super(ScriptManager,text,character_name);
        this.character_name_raw = character_name;
    }

    appear(callback? :()=>void): void {
        (<HTMLImageElement>document.getElementById("character_picture")).classList.remove("hide");
        (<HTMLImageElement>document.getElementById("character_picture")).src = this.ScriptManager.fileManager.get(this.character_name_raw);
        super.appear(callback);
    }
}