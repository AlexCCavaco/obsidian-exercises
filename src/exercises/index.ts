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

        const processedArgs:[string,string][] = [];
        const processedData = row.replace(/\$(\w+)\[(.*?)\]/g, (substr,...args)=>{
            processedArgs.push([args[0],args[1]]);
            return REPLACE_STRING;
        }).split(REPLACE_STRING);

        for(let i = 0; i < processedData.length; i++){
            const dataElm = processedData[i];
            const str = document.createElement('span');
            str.textContent = dataElm;
            el.appendChild(str);
            // <<
            if(!processedArgs[i]) continue;
            const [exc,valstr] = processedArgs[i];
            const res = getExercise(exc,el,valstr);
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
    // <<
    btnReveal.addEventListener('click',()=>{ for(const opt of processOpts) opt.reveal(); });
    btnCheck.addEventListener('click',()=>{ for(const opt of processOpts) opt.validate(); });
}

export function getExercise(name:string,elm:HTMLElement,data:string):Exercise|null {
    switch(name){
        case 'select': return new SelectExercise(elm,data);
        case 'input': return new InputExercise(elm,data);
        case 'line': return new LineExercise(elm,data);
    }
    return null;
}
