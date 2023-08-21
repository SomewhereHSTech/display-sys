import {CreatedBox} from "./util/CreatedBox.js";
import {changeSendName, takeAll} from "./util/CreatedBoxManager.js";
import {rectangeSelect_init} from "./util/RectangleSelect.js";
import {send} from "./util/WebSocket.js";


(() => {
    // @ts-ignore
    document.getElementById("created_box_edit").style.display = "none";
    // @ts-ignore
    document.getElementById("created_edit_confirm").addEventListener('click',changeSendName);


    let video : HTMLVideoElement;
    let canvas : HTMLCanvasElement;
    let streaming : boolean = false;


    function setElements(): void {
        rectangeSelect_init();
        // @ts-ignore
        video = document.getElementById('display');
        // @ts-ignore
        canvas = document.getElementById('canvas');

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });

        video.addEventListener(
            "canplay",
            (ev) => {
                if (!streaming) {
                    canvas.setAttribute("width", String(video.videoWidth ));
                    canvas.setAttribute("height", String(video.videoHeight));
                    streaming = true;
                    setInterval(take,250);

                }
            },
            false
        );

    }

    function take() {
        const context = canvas.getContext("2d");
        if (video.videoWidth && video.videoHeight && context != null) {
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            send(takeAll());
        }
    }

    window.addEventListener("load", setElements, false);

})();