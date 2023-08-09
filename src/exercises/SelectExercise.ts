import { SWORD, listed, opt, seqMap, string } from 'src/parser';
import { FLAGS } from '.';
import { Exercise } from './Exercise';

export default class SelectExercise extends Exercise {

    elm: HTMLSelectElement;
    correctOpts: HTMLOptionElement[];

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super('select',elm,flags);
        this.elm.classList.add('exercise-select');
        // <<
        const first = document.createElement('option');
        this.elm.appendChild(first);
        first.value = '0';
        first.textContent = '-';
        // <<
        const data = SelectExercise.parse(dataStr);
        let valCount = 1;
        this.correctOpts = [];
        for(const val of data){
            const el = document.createElement('option');
            let correct = false;
            if(val.correct){ correct = true; this.correctOpts.push(el); }
            el.value = valCount.toString();
            el.textContent = val.value;
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

    static parse(data:string):({ correct:boolean,value:string }[]){
        return listed(seqMap(opt(string('*')),SWORD,(valid,value)=>({ correct:(valid!==null),value }))).tryParse(data);
    }

}
