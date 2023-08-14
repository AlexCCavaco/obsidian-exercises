import { FLAGS } from ".";

export abstract class Exercise {

    elm: HTMLElement;
    flags: FLAGS;
    length: number;

    constructor(tagname:string,elm:HTMLElement,flags:FLAGS){
        this.elm = document.createElement(tagname);
        this.elm.classList.add('exercise-elm');
        this.flags = flags;
        this.length = 1;
        this.clear();
        elm.appendChild(this.elm);
        this.elm.addEventListener('input',()=>{ this.clear(); });
    }

    validate():number { return 0; }
    reveal(){ this.clear(); }

    correct(specificElm:HTMLElement|null=null):number {
        if(!specificElm) specificElm = this.elm;
        specificElm.style.borderColor = 'rgb(var(--callout-success))';
        return 1;
    }
    wrong(specificElm:HTMLElement|null=null):0 {
        if(!specificElm) specificElm = this.elm;
        specificElm.style.borderColor = 'rgb(var(--callout-fail))';
        return 0;
    }

    clear(specificElm:HTMLElement|null=null){
        if(!specificElm) specificElm = this.elm;
        specificElm.style.borderColor = '#222222';
    }
    
}
