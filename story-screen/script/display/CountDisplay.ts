import {FileManager} from "../resource/FileManager.js";


export class CountDisplay {

    public readonly display_digits = 5;
    public readonly count_radix = 5;

    private readonly wrapper :HTMLDivElement;
    private fileManager :FileManager;

    constructor(wrapper :HTMLDivElement, fileManager :FileManager) {
        this.wrapper = wrapper;
        this.fileManager = fileManager;
    }

    update(value :number) {
        let digits = value.toString(this.count_radix).padStart(this.display_digits,"0");
        for (let i = 0; i < digits.length; i++) {
            this.updateOnce(digits[i],i);
        }
    }

    updateOnce(value :string, digit :number) :void {
        let item :HTMLImageElement = <HTMLImageElement>this.wrapper.getElementsByClassName(`digit_${Math.floor(digit)}`)[0];
        item.src = this.fileManager.get(`icon_${value}`);
    }
}