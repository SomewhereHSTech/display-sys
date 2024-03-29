import {TextScript} from "../StoryScript/TextScript.js";
import {LoadingPageScript} from "../StoryScript/LoadingPageScript.js";
import {TextAndBackgroundScript} from "../StoryScript/TextAndBackgroundScript.js";
import {CharacterTextScript} from "../StoryScript/CharacterTextScript.js";

import {StoryScript} from "../StoryScript/StoryScript.js";
import {ScriptJsonData} from "./ScriptJsonData.js";

import {FileManager} from "../FileManager.js";
import {StoryScriptManager} from "../StoryScriptManager.js";
import {WaitingPageScript} from "../StoryScript/WaitingPageScript.js";


export class ScriptBuilder {

    private readonly fileManager :FileManager;
    private readonly ScriptManager :StoryScriptManager

    constructor(fileManager :FileManager,ScriptManager :StoryScriptManager) {
        this.fileManager = fileManager;
        this.ScriptManager = ScriptManager;
    }

    build(obj :ScriptJsonData) : StoryScript{
        if (obj["type"] == "text"){
            return  new TextScript(this.ScriptManager,obj["text"]);
        }
        if (obj["type"] == "img" && obj["url"] !== undefined) {
            return  new TextAndBackgroundScript(this.ScriptManager,obj["text"],obj["url"],this.fileManager);
        }
        if (obj["type"] == "wait" && obj["update_time"] !== undefined) {
            return new WaitingPageScript(this.ScriptManager,  obj["update_time"]);
        }
        if (obj["type"] == "chara" && obj["character_name"] !== undefined){
            return new CharacterTextScript(this.ScriptManager,obj["text"],obj["character_name"]);
        }
        return new LoadingPageScript(this.ScriptManager);
    }
}
