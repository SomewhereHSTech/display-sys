export function getTextWrapper() :HTMLDivElement{
        // @ts-ignore
        return document.getElementById("text_wrapper");
}

export function getBackgroundImage() : HTMLImageElement{
    return <HTMLImageElement>document.getElementById("background_picture_img");
}

export function removeTextHide(element :HTMLDivElement) : void{
    element.classList.remove("screen_text_hide");
    console.log("remove")
    return;
}