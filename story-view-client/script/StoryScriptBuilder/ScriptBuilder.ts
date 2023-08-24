import {TextScript} from "../StoryScript/TextScript.js";
import {LoadingPageScript} from "../StoryScript/LoadingPageScript.js";
import {TextAndBackgroundScript} from "../StoryScript/TextAndBackgroundScript.js";
import {ChracterTextScript} from "../StoryScript/ChracterTextScript";

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
        let result :StoryScript;
        if (obj["type"] == "text"){
            return  new TextScript(this.ScriptManager,obj["text"]);
        }
        if (obj["type"] == "img" && obj["url"] !== undefined) {
            return  new TextAndBackgroundScript(this.ScriptManager,obj["text"],obj["url"],this.fileManager);
        }
        if (obj["type"] == "wait") {
            return new WaitingPageScript(this.ScriptManager);
        }
        if (obj["text"] == "chara" && obj["character_name"] !== undefined){
            return new ChracterTextScript(this.ScriptManager,obj["text"],obj["character_name"]);
        }
        return new LoadingPageScript(this.ScriptManager);
    }
}
