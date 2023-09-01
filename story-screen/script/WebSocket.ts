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
        fetch(URLList.Websock_URL_get).then((result)=> {
            result.text().then((text)=>{
                this.ws = new WebSocket(text);
                this.ws.addEventListener("message",(event)=>{
                    this.StoryManager.onDetectData(JSON.parse(event.data));
                })
            })
        });
    }

}