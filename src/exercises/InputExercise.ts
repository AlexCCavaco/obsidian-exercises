import { FLAGS } from '.';
import { Exercise } from './Exercise';

export default class InputExercise extends Exercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,param:string[],flags:FLAGS){
        super('input',elm,flags);
        this.elm.classList.add('exercise-input');
        this.elm.placeholder = '-';
        // <<
        this.correctOpts = [];
        for(const val of param) this.correctOpts.push(val);
    }

    validate(){
        const val = this.elm.value;
        if(this.correctOpts.includes(val)) return this.correct();
        else return this.wrong();
    }

    reveal(){
        if(this.correctOpts[0]) this.elm.value = this.correctOpts[0];
    }

}
