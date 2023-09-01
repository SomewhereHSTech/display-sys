import {StoryManager} from "./StoryManager.js";
import {FileManager} from "./resource/FileManager.js";
import {iconInit} from "./init.js";
import {WebsocketManager} from "./WebSocket";

(()=>{
    let fileManager :FileManager = new FileManager();
    iconInit(fileManager);
    let storyManager :StoryManager = new StoryManager(fileManager);
    let Websocket = new WebsocketManager(storyManager);
})()