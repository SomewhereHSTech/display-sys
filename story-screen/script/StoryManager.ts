import {Story} from "./StoryScript/Story.js";
import {DetectData} from "./data/DetectData.js";
import {Display} from "./display/Display.js";
import {DisplayStoryScript} from "./data/DisplayStoryScript.js";

import {FileManager} from "./resource/FileManager.js";
import {URLList} from "./util/URL.js";


export class StoryManager {

    private Now_story :Story|undefined;

    private left_disp :Display;
    private right_disp :Display;
    constructor(file :FileManager) {
        this.left_disp = new Display("L",file)
        this.right_disp = new Display("R",file)
    }

    getNowStory() :Story|undefined {
        return this.Now_story;
    }

    start() :void {
        fetch(URLList.start_url)
            .then((response)=>{
            response.json().then((result)=>{
                this.next(result);
            })
        });
    }

    next(data :DisplayStoryScript){
        this.Now_story = new Story(data,this.left_disp,this.right_disp);
        if (data.type !== "end") {
            setTimeout(() => {
                this.confirm();
            }, (data.update * 1000) - Date.now())
        }
    }

    confirm() : void{
        let sendData = this.Now_story?.getCountData();
        fetch(URLList.confirm_post_url,{
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(sendData)
        }).then((response)=>{
            response.json().then((result)=>{
                this.next(result);
            })
        });
    }

    onDetectData(data :DetectData) :void {
        if (data.L !== undefined) {
            this.Now_story?.left.changeFindStatus(data.L);
        }
        if (data.R !== undefined) {
            this.Now_story?.right.changeFindStatus(data.R);
        }
    }

}