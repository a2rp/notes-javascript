import{j as e}from"./index-Cud8-B-g.js";import{S as r,O as s}from"./index-_xV6Xjf9.js";import{B as n}from"./Breadcrumbs-BUXMDEQY.js";function c(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:s}),e.jsx(r.Heading,{children:"Encapsulation"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Encapsulation hides internal state/implementation and exposes a small, stable API. In JS you can do this with ",e.jsx("b",{children:"closures"}),", ",e.jsx("b",{children:"#private class fields"}),", ",e.jsx("b",{children:"WeakMap"}),", symbols, and descriptor/immutability tricks."]}),e.jsx("h2",{children:"1) Closure-based modules (factory pattern)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"State lives in the function's scope; only returned methods can access it."}),e.jsx("li",{children:"Hard privacy (can't be reached from outside)."})]}),e.jsx(r.Pre,{children:`function createCounter(n = 0){
  let count = n;                // private via closure
  return {
    inc(){ count++; },
    get value(){ return count; }
  };
}
const c = createCounter();
c.count;        // undefined
c.inc(); c.value; // 1`}),e.jsxs("h2",{children:["2) Class with ",e.jsx("code",{children:"#private"})," fields (hard privacy)"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Truly private; not enumerable, not accessible by brackets/reflection."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"#x in obj"})," for presence checks."]})]}),e.jsx(r.Pre,{children:`class Counter {
  #count = 0;
  inc(){ this.#count++; }
  get value(){ return this.#count; }
}
const c2 = new Counter();
// c2.#count; // SyntaxError (private)
c2.inc(); c2.value; // 1`}),e.jsx("h2",{children:"3) WeakMap privacy (pre-# alternative)"}),e.jsx("ul",{children:e.jsx("li",{children:"Data stored off-object; keys are instances; memory-safe via GC."})}),e.jsx(r.Pre,{children:`const _priv = new WeakMap();
class User {
  constructor(name){
    _priv.set(this, { name });
  }
  get name(){ return _priv.get(this).name; }
}
new User("Ada").name; // "Ada"`}),e.jsx("h2",{children:"4) Symbols & non-enumerable props (soft privacy)"}),e.jsx("ul",{children:e.jsx("li",{children:"Not truly hidden; just harder to collide/enumerate."})}),e.jsx(r.Pre,{children:`const SECRET = Symbol("secret");
const obj = {};
Object.defineProperty(obj, SECRET, { value: 42, enumerable: false });
Object.keys(obj);          // []
obj[SECRET];               // 42 (still reachable if you have the symbol)`}),e.jsx("h2",{children:"5) API shaping with descriptors & immutability"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Object.defineProperty"})," to make fields read-only or hidden."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Object.freeze"})," / ",e.jsx("code",{children:"seal"})," on public objects to prevent accidental mutation (shallow)."]})]}),e.jsx(r.Pre,{children:`const makePoint = (x, y) => {
  const p = {};
  Object.defineProperty(p, "x", { value: x, writable: false, enumerable: true });
  Object.defineProperty(p, "y", { value: y, writable: false, enumerable: true });
  return Object.freeze(p); // cannot add/remove/modify own data props (shallow)
};`}),e.jsx("h2",{children:"6) Proxies for controlled access (guards/logging)"}),e.jsx("ul",{children:e.jsx("li",{children:"Intercept get/set to validate or deny access; still not a privacy boundary by itself."})}),e.jsx(r.Pre,{children:`const guarded = new Proxy(createCounter(), {
  set(){ throw new Error("read-only"); }
});
guarded.value; // ok
// guarded.value = 10; // throws`}),e.jsx("h2",{children:"Choosing a technique"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Library/public API:"})," prefer #private or closures for hard privacy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"App code:"})," often enough to freeze exposed shapes and keep state local."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Share methods across instances?"})," classes/prototypes; need per-instance hidden state? #private/WeakMap."]})]}),e.jsx("h2",{children:"Gotchas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Closures can keep large objects alive → beware leaks; null out references when done."}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.freeze"})," is shallow; deeply nested objects remain mutable unless also frozen (or use ",e.jsx("code",{children:"structuredClone"})," then freeze)."]}),e.jsx("li",{children:"#Private fields are not serialized (JSON ignores them) and are invisible to reflection APIs."}),e.jsx("li",{children:"Symbols aren't secure; if the symbol is shared/imported, consumers can read it."})]}),e.jsx("h2",{children:"Small patterns"}),e.jsx(r.Pre,{children:`// 1) Public tiny surface, private heavy impl
function createService(deps){
  const state = new Map();     // private
  function get(id){ return state.get(id); }
  function set(id, v){ state.set(id, v); }
  return Object.freeze({ get, set }); // expose only what you need
}

// 2) Readonly view
const asReadonly = (obj) => new Proxy(obj, {
  set(){ return false; }, defineProperty(){ return false; }, deleteProperty(){ return false; }
});`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Hard privacy:"})," closures, module scope, ",e.jsx("code",{children:"#private"}),", WeakMap."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Soft privacy:"})," symbols, non-enumerable props, naming conventions (",e.jsx("code",{children:"_x"}),")."]}),e.jsx("li",{children:"Freeze public API objects; keep mutable implementation details inside closures/privates."}),e.jsx("li",{children:"Prefer composition; expose a minimal, intention-revealing surface."})]})]})]})}export{c as default};
