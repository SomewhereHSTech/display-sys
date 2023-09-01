const Data_set: ({ room_name: string; project_name: string }[]) = [
    {
        "room_name": "3-1",
        "project_name" : "ああああああああああ"
    },
    {
        "room_name": "3-2",
        "project_name" : "いいいいいいいいいい"
    },
    {
        "room_name": "3-3",
        "project_name" : "うううううううううう"
    },
    {
        "room_name": "3-4",
        "project_name" : "ええええええええええ"
    },
    {
        "room_name": "3-5",
        "project_name" : "おおおおおおおおおお"
    }
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
    const before = document.getElementsByClassName("info_text");
    Array.prototype.forEach.call(before, function(item) {
        item.classList.add("disappear");
    });
    setTimeout(removeOld,740)
    if (index >= Data_set.length){
        index = 0;
    }
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