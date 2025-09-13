import{j as e}from"./index-8u32w9KR.js";import{S as s}from"./styled-B7242J7m.js";import{B as r,L as i}from"./index-r3zDAhCy.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:i}),e.jsx(s.Heading,{children:"Equality"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Three notions: ",e.jsx("b",{children:"Strict"})," ",e.jsx("code",{children:"==="})," (no coercion),"," ",e.jsx("b",{children:"Loose"})," ",e.jsx("code",{children:"=="})," (coercion), and ",e.jsx("b",{children:"SameValue"}),"/",e.jsx("b",{children:"SameValueZero"})," (used by",e.jsx("code",{children:" Object.is"}),", ",e.jsx("code",{children:"Set/Map"}),", ",e.jsx("code",{children:"includes"}),")."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiers (quick)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"==="}),": same type & value. ",e.jsx("code",{children:"NaN === NaN"})," → ",e.jsx("b",{children:"false"}),"; ",e.jsx("code",{children:"-0 === 0"})," → ",e.jsx("b",{children:"true"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"=="}),": applies coercion (string⇄number, boolean→number, object→primitive)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Object.is"}),": like ",e.jsx("code",{children:"==="})," but ",e.jsx("code",{children:"NaN"})," equal and ",e.jsx("code",{children:"-0"})," ≠ ",e.jsx("code",{children:"0"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SameValueZero"}),": like ",e.jsx("code",{children:"Object.is"})," but ",e.jsx("code",{children:"-0"})," = ",e.jsx("code",{children:"0"})," (used by ",e.jsx("code",{children:"includes"}),", ",e.jsx("code",{children:"Set/Map"}),")."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`// Loose (==) — small table
"" == 0            // true
"0" == 0           // true
false == 0         // true
true == 1          // true
null == undefined  // true  (only to each other)
0 == null          // false
[] == ""           // true   ([] -> "")
[] == 0            // true   ([] -> "" -> 0)
[0] == 0           // true   ("0" -> 0)
{ } == 0           // false`}),e.jsx(s.Pre,{children:`// Strict vs Object.is
NaN === NaN         // false
Object.is(NaN, NaN) // true

-0 === 0            // true
Object.is(-0, 0)    // false

[] === []           // false (different refs)
const a = {}; const b = a; a === b // true`}),e.jsx(s.Pre,{children:`// SameValueZero in arrays/sets/maps
[NaN].includes(NaN) // true
[NaN].indexOf(NaN)  // -1   (indexOf uses ===)

const s = new Set([NaN]);
s.has(NaN)          // true

const m = new Map();
m.set(NaN, "x"); m.get(NaN) // "x"`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Relational & BigInt"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Relational (",e.jsx("code",{children:"<, >"}),") coerce to primitives; arrays compare as strings (e.g., ",e.jsx("code",{children:"[2] < [10]"})," ⇒ ",e.jsx("code",{children:'"2" < "10"'})," ⇒ ",e.jsx("b",{children:"false"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BigInt vs Number:"})," ",e.jsx("code",{children:"1n == 1"})," → true (loose), ",e.jsx("code",{children:"1n === 1"})," → false (strict)."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Default to ",e.jsx("b",{children:"==="}),". Use ",e.jsx("code",{children:"Object.is"})," for ",e.jsx("code",{children:"NaN"})," and ",e.jsx("code",{children:"-0"})," edge cases."]}),e.jsxs("li",{children:["For membership checks, remember ",e.jsx("b",{children:"SameValueZero"}),": ",e.jsx("code",{children:"includes"}),"/",e.jsx("code",{children:"Set"}),"/",e.jsx("code",{children:"Map"})," match ",e.jsx("code",{children:"NaN"}),"."]}),e.jsxs("li",{children:["Avoid ",e.jsx("code",{children:"=="})," unless intentionally using its rules (e.g., ",e.jsx("code",{children:"null == undefined"})," only)."]}),e.jsx("li",{children:"Objects compare by reference, not structure—use deep compare when needed."})]})]})]})}export{d as default};
