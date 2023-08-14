
export function randomizeArray<T>(arr:T[]):T[]{
    for(let i = arr.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
    }
    return arr;
}
