import { FLAGS } from '.';
import { Exercise } from './Exercise';

export default class SelectExercise extends Exercise {

    elm: HTMLSelectElement;
    correctOpts: HTMLOptionElement[];

    constructor(elm:HTMLElement,param:string[],flags:FLAGS){
        super('select',elm,flags);
        this.elm.classList.add('exercise-select');
        // <<
        const first = document.createElement('option');
        first.value = '0';
        first.textContent = '-';
        this.elm.appendChild(first);
        // <<
        let valCount = 1;
        this.correctOpts = [];
        for(let val of param){
            const el = document.createElement('option');
            let correct = false;
            if(val[0]==='*'){ correct = true; val = val.substring(1); this.correctOpts.push(el); }
            el.value = valCount.toString();
            el.textContent = val;
            el.setAttribute('data-correct',correct?'1':'0');
            // <<
            valCount++;
            this.elm.appendChild(el);
        }
    }

    validate(){
        const opt = this.elm.options[this.elm.options.selectedIndex];
        if(opt.getAttribute('data-correct')==='1') return this.correct();
        else return this.wrong();
    }

    reveal(){
        this.clear();
        if(this.correctOpts[0]) this.elm.value = this.correctOpts[0].value;
    }

}
