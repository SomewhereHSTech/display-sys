import {CreatedBox} from "./CreatedBox.js";

export let list : Map<string,CreatedBox> = new Map();

let result_map : Map<string,boolean> = new Map();

export function onClick(ev :MouseEvent){
    // @ts-ignore
    list.get(this.id).showEditWindow(ev);
}
export function add(box :CreatedBox){
    list.set(box.uniq_id,box);
}

export function changeSendName(ev :MouseEvent){
    // @ts-ignore
    let box : CreatedBox = list.get(document.getElementById("element_name").value);
    console.log(box);
    box.changeSendName(
        // @ts-ignore
        document.getElementById("send_name_input").value
    );
    // @ts-ignore
    document.getElementById("created_box_edit").style.display = "none";
}

export function takeAll() : Map<string,boolean>{
    result_map = new Map();
    list.forEach(function (value, key, map){
        value.updateColor();
        let last_result : boolean|undefined = value.getLastLighterResult();
        if (last_result === undefined){
            result_map.set(value.getSendName(), value.isLighterThanThreshold());
            return;
        }
        let new_result : boolean = value.isLighterThanThreshold();
        if (new_result != last_result) {
            result_map.set(value.getSendName(), new_result);
        }
    });
    console.log("take!")
    return result_map;
}
