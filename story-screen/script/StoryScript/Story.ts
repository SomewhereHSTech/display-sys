import {DisplayStoryScript} from "../data/DisplayStoryScript.js";
import {Select} from "./Select.js";
import {Display} from "../display/Display.js";


export class Story{

    public readonly left :Select;
    public readonly right :Select;

    private confirm_time :number;

    constructor(data :DisplayStoryScript, display_L :Display, display_R :Display) {
        this.confirm_time = data.update;
        this.left = new Select(data.left.text,display_L);
        this.right = new Select(data.right.text,display_R);
    }

    getCountData() :{left:number,right:number} {
        return {
            left: this.left.getCount(),
            right: this.right.getCount()
        };
    }
}