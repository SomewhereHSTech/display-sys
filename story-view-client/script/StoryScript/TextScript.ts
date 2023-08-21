import {StoryScript} from "./StoryScript.js";
import {getTextWrapper, removeTextHide} from "../util/DomUtil.js";
import {StoryScriptManager} from "../StoryScriptManager";


export class TextScript implements StoryScript{

    private text_element :HTMLDivElement;
    private readonly uniq :string = new Date().getTime().toString(16) + Math.floor(Math.random()*1000);
    private readonly text :string;
    protected ScriptManager :StoryScriptManager;
    private EventController :AbortController = new AbortController();
    private appear_effect :boolean = true;

    constructor(ScriptManager :StoryScriptManager, text :string) {
        this.text_element = document.createElement("div");
        this.text_element.classList.add("screen_text");
        this.text = text;
        this.ScriptManager = ScriptManager;
        getTextWrapper().appendChild(this.text_element);
        this.text_element.id = this.uniq;
        this.text_element.innerText = "";
    }

    showText(index :number,callback? :()=>void){
        if (this.appear_effect) {
            console.log(this.uniq);
            // @ts-ignore
            document.getElementById(this.uniq).innerText = this.text.slice(0,index+1);
            console.log("show :" + this.text.slice(0,index+1) + "|index" +index);
            console.log("show :" + this.text);
            if (index == this.text.length - 1){
                console.log("!!")
                this.showAllText(callback);
                this.EventController.abort();
                this.ScriptManager.enableChangeScriptEvent();
                return;
            }
            setTimeout((p1 :number, p2? :()=>void, textScript?: TextScript)=>{
                textScript?.showText(p1,p2);
            },50,index+1,callback,this);
        } else {
            this.showAllText(callback);
            this.EventController.abort();
            this.ScriptManager.enableChangeScriptEvent();
        }
    }

    showAllText(callback? :()=>void){
        this.text_element.textContent = this.text;
        if (callback !== undefined) callback();
    }

    appear(callback? :()=>void): void {
        removeTextHide(this.text_element)
        document.body.addEventListener("click",(ev)=>{
            this.appear_effect = false ;
        },{signal: this.EventController.signal, once: true});
        this.showText(0,callback);
    }

    disappear(callback? :()=>void): void {
        this.text_element.classList.add("disappear");
        this.text_element.addEventListener("animationend",ev => {
            this.text_element.remove();
            if (callback !== undefined) callback();
        })
    }

}