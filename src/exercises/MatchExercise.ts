import { SWORD, keyed, listed, seqMap, string } from 'src/parser';
import { FLAGS } from '.';
import { Exercise } from './Exercise';
import { randomizeArray } from 'src/tools/sorting';

export type MatchElm = { elm:HTMLButtonElement,link:MatchElm|null,right:boolean,value:string,correctElm:MatchElm|null };

export default class MatchExercise extends Exercise {

    elm: HTMLInputElement;
    correctOpts: {[key:string]:string};
    // <<
    ltSec: HTMLElement;
    rtSec: HTMLElement;
    lbSec: HTMLElement;
    rbSec: HTMLElement;
    // <<
    leftSelected:  MatchElm|null;
    leftElms: MatchElm[];
    rightSelected: MatchElm|null;
    rightElms: MatchElm[];

    constructor(elm:HTMLElement,dataStr:string,flags:FLAGS){
        super('div',elm,flags);
        this.elm.classList.add('exercise-match');
        this.elm.classList.remove('exercise-elm');
        // <<
        this.leftSelected = null;
        this.leftElms = [];
        this.rightSelected = null;
        this.rightElms = [];
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
        this.length = 0;
        this.correctOpts = {};
        for(const [val1,val2] of data){
            this.correctOpts[val1] = val2;
            const lElm = this.createElm(val1,false); this.leftElms.push(lElm);
            const rElm = this.createElm(val2,true); this.rightElms.push(rElm);
            lElm.correctElm = rElm; rElm.correctElm = lElm;
            lElm.elm.classList.add('exercise-elm');
            rElm.elm.classList.add('exercise-elm');
            lElm.elm.addEventListener('click',()=>this.elmClick(lElm,false));
            rElm.elm.addEventListener('click',()=>this.elmClick(rElm,true));
            this.length++;
        }
        for(const {elm} of randomizeArray(this.leftElms)) this.ltSec.appendChild(elm);
        for(const {elm} of randomizeArray(this.rightElms)) this.rtSec.appendChild(elm);
    }

    validate(){
        let correct = 0;
        for(const matchElm of this.leftElms){
            if(!matchElm.correctElm) continue;
            if(!matchElm.link || matchElm.correctElm.value!==matchElm.link.value){
                this.wrong(matchElm.elm);
                this.wrong(matchElm.correctElm.elm);
                continue;
            }
            correct++;
            this.correct(matchElm.elm);
            this.correct(matchElm.correctElm.elm);
        }
        return correct;
    }

    reveal(){
        for(const matchElm of this.leftElms){
            this.clear(matchElm.elm);
            this.leftSelected = matchElm;
            this.rightSelected = matchElm.correctElm;
            this.elmGroup();
        }
        for(const matchElm of this.rightElms){
            this.clear(matchElm.elm);
        }
    }

    static parse(data:string):[string,string][]{
        return listed(seqMap(SWORD,keyed(string('=>')),SWORD,(v1,_,v2):[string,string]=>([v1,v2]))).tryParse(data);
    }

    private createElm(content:string,right=false):MatchElm{
        const elm = document.createElement('button');
        (right ? this.rtSec : this.ltSec).appendChild(elm);
        elm.classList.add('elm');
        elm.textContent = content;
        return { elm,link:null,right,value:content,correctElm:null };
    }

    private elmClick(matchElm:MatchElm,right=false){
        if(matchElm.link) return this.elmUngroup(matchElm);
        const group = (right&&this.leftSelected) || this.rightSelected;
        this.elmSelect(matchElm,right);
        if(group) this.elmGroup();
    }

    private elmSelect(matchElm:MatchElm,right=false){
        matchElm.elm.classList.add('selected');
        if(right){
            this.elmClearClasses(this.rightSelected);
            this.rightSelected = matchElm;
        } else {
            this.elmClearClasses(this.leftSelected);
            this.leftSelected = matchElm;
        }
    }
    private elmClearClasses(matchElm:MatchElm|null){
        if(!matchElm) return;
        matchElm.elm.classList.remove('selected');
    }
    private elmClear(right:boolean|null=null){
        if(right===true){ this.elmClearClasses(this.rightSelected); this.rightSelected = null; }
        else if(right===false){ this.elmClearClasses(this.leftSelected); this.leftSelected = null; }
        else { this.elmClear(true); this.elmClear(false); }
    }
    private elmGroup(){
        if(!this.leftSelected || !this.rightSelected) return;
        this.lbSec.appendChild(this.leftSelected.elm);
        this.rbSec.appendChild(this.rightSelected.elm);
        this.leftSelected.link = this.rightSelected;
        this.rightSelected.link = this.leftSelected;
        this.elmClear();
    }
    private elmUngroup(matchElm:MatchElm){
        if(!matchElm.link) return;
        if(matchElm.right){
            this.rtSec.appendChild(matchElm.elm);
            this.ltSec.appendChild(matchElm.link.elm);
        } else {
            this.ltSec.appendChild(matchElm.elm);
            this.rtSec.appendChild(matchElm.link.elm);
        }
        this.clear(matchElm.elm);
        this.clear(matchElm.link.elm);
        matchElm.link.link = null;
        matchElm.link = null;
    }    

}
