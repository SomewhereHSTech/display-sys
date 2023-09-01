import {TextScript} from "./TextScript.js";
import {StoryScriptManager} from "../StoryScriptManager.js";
import {removeTextHide} from "../util/DomUtil.js";


export class CharacterTextScript extends TextScript {

    private character_name :string;

        constructor(ScriptManager :StoryScriptManager, text :string, character_name :string) {
        super(ScriptManager,character_name + text);
        console.log(character_name);
        this.character_name = character_name + ">> ";
    }

    appear(callback? :()=>void): void {
        removeTextHide(this.text_element)
        document.body.addEventListener("click",()=>{
            this.appear_effect = false ;
        },{signal: this.EventController.signal, once: true});
        this.showText(this.character_name.length,callback);
    }
}