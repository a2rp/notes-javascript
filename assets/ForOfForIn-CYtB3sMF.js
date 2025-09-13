import{j as e}from"./index-Cud8-B-g.js";import{S as s}from"./styled-ou-l2Jgl.js";import{B as r}from"./Breadcrumbs-BUXMDEQY.js";import{L as n}from"./index-B6WK1LZv.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(s.Heading,{children:"for…of vs for…in"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"for…of"})," iterates ",e.jsx("b",{children:"values of an iterable"})," (arrays, strings, Maps, Sets, generators)."," ",e.jsx("code",{children:"for…in"})," iterates ",e.jsx("b",{children:"enumerable property keys"})," of an object, including inherited ones."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"When to use what"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Arrays / strings / Maps / Sets:"})," use ",e.jsx("code",{children:"for…of"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plain objects:"})," use ",e.jsx("code",{children:"Object.keys/values/entries"})," with ",e.jsx("code",{children:"for…of"})," (or guard ",e.jsx("code",{children:"for…in"})," with ",e.jsx("code",{children:"Object.hasOwn"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid"})," ",e.jsx("code",{children:"for…in"})," on arrays (indexes as strings, includes inherited keys, order not for performance-critical code)."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`// Arrays (values)
for (const v of [10, 20, 30]) {
  // 10, 20, 30
}

// Index + value
const nums = [4,5,6];
for (const [i, v] of nums.entries()) {
  // i=0,1,2 ; v=4,5,6
}

// Strings (code units)
for (const ch of "hi") { /* "h","i" */ }

// Map / Set
const m = new Map([["a",1],["b",2]]);
for (const [k,v] of m) { /* "a",1 then "b",2 */ }

const s = new Set([1,2,3]);
for (const v of s) { /* 1,2,3 */ }`}),e.jsx(s.Pre,{children:`// for…in over objects (keys)
const obj = Object.create({ inherited: 1 });
obj.own = 2;

for (const k in obj) {
  // "inherited" and "own" both appear (if enumerable)
  if (!Object.hasOwn(obj, k)) continue; // guard inherited
  // use obj[k]
}`}),e.jsx(s.Pre,{children:`// Prefer Object.keys/entries with for…of
for (const k of Object.keys(obj)) {
  // own enumerable keys only
}
for (const [k,v] of Object.entries(obj)) {
  // k, v
}`}),e.jsx(s.Pre,{children:`// Sparse arrays: for…of skips holes
const a = [, , 3];           // holes at 0 and 1
[...a];                      // [empty × 2, 3]
for (const v of a) { /* only 3 */ }`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Behavior notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"for…of"})," uses the iterable protocol (",e.jsx("code",{children:"Symbol.iterator"}),"); works with user-defined iterables."]}),e.jsxs("li",{children:[e.jsx("b",{children:"for…in"})," lists enumerable string keys (skips symbols); includes inherited enumerable properties unless guarded."]}),e.jsxs("li",{children:["Property enumeration order is not something to rely on for ",e.jsx("code",{children:"for…in"}),"; use ",e.jsx("code",{children:"Object.keys"})," when you need predictable own-key order."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Break/continue/return"})," work with both; unlike ",e.jsx("code",{children:"forEach"}),", which can’t use ",e.jsx("code",{children:"break"}),"/",e.jsx("code",{children:"continue"})," and doesn’t await."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Async note"}),e.jsx("ul",{children:e.jsxs("li",{children:["Use ",e.jsx("code",{children:"for await…of"})," to consume ",e.jsx("b",{children:"async iterables"})," (streams, paginated APIs). (Covered in Asynchrony section.)"]})}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Arrays/iterables ⇒ ",e.jsx("b",{children:"for…of"}),"; Objects ⇒ ",e.jsx("b",{children:"Object.keys/entries + for…of"}),"."]}),e.jsxs("li",{children:["If you must use ",e.jsx("b",{children:"for…in"}),", guard with ",e.jsx("code",{children:"Object.hasOwn(obj, k)"}),"."]}),e.jsxs("li",{children:["Don’t depend on ",e.jsx("b",{children:"for…in"})," order; avoid it on arrays."]}),e.jsxs("li",{children:["Need index in ",e.jsx("b",{children:"for…of"}),"? Use ",e.jsx("code",{children:"arr.entries()"})," or a classic ",e.jsx("code",{children:"for (let i=0…)"}),"."]})]})]})]})}export{d as default};
