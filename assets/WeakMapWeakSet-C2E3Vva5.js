import{j as e}from"./index-D5VEPJXy.js";import{S as s,B as n}from"./index-BYXcVTnH.js";import{B as i}from"./Breadcrumbs-_bfjIlB_.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:n}),e.jsx(s.Heading,{children:"WeakMap / WeakSet"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"WeakMap"})," and ",e.jsx("code",{children:"WeakSet"})," hold ",e.jsx("b",{children:"weak references"})," to their object keys/items. If the only remaining reference to an object is from a weak collection, it can be",e.jsx("b",{children:" garbage-collected"}),". They are not enumerable (no size/iteration)."]}),e.jsx("h2",{children:"WeakMap (object → value)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Keys must be non-null ",e.jsx("b",{children:"objects"}),". Values can be anything."]}),e.jsxs("li",{children:["APIs: ",e.jsx("code",{children:"set"}),", ",e.jsx("code",{children:"get"}),", ",e.jsx("code",{children:"has"}),", ",e.jsx("code",{children:"delete"}),"."]}),e.jsxs("li",{children:["No ",e.jsx("code",{children:"size"}),", no ",e.jsx("code",{children:"keys()"}),", no iteration (by design)."]})]}),e.jsx(s.Pre,{children:`const wm = new WeakMap();
const obj = {};
wm.set(obj, { meta: 1 });
wm.get(obj);     // { meta: 1 }
wm.has(obj);     // true
wm.delete(obj);  // true
// If 'obj' becomes unreachable elsewhere, entry is eligible for GC.`}),e.jsx("h2",{children:"WeakSet (object membership)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Stores unique ",e.jsx("b",{children:"objects"})," only (no primitives); weakly held."]}),e.jsxs("li",{children:["APIs: ",e.jsx("code",{children:"add"}),", ",e.jsx("code",{children:"has"}),", ",e.jsx("code",{children:"delete"}),"."]})]}),e.jsx(s.Pre,{children:`const ws = new WeakSet();
const node = {};
ws.add(node);
ws.has(node);   // true
ws.delete(node);`}),e.jsx("h2",{children:"When to use weak collections"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Attach metadata to objects you don't own (DOM elements, AST nodes, cache keys) without causing leaks."}),e.jsx("li",{children:"Track “visited” objects in graphs during traversal; entries vanish when objects do."}),e.jsx("li",{children:"Per-instance private data (pre-#private era) without preventing GC."})]}),e.jsx("h2",{children:"Privacy via WeakMap (per-instance state)"}),e.jsx(s.Pre,{children:`const _priv = new WeakMap();
class Counter {
  constructor(){ _priv.set(this, { n: 0 }); }
  inc(){ _priv.get(this).n++; }
  get value(){ return _priv.get(this).n; }
}
const c = new Counter();
c.inc(); c.value; // 1
// When 'c' is unreachable, its private record can be GC'd.`}),e.jsx("h2",{children:"Caching without leaks"}),e.jsx(s.Pre,{children:`// cache heavy result per object key
const cache = new WeakMap();
function compute(obj){
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveWork(obj);
  cache.set(obj, result);
  return result;
}`}),e.jsx("h2",{children:"DOM metadata pattern"}),e.jsx("p",{children:"Associate data with nodes; removing the node frees the metadata automatically."}),e.jsx(s.Pre,{children:`const meta = new WeakMap();
function bind(el){
  meta.set(el, { clicks: 0 });
  el.addEventListener("click", () => meta.get(el).clicks++);
}
// later: el.remove() → el eligible for GC → meta entry can vanish`}),e.jsx("h2",{children:"Map vs WeakMap (leak demo)"}),e.jsx(s.Pre,{children:`// Using Map may leak if keys are never deleted:
const strong = new Map();
(function(){
  const tmp = {};
  strong.set(tmp, "data"); // stays forever unless manually deleted
})();

// Using WeakMap avoids this class of leak:
const weak = new WeakMap();
(function(){
  const tmp = {};
  weak.set(tmp, "data");   // entry eligible for GC when tmp goes out of scope
})();`}),e.jsx("h2",{children:"Limitations / gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["No iteration or ",e.jsx("code",{children:"size"})," - you can't inspect contents (prevents keeping keys alive)."]}),e.jsx("li",{children:"Keys (WeakMap) / values (WeakSet) must be objects; primitives are not allowed."}),e.jsxs("li",{children:["You cannot rely on ",e.jsx("i",{children:"when"})," GC happens; treat cleanup as eventual."]})]}),e.jsx("h2",{children:"WeakRef & FinalizationRegistry (advanced, use sparingly)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"WeakRef"})," holds a weak pointer; ",e.jsx("code",{children:".deref()"})," may return the object or ",e.jsx("code",{children:"undefined"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"FinalizationRegistry"})," schedules a callback sometime after an object is collected."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do not"})," use finalizers for logic you must guarantee - GC timing is non-deterministic."]})]}),e.jsx(s.Pre,{children:`// WeakRef example
let obj = { big: "data" };
const ref = new WeakRef(obj);
obj = null;
// later...
const maybe = ref.deref(); // object or undefined

// FinalizationRegistry example (debug/cleanup hints)
const fr = new FinalizationRegistry(token => {
  // called eventually after target is GC'd
  // side-effects should be idempotent and best-effort only
});
let target = {};
fr.register(target, "target-1");
// later: target = null; // eligible for GC → fr callback may run eventually`}),e.jsx("h2",{children:"Patterns: visited set (graph/DFS)"}),e.jsx(s.Pre,{children:`function walk(node, visit, seen = new WeakSet()){
  if (node && typeof node === "object" && !seen.has(node)){
    seen.add(node);
    visit(node);
    for (const child of node.children ?? []) walk(child, visit, seen);
  }
}`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WeakMap:"})," object keys only; ",e.jsx("code",{children:"set/get/has/delete"}),"; no size/iteration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"WeakSet:"})," object membership; ",e.jsx("code",{children:"add/has/delete"}),"; no size/iteration."]}),e.jsx("li",{children:"Use for metadata/caches keyed by objects to avoid leaks."}),e.jsx("li",{children:"GC is non-deterministic - never base correctness on finalization timing."}),e.jsxs("li",{children:[e.jsx("code",{children:"WeakRef"}),"/",e.jsx("code",{children:"FinalizationRegistry"})," exist for niche cases; prefer weak collections first."]})]})]})]})}export{c as default};
