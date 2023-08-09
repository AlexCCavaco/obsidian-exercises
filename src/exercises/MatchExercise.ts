import { SWORD, keyed, listed, seqMap, string } from 'src/parser';
import { FLAGS } from '.';
import { Exercise } from './Exercise';

export default class MatchExercise extends Exercise {

    elm: HTMLInputElement;
    correctOpts: {[key:string]:string};
    // <<
    ltSec: HTMLElement;
    rtSec: HTMLElement;
    lbSec: HTMLElement;
    rbSec: HTMLElement;
    // <<
    leftSelected:HTMLButtonElement|null;
    rightSelected:HTMLButtonElement|null;

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super('div',elm,flags);
        this.elm.classList.add('exercise-match');
        this.elm.classList.remove('exercise-elm');
        // <<
        this.leftSelected = null;
        this.rightSelected = null;
        // <<
        const top = document.createElement('div');
        /**/ this.elm.appendChild(top);
        this.ltSec = document.createElement('div');
        this.rtSec = document.createElement('div');
        /**/ top.appendChild(this.ltSec);
        /**/ top.appendChild(this.rtSec);
        const bot = document.createElement('div');
        /**/ this.elm.appendChild(bot);
        this.lbSec = document.createElement('div');
        this.rbSec = document.createElement('div');
        /**/ bot.appendChild(this.lbSec);
        /**/ bot.appendChild(this.rbSec);
        // <<
        const data = MatchExercise.parse(dataStr);
        this.correctOpts = {};
        for(const [val1,val2] of data){
            this.correctOpts[val1] = val2;
            const lElm = this.createElm(this.ltSec,val1);
            const rElm = this.createElm(this.rtSec,val2);
            lElm.addEventListener('click',()=>this.elmClick(lElm,false));
            rElm.addEventListener('click',()=>this.elmClick(rElm,true));
        }
    }

    validate(){//TODO
        // const val = this.elm.value;
        // if(this.correctOpts.includes(val)) return this.correct();
        // else return this.wrong();
        return true;
    }

    reveal(){//TODO
        // this.clear();
        // if(this.correctOpts[0]) this.elm.value = this.correctOpts[0];
    }

    static parse(data:string):[string,string][]{
        return listed(seqMap(SWORD,keyed(string('=>')),SWORD,(v1,_,v2):[string,string]=>([v1,v2]))).tryParse(data);
    }

    private createElm(parent:HTMLElement,content:string){
        const elm = document.createElement('button');
        parent.appendChild(elm);
        elm.classList.add('elm');
        elm.textContent = content;
        return elm;
    }

    private elmClick(elm:HTMLButtonElement,right=false){
        const group = (right&&this.leftSelected) || this.rightSelected;
        this.elmSelect(elm,right);
        if(group) this.elmGroup();
    }

    private elmSelect(elm:HTMLButtonElement,right=false){
        elm.classList.add('selected');
        if(right){
            this.elmClearClasses(this.rightSelected);
            this.rightSelected = elm;
        } else {
            this.elmClearClasses(this.leftSelected);
            this.leftSelected = elm;
        }
    }
    private elmClearClasses(elm:HTMLElement|null){
        if(!elm) return;
        elm.classList.remove('selected');
    }
    private elmClear(right:boolean|null=null){
        if(right===true){ this.elmClearClasses(this.rightSelected); this.rightSelected = null; }
        else if(right===false){ this.elmClearClasses(this.leftSelected); this.leftSelected = null; }
        else { this.elmClear(true); this.elmClear(false); }
    }
    private elmGroup(){
        if(!this.leftSelected || !this.rightSelected) return;
        this.lbSec.appendChild(this.leftSelected);
        this.rbSec.appendChild(this.rightSelected);
        this.elmClear();
    }
    private elmUngroup(elm:HTMLButtonElement,elm2:HTMLButtonElement){}    

}
