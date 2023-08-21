export class FileManager {

    public files : Map<string,string> = new Map<string, string>();

    constructor() {
    }

    add(key :string ,URL :string){
        fetch(URL).then((response :Response) => {
            this.onFetchComplete(key,response);
        });
    }

    get(key :string): string {
        let file = this.files.get(key);
        if (file === undefined) {
            return "";
        } else {
            return file;
        }
    }

    onFetchComplete(key :string,data :Response){
        data.blob().then((value :Blob) => {
            let fileReader :FileReader = new FileReader();
            fileReader.readAsDataURL(value);
            fileReader.onload = () =>{
                this.files.set(key,<string>fileReader.result);
                console.log(fileReader.result);
            };
        });
    }
}