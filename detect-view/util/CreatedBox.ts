import {Color} from "./color.js";
import {add, onClick} from "./CreatedBoxManager.js";


export class CreatedBox{

    // @ts-ignore
    private canvas : HTMLCanvasElement = document.getElementById('canvas');

    public readonly height : number;
    public readonly width : number;
    public readonly x : number;
    public readonly y : number;

    public readonly uniq_id : string;

    private sendName : string = "";

    private light_threshold : number = 128;

    private light_biggest_color : Color|undefined;
    private light_smallest_color : Color|undefined;

    private light_biggest : number = 256;
    private light_smallest : number = 0;

    private selectedBox :HTMLDivElement;

    private now_color : Color;
    private last_lighterthan_result : boolean|null;

    showEditWindow(ev : MouseEvent){
        let edit_window: HTMLDialogElement = <HTMLDialogElement>document.getElementById("created_box_edit");
        edit_window.style.display = "block";
        edit_window.style.left = String(ev.pageX) + "px";
        edit_window.style.top = String(ev.pageY) + "px";
        edit_window.style.position = "absolute";
        // @ts-ignore
        let element_name_input: HTMLInputElement = document.getElementById("element_name");
        element_name_input.value = this.uniq_id;
        (<HTMLInputElement>document.getElementById("send_name_input")).value = this.sendName;
        let threshold_biggest = this.light_biggest_color?.getHEXString();
        let threshold_smallest = this.light_smallest_color?.getHEXString();
        if (threshold_biggest !== undefined) {
            (<HTMLInputElement>document.getElementById("created_box_threshold_biggest")).value = threshold_biggest;
        }
        if (threshold_smallest !== undefined) {
            (<HTMLInputElement>document.getElementById("created_box_threshold_smallest")).value = threshold_smallest;
        }
    }

    createSelectedBox(id : String) :HTMLDivElement{
        // @ts-ignore
        let parent :HTMLDivElement = document.getElementById("created_box_wrap");
        let new_box :HTMLDivElement =  document.createElement("div");
        new_box.id = String(id);
        new_box.addEventListener("click",onClick);
        new_box.style.top = String(this.y+"px");
        new_box.style.left = String(this.x+"px");
        new_box.style.width = String(this.width+"px");
        new_box.style.height = String(this.height+"px");
        parent.appendChild(new_box);
        return new_box;
    }


    getColor() : Color{
        return this.now_color;
    }

    updateColor() : void {
        const context = this.canvas.getContext("2d",{willReadFrequently:true});
        if (context == null) {return}
        let img: ImageData = context.getImageData(this.x, this.y, this.width, this.height);
        this.now_color = this.getImageAverage(img);
    }

    changeSendName(name :string){
        this.sendName = name;
        console.log(name);
    }

    getSendName() : string{
        return  this.sendName;
    }

    getLastLighterResult() : boolean|undefined{
        if (this.last_lighterthan_result === null){
            return undefined; // ごめん
        } else {
            return this.last_lighterthan_result;
        }
    }

    updateThreshold() :void {
        this.light_threshold = (this.light_smallest + this.light_biggest) / 2;
        // Chu! 雑実装でごめん
    }

    isLighterThanThreshold() :boolean{
        let color : any = this.getColor();
        if (color != undefined){
            let result : boolean = color.lighterThan(this.light_threshold);
            this.last_lighterthan_result = result;
            return result;
        } else  {
            return true;  // ごめん
        }
    }

    createThreshold_min() : void{
        this.updateColor();
        let color : Color|undefined = this.getColor();
        if (color == undefined){
            alert("読み取りに失敗したので、うん。ごめん");
        } else {
            this.light_smallest = color.getBiggest();
            let label = <HTMLSpanElement>document.getElementById("created_box_threshold_smallest_label");
            label.textContent = color.getHEXString();
        }
    }
    createThreshold_max() : void{
        this.updateColor();
        let color : Color|undefined = this.getColor();
        if (color == undefined){
            alert("読み取りに失敗したので、うん。ごめん");
        } else {
            this.light_biggest = color.getBiggest();
            let label = <HTMLSpanElement>document.getElementById("created_box_threshold_biggest_label");
            label.textContent = color.getHEXString();
        }
    }

    constructor(x1 : number, y1 :number, x2 :number, y2 :number) {
        this.x = Math.min(x1,x2);
        this.y = Math.min(y1,y2);
        this.width = Math.max(x1,x2) - this.x;
        this.height = Math.max(y1,y2) - this.y;
        this.uniq_id = new Date().getTime().toString(16);
        this.selectedBox = this.createSelectedBox(this.uniq_id);
        this.now_color = new Color(0,0,0);
        this.last_lighterthan_result = null;
        console.log(this.uniq_id);
        add(this);
    }

    getImageAverage(image : ImageData) : Color {
        let r : number = 0;
        let g : number = 0;
        let b : number = 0;
        for (let i = 0; i <image.data.length; i = i + 4) {
            r = r + image.data[i];
            g = g + image.data[i+1];
            b = b + image.data[i+1];
        }
        return new Color(
            r/(image.data.length/4),
            g/(image.data.length/4),
            b/(image.data.length/4),
        );
    }


}