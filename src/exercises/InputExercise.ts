import { SWORD, listed } from 'src/parser';
import { FLAGS } from '.';
import { Exercise } from './Exercise';

export default class InputExercise extends Exercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super('input',elm,flags);
        this.elm.classList.add('exercise-input');
        this.elm.placeholder = '-';
        // <<
        const data = InputExercise.parse(dataStr);
        this.correctOpts = [];
        for(const val of data) this.correctOpts.push(val);
    }

    validate(){
        const val = this.elm.value;
        if(this.correctOpts.includes(val)) return this.correct();
        else return this.wrong();
    }

    reveal(){
        this.clear();
        if(this.correctOpts[0]) this.elm.value = this.correctOpts[0];
    }

    static parse(data:string){
        return listed(SWORD).tryParse(data);
    }

}
