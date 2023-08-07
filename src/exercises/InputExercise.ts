import { Exercise } from './Exercise';

export default class InputExercise extends Exercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,data:string){
        super('input',elm,data);
        const vals = data.split(',').map(v=>v.trim());
        this.elm.classList.add('exercise-input');
        this.elm.placeholder = '-';
        // <<
        this.correctOpts = [];
        for(const val of vals) this.correctOpts.push(val);
    }

    validate(){
        const val = this.elm.value;
        if(this.correctOpts.includes(val)) this.correct();
        else this.wrong();
    }

    reveal(){
        if(this.correctOpts[0]) this.elm.value = this.correctOpts[0];
    }

}
