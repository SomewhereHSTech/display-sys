import {StoryScriptManager} from "./StoryScriptManager.js";

import {getImages} from "./util/HTTPQuery.js";
import {FileManager} from "./FileManager.js";
import {ScriptUpdater} from "./ScriptUpdater.js";


(() => {


    let m :FileManager = new FileManager();
    let s :StoryScriptManager = new StoryScriptManager(m);
    let u = new ScriptUpdater(s,m);

    function init() {
        getImages(m);
        u.getScripts();
/*        m.add("hoge","./404_rainbow.gif")
        m.add("fuga","./oflo_back.png")
        s.add([new TextAndBackgroundScript("hoge","hoge",m),new TextAndBackgroundScript("hoge","fuga",m)])
*/      //document.body.addEventListener("click", change, {once:true});
    }

    window.addEventListener("load", init, false);
})();