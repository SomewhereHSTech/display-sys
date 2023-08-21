import {TextScript} from "../StoryScript/TextScript.js";
import {LoadingPageScript} from "../StoryScript/LoadingPageScript.js";
import {TextAndBackgroundScript} from "../StoryScript/TextAndBackgroundScript.js";
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
            result = new TextScript(this.ScriptManager,obj["text"]);
        } else if (obj["type"] == "img" && obj["url"] !== undefined) {
            result = new TextAndBackgroundScript(this.ScriptManager,obj["text"],obj["url"],this.fileManager);
        } else if (obj["type"] == "wait") {
            result = new WaitingPageScript(this.ScriptManager);
        } else {
            result = new LoadingPageScript(this.ScriptManager);
        }
        return result;
    }
}
