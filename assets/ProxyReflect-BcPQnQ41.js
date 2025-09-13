import{j as e}from"./index-4OJNB7vi.js";import{S as r,M as s}from"./index-DrTtPcpR.js";import{B as t}from"./Breadcrumbs-BWCvk1iJ.js";function l(){return e.jsxs(r.Wrapper,{children:[e.jsx(t,{sectionLabel:"Meta & Advanced",sectionPath:"/meta-advanced",topics:s}),e.jsx(r.Heading,{children:"Proxy & Reflect"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Proxy(target, handler)"})," lets you intercept fundamental operations (get, set, call, new, property ops…). ",e.jsx("code",{children:"Reflect.*"})," mirrors the language's internal operations and is ideal for forwarding inside traps."]}),e.jsx("h2",{children:"Quick start"}),e.jsx(r.Pre,{children:`const user = { name: "Ada", age: 36 };
const p = new Proxy(user, {
  get(t, k, r){ console.log("get", k); return Reflect.get(t, k, r); },
  set(t, k, v, r){ console.log("set", k, v); return Reflect.set(t, k, v, r); }
});
p.name;         // logs "get name"
p.age = 37;     // logs "set age 37"`}),e.jsx("h2",{children:"Common traps"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"get / set"})," — property access/assign; mind the ",e.jsx("i",{children:"receiver"})," for ",e.jsx("code",{children:"this"})," binding."]}),e.jsxs("li",{children:[e.jsx("b",{children:"has"})," — ",e.jsx("code",{children:"k in obj"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ownKeys"})," — ",e.jsx("code",{children:"Object.keys"}),", spread, ",e.jsx("code",{children:"Reflect.ownKeys"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"defineProperty / deleteProperty"})," — define/delete ops."]}),e.jsxs("li",{children:[e.jsx("b",{children:"getPrototypeOf / setPrototypeOf / isExtensible / preventExtensions"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"apply"})," — calling a function; ",e.jsx("b",{children:"construct"})," — with ",e.jsx("code",{children:"new"}),"."]})]}),e.jsx("h2",{children:"Use Reflect to forward"}),e.jsxs("p",{children:["Forward with ",e.jsx("code",{children:"Reflect.*"})," to preserve default semantics & return types."]}),e.jsx(r.Pre,{children:`const logged = new Proxy(fn, {
  apply(t, thisArg, args){
    console.time("fn"); try { return Reflect.apply(t, thisArg, args); }
    finally { console.timeEnd("fn"); }
  }
});`}),e.jsx("h2",{children:"Validation / guarding"}),e.jsx(r.Pre,{children:`const person = new Proxy({}, {
  set(t, k, v, r){
    if (k === "age" && !Number.isInteger(v)) throw new TypeError("age int");
    return Reflect.set(t, k, v, r);
  }
});
person.age = 40;        // ok
// person.age = "40";   // throws`}),e.jsx("h2",{children:"Readonly-ish wrapper"}),e.jsx(r.Pre,{children:`const readonly = (obj) => new Proxy(obj, {
  set(){ return false; },
  defineProperty(){ return false; },
  deleteProperty(){ return false; },
});
const cfg = readonly({ api: "/v1" });
// cfg.api = "/v2";  // silently fails (or throws in strict mode)`}),e.jsx("h2",{children:"Negative indices for arrays"}),e.jsx(r.Pre,{children:`const withNegIndex = (arr) => new Proxy(arr, {
  get(t, k, r){
    if (typeof k === "string" && /^-\\d+$/.test(k)){
      k = t.length + Number(k); // -1 -> last
    }
    return Reflect.get(t, k, r);
  }
});
const a = withNegIndex([10,20,30]);
a[-1]; // 30`}),e.jsx("h2",{children:"Revocable proxies"}),e.jsx(r.Pre,{children:`const { proxy, revoke } = Proxy.revocable({ secret: 123 }, {});
proxy.secret; // 123
revoke();
// proxy.secret; // TypeError: revoked`}),e.jsxs("h2",{children:["Receiver & ",e.jsx("code",{children:"this"})," gotcha"]}),e.jsxs("p",{children:["Methods retrieved via a proxy get ",e.jsx("code",{children:"this"}),"=",e.jsx("b",{children:"receiver"})," (the proxy), not the target. Use the 3rd arg to ",e.jsx("code",{children:"Reflect.get"})," to control it."]}),e.jsx(r.Pre,{children:`const target = {
  x: 1,
  getX(){ return this.x; }
};
const proxy = new Proxy(target, {
  get(t, k, r){ return Reflect.get(t, k, r); } // r = proxy → this == proxy
});
proxy.x = 2;
proxy.getX(); // 2 (this === proxy), could differ from target.x`}),e.jsx("h2",{children:"Invariants (must respect)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Can't report a property as existing/rewritable if target says otherwise (e.g., a non-configurable prop)."}),e.jsxs("li",{children:[e.jsx("code",{children:"ownKeys"})," must include all non-configurable keys of the target."]}),e.jsxs("li",{children:["Violating invariants throws a ",e.jsx("code",{children:"TypeError"}),"."]})]}),e.jsx("h2",{children:"Reflect essentials (mirror ops)"}),e.jsx(r.Pre,{children:`Reflect.get(obj, key, receiver?);
Reflect.set(obj, key, value, receiver?);          // -> boolean
Reflect.has(obj, key);                             // "in"
Reflect.ownKeys(obj);                              // string & symbol keys
Reflect.defineProperty(obj, key, desc);            // -> boolean
Reflect.deleteProperty(obj, key);                  // -> boolean
Reflect.apply(fn, thisArg, argsArray);
Reflect.construct(Ctor, args, newTarget?);`}),e.jsx("h2",{children:"Patterns & notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"WeakMap"})," to hold private state; expose safe view via Proxy."]}),e.jsxs("li",{children:["Proxies change identity (",e.jsx("code",{children:"proxy !== target"}),"); don't mix as Map keys unless intended."]}),e.jsx("li",{children:"Overhead exists; avoid proxies in tight hot paths."}),e.jsxs("li",{children:["JSON/stringify uses traps like ",e.jsx("code",{children:"get"})," (and ",e.jsx("code",{children:"toJSON"}),"); behavior is observable."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Create with ",e.jsx("code",{children:"new Proxy(target, handler)"}),"; forward with ",e.jsx("code",{children:"Reflect.*"}),"."]}),e.jsx("li",{children:"Traps: get/set/has/ownKeys/defineProperty/deleteProperty/apply/construct…"}),e.jsxs("li",{children:["Respect engine ",e.jsx("b",{children:"invariants"})," or you'll get ",e.jsx("code",{children:"TypeError"}),"."]}),e.jsxs("li",{children:["Mind ",e.jsx("b",{children:"receiver"})," for correct ",e.jsx("code",{children:"this"})," binding in methods."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"revocable"})," proxies for resources that must be invalidated."]})]})]})]})}export{l as default};
