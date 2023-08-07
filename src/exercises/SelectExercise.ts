import { Exercise } from './Exercise';

export default class SelectExercise extends Exercise {

    elm: HTMLSelectElement;
    correctOpts: HTMLOptionElement[];

    constructor(elm:HTMLElement,data:string){
        super('select',elm,data);
        const vals = data.split(',').map(v=>v.trim());
        this.elm.classList.add('exercise-select');
        // <<
        const first = document.createElement('option');
        first.value = '0';
        first.textContent = '-';
        this.elm.appendChild(first);
        // <<
        let valCount = 1;
        this.correctOpts = [];
        for(let val of vals){
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
        if(opt.getAttribute('data-correct')==='1') this.correct();
        else this.wrong();
    }

    reveal(){
        if(this.correctOpts[0]) this.elm.value = this.correctOpts[0].value;
    }

}