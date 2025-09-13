import{j as e}from"./index-4OJNB7vi.js";import{S as r,O as s}from"./index-CsFZ2Zom.js";import{B as n}from"./Breadcrumbs-BWCvk1iJ.js";function o(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:s}),e.jsx(r.Heading,{children:"Property descriptors"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Every property has ",e.jsx("i",{children:"attributes"})," (descriptor):"," ",e.jsx("code",{children:"writable"}),", ",e.jsx("code",{children:"enumerable"}),", ",e.jsx("code",{children:"configurable"})," and either"," ",e.jsx("code",{children:"value"})," (data prop) ",e.jsx("i",{children:"or"})," ",e.jsx("code",{children:"get/set"})," (accessor prop)."]}),e.jsx("h2",{children:"Shapes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data"}),": ",e.jsx("code",{children:"{ value, writable, enumerable, configurable }"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessor"}),": ",e.jsx("code",{children:"{ get, set, enumerable, configurable }"})," (no"," ",e.jsx("code",{children:"value/writable"}),")."]})]}),e.jsx("h2",{children:"Inspect & define"}),e.jsx(r.Pre,{children:`const o = { x: 1 };
Object.getOwnPropertyDescriptor(o, "x");
// { value:1, writable:true, enumerable:true, configurable:true } (from literals/assignment)

Object.defineProperty(o, "hidden", {
  value: 42,
  enumerable: false,
  writable: false,
  configurable: false
});
// defineProperty defaults: missing flags => false/undefined`}),e.jsx("h2",{children:"Accessor properties"}),e.jsx(r.Pre,{children:`let _n = 0;
Object.defineProperty(o, "n", {
  get(){ return _n; },
  set(v){ if (Number.isInteger(v)) _n = v; },
  enumerable: true
});
o.n = 5; o.n; // 5`}),e.jsx("h2",{children:"Define many / clone with flags"}),e.jsx(r.Pre,{children:`Object.defineProperties(o, {
  id:   { value: 100, writable:false, enumerable:true, configurable:false },
  name: { value: "Ada", writable:true, enumerable:true, configurable:true }
});

// Clone while preserving descriptors & prototype
const clone = Object.create(
  Object.getPrototypeOf(o),
  Object.getOwnPropertyDescriptors(o)
);`}),e.jsx("h2",{children:"Sealing / freezing"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"preventExtensions(obj)"}),": block new props (existing unchanged)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"seal(obj)"}),": no add/remove; sets all own props ",e.jsx("code",{children:"configurable:false"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"freeze(obj)"}),": like seal + set data props ",e.jsx("code",{children:"writable:false"}),". (Shallow.)"]})]}),e.jsx(r.Pre,{children:`Object.isExtensible(o); Object.preventExtensions(o);
Object.isSealed(o);      Object.seal(o);
Object.isFrozen(o);      Object.freeze(o);`}),e.jsx("h2",{children:"Rules & gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Once ",e.jsx("code",{children:"configurable:false"}),", you can’t change the descriptor type or"," ",e.jsx("code",{children:"enumerable"}),". For data props you may flip ",e.jsx("code",{children:"writable:true→false"})," ","(not back to true) and change ",e.jsx("code",{children:"value"})," while writable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"defineProperty defaults to non-writable/non-enumerable/non-configurable"})," — set flags explicitly if you need normal behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spread/assign copy values only"}),": accessors are invoked and copied as ",e.jsx("i",{children:"data"})," ","props with fresh (writable/enumerable/configurable) defaults."]})]}),e.jsx(r.Pre,{children:`const src = {
  get val(){ console.log("get"); return 7; }
};
const a = { ...src };    // logs "get"; a.val === 7 (data prop now)
const b = Object.assign({}, src); // same effect`}),e.jsx("h2",{children:"Enumerability quick refs"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.keys(obj)"})," → own ",e.jsx("b",{children:"enumerable"})," string keys."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertyNames(obj)"})," → own string keys (incl. non-enum)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertySymbols(obj)"})," → own symbol keys."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Reflect.ownKeys(obj)"})," → all own keys (strings + symbols)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"for…in"})," → enumerable string keys, ",e.jsx("i",{children:"including inherited"}),"."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Data vs Accessor: you can’t mix ",e.jsx("code",{children:"value/writable"})," with ",e.jsx("code",{children:"get/set"}),"."]}),e.jsxs("li",{children:["Literals/assignment create props that are ",e.jsx("b",{children:"writable, enumerable, configurable"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"defineProperty"})," for read-only, hidden (non-enumerable), or accessor props."]}),e.jsxs("li",{children:[e.jsx("code",{children:"freeze"})," is shallow; nested objects remain mutable unless frozen too."]}),e.jsx("li",{children:"Use descriptors clone pattern to keep flags and prototype intact."})]})]})]})}export{o as default};
