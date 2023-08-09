import { string, optWhitespace, regex, alt, Parser, seq, seqMap, lazy, whitespace, eof } from "parsimmon";

export { string,regex,alt,seq,seqMap };

export type VAL_TYPE = { type:string,value:unknown } & (
    { type:'array',value:unknown[] } |
    { type:'string',value:string } |
    { type:'key',value:string } |
    { type:'number',value:number } |
    { type:'tag',value:string } ) |
    boolean | null;

export const W_EOF      = whitespace.or(eof);
export const OPTW_EOF   = optWhitespace.or(eof);

export const keyed      = <T>(parser:Parser<T>):Parser<T>=>parser.skip(OPTW_EOF);
export const listed     = <T>(parser:Parser<T>,seperator=','):Parser<T[]>=>parser.sepBy(string(seperator).skip(optWhitespace));
export const opt        = <T>(parser:Parser<T>):Parser<T|null>=>parser.times(0,1).map(res=>(res.length===0 ? null : res[0]));

export const NUMBER     = keyed(regex(/\d+/)).map(parseInt);
export const DECIMAL    = keyed(regex(/\d+\.\d+/)).map(parseFloat);
export const NUMERIC    = NUMBER.or(DECIMAL).map((value):VAL_TYPE=>({ value,type:'number' }));

export const WORD       = keyed(regex(/[\w_/.\-$]+/));
export const UWORD      = keyed(regex(/[\w_/.\-$]+/u));
export const STRING     = regex(/"(.*?)"|'(.*?)'/).map(str=>str.substring(1,str.length-1)).skip(optWhitespace);
export const SWORD      = WORD.or(STRING);
export const STRING_VAL = lazy(():Parser<VAL_TYPE>=>WORD.map((value):VAL_TYPE=>({ value,type:'key' })).or(STRING.map((value):VAL_TYPE=>({ value,type:'string' }))));
