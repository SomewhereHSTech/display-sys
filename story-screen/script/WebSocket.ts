import {StoryManager} from "./StoryManager.js";
import {URLList} from "./util/URL.js";


export class WebsocketManager {

    private StoryManager :StoryManager;

    private ws :WebSocket|undefined;

    constructor(storyManager :StoryManager) {
        this.StoryManager = storyManager;
        this.connect();
    }

    connect(): void {
                this.ws = new WebSocket("wss://ws.z-n-a-k.net");
                this.ws.addEventListener("message",(event)=>{
                    this.StoryManager.onDetectData(JSON.parse(event.data));
        });
    }

}