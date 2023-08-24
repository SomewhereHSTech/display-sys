import {CreatedBox} from "./CreatedBox.js";

let isPushing : boolean;
let canvas : HTMLCanvasElement;

let start_x :number;
let start_y :number;


export function rectangeSelect_init() : void{
    // @ts-ignore
    canvas = document.getElementById("selecting_box_canvas");
    // @ts-ignore
    canvas.width = String(document.body.clientWidth)
    // @ts-ignore
    canvas.height = String(document.body.clientWidth)
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mouseup",onMouseUp);
}

export function onMouseDown(ev :MouseEvent){
    if (ev.button !== 0) {
        return;
    }
    start_x = ev.x
    start_y = ev.y
    isPushing = true;
}
export function onMouseMove(ev :MouseEvent){
    if (!isPushing) {
        return;
    }

    let ctx :CanvasRenderingContext2D|null  = canvas.getContext("2d");
    if (ctx == null) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.shadowColor = '#eeeeee';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeRect(start_x,start_y,ev.x - start_x, ev.y -start_y)
}
export function onMouseUp(ev :MouseEvent){
    if (ev.x == start_x || start_y == ev.y) {
        return;
    }
    new CreatedBox(ev.x,ev.y,start_x,start_y);
    let ctx :CanvasRenderingContext2D|null  = canvas.getContext("2d");
    if (ctx != null){ctx.clearRect(0,0,canvas.width,canvas.height);}
    isPushing = false;
}