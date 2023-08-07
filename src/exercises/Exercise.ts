
export abstract class Exercise {

    elm: HTMLElement;

    constructor(tagname:string,elm:HTMLElement,data:string){
        this.elm = document.createElement(tagname);
        this.elm.classList.add('exercise-elm');
        this.clear();
        elm.appendChild(this.elm);
        this.elm.addEventListener('input',()=>{ this.clear(); });
    }

    validate(){}
    reveal(){}

    correct(){
        this.elm.style.borderColor = 'rgb(var(--callout-success))';
    }
    wrong(){
        this.elm.style.borderColor = 'rgb(var(--callout-fail))';
    }
    clear(){
        this.elm.style.borderColor = '#222222';
    }
}
