import {StoryScript} from "./StoryScript.js";
import {getTextWrapper, removeTextHide} from "../util/DomUtil.js";
import {StoryScriptManager} from "../StoryScriptManager.js";


export class TextScript implements StoryScript{

    protected text_element :HTMLDivElement;
    protected readonly uniq :string = new Date().getTime().toString(16) + Math.floor(Math.random()*1000);
    protected readonly text :string;
    protected ScriptManager :StoryScriptManager;
    protected EventController :AbortController = new AbortController();
    protected appear_effect :boolean = true;

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
        document.body.addEventListener("click",()=>{
            this.appear_effect = false ;
        },{signal: this.EventController.signal, once: true});
        this.showText(0,callback);
    }

    disappear(callback? :()=>void): void {
        this.text_element.classList.add("disappear");
        this.text_element.addEventListener("animationend",() => {
            this.text_element.remove();
            if (callback !== undefined) callback();
        })
    }

}