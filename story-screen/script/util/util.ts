export class util {

    static getDigitsArray(value :number) :Array<number> {
        let value_int :number = Math.floor(value);
        let digits_count :number = Math.log10(value_int);
        let result :Array<number> = new Array<number>();
        for (let i = 0; i <= digits_count; i++) {
            let this_digit = Math.floor(value_int / Math.pow(10,(Math.floor(digits_count) - i)));
            value_int = value_int - this_digit * Math.pow(10,(Math.floor(digits_count) - i));
            result.push(this_digit);
        }
        return result;
    }

}