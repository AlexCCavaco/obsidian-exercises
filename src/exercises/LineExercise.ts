import { FLAGS } from '.';
import InputExercise from './InputExercise';

export default class LineExercise extends InputExercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super(elm,dataStr,flags);
        this.elm.classList.add('exercise-line');
    }
    
}
