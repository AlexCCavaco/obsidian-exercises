import SelectExercise from "./SelectExercise";
import { Exercise } from "./Exercise";
import InputExercise from "./InputExercise";
import LineExercise from "./LineExercise";

const REPLACE_STRING = '$#rp$';

export default (data:string, elm:HTMLElement)=>{
    elm.classList.add('exercise-block');
    const rows = data.split('\n');
    const processOpts:Exercise[] = [];
    for(const row of rows){
        const el = elm.createEl('div');
        el.classList.add('exercise-row');

        const processedArgs:{name:string,flags:FLAGS,param:string[]}[] = [];
        const processedData = row.replace(/\$(\w+)({.*?})*\(((?:.|\))*?)\)/g, (substr,...args)=>{
            const flagStr = args[1] ?? '';
            const dataStr = args[2];
            // <<
            const flags = handleFlags(flagStr);
            const param = dataStr.split(',').map((v:string)=>v.trim());

            processedArgs.push({ name:args[0],flags,param });
            return REPLACE_STRING;
        }).split(REPLACE_STRING);

        for(let i = 0; i < processedData.length; i++){
            const dataElm = processedData[i];
            const str = document.createElement('span');
            str.textContent = dataElm;
            el.appendChild(str);
            // <<
            if(!processedArgs[i]) continue;
            const { name,flags,param } = processedArgs[i];
            const res = getExercise(name,el,param,flags);
            if(res) processOpts.push(res);
        }
    }
    // <<
    const btns = elm.createEl('div');
    const btnReveal = document.createElement('button');
    btnReveal.classList.add('btn-exercise');
    btnReveal.classList.add('btn-exercise-reveal');
    const btnCheck = document.createElement('button');
    btnCheck.classList.add('btn-exercise');
    btnCheck.classList.add('btn-exercise-check');
    btns.appendChild(btnReveal); btnReveal.textContent = 'Reveal';
    btns.appendChild(btnCheck); btnCheck.textContent = 'Check';
    const validTxt = document.createElement('span');
    validTxt.classList.add('valid-text');
    btns.appendChild(validTxt); validTxt.innerHTML = '';
    // <<
    btnReveal.addEventListener('click',()=>{
        for(const opt of processOpts) opt.reveal();
        validTxt.innerHTML = '';
    });
    btnCheck.addEventListener('click',()=>{
        let valid = 0; const length = processOpts.length;
        for(const opt of processOpts) if(opt.validate()) valid++;
        validTxt.innerHTML = '<b>' + valid + '</b>/' + length + ' (' + Math.round(valid*100 / length) + '%)';
    });
}

export function getExercise(name:string,elm:HTMLElement,param:string[],flags:FLAGS):Exercise|null {
    switch(name){
        case 'select':  case 's': return new SelectExercise(elm,param,flags);
        case 'input':   case 'i': return new InputExercise(elm,param,flags);
        case 'line':    case 'l': return new LineExercise(elm,param,flags);
        //case 'match':   case 'm': return new LineExercise(elm,param,flags);
        //case 'choice':  case 'c': return new LineExercise(elm,param,flags);
    }
    return null;
}

export type FLAGS = {
    case: boolean,
    random: boolean,
};
export const DEFAULT_FLAGS:FLAGS = {
    case: false,
    random: false,
};

export function handleFlags(flags:string):FLAGS {
    const flagArr = { ...DEFAULT_FLAGS };
    for(const flag of flags){
        switch(flag.toLowerCase()){
            case 'c': flagArr.case = true; break;
            case 'r': flagArr.random = true; break;
        }
    }
    return flagArr;
}
