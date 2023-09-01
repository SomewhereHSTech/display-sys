
let ws :WebSocket = new WebSocket("ws://localhost:7851")

export function send(obj : Map<string,boolean>){
    if (obj.size === 0){
        console.log("empty!");
        return;
    }
    if (ws.readyState !== 1) /* state is not OPEN*/ {
        console.log("socket is not ready")
        return;
    }
    ws.send(JSON.stringify(Object.fromEntries(obj)));
    console.log("send!");
}

export function changeWebSocketURL(IP :string, Port :string) {
    ws = new WebSocket(`ws://${IP}:${Port}`);
}