import {StoryScript} from "./StoryScript.js";


export class DisappearCharaScript implements StoryScript {

    disappear(callback?: () => void) {
        if (callback !== undefined) callback();
    }

    appear(callback?: () => void) {
        (<HTMLImageElement>document.getElementById("character_picture")).classList.add("hide");
    }

}