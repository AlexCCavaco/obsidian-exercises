import InputExercise from './InputExercise';

export default class LineExercise extends InputExercise {

    elm: HTMLInputElement;
    correctOpts: string[];

    constructor(elm:HTMLElement,data:string){
        super(elm,data);
        this.elm.classList.add('exercise-line');
    }
    
}
