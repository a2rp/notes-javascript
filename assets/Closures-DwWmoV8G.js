import{j as e}from"./index-4OJNB7vi.js";import{S as s}from"./styled-CSyC-YA8.js";import{B as n}from"./Breadcrumbs-BWCvk1iJ.js";import{L as i}from"./index-DfUzXn8d.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(n,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:i}),e.jsx(s.Heading,{children:"Closures"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," A closure is a function + its ",e.jsx("i",{children:"lexical environment"}),". Functions “remember” variables from where they were defined, even after that scope has returned.",e.jsx("b",{children:" Closures capture bindings (by reference), not copies."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Why it matters"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Encapsulation / private state (counters, caches, modules)."}),e.jsx("li",{children:"Callbacks & async code that need access to outer variables later."}),e.jsx("li",{children:"Common bugs in loops/timers due to capturing a changing binding."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`// 1) Private state / factory
function makeCounter() {
  let n = 0;
  return () => ++n;   // closes over n
}
const c = makeCounter();
c(); c();             // 1, 2`}),e.jsx(s.Pre,{children:`// 2) Capture is by binding (live), not by value
let label = "A";
const f = () => label;
label = "B";
f();                  // "B"`}),e.jsx(s.Pre,{children:`// 3) Loops: var (one shared binding) vs let (new per-iteration)
var outVar = [];
for (var i = 0; i < 3; i++) outVar.push(() => i);
outVar.map(fn => fn());      // [3, 3, 3] ❌

let outLet = [];
for (let j = 0; j < 3; j++) outLet.push(() => j);
outLet.map(fn => fn());      // [0, 1, 2] ✅`}),e.jsx(s.Pre,{children:`// 4) setTimeout with snapshots
for (let i = 1; i <= 3; i++) setTimeout(() => console.log(i), i*10); // 1 2 3 ✅
// With var, create a snapshot using an IIFE or param:
for (var k = 1; k <= 3; k++) (k => setTimeout(() => console.log(k), k*10))(k); // ✅`}),e.jsx(s.Pre,{children:`// 5) Module pattern (encapsulation)
function createStore(init = 0){
  let value = init;
  return {
    get: () => value,
    set: (v) => (value = v),
    inc: () => ++value,
  };
}
const s = createStore(10);
s.get(); s.inc();    // 10, 11`}),e.jsx(s.Pre,{children:`// 6) Cache via closure
function memoize(fn){
  const cache = new Map();          // closed-over
  return (x) => cache.has(x) ? cache.get(x) : (cache.set(x, fn(x)), cache.get(x));
}
const sq = memoize(x => x*x);
sq(4); sq(4);        // 16 (second call from cache)`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Gotchas & tips"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Snapshot vs live:"})," if you need the value ",e.jsx("i",{children:"now"}),", store it in a new binding (e.g., ",e.jsx("code",{children:"const snapshot = x;"}),") or use ",e.jsx("code",{children:"let"})," per iteration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"this ≠ closure:"})," closures capture variables; ",e.jsx("code",{children:"this"})," is set by call-site (or lexically with arrows). Don’t confuse them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memory leaks:"})," long-lived closures keep captured objects alive. Clean up event listeners/timers; avoid capturing big DOM nodes—pass IDs or use ",e.jsx("code",{children:"WeakMap"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debugging:"})," in devtools, inspect a paused closure’s “Scope” panel to see captured bindings."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Patterns (quick)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Factory + returned methods"})," for private state instead of classes when inheritance isn’t needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event handlers"}),": capture the minimal data (id/index), fetch large data on demand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," prefer reusing outer functions over creating closures in hot loops unless they actually need per-iteration state."]})]})]})]})}export{c as default};
