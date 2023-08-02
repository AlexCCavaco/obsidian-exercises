
export function processSelect(elm:HTMLElement,data:string){
    const vals = data.split(',').map(v=>v.trim());
    const sel = document.createElement('select');
    sel.classList.add('exercise-select');
    sel.style.border = '1px solid #222222';
    elm.appendChild(sel);
    // <<
    const first = document.createElement('option');
    first.value = '0';
    first.textContent = '-';
    sel.appendChild(first);
    // <<
    let valCount = 1;
    const correctOpts:HTMLOptionElement[] = [];
    for(let val of vals){
        const el = document.createElement('option');
        let correct = false;
        if(val[0]==='*'){ correct = true; val = val.substring(1); correctOpts.push(el); }
        el.value = valCount.toString();
        el.textContent = val;
        el.setAttribute('data-correct',correct?'1':'0');
        // <<
        valCount++;
        sel.appendChild(el);
    }
    
    sel.addEventListener('input',()=>{ sel.style.borderColor = '#222222'; });

    return {
        validate:()=>{
            const opt = sel.options[sel.options.selectedIndex];
            if(opt.getAttribute('data-correct')==='1') sel.style.borderColor = 'rgb(var(--callout-success))';
            else sel.style.borderColor = 'rgb(var(--callout-fail))';
        },
        reveal: ()=>{
            if(correctOpts[0]) sel.value = correctOpts[0].value;
        }
    };
}
