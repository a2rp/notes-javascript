import{j as e}from"./index-Cps9Yqi0.js";import{S as s,B as r}from"./index-Da5ERLYl.js";import{B as i}from"./Breadcrumbs-DTCNvS__.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:r}),e.jsx(s.Heading,{children:"Arrays: basics"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Array is an ordered list with a numeric ",e.jsx("i",{children:"index"})," and a mutable"," ",e.jsx("code",{children:"length"}),". Prefer ",e.jsx("b",{children:"dense"})," arrays (no holes). Most methods are O(n) and",e.jsx("b",{children:" shallow"})," (copy references)."]}),e.jsx("h2",{children:"Create (safe patterns)"}),e.jsx(s.Pre,{children:`const a = [1,2,3];              // literal (best)
const b = Array.of(5);         // [5]  (avoids 'new Array(5)' trap)
const c = Array.from("abc");   // ["a","b","c"] from iterable/array-like
const d = Array.from({ length: 3 }, (_, i) => i); // [0,1,2] with map`}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("b",{children:"Avoid"})," ",e.jsx("code",{children:"new Array(n)"}),' unless you mean "length n with holes".']})}),e.jsx("h2",{children:"Length & indexing"}),e.jsx(s.Pre,{children:`const xs = [10,20];
xs.length;          // 2
xs.length = 1;      // truncates → [10]
xs[5] = 99;         // creates holes between 1..4 → length = 6 (sparse)
xs.at(-1);          // 99 (negative index reader)`}),e.jsx("h2",{children:"Sparse vs dense (important)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:['"Holes" are missing indices; many methods ',e.jsx("b",{children:"skip"})," holes."]}),e.jsxs("li",{children:["Prefer dense arrays: use ",e.jsx("code",{children:"splice"})," to remove, not ",e.jsx("code",{children:"delete"}),"."]})]}),e.jsx(s.Pre,{children:`const a = [1,2,3];
delete a[1];        // [1, <hole>, 3]  (sparse)
a.length;           // 3
a.map(x => x);      // [1, <hole>, 3]  (hole preserved)
const b = [1,2,3]; b.splice(1,1); // [1,3] (dense)`}),e.jsx("h2",{children:"Mutating vs copy (modern APIs)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mutate:"})," ",e.jsx("code",{children:"push/pop"}),", ",e.jsx("code",{children:"shift/unshift"}),", ",e.jsx("code",{children:"splice"}),","," ",e.jsx("code",{children:"sort"}),", ",e.jsx("code",{children:"reverse"}),", ",e.jsx("code",{children:"fill"}),", ",e.jsx("code",{children:"copyWithin"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-mutating copies:"})," ",e.jsx("code",{children:"toSorted"}),", ",e.jsx("code",{children:"toReversed"}),","," ",e.jsx("code",{children:"toSpliced"}),", ",e.jsx("code",{children:"with"})," (updates one index)."]})]}),e.jsx(s.Pre,{children:`const a = [3,1,2];
a.sort();           // mutates → [1,2,3]

const b = [3,1,2];
const c = b.toSorted();  // b unchanged; c = [1,2,3]

const d = [10,20,30].with(1, 99); // [10,99,30] (copy) `}),e.jsx("h2",{children:"Essential methods (daily)"}),e.jsx(s.Pre,{children:`const xs = [1,2,3];
// add/remove
xs.push(4); xs.pop();        // tail
xs.unshift(0); xs.shift();   // head
xs.splice(1, 1, 9);          // at idx 1 remove 1, insert 9

// slice/concat (copying)
const copy = xs.slice();     // shallow clone
const merged = xs.concat([7,8]); // new array

// search
[1,2,NaN].indexOf(NaN);      // -1  (can't find NaN)
[1,2,NaN].includes(NaN);     // true (SameValueZero)

// iteration helpers
for (const x of xs) {}       // values
for (const [i,x] of xs.entries()) {} // index+value
xs.forEach(v => { /* no early return */ });`}),e.jsx("h2",{children:"Array-like & iterable"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Convert with ",e.jsx("code",{children:"Array.from(arrayLike)"})," or spread ",e.jsx("code",{children:"[...iterable]"}),"."]}),e.jsxs("li",{children:["DOM ",e.jsx("code",{children:"NodeList"}),", ",e.jsx("code",{children:"arguments"}),", typed arrays are array-likes/iterables."]})]}),e.jsx(s.Pre,{children:`function f(){ return Array.from(arguments); }  // real array
const els = document.querySelectorAll("div");
[...els].map(e => e.id);`}),e.jsx("h2",{children:"Type checks"}),e.jsx(s.Pre,{children:`Array.isArray([]);            // true
Array.isArray({ length: 0 }); // false`}),e.jsx("h2",{children:"Fill & copyWithin (in-place tools)"}),e.jsx(s.Pre,{children:`new Array(4).fill(0);     // [0,0,0,0]
[1,2,3,4].copyWithin(1, 0, 2); // [1,1,2,4]  (target=1 ← from 0..2)`}),e.jsx("h2",{children:"String ↔ array"}),e.jsx(s.Pre,{children:`"a,b,c".split(",");   // ["a","b","c"]
["a","b"].join("-"); // "a-b"`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use literals, ",e.jsx("code",{children:"Array.of"}),", or ",e.jsx("code",{children:"Array.from"})," to create arrays."]}),e.jsxs("li",{children:["Avoid holes; use ",e.jsx("code",{children:"splice"})," (not ",e.jsx("code",{children:"delete"}),") to remove so arrays stay dense."]}),e.jsxs("li",{children:["Prefer copy helpers (",e.jsx("code",{children:"toSorted"}),"/",e.jsx("code",{children:"toReversed"}),"/",e.jsx("code",{children:"toSpliced"}),"/",e.jsx("code",{children:"with"}),") when you need immutability."]}),e.jsxs("li",{children:[e.jsx("code",{children:"includes"})," finds ",e.jsx("code",{children:"NaN"}),"; ",e.jsx("code",{children:"indexOf"})," does not."]}),e.jsxs("li",{children:[e.jsx("code",{children:"for…of"})," iterates values; avoid ",e.jsx("code",{children:"for…in"})," on arrays (it walks keys + prototypes)."]}),e.jsx("li",{children:"All common copies are shallow—nested objects are shared references."})]})]})]})}export{d as default};
