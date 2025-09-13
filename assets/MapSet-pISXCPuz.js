import{j as e}from"./index-COrpvOC4.js";import{S as s,B as r}from"./index-BodrDu-9.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:r}),e.jsx(s.Heading,{children:"Map/Set vs Object/Array"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Map"})," & ",e.jsx("code",{children:"Set"})," are general-purpose collections:",e.jsx("b",{children:" Map"})," stores key→value pairs (keys of ",e.jsx("i",{children:"any"})," type, ordered), ",e.jsx("b",{children:"Set"})," stores unique values. Prefer them over ",e.jsx("code",{children:"Object"}),"/",e.jsx("code",{children:"Array"})," when you need arbitrary-key dictionaries, fast membership tests, stable insertion order, and a clean API."]}),e.jsx("h2",{children:"Map - dictionary with any keys"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Keys can be objects, functions, NaN, etc. Insertion order is preserved."}),e.jsxs("li",{children:["Core ops: ",e.jsx("code",{children:"set"}),", ",e.jsx("code",{children:"get"}),", ",e.jsx("code",{children:"has"}),", ",e.jsx("code",{children:"delete"}),", ",e.jsx("code",{children:"clear"}),", ",e.jsx("code",{children:"size"}),"."]})]}),e.jsx(s.Pre,{children:`const m = new Map();
const k = { id: 1 };
m.set("a", 10).set(k, 20);
m.get("a");           // 10
m.get({ id: 1 });     // undefined (different object identity)
m.get(k);             // 20
m.has("a");           // true
m.size;               // 2

// iterate (in insertion order)
for (const [key, value] of m) { /* ... */ }     // same as m.entries()
[...m.keys()];   // keys
[...m.values()]; // values`}),e.jsx("h2",{children:"Object vs Map (when to use what)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use Map"})," for dynamic keys, non-string keys, frequent adds/removes, or when order matters."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use Object"})," for simple JSON-like records / fixed shapes; faster property access, serializable."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object"})," keys are strings/symbols only; integer-like keys enumerate first, then insertion order."]})]}),e.jsx("h2",{children:"Converting Object ⇄ Map"}),e.jsx(s.Pre,{children:`// Object → Map
const m2 = new Map(Object.entries({ a:1, b:2 }));

// Map → Object (string keys only!)
const obj = Object.fromEntries(new Map([["a",1],["b",2]]));

// Exact (stringify-unsafe) note: non-string keys will coerce if you force to Object.`}),e.jsx("h2",{children:"Patterns with Map"}),e.jsx(s.Pre,{children:`// Frequency counter
const freq = new Map();
for (const x of ["a","b","a"]) freq.set(x, (freq.get(x) ?? 0) + 1);

// LRU cache (sketch): move key to the end on get/set
class LRU {
  constructor(limit=100){ this.limit = limit; this.m = new Map(); }
  get(k){ if(!this.m.has(k)) return undefined;
    const v = this.m.get(k); this.m.delete(k); this.m.set(k, v); return v; }
  set(k,v){ if(this.m.has(k)) this.m.delete(k);
    this.m.set(k,v); if(this.m.size > this.limit) this.m.delete(this.m.keys().next().value); }
}`}),e.jsx("h2",{children:"Set - unique values with O(1) membership"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Core ops: ",e.jsx("code",{children:"add"}),", ",e.jsx("code",{children:"has"}),", ",e.jsx("code",{children:"delete"}),", ",e.jsx("code",{children:"clear"}),", ",e.jsx("code",{children:"size"}),"."]}),e.jsx("li",{children:"Great for dedup, fast lookups, set algebra."})]}),e.jsx(s.Pre,{children:`const s = new Set([1,2,2,3]);
s.size;        // 3
s.add(4).add(2);
s.has(3);      // true
[...s];        // [1,2,3,4]

// Deduplicate array
const unique = [...new Set([3,1,3,2,1])];  // [3,1,2] (keeps first occurrence order)`}),e.jsx("h2",{children:"Set algebra (union/intersection/difference)"}),e.jsx(s.Pre,{children:`const A = new Set([1,2,3]), B = new Set([3,4]);
const union        = new Set([...A, ...B]);                   // {1,2,3,4}
const intersection = new Set([...A].filter(x => B.has(x)));   // {3}
const difference   = new Set([...A].filter(x => !B.has(x)));  // {1,2}`}),e.jsx("h2",{children:"Array vs Set (membership & deletes)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Array"}),": membership is O(n) via ",e.jsx("code",{children:"includes"}),"; delete by value is O(n)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Set"}),": membership & delete are O(1) on average; iteration preserves insertion order."]})]}),e.jsx("h2",{children:"WeakMap / WeakSet (preview)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Keys (WeakMap) / values (WeakSet) must be objects and are held ",e.jsx("b",{children:"weakly"})," - do not prevent GC."]}),e.jsx("li",{children:"No size/iteration; ideal for private per-instance data or caches. (Covered in next topic.)"})]}),e.jsx("h2",{children:"JSON & serialization"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"JSON.stringify"})," does not handle Map/Set directly. Convert with spreads/entries."]})}),e.jsx(s.Pre,{children:`const jsonMap = JSON.stringify([...m]);     // pairs array
const jsonSet = JSON.stringify([...s]);     // values array
// revive:
const mBack = new Map(JSON.parse(jsonMap));
const sBack = new Set(JSON.parse(jsonSet));`}),e.jsx("h2",{children:"Performance & gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Map/Set"})," have predictable ",e.jsx("b",{children:"O(1)"})," ops; objects may require ",e.jsx("code",{children:"hasOwn"})," checks and can collide with prototypes unless ",e.jsx("code",{children:"Object.create(null)"}),"."]}),e.jsxs("li",{children:["Always use ",e.jsx("b",{children:".size"})," (not ",e.jsx("code",{children:"length"}),") for Map/Set."]}),e.jsx("li",{children:"Object identity matters for Map keys / Set values: two equal-looking objects are different keys."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Map"}),": any-type keys, ordered, ",e.jsx("code",{children:"set/get/has/delete/size"}),", easy iteration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Set"}),": unique values, fast membership, dedup & set ops, ordered iteration."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"Map/Set"})," for dynamic dictionaries and membership tests; prefer ",e.jsx("b",{children:"Object/Array"})," for fixed shapes and JSON."]}),e.jsxs("li",{children:["Convert via ",e.jsx("code",{children:"Object.entries"}),"/",e.jsx("code",{children:"fromEntries"})," and spreads; JSON needs manual conversion."]})]})]})]})}export{d as default};
