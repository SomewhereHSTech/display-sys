import {FileManager} from "./resource/FileManager.js";


export function iconInit(manager :FileManager) : void {
    /*
    let files :{name :string,url :string}[] = [
        {
            name: "icon_0",
            url: "https://z-n-a-k.net/pic/num_ico/0.gif"
        },
        {
            name: "icon_1",
            url: "https://z-n-a-k.net/pic/num_ico/1.gif"
        },
        {
            name: "icon_2",
            url: "https://z-n-a-k.net/pic/num_ico/2.gif"
        },
        {
            name: "icon_2",
            url: "https://z-n-a-k.net/pic/num_ico/3.gif"
        },
        {
            name: "icon_4",
            url: "https://z-n-a-k.net/pic/num_ico/4.gif"
        },
        {
            name: "icon_5",
            url: "https://z-n-a-k.net/pic/num_ico/5.gif"
        }
    ];*/

    let files :{name :string,url :string}[] = [
        {
            name: "icon_0",
            url: "./ico/0.gif"
        },
        {
            name: "icon_1",
            url: "./ico/1.gif"
        },
        {
            name: "icon_2",
            url: "./ico/2.gif"
        },
        {
            name: "icon_3",
            url: "./ico/3.gif"
        },
        {
            name: "icon_4",
            url: "./ico/4.gif"
        },
        {
            name: "icon_5",
            url: "./ico/5.gif"
        }
    ];

    for (const file of files) {
        manager.add(file.name,file.url);
    }
}