import{j as e}from"./index-COrpvOC4.js";import{S as s,B as r}from"./index-BodrDu-9.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";function a(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:r}),e.jsx(s.Heading,{children:"Array: map / filter / reduce"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."}),' The "big three" pure data transforms:',e.jsx("b",{children:" map"})," (shape each item), ",e.jsx("b",{children:"filter"})," (keep some items), ",e.jsx("b",{children:"reduce"})," (fold many → one). Callbacks receive ",e.jsx("code",{children:"(value, index, array)"})," and optional ",e.jsx("code",{children:"thisArg"}),"."]}),e.jsx("h2",{children:"map (1 → 1)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Returns a ",e.jsx("b",{children:"new array"})," of the same length."]}),e.jsx("li",{children:"Skips holes; keeps holes in the same positions (result may be sparse)."})]}),e.jsx(s.Pre,{children:`const nums = [1, 2, 3];
nums.map(x => x * 2);          // [2,4,6]

// with index
["a","b","c"].map((ch, i) => i + ":" + ch); // ["0:a","1:b","2:c"]

// thisArg
function times(v){ return v * this.k; }
[1,2].map(times, { k: 10 });   // [10,20]

// common pitfall: parseInt + map (index becomes radix!)
["10","11","12"].map(parseInt); // [10, NaN, 1]
["10","11","12"].map(Number);   // [10,11,12] ✅`}),e.jsx("h2",{children:"filter (0/1 → keep?)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Returns a ",e.jsx("b",{children:"new, dense"})," array (holes are removed)."]}),e.jsx("li",{children:"Truthy result keeps the item; falsy removes."})]}),e.jsx(s.Pre,{children:`const xs = [1,2,3,4,5];
xs.filter(x => x % 2 === 0);      // [2,4]

// quick remove falsy:
["", "ok", 0, "x", null].filter(Boolean);  // ["ok","x"]`}),e.jsx("h2",{children:"flatMap (map + flatten one level)"}),e.jsx("ul",{children:e.jsx("li",{children:'Good for "map then filter/flatten" in one pass.'})}),e.jsx(s.Pre,{children:`// expand numbers into [n, n*n]
[2,3].flatMap(n => [n, n*n]);     // [2,4,3,9]

// map + conditional keep:
["a","", "b"].flatMap(s => s ? [s.toUpperCase()] : []); // ["A","B"]`}),e.jsx("h2",{children:"reduce (fold to a single value)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Signature: ",e.jsx("code",{children:"arr.reduce((acc, v, i, arr) => nextAcc, initAcc)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Always provide an initial value"})," to avoid edge cases on empty arrays."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"reduceRight"})," to fold from right."]})]}),e.jsx(s.Pre,{children:`// sum
[1,2,3].reduce((acc, x) => acc + x, 0);                  // 6

// max
[3,9,4].reduce((m,x) => x > m ? x : m, -Infinity);       // 9

// group by key
const users = [{role:"admin"},{role:"user"},{role:"admin"}];
const groups = users.reduce((acc, u) => {
  (acc[u.role] ??= []).push(u);
  return acc;
}, {});   // { admin:[…], user:[…] }

// frequency map
const freq = ["a","b","a"].reduce((acc, k) => (acc[k]=(acc[k]||0)+1, acc), {}); // {a:2,b:1}

// build Map (not Object)
const map = [["a",1],["b",2]].reduce((m,[k,v]) => m.set(k,v), new Map());`}),e.jsx("h2",{children:"Chaining patterns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Readable: ",e.jsx("code",{children:"arr.filter(...).map(...)"}),' for "select then project".']}),e.jsxs("li",{children:["Performance: use ",e.jsx("code",{children:"flatMap"})," or a single ",e.jsx("code",{children:"reduce"})," when hot paths matter."]})]}),e.jsx(s.Pre,{children:`// pipeline
const result = products
  .filter(p => p.inStock)
  .map(p => ({ id: p.id, price: p.price }));`}),e.jsx("h2",{children:"Async note"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"map(async ...)"})," returns an array of ",e.jsx("b",{children:"promises"}),". Use ",e.jsx("code",{children:"await Promise.all()"}),"."]})}),e.jsx(s.Pre,{children:`const urls = ["a.json","b.json"];
const promises = urls.map(u => fetch(u).then(r => r.json()));
const data = await Promise.all(promises);`}),e.jsx("h2",{children:"Early exit?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"map"}),"/",e.jsx("code",{children:"filter"}),"/",e.jsx("code",{children:"reduce"})," can't early break. For queries use:"]}),e.jsxs("li",{children:[e.jsx("b",{children:"find"})," (first match), ",e.jsx("b",{children:"some"})," (any match), ",e.jsx("b",{children:"every"})," (all match)."]})]}),e.jsx(s.Pre,{children:`[1,4,7].some(x => x > 5);   // true
[1,4,7].every(x => x < 10); // true
[1,4,7].find(x => x % 2 === 0); // 4`}),e.jsx("h2",{children:"Immutability helpers (copy versions)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"When returning arrays from reducers, keep copies shallow but consistent."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"toSorted"}),"/",e.jsx("code",{children:"toReversed"}),"/",e.jsx("code",{children:"toSpliced"}),"/",e.jsx("code",{children:"with"})," to avoid mutation."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"map"})," transforms, ",e.jsx("b",{children:"filter"})," selects, ",e.jsx("b",{children:"reduce"})," accumulates into one value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Always pass an initial value"})," to ",e.jsx("code",{children:"reduce"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"map(parseInt)"})," is a trap; use ",e.jsx("code",{children:"Number"})," or a custom callback."]}),e.jsxs("li",{children:[e.jsx("code",{children:"flatMap"})," = map + one-level flatten; great for conditional expands."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async map"})," → array of promises → ",e.jsx("code",{children:"await Promise.all"}),"."]}),e.jsx("li",{children:"Prefer readability (chain) unless profiling shows a hot path—then fuse passes."})]})]})]})}export{a as default};
