import { FLAGS } from '.';
import InputExercise from './InputExercise';

export default class LineExercise extends InputExercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,param:string[],flags:FLAGS){
        super(elm,param,flags);
        this.elm.classList.add('exercise-line');
    }
    
}
