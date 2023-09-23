import { OPTW_EOF, SWORD, listed, opt, seqMap, string } from 'src/parser';
import { FLAGS } from '.';
import { Exercise } from './Exercise';
import { randomizeArray } from 'src/tools/sorting';

export default class MultipleChoiceExercise extends Exercise {

    optList: HTMLElement[];
    correctOpts: HTMLElement[];

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super('div',elm,flags);
        this.elm.classList.add('exercise-choice');
        this.elm.classList.remove('exercise-elm');
        // <<
        const data = MultipleChoiceExercise.parse(dataStr);console.log(data)
        this.optList = [];
        this.correctOpts = [];
        for(const val of randomizeArray(data)){
            const el = document.createElement('div');
            el.classList.add('elm');
            el.classList.add('exercise-elm');
            let correct = false;
            this.optList.push(el);
            if(val.correct){ correct = true; this.correctOpts.push(el); }
            el.setAttribute('data-correct',correct?'1':'0');
            el.textContent = val.value;
            el.addEventListener('click',()=>{
                this.clear(el);
                el.classList.toggle('selected');
            });
            // <<
            this.elm.appendChild(el);
        }
    }

    validate(){
        let isWrong = false;
        for(const el of this.optList){
            if(el.getAttribute('data-correct')==='1'){
                if(el.classList.contains('selected')) this.correct(el);
                else { this.wrong(el); isWrong = true; }
            }
            else {
                if(el.classList.contains('selected')) { this.wrong(el); isWrong = true; }
                //else this.correct(el);
            }
        }
        return isWrong ? 0 : 1;
    }

    reveal(){
        for(const el of this.optList){
            this.clear(el);
            if(el.getAttribute('data-correct')==='1') el.classList.add('selected');
            else el.classList.remove('selected');
        }
    }

    static parse(data:string):({ correct:boolean,value:string }[]){
        return listed(seqMap(OPTW_EOF,opt(string('*')),SWORD,(_,valid,value)=>({ correct:(valid!==null),value }))).tryParse(data);
    }

}
