import{j as e}from"./index-DbgcfXk7.js";import{S as i}from"./styled-NmGkWyWc.js";import{B as n}from"./Breadcrumbs-DKYNdBdq.js";import{L as r}from"./index-Bq7RyaJG.js";function l(){return e.jsxs(i.Wrapper,{children:[e.jsx(n,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:r}),e.jsx(i.Heading,{children:"Type coercion"}),e.jsxs(i.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Implicit/explicit conversion between primitives and objects via",e.jsx("b",{children:" ToPrimitive → ToNumber/ToString/ToBoolean"}),". Prefer explicit casts in critical paths."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Core rules (mental model)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ToPrimitive (hint “number”):"})," try ",e.jsx("code",{children:"valueOf()"})," then"," ",e.jsx("code",{children:"toString()"}),". (Dates default to hint “string”: ",e.jsx("code",{children:"toString"})," then"," ",e.jsx("code",{children:"valueOf"}),".)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Numeric ops"})," (",e.jsx("code",{children:"- * / % < > <= >= | & ^ ~"}),", unary"," ",e.jsx("code",{children:"+"}),"): use ",e.jsx("b",{children:"ToNumber"})," (except BigInt mixing ⇒ TypeError)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"String concatenation"})," (",e.jsx("code",{children:"+"}),"): if either side is a string (after ToPrimitive), do string join; else numeric add."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Boolean contexts"})," (if/while/?:): use ",e.jsx("b",{children:"ToBoolean"})," — only the 7 falsy values are false."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Symbols:"})," cannot auto-coerce to number/string in concatenation; use"," ",e.jsx("code",{children:"String(sym)"})," explicitly."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples (burn-in)"}),e.jsx(i.Pre,{children:`// String vs number with +
1 + "2"          // "12"
"3" * "2"        // 6   (numeric op → ToNumber)
+"3"             // 3   (unary plus)

const obj = { valueOf(){ return 7; } };
obj + 1          // 8   (ToPrimitive → valueOf → 7, then numeric add)

const arr = [1,2];
arr + 3          // "1,23" (ToPrimitive → toString "1,2", then string +)

new Date(0) + 1  // "Thu, 01 Jan 1970 ...1" (Date hint "string")

// Boolean coercion
!!""             // false
!![]             // true
!!0n             // false

// Numbers from primitives
Number("")       // 0
Number("  \\n")   // 0
Number(null)     // 0
Number(undefined)// NaN
Number(true)     // 1

// BigInt mixing
1n + 1           // ❌ TypeError (can’t mix BigInt and Number)
Number(1n) + 1   // 2  (explicit)

// Symbols
const s = Symbol("x");
// "" + s        // ❌ TypeError
String(s)        // "Symbol(x)"`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Object → primitive hooks"}),e.jsx(i.Pre,{children:`const x = {
  [Symbol.toPrimitive](hint){
    if (hint === "string") return "X";
    return 10;
  },
  toString(){ return "tos"; },
  valueOf(){ return 5; }
};

x + 1        // 11 (hint "number" → Symbol.toPrimitive → 10)
String(x)    // "X" (hint "string")`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"JSON vs coercion"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"JSON.stringify"}),": omits ",e.jsx("code",{children:"undefined"}),"/functions/symbols in objects; turns them into ",e.jsx("code",{children:"null"})," in arrays; ",e.jsx("b",{children:"throws"})," on ",e.jsx("code",{children:"BigInt"}),"."]}),e.jsxs("li",{children:["Custom ",e.jsx("code",{children:"toJSON()"})," on objects controls their JSON representation."]})]}),e.jsx(i.Pre,{children:`JSON.stringify({a:undefined,b:2})   // "{"b":2}"
JSON.stringify([1,undefined,3]) // "[1,null,3]"
// JSON.stringify(10n)          // ❌ TypeError
const d = new Date(0);
d.toJSON()                      // "1970-01-01T00:00:00.000Z"`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Relational notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"<"}),"/",e.jsx("code",{children:">"})," use ToPrimitive; if both are strings → lexicographic compare; else numeric."]}),e.jsxs("li",{children:["Arrays compare as strings (",e.jsx("code",{children:"[2] < [10]"})," ⇒ ",e.jsx("code",{children:'"2" < "10"'})," ⇒"," ","false)."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"explicit casts"}),": ",e.jsx("code",{children:"Number(x)"}),", ",e.jsx("code",{children:"String(x)"}),","," ",e.jsx("code",{children:"Boolean(x)"}),"."]}),e.jsxs("li",{children:["Be mindful with ",e.jsx("code",{children:"+"}),": one string → whole expression becomes concatenation."]}),e.jsxs("li",{children:["Don’t mix ",e.jsx("b",{children:"BigInt"})," and ",e.jsx("b",{children:"Number"})," in arithmetic; cast intentionally."]}),e.jsxs("li",{children:["For objects, know the order: hint “number” → ",e.jsx("code",{children:"valueOf"})," then"," ",e.jsx("code",{children:"toString"})," (Dates prefer “string”). Customize with"," ",e.jsx("code",{children:"Symbol.toPrimitive"})," if needed."]}),e.jsxs("li",{children:["Avoid accidental coercion in validations/logical flow; combine with"," ",e.jsx("code",{children:"??"}),"/",e.jsx("code",{children:"?."})," patterns when appropriate."]})]})]})]})}export{l as default};
