import{j as e}from"./index-4OJNB7vi.js";import{S as s,M as i}from"./index-DrTtPcpR.js";import{B as r}from"./Breadcrumbs-BWCvk1iJ.js";function t(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Meta & Advanced",sectionPath:"/meta-advanced",topics:i}),e.jsx(s.Heading,{children:"Memory & GC basics"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JS uses automatic garbage collection (mark-and-sweep). Anything",e.jsx("b",{children:" reachable"})," from roots (globals, current stack, active closures, DOM) is kept. Lose the last strong reference → object becomes collectible."]}),e.jsx("h2",{children:"How GC decides"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Roots:"})," global objects, current call stack, pending tasks/microtasks, active DOM."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reachability graph:"})," references from roots keep things alive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pause & sweep:"})," collectors periodically mark reachable objects and free the rest."]})]}),e.jsx("h2",{children:"Typical leak sources (and fixes)"}),e.jsx(s.Pre,{children:`// 1) Uncleared timers
const id = setInterval(poll, 1000);
// fix: clear on teardown
return () => clearInterval(id);

// 2) Event listeners not removed
elem.addEventListener("click", onClick);
// fix: use AbortController (auto-remove)
const ac = new AbortController();
elem.addEventListener("click", onClick, { signal: ac.signal });
// later: ac.abort();

// 3) Global caches that only grow
const cache = [];
function log(item){ cache.push(item); } // grows forever
// fix: cap size (LRU/TTL) or use dev-only logging

// 4) Detached DOM kept by JS references
const list = document.getElementById("list");
const li = document.createElement("li");
list.append(li);
const stash = new Map();
stash.set(li, "meta"); // li stays alive even if removed from DOM
// fix: prefer WeakMap for DOM→meta
const meta = new WeakMap();
meta.set(li, "meta"); // auto-collect when li is unreachable`}),e.jsx("h2",{children:"Weak collections (no strong hold)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WeakMap<object, T>"})," & ",e.jsx("b",{children:"WeakSet<object>"})," don't prevent GC of keys."]}),e.jsx("li",{children:"Use for metadata by object, memoization by object key, or tracking DOM nodes."}),e.jsx("li",{children:"They're not enumerable (by design)."})]}),e.jsx(s.Pre,{children:`// metadata per object
const meta = new WeakMap();
function tag(obj, info){ meta.set(obj, info); }
function getTag(obj){ return meta.get(obj); }`}),e.jsx("h2",{children:"WeakRef & FinalizationRegistry (advanced)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WeakRef"})," lets you ",e.jsx("i",{children:"optionally"})," access an object without keeping it alive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"FinalizationRegistry"})," runs a callback sometime after an object is collected."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caution:"})," timing is non-deterministic; don't use for core logic or security."]})]}),e.jsx(s.Pre,{children:`// soft cache example
const cache = new Map(); // key -> WeakRef(value)
function getSoft(key, factory){
  const wr = cache.get(key);
  let val = wr?.deref();
  if (!val){ val = factory(); cache.set(key, new WeakRef(val)); }
  return val;
}`}),e.jsx("h2",{children:"Memory-friendly patterns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"local scope"})," over module-wide singletons; pass dependencies in."]}),e.jsxs("li",{children:["Null out large arrays/objects when done (",e.jsx("code",{children:"buf = null"}),") if they outlive scope."]}),e.jsxs("li",{children:["Abort fetches/streams; clear intervals/timeouts in ",e.jsx("code",{children:"finally"}),"/unmount."]}),e.jsx("li",{children:"Cap caches (LRU) and expire entries; store only what you need."}),e.jsxs("li",{children:["For DOM lists, use ",e.jsx("b",{children:"event delegation"})," instead of per-item listeners."]}),e.jsxs("li",{children:["When using ",e.jsx("code",{children:"URL.createObjectURL(blob)"}),", call ",e.jsx("code",{children:"URL.revokeObjectURL"})," after use."]})]}),e.jsx("h2",{children:"Measuring & debugging"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Chrome DevTools → Memory:"})," Heap snapshot (look at ",e.jsx("i",{children:"Retained size"})," and ",e.jsx("i",{children:"Dominators"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance → record"})," and check ",e.jsx("i",{children:"JS heap"})," graph for steady growth."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"console.profile()"}),", ",e.jsx("code",{children:"performance.measure()"})," around allocations."]})]}),e.jsx("h2",{children:"Node specifics"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Streams: remove listeners or use ",e.jsx("code",{children:"once"}),"/",e.jsx("code",{children:"signal"}),". End/close on error."]}),e.jsx("li",{children:"Long-living processes: watch heap usage; restart on leaks; expose health endpoints."})]}),e.jsx("h2",{children:"Small utilities"}),e.jsx(s.Pre,{children:`// Simple LRU (cap by count)
function makeLRU(limit = 200){
  const map = new Map();
  return {
    get(k){ if (!map.has(k)) return; const v = map.get(k); map.delete(k); map.set(k, v); return v; },
    set(k,v){ if (map.has(k)) map.delete(k); map.set(k,v); if (map.size > limit) map.delete(map.keys().next().value); },
    clear(){ map.clear(); }
  };
}`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["GC frees what's ",e.jsx("b",{children:"unreachable"}),"; leaks keep hidden references alive."]}),e.jsxs("li",{children:["Clear timers/listeners; prefer ",e.jsx("b",{children:"AbortController"})," and ",e.jsx("code",{children:"{ signal }"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"WeakMap/WeakSet"})," for metadata keyed by objects/DOM; avoid strong Maps for that."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"LRU/TTL"})," caches; don't let arrays/maps grow unbounded."]}),e.jsxs("li",{children:[e.jsx("b",{children:"WeakRef/FinalizationRegistry"})," are niche; avoid for critical correctness."]}),e.jsx("li",{children:"Diagnose with heap snapshots and retained size; look for detached DOM, ever-growing Maps/Sets."})]})]})]})}export{t as default};
