import SelectExercise from "./SelectExercise";
import { Exercise } from "./Exercise";
import InputExercise from "./InputExercise";
import LineExercise from "./LineExercise";
import MatchExercise from "./MatchExercise";

const REPLACE_STRING = '$#rp$';

export default (data:string, elm:HTMLElement)=>{
    elm.classList.add('exercise-block');
    const processOpts:Exercise[] = [];

    const processedArgs:{name:string,flags:FLAGS,data:string}[] = [];
    const processedData = data.replace(/\$(\w+)(:(?:.|\n)*?)*\{((?:.|\n|\))*?)\}/g, (substr,...args)=>{
        const flagStr = args[1] ?? '';
        const data = args[2].toString().trim();
        // <<
        const flags = handleFlags(flagStr);

        processedArgs.push({ name:args[0],flags,data });
        return REPLACE_STRING;
    }).split('\n').map(row=>row.split(REPLACE_STRING));console.log(processedData);

    for(let i = 0; i < processedData.length; i++){
        const rowData = processedData[i];
        const el = elm.createEl('div');
        el.classList.add('exercise-row');

        for(let j = 0; j < rowData.length; j++){
            const dataElm = rowData[j];
            const str = document.createElement('span');
            str.textContent = dataElm;
            el.appendChild(str);
            // <<
            if(!processedArgs[i]) continue;
            const { name,flags,data } = processedArgs[i];
            const res = getExercise(name,el,data,flags);
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
    btns.appendChild(validTxt); validTxt.textContent = '';
    // <<
    btnReveal.addEventListener('click',()=>{
        for(const opt of processOpts) opt.reveal();
        validTxt.textContent = '';
    });
    btnCheck.addEventListener('click',()=>{
        let valid = 0; let length = 0;
        for(const opt of processOpts){
            valid+= opt.validate();
            length+= opt.length;
        }
        validTxt.textContent = '';
        const vTxtValue = validTxt.createEl('b');
        /*/*/ vTxtValue.textContent = valid.toString();
        const vTxtInfo = validTxt.createEl('span');
        /*/*/ vTxtInfo.textContent = '/' + length + ' (' + Math.round(valid*100 / length) + '%)';
    });
}

export function getExercise(name:string,elm:HTMLElement,dataStr:string,flags:FLAGS):Exercise|null {
    switch(name){
        case 'select':  case 's': return new SelectExercise(elm,dataStr,flags);
        case 'input':   case 'i': return new InputExercise(elm,dataStr,flags);
        case 'line':    case 'l': return new LineExercise(elm,dataStr,flags);
        case 'match':   case 'm': return new MatchExercise(elm,dataStr,flags);
        //case 'choice':  case 'c': return new LineExercise(elm,dataStr,flags);
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
