import {ScriptUpdater} from "../ScriptUpdater.js";
import {FileManager} from "../FileManager.js";

const scripts_Request_url :string = "https://z-n-a-k.net/e/client/script.php";
const images_request_url :string = "https://api.z-n-a-k.net/event/file_lists.php";  // TODO

export function request(script_upd :ScriptUpdater){
    fetch(scripts_Request_url).then((response :Response) => response.json())
        .then((data) => {
            script_upd.add(data);
        })
}

export function getImages(fileManager :FileManager){
    fetch(images_request_url).then((response) => response.json())
        .then((data :[{key :string, url :string}])=>{
            console.log(data)
            for (let item of data) {
                fileManager.add(item.key,item.url);
            }
        })
}