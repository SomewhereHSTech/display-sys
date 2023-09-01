import {StoryScript} from "./StoryScript/StoryScript.js";
import {LoadingPageScript} from "./StoryScript/LoadingPageScript.js";
import {FileManager} from "./FileManager";


export class StoryScriptManager {

    private Scripts_queue : Array<StoryScript>;
    public fileManager :FileManager;
    private now_script :StoryScript|undefined = undefined;

    constructor(file :FileManager) {
        this.fileManager = file;
        this.Scripts_queue = new Array<StoryScript>();
    }

    add(new_scripts : Array<StoryScript>) {
        if (this.Scripts_queue.length === 0) {
            console.log("queue 0");
            console.log(this.now_script)
            this.Scripts_queue = this.Scripts_queue.concat(new_scripts);
            console.log(this.Scripts_queue)
            if (this.now_script === undefined){
                this.get_next().appear();
            } else {
                this.now_script.disappear(() => {
                    this.get_next().appear();
                });
            }
            return;
        } else {
            console.log(this.Scripts_queue)
            this.Scripts_queue.pop();
            this.Scripts_queue = this.Scripts_queue.concat(new_scripts);
            console.log(this.Scripts_queue)
        }
    }

    enableChangeScriptEvent() :void {
        document.body.addEventListener("click",()=>{
            console.log("change")
            this.next_script();
            console.log("ev")
        },{once: true});
    }

    next_script(){
        if (this.now_script !== undefined) {
            if (this.Scripts_queue.length === 0) {
                return;
            } else {
                console.log("change!!")
                this.now_script.disappear(() => {
                    this.get_next().appear();
                });
            }
        } else {
            this.get_next().appear();
        }
    }

    get_next() : StoryScript {
        let result = this.Scripts_queue.shift();
        if (result !== undefined) {
            this.now_script = result;
            return result;
        } else {
            console.log("result undef");
            let loading = new LoadingPageScript(this);
            this.now_script = loading;
            return loading;
        }
    }
}