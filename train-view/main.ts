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


function genInfoText(str: string): HTMLSpanElement {
    const result = document.createElement("span");
    result.classList.add("info_text");
    result.innerText = str;
    return result;
}


function addAppear(obj : HTMLSpanElement){
    obj.classList.add("appear");
    return obj;
}


function changeDisplay(index :number){
    if (index >= Data_set.length){
        index = 0;
        // なんか入れるならここ
    }
    if (Data_set[index]["project_name"] == "") {
        changeDisplay(index+1);
        return;
    }

    const before = document.getElementsByClassName("info_text");
    Array.prototype.forEach.call(before, function(item) {
        item.classList.add("disappear");
    });
    setTimeout(removeOld,740)
    document.getElementsByClassName("owner_name")[0].appendChild(
        addAppear(genInfoText(Data_set[index]["owner_name"]))
    )
    document.getElementsByClassName("project_name")[0].appendChild(
        addAppear(genInfoText(Data_set[index]["project_name"]))
    )
    setTimeout(removeOld,495);
    setTimeout(changeSelectedRoom,500,"room"+Data_set[index]["room_name"]);
    setTimeout(changeDisplay,3000,index+1)
    return
}

function changeSelectedRoom(owner_name : string) {
    document.getElementsByClassName("map_selected")[0].classList.remove("map_selected");
    document.getElementsByClassName(owner_name)[0].classList.add("map_selected");
}

function removeOld() : void{
    const old_list = document.getElementsByClassName("disappear");
    while (old_list.length) {
        console.log(old_list.item(0))
        // @ts-ignore
        old_list.item(0).remove()
    }
}


function init() : void{
    setTimeout(changeDisplay,1000,1)
}

init()