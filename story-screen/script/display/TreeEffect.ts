export class TreeEffect {

    private tree: HTMLDivElement;

    public show :boolean = false;

    private readonly interval :number = 400;

    constructor(tree :HTMLDivElement) {
        this.tree = tree;
    }

    start() {
        let i = document.getElementsByClassName("tree_base");
        console.log(i);
        for (let j = 0; j < i.length; j++) {
            i[j].classList.add("disappear");
        }
        this.show = true;
        this.show1();
    }

    stop() {
        this.clear();
    }

    show1() {
        let i = this.tree.getElementsByClassName("nest1");
        Array.prototype.forEach.call(i, function(item) {
            item.classList.remove("disappear");
            item.classList.add("appear");
        })
        if (this.show) {
            setTimeout(() => {
                this.show2();
            }, this.interval);
        }
    }

    show2() {
        let i = this.tree.getElementsByClassName("nest2");
        Array.prototype.forEach.call(i, function(item) {
            item.classList.remove("disappear");
            item.classList.add("appear");
        })
        let j = this.tree.getElementsByClassName("nest0");
        Array.prototype.forEach.call(j, function(item) {
            item.classList.remove("disappear");
        })


        if (this.show) {
            setTimeout(() => {
                this.show3();
            }, this.interval)
        }
    }

    show3() {
        let i = this.tree.getElementsByClassName("nest3");
        Array.prototype.forEach.call(i, function(item) {
            item.classList.remove("disappear");
            item.classList.add("appear");
        })
        if (this.show) {
            setTimeout(() => {
                this.clear()
            }, this.interval)
        }

    }

    clear() {
        let i = document.getElementsByClassName("appear");
        while (true){
            i[0].classList.add("disappear");
            i[0].classList.remove("appear");
            if (i.length === 0) break;
        }
        if (this.show) {
            setTimeout(() => {
                this.show1();
            }, this.interval)
        }
    }


}