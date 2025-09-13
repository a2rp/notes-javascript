import{j as e}from"./index-4OJNB7vi.js";import{S as s,M as r}from"./index-DrTtPcpR.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Meta & Advanced",sectionPath:"/meta-advanced",topics:r}),e.jsx(s.Heading,{children:"Performance basics"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Performance is about doing ",e.jsx("i",{children:"less work"}),", doing it ",e.jsx("i",{children:"later"}),", or doing it ",e.jsx("i",{children:"elsewhere"}),". Always ",e.jsx("b",{children:"measure first"}),", then fix the biggest bottleneck."]}),e.jsx("h2",{children:"Measure (first!)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use DevTools Performance (record flame chart), FPS meter, Coverage."}),e.jsxs("li",{children:["Quick timers: ",e.jsx("code",{children:"performance.now()"}),", marks/measures."]})]}),e.jsx(s.Pre,{children:`performance.mark("A");
// ...work...
performance.mark("B");
performance.measure("task", "A", "B");
console.table(performance.getEntriesByName("task"));`}),e.jsx("h2",{children:"Do less work"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Pick better algorithms/data-structures (O(n) vs O(n²))."}),e.jsx("li",{children:"Avoid repeated computation; memoize pure helpers."}),e.jsx("li",{children:"Short-circuit early; skip when no-op."})]}),e.jsx(s.Pre,{children:`// naive O(n²) duplicate check -> O(n)
function hasDupes(arr){
  const seen = new Set();
  for (const x of arr) { if (seen.has(x)) return true; seen.add(x); }
  return false;
}`}),e.jsx("h2",{children:"Batch & schedule work (keep UI smooth)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Batch DOM writes; avoid layout thrash (read → write order)."}),e.jsx("li",{children:"Chunk big loops and yield to the loop/rAF."})]}),e.jsx(s.Pre,{children:`// chunk processing to avoid jank
const tick = () => new Promise(r => setTimeout(r));
async function process(items, fn){
  for (let i=0;i<items.length;i++){
    fn(items[i]);
    if (i % 200 === 0) await tick(); // let UI breathe
  }
}`}),e.jsx("h2",{children:"Avoid allocations (hot paths)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Don't create new arrays/objects in tight loops if reusable."}),e.jsxs("li",{children:["Prefer ",e.jsx("code",{children:"push"})," over ",e.jsx("code",{children:"concat"}),"; reuse buffers where safe."]})]}),e.jsx(s.Pre,{children:`// avoid spread inside hot loops
const out = [];
for (const x of input) out.push(transform(x));`}),e.jsx("h2",{children:"Object shapes & deopts (engines)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Keep objects' property set/order consistent; avoid adding props later."}),e.jsx("li",{children:"Avoid mixed types in the same field (e.g., number then string)."})]}),e.jsx(s.Pre,{children:`// stable shape
function makeUser(name, age){
  return { name, age, active: false }; // define all upfront
}`}),e.jsx("h2",{children:"Do it later / elsewhere"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Code-split"})," rarely used features (dynamic ",e.jsx("code",{children:"import()"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"Web Workers"})," for CPU-heavy tasks."]})]}),e.jsx(s.Pre,{children:`// worker quickstart
// main.js
const w = new Worker(new URL("./heavy.worker.js", import.meta.url));
w.onmessage = (e) => console.log("result", e.data);
w.postMessage({ payload });

// heavy.worker.js
self.onmessage = (e) => {
  const res = heavyCompute(e.data.payload);
  self.postMessage(res);
};`}),e.jsx("h2",{children:"Network wins (the usual 80/20)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Tree-shake + minify; compress (gzip/brotli); cache (ETag/immutable)."}),e.jsxs("li",{children:["Lazy load routes/widgets; ",e.jsx("code",{children:"modulepreload"})," for near-term use."]})]}),e.jsx("h2",{children:"Event storm control"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Debounce or throttle high-frequency events (scroll, input, resize)."}),e.jsx("li",{children:"Use event delegation on lists."})]}),e.jsx(s.Pre,{children:`// throttle
function throttle(fn, ms=100){
  let t=0;
  return (...a)=>{ const now=Date.now(); if (now-t>ms){ t=now; fn(...a); } };
}
window.addEventListener("scroll", throttle(onScroll, 100));`}),e.jsx("h2",{children:"Memory ↔ performance"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Leaks → GC pressure → jank. Clear timers/listeners; null out large refs."}),e.jsx("li",{children:"Avoid retaining big arrays in caches; cap size (LRU) and expire."})]}),e.jsx(s.Pre,{children:`// simple LRU cap
const cache = new Map();
function put(k,v){ cache.set(k,v); if (cache.size>200) cache.delete(cache.keys().next().value); }`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Profile first: flame chart, FPS, memory; fix the fattest frame."}),e.jsx("li",{children:"Prefer linear algorithms; precompute/memoize; skip work early."}),e.jsx("li",{children:"Batch reads/writes; chunk long tasks; use rAF for visuals."}),e.jsx("li",{children:"Avoid needless allocations; keep object shapes stable."}),e.jsx("li",{children:"Code-split & move CPU work to Workers when needed."}),e.jsx("li",{children:"Control event storms with debounce/throttle; delegate events."}),e.jsx("li",{children:"Watch memory (timers/listeners, caches) to prevent GC jank."})]})]})]})}export{o as default};
