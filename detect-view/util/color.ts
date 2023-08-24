export class Color {
    public r : number;
    public b : number;
    public g : number;

    constructor(r_ : number, g_ : number, b_ : number) {
        this.r = r_;
        this.g = g_;
        this.b = b_;
    }

    getBiggest() : number {
        return  Math.max(this.r,this.g,this.b);
    }

    getRGBString() : string {
        return `(${Math.floor(this.r)},${Math.floor(this.g)},${Math.floor(this.b)})`
    }

    getHEXString() :string{
        return `#${Math.floor(this.r).toString(16)}${Math.floor(this.g).toString(16)}${Math.floor(this.b).toString(16)}`
    }

    lighterThan(color : Color|number) : boolean{
        if (color instanceof Color) {
            return (color.getBiggest() < this.getBiggest());
        } else {
            return (color < this.getBiggest());
        }
    }
}