import{j as e}from"./index-DbgcfXk7.js";import{S as s}from"./styled-NmGkWyWc.js";import{B as r}from"./Breadcrumbs-DKYNdBdq.js";import{L as i}from"./index-Bq7RyaJG.js";function a(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:i}),e.jsx(s.Heading,{children:"Loops"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Repetition constructs: ",e.jsx("b",{children:"for"}),", ",e.jsx("b",{children:"while"}),", ",e.jsx("b",{children:"do…while"}),". Use array methods for pure transforms; loops are great for early exits and complex control."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"for"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Classic counter; init → test → update each iteration."}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"let"})," for the index (fresh per iteration; plays well with closures)."]})]}),e.jsx(s.Pre,{children:`for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) { found = i; break; }
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"while / do…while"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"while"}),": runs while condition is truthy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"do…while"}),": runs once, then checks."]})]}),e.jsx(s.Pre,{children:`let n = 3;
while (n--) { /* runs 3 times */ }

let input;
do { input = get(); } while (!valid(input));`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Iterating arrays & iterables"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"for…of"})," iterates values of any iterable (arrays, strings, Maps, Sets)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"for…in"})," iterates ",e.jsx("i",{children:"keys"})," (incl. inherited) — avoid on arrays (use its own topic for details)."]})]}),e.jsx(s.Pre,{children:`for (const v of [10,20,30]) { /* v = 10,20,30 */ }
for (const ch of "hi") { /* h, i */ }

// Map / Set
for (const [k,v] of new Map([["a",1]])) { /* ... */ }`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Early exit & skipping"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"break"})," exits the loop; ",e.jsx("b",{children:"continue"})," skips to next iteration."]}),e.jsx("li",{children:"For nested loops, labels are possible but use sparingly (see “Labels, break, continue”)."})]}),e.jsx(s.Pre,{children:`for (const v of arr) {
  if (!v) continue;
  if (v.id === id) { result = v; break; }
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"When to prefer methods"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"map/filter/reduce"})," for pure transformations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"some/every/find"})," express intent + allow early result."]})]}),e.jsx(s.Pre,{children:`const names = users.map(u => u.name);
const firstAdult = users.find(u => u.age >= 18);
const allValid = items.every(isValid);`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Async notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"await in a plain loop"})," runs sequentially (good for rate limits, slower overall)."]}),e.jsxs("li",{children:["For parallel work: collect promises then ",e.jsx("code",{children:"await Promise.all(promises)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"for await…of"})," consumes async iterables (streams, paginated APIs)."]})]}),e.jsx(s.Pre,{children:`// sequential (ordered)
for (const url of urls) {
  const res = await fetch(url);
}

// parallel
const promises = urls.map(u => fetch(u));
const results = await Promise.all(promises);

// async iterable
for await (const chunk of stream) {
  // handle chunk
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Performance & safety"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Avoid reading ",e.jsx("code",{children:"arr.length"})," each time in hot paths (cache it)."]}),e.jsx("li",{children:"Mutating array while iterating can skip/duplicate work; prefer immutable updates or iterate a copy."}),e.jsxs("li",{children:["Use numeric ",e.jsx("code",{children:"for"})," for tight loops; readability first."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"for…of"})," for values; avoid ",e.jsx("b",{children:"for…in"})," on arrays."]}),e.jsx("li",{children:"Prefer array methods for pure transforms; loops for early exit / complex control."}),e.jsxs("li",{children:["Pick sequential vs parallel consciously when using ",e.jsx("code",{children:"await"}),"."]}),e.jsxs("li",{children:["Keep loop variables block-scoped with ",e.jsx("b",{children:"let"}),"."]})]})]})]})}export{a as default};
