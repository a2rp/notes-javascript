import{j as e}from"./index-Cud8-B-g.js";import{S as s,O as r}from"./index-_xV6Xjf9.js";import{B as n}from"./Breadcrumbs-BUXMDEQY.js";function i(){return e.jsxs(s.Wrapper,{children:[e.jsx(n,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:r}),e.jsx(s.Heading,{children:"Object utilities"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Handy static helpers on ",e.jsx("code",{children:"Object"})," for reading keys, cloning/merging, converting to/from entries, and checking ownership. Most operate on"," ",e.jsx("i",{children:"own"})," properties only (not the prototype)."]}),e.jsx("h2",{children:"Keys / values / entries"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.keys(o)"})," → own ",e.jsx("b",{children:"enumerable"})," string keys."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.values(o)"})," → matching values."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.entries(o)"})," → array of ",e.jsx("code",{children:"[key, value]"})," pairs."]})]}),e.jsx(s.Pre,{children:`const o = { a: 1, b: 2 };
Object.keys(o);      // ["a","b"]
Object.values(o);    // [1,2]
Object.entries(o);   // [["a",1],["b",2]]`}),e.jsx("h2",{children:"fromEntries (pairs → object)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Inverse of ",e.jsx("code",{children:"entries"}),". Great for ",e.jsx("b",{children:"pick/omit/map"})," transforms."]})}),e.jsx(s.Pre,{children:`// pick keys
const pick = (obj, keys) =>
  Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));

pick({a:1,b:2,c:3}, ["a","c"]);   // { a:1, c:3 }

// map values
const mapValues = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, fn(v, k)]));

mapValues({a:1,b:2}, x => x*10);  // { a:10, b:20 }`}),e.jsx("h2",{children:"assign & spread (shallow)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.assign(target, ...sources)"})," copies own ",e.jsx("b",{children:"enumerable"})," props (values only)."]}),e.jsxs("li",{children:["Spread ",e.jsx("code",{children:"{ ...a, ...b }"})," is similar; later sources win on conflicts."]}),e.jsxs("li",{children:["Both are ",e.jsx("b",{children:"shallow"}),": nested objects are shared references."]})]}),e.jsx(s.Pre,{children:`const a = { user: { id: 1 }, x: 1 };
const b = { x: 2, y: 3 };
const m1 = Object.assign({}, a, b);  // { user:{id:1}, x:2, y:3 }
const m2 = { ...a, ...b };           // same result
m1.user === a.user; // true (shallow)`}),e.jsx("h2",{children:"hasOwn (ownership check)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.hasOwn(obj, key)"})," → true for own props only (better than using ",e.jsx("code",{children:"hasOwnProperty.call"}),")."]}),e.jsxs("li",{children:[e.jsx("code",{children:"in"})," checks own ",e.jsx("i",{children:"and inherited"})," keys."]})]}),e.jsx(s.Pre,{children:`const o = Object.create({ inherited: 1 });
o.own = 2;
Object.hasOwn(o, "own");        // true
Object.hasOwn(o, "inherited");  // false
"inherited" in o;               // true (because on prototype)`}),e.jsx("h2",{children:"Reading all own keys (incl. non-enum / symbols)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertyNames(o)"})," → own string keys (even non-enum)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertySymbols(o)"})," → own symbol keys."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Reflect.ownKeys(o)"})," → both (strings + symbols)."]})]}),e.jsx(s.Pre,{children:`const S = Symbol("s");
const o = Object.defineProperty({ x:1, [S]:2 }, "hidden", { value: 9, enumerable:false });
Object.getOwnPropertyNames(o);  // ["x","hidden"]
Object.getOwnPropertySymbols(o);// [Symbol(s)]
Reflect.ownKeys(o);             // ["x","hidden", Symbol(s)]`}),e.jsx("h2",{children:"Descriptors helpers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertyDescriptor(obj, key)"})," for one key."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.getOwnPropertyDescriptors(obj)"})," for a full snapshot (great for exact clones)."]})]}),e.jsx(s.Pre,{children:`// exact clone: preserves flags & prototype
const cloneExact = (obj) =>
  Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));`}),e.jsx("h2",{children:"Prototype helpers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.getPrototypeOf(obj)"})," / ",e.jsx("code",{children:"Object.setPrototypeOf(obj, proto)"}),"."]}),e.jsx("li",{children:"Prefer composition over changing prototype at runtime; setting proto may deopt performance."})]}),e.jsx(s.Pre,{children:`const proto = { greet(){ return "hi"; } };
const o = Object.create(proto);
Object.getPrototypeOf(o) === proto; // true`}),e.jsx("h2",{children:"Immutability quick refs"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Object.preventExtensions(o)"})," → no new props."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.seal(o)"})," → no add/remove; props non-configurable."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.freeze(o)"})," → also makes data props non-writable (shallow)."]})]}),e.jsx("h2",{children:"Converting Object ⇆ Map"}),e.jsx(s.Pre,{children:`// Object → Map
const m = new Map(Object.entries({ a:1, b:2 }));

// Map → Object (string keys only)
const obj = Object.fromEntries(new Map([["a",1],["b",2]]));`}),e.jsx("h2",{children:"Structured clone (deep copy for plain data)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"structuredClone(value)"})," deep-clones supported data types (no functions/prototypes kept)."]}),e.jsx("li",{children:"Good for JSON-like data; preserves Map/Set/typed arrays/Date/RegExp."})]}),e.jsx(s.Pre,{children:`const deep = structuredClone({ a: { b: 1 }, m: new Map([["k",1]]) });
deep.a === deep.a;          // true (new object)
deep.m instanceof Map;      // true`}),e.jsx("h2",{children:"Patterns (immutable updates)"}),e.jsx(s.Pre,{children:`// shallow field update
const next = { ...state, status: "ready" };

// nested update (copy each level you touch)
const next2 = {
  ...state,
  user: { ...state.user, name: "Ada" }
};

// remove key (omit)
const { secret, ...publicPart } = state;

// sort object by keys (new object)
const sortByKey = (obj) =>
  Object.fromEntries(Object.entries(obj).sort(([a],[b]) => a.localeCompare(b)));`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"entries ⇄ fromEntries"})," enable expressive pick/omit/map transforms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"assign/spread are shallow"}),"; nested objects remain shared unless you copy those levels."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"Object.hasOwn"})," for ownership checks; ",e.jsx("code",{children:"in"})," sees prototypes."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"getOwnPropertyDescriptors + Object.create"})," for an exact clone with flags & prototype."]}),e.jsxs("li",{children:[e.jsx("b",{children:"structuredClone"})," for deep copies of data-only structures (not functions/classes)."]})]})]})]})}export{i as default};
