import { FLAGS } from ".";

export abstract class Exercise {

    elm: HTMLElement;
    flags: FLAGS;

    constructor(tagname:string,elm:HTMLElement,flags:FLAGS){
        this.elm = document.createElement(tagname);
        this.elm.classList.add('exercise-elm');
        this.flags = flags;
        this.clear();
        elm.appendChild(this.elm);
        this.elm.addEventListener('input',()=>{ this.clear(); });
    }

    validate():boolean { return false; }
    reveal(){}

    correct():true {
        this.elm.style.borderColor = 'rgb(var(--callout-success))';
        return true;
    }
    wrong():false {
        this.elm.style.borderColor = 'rgb(var(--callout-fail))';
        return false;
    }

    clear(){
        this.elm.style.borderColor = '#222222';
    }
    
}
