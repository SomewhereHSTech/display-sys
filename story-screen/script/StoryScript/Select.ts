import {Display} from "../display/Display.js";


export class Select {

    private display :Display;

    private find_status: boolean = false;

    private count :number = 0;

    constructor(text :string, display :Display) {
        this.display = display;
        this.display.selectText.setText(text);
    }

    changeFindStatus(newstat :boolean) {
        if (!newstat) {
            this.display.treeEffect.stop();
            this.find_status = false;
            return;
        }
        if (newstat) {
            this.display.treeEffect.start();
            this.find_status = true;
            this.countUp();
        }
    }

    countUp() :void {
        if (this.find_status) {
            this.increment()
            setTimeout(()=>{
                this.countUp();
            },400)
        }
    }

    increment() : void {
        this.count = this.count +1;
        console.log(this.count);
        this.updateDisplay();
    }

    updateDisplay() :void{
        this.display.countDisplay.update(this.count);
    }

    getCount() :number {
        return this.count;
    }
}