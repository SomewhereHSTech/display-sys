import {StoryScript} from "./StoryScript.js";
import {TextScript} from "./TextScript.js";
import {FileManager} from "../FileManager.js";
import {getBackgroundImage} from "../util/DomUtil.js";
import {StoryScriptManager} from "../StoryScriptManager.js";


export class TextAndBackgroundScript extends TextScript implements StoryScript{

    private picture_url :string;
    private fileManager :FileManager;

    constructor(ScriptManager :StoryScriptManager, text :string, picture_URL :string, file :FileManager) {
        super(ScriptManager,text);
        this.picture_url = picture_URL;
        this.fileManager = file;
    }

    appear(callback?: () => void) {
        let background :HTMLImageElement = getBackgroundImage();
        background.classList.add("image_disappear");
        background.addEventListener("animationend",()=>{
            background.src = this.fileManager.get(this.picture_url);
            background.classList.remove("image_disappear");
            background.classList.add("image_appear");
            background.addEventListener("animationend", ()=>{
                background.classList.remove("image_appear");
                super.appear(callback);
            }, {once: true})
        }, {once: true})
    }


}
