export class ColorPalette{

    //dutch field: https://www.heavy.ai/blog/12-color-palettes-for-telling-better-stories-with-your-data
    defaultPalette: string[] = [
        "limegreen", //green
        "deepskyblue", //blue 
        "yellow", //yellow 
        "rebeccapurple", //purple 
        "silver" //gray
    ];

    myPalette: string[] = [];

    constructor(length: number){
        this.init(length);
    }

    init(length: number){
        this.myPalette = this.generateColorArrays(length, 0);
    }

    defaultColor(){
        return this.defaultPalette[0];
    }

    getColor(index: number){
        if(index < this.defaultPalette.length && index >= 0){
            return this.defaultPalette[index];
        }else{
            return this.defaultColor();
        }
    }

    findNextColor(current_color_hex: string){
        current_color_hex = current_color_hex.toLowerCase(); //cleanse string into lowercase

        const index: number = this.defaultPalette.findIndex(val => val == current_color_hex);
        if(index < this.defaultPalette.length && index >= 0){
            //current color being a member of the palette  
            if(index == (this.defaultPalette.length - 1)){
                //current color being the last member
                return this.defaultPalette[0];
            }else{
                return this.defaultPalette[index+1];
            }
        }else{
            return this.defaultColor();
        }
    }

    generateColorArrays(length: number, start_index: number){
        if(length > 0){
            let arr: string[] = [];
            let startColor: string = this.getColor(start_index);
            let currentColor: string = startColor;

            for (let i = 0; i < length; i++) {
                arr[i] = currentColor;
                currentColor = this.findNextColor(currentColor);
            }

            return arr;
        }else{
            return [];
        }
    }

}