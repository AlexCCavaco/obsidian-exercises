import { processSelect } from "./exercises";

const REPLACE_STRING = '$#rp$';

export default (data:string, elm:HTMLElement)=>{
    const rows = data.split('\n');
    const processOpts:{ reveal:(()=>void),validate:(()=>void) }[] = [];
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
            switch(exc){
                case 'select': processOpts.push(processSelect(el,valstr)); break;
            }
        }
    }
    
    /**/ elm.createEl('br');
    const btns = elm.createEl('div');
    const btnReveal = document.createElement('button');
    const btnCheck = document.createElement('button');
    btns.appendChild(btnReveal); btnReveal.textContent = 'Reveal';
    btns.appendChild(btnCheck); btnCheck.textContent = 'Check';
    // <<
    btnReveal.addEventListener('click',()=>{ for(const opt of processOpts) opt.reveal(); });
    btnCheck.addEventListener('click',()=>{ for(const opt of processOpts) opt.validate(); });
}
