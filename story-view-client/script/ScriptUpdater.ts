import {StoryScriptManager} from "./StoryScriptManager.js";
import {ScriptJsonData, ScriptsJsonData} from "./StoryScriptBuilder/ScriptJsonData.js";
import {ScriptBuilder} from "./StoryScriptBuilder/ScriptBuilder.js";
import {StoryScript} from "./StoryScript/StoryScript.js";
import {FileManager} from "./FileManager.js";
import {request} from "./util/HTTPQuery.js";


export class ScriptUpdater {

    private ScriptManager :StoryScriptManager;
    private ScriptBuilder :ScriptBuilder;

    private this_script_hash :string = "";

    constructor(mng :StoryScriptManager, file :FileManager) {
        this.ScriptManager = mng;
        this.ScriptBuilder = new ScriptBuilder(file,mng);
    }

    getScripts(): void{
        request(this);
    }

    add(json :ScriptsJsonData){
        // Date.now()はミリ秒単位 ＝ Date.now() はUNIX時間の1000倍
        if (typeof json === "object" && json !== null) {
            if (json["next_update"] * 1000 > Date.now()) {
                console.log("ended scripts. retry...");
                setTimeout(() => {
                        this.getScripts();
                    }, (Math.random() * 5000)  // 長くても5秒くらいで行きましょう
                );
            }
            if (json["hash"] == this.this_script_hash) {
                console.log("same hash. retry...");
                setTimeout(() => {
                        this.getScripts();
                    }, (Math.random() * 5000)  // 長くても5秒くらいで行きましょう
                );
            }
            let scriptJsonData: ScriptJsonData[] = json.scripts;
            let scripts: Array<StoryScript> = new Array<StoryScript>();
            for (let item of scriptJsonData) {
                scripts.push(this.ScriptBuilder.build(item));
            }
            this.ScriptManager.add(scripts);
            setTimeout(() => {
                this.getScripts();
            }, (json.next_update * 1000) - Date.now())
        }
    }
}