/**
 * Data_set
 * ご覧の通りの構造
 * 正直クラスとかに起こした方がいいんだろうなと今になって思う
 */
const Data_set: ({ owner_name: string,room_name :string , project_name: string }[]) = [
    {
        "owner_name" : "1-1",
        "room_name" : "1",
        "project_name" : "企画名1"
    },
    {
        "owner_name" : "1-2",
        "room_name" : "2",
        "project_name" : "企画名2"
    },
    {
        "owner_name" : "1-3",
        "room_name" : "3",
        "project_name" : "企画名3"
    },
    {
        "owner_name" : "1-R",
        "room_name" : "R",
        "project_name" : "企画名4"
    },
    {
        "owner_name" : "1-4",
        "room_name" : "4",
        "project_name" : "企画名5"
    },
    {
        "owner_name" : "1-5",
        "room_name" : "5",
        "project_name" : "企画名6"
    },
    {
        "owner_name" : "1-6",
        "room_name" : "6",
        "project_name" : "企画名7"
    },
    {
        "owner_name" : "1-7",
        "room_name" : "7",
        "project_name" : "企画名8"
    },
]

/**
 * genInfoText
 * @param str
 * 表示用の文字のspanエレメントのオブジェクトを作る
 */
function genInfoText(str: string): HTMLSpanElement {
    const result = document.createElement("span");
    result.classList.add("info_text");
    result.innerText = str;
    return result;
}

/**
 * addAppear
 * @param obj 対象のSpan
 * 登場時のアニメーションをつける : CSSのappearも参照
 */
function addAppear(obj : HTMLSpanElement){
    obj.classList.add("appear");
    return obj;
}

/**
 * changeDisplay
 * @param index Data_set変数の何番目の要素を表示するか
 * 全部ここに突っ込んだの後悔してる。
 */
function changeDisplay(index :number){
    if (index >= Data_set.length){
        index = 0;
        // なんか入れるならここ
    }
    if (Data_set[index]["project_name"] == "") {  // 企画名が空欄の場合には再帰的呼び出しで次のインデックスに進む
        changeDisplay(index+1);
        return;
    }

    // とりあえず今あるinfo_textクラスの文字には退場してもらう
    const before = document.getElementsByClassName("info_text");
    Array.prototype.forEach.call(before, function(item) {
        item.classList.add("disappear");
    });

    setTimeout(removeOld,740) // いい感じのタイミングで前の文字には消えてもらう

    document.getElementsByClassName("owner_name")[0].appendChild(
        addAppear(genInfoText(Data_set[index]["owner_name"]))
    )
    document.getElementsByClassName("project_name")[0].appendChild(
        addAppear(genInfoText(Data_set[index]["project_name"]))
    )

    // あれ？？もしかしてさっきのsetTimeoutいらないんじゃないの？2回書いてるのミスかも
    setTimeout(removeOld,495);

    // 地図上の表示もいい感じのタイミングで切り替え
    // "room"+Data_set[index]["room_name"] は各部屋のdiv要素にroom1,room2,room3...とclassが振ってあるのでそれ用
    setTimeout(changeSelectedRoom,500,"room"+Data_set[index]["room_name"]);

    // 3000ms = 3秒後にまた切り替えする
    setTimeout(changeDisplay,3000,index+1)
    return
}

/**
 * changeSelectedRoom
 * @param room_name
 * マップの方の赤枠の切り替えする
 */
function changeSelectedRoom(room_name : string) {
    // map_selectedは赤枠を出すclassだナ
    document.getElementsByClassName("map_selected")[0].classList.remove("map_selected");
    document.getElementsByClassName(room_name)[0].classList.add("map_selected");
}

/**
 * removeOld
 * disappearのついた（＝もう退場アニメーションが再生された）文字を消す
 */
function removeOld() : void{
    const old_list = document.getElementsByClassName("disappear");
    while (old_list.length) {
        console.log(old_list.item(0))
        // @ts-ignore
        old_list.item(0).remove()
    }
}

/**
 * これいる？いらない
 */
function init() : void{
    setTimeout(changeDisplay,1000,1)
}

init()