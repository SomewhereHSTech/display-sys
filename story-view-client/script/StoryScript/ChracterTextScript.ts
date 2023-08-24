import {TextScript} from "./TextScript";
import {StoryScriptManager} from "../StoryScriptManager";
import {removeTextHide} from "../util/DomUtil";


export class ChracterTextScript extends TextScript {

    private character_name :string;

    constructor(ScriptManager :StoryScriptManager, text :string, character_name :string) {
        super(ScriptManager,character_name + text);
        this.character_name = character_name;
    }

    appear(callback? :()=>void): void {
        removeTextHide(this.text_element)
        document.body.addEventListener("click",(ev)=>{
            this.appear_effect = false ;
        },{signal: this.EventController.signal, once: true});
        this.showText(this.character_name.length,callback);
    }
}