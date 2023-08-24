import {changeWebSocketURL} from "./util/WebSocket.js";


export function GeneralSetting_init(){

    // @ts-ignore
    document.getElementById("general_setting_box").style.display = "none";
    document.body.addEventListener("contextmenu", ()=>{
        (<HTMLDialogElement>document.getElementById("general_setting_box")).style.display = "block";
        return false;
    })
    document.getElementById("setting_confirm")?.addEventListener("click",()=>{
        changeWebSocketURL(
            (<HTMLInputElement>document.getElementById("setting_IP")).value,
            (<HTMLInputElement>document.getElementById("setting_PORT")).value
        )
        // @ts-ignore
        document.getElementById("general_setting_box").style.display = "none";

    })
}