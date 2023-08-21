import {StoryScriptManager} from "./StoryScriptManager.js";
import {ScriptJsonData, ScriptsJsonData} from "./StoryScriptBuilder/ScriptJsonData.js";
import {ScriptBuilder} from "./StoryScriptBuilder/ScriptBuilder.js";
import {StoryScript} from "./StoryScript/StoryScript.js";
import {FileManager} from "./FileManager.js";
import {request} from "./util/HTTPQuery.js";


export class ScriptUpdater {

    private ScriptManager :StoryScriptManager;
    private ScriptBuilder :ScriptBuilder;

    constructor(mng :StoryScriptManager, file :FileManager) {
        this.ScriptManager = mng;
        this.ScriptBuilder = new ScriptBuilder(file,mng);
    }

    getScripts(): void{
        request(this);
    }

    add(json :ScriptsJsonData){
        if (typeof json === "object" && json !== null) {
            let scriptJsonData : ScriptJsonData[] = json.scripts;
            let scripts :Array<StoryScript> = new Array<StoryScript>();
            for (let item of scriptJsonData){
                scripts.push(this.ScriptBuilder.build(item));
            }
            this.ScriptManager.add(scripts);
        }
        setTimeout(()=>{
            this.getScripts();
        },(json.next_update * 1000 ) - Date.now())
    }
}