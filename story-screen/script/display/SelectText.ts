export class SelectText {

    private readonly element :HTMLDivElement;

    constructor(wrapper :HTMLDivElement) {
        this.element = wrapper;
    }

    setText(text :string) {
        this.element.textContent = text;
    }


}