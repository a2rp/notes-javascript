import{j as e}from"./index-D5VEPJXy.js";import{S as s,O as r}from"./index-BaKQupvE.js";import{B as t}from"./Breadcrumbs-_bfjIlB_.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(t,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:r}),e.jsx(s.Heading,{children:"Object literals"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," The ",e.jsx("i",{children:"object literal"})," is the shortest way to create objects: keys → values, with support for ",e.jsx("b",{children:"shorthand props"}),", ",e.jsx("b",{children:"concise methods"}),","," ",e.jsx("b",{children:"computed keys"}),", ",e.jsx("b",{children:"getters/setters"}),", and ",e.jsx("b",{children:"object spread"}),"."]}),e.jsx("h2",{children:"Basic & shorthand"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Shorthand uses the variable name as both key and value."}),e.jsx("li",{children:"Concise method syntax defines a function value under a key."})]}),e.jsx(s.Pre,{children:`const name = "Ada", age = 36;
const user = {
  name,           // shorthand property
  age,
  greet(){ return "Hi " + this.name; } // concise method
};
user.greet(); // "Hi Ada"`}),e.jsx("h2",{children:"Computed keys & Symbol keys"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:"[expr]"})," to compute a property name at runtime."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Symbol"})," keys never collide with string keys."]})]}),e.jsx(s.Pre,{children:`const K = "id";
const S = Symbol("secret");
const obj = {
  [K]: 101,              // "id": 101
  ["a" + "b"]: 2,        // "ab": 2
  [S]: "hidden"          // symbol-keyed
};
Object.keys(obj);        // ["id", "ab"]
Object.getOwnPropertySymbols(obj); // [S]`}),e.jsx("h2",{children:"Getters & setters (accessors)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Accessors act like properties but run code on get/set."}),e.jsx("li",{children:"Data property and accessor with the same key can't coexist (last one wins)."})]}),e.jsx(s.Pre,{children:`const point = {
  _x: 0,
  get x(){ return this._x; },
  set x(v){ if (Number.isFinite(v)) this._x = v; }
};
point.x = 7;   // runs setter
point.x;       // 7 (runs getter)`}),e.jsx("h2",{children:"Object spread (copy/merge)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"..."})," copies own ",e.jsx("b",{children:"enumerable"})," props (shallow). Later props overwrite earlier ones."]}),e.jsxs("li",{children:["Like ",e.jsx("code",{children:"Object.assign"}),": getters are ",e.jsx("b",{children:"invoked"})," and the result is copied as a ",e.jsx("b",{children:"data"})," prop."]})]}),e.jsx(s.Pre,{children:`const a = { n: 1 }, b = { n: 2, m: 3 };
const c = { ...a, ...b, k: 9 }; // { n:2, m:3, k:9 }  (b overwrites a)
const clone = { ...c };         // shallow clone (nested objects are shared)`}),e.jsx("h2",{children:"Property name rules & duplicates"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Keys are strings or symbols (number literals become strings, e.g., ",e.jsx("code",{children:"1"})," → ",e.jsx("code",{children:'"1"'}),")."]}),e.jsxs("li",{children:["Duplicate string keys: the ",e.jsx("b",{children:"last"})," definition wins."]})]}),e.jsx(s.Pre,{children:`const o = { x: 1, x: 2 };  // x becomes 2
Object.keys({ 1: "a", "1": "b" }); // ["1"]`}),e.jsx("h2",{children:"Proto & creation notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["To control prototype, prefer ",e.jsx("code",{children:"Object.create(proto)"}),"."]}),e.jsxs("li",{children:["Need a “dictionary” with no prototype collisions? Use ",e.jsx("code",{children:"Object.create(null)"}),"."]})]}),e.jsx(s.Pre,{children:`const dict = Object.create(null);
dict["toString"];  // undefined (safe, no proto)
const obj = Object.create(Array.prototype); // custom prototype`}),e.jsx("h2",{children:"JSON vs object literals"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["JSON is a ",e.jsx("b",{children:"data format"}),": keys must be strings, values must be data (no functions/symbols/undefined)."]}),e.jsx("li",{children:"Object literals are full JS: methods, symbols, getters/setters are allowed."})]}),e.jsx("h2",{children:"Small patterns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Conditional add:"})," spread conditionally when merging."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Renaming on build:"})," compute a different key while keeping the source name."]})]}),e.jsx(s.Pre,{children:`// Conditional add
const base = { a: 1 };
const withFlag = { 
  ...base, 
  ...(enabled ? { flag: true } : {}) 
};

// Renaming via computed key
const key = "user_" + id;
const record = { [key]: payload };`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"shorthand"})," and ",e.jsx("b",{children:"concise methods"})," for readable objects."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"computed keys"})," (",e.jsx("code",{children:"[expr]"}),") for dynamic or ",e.jsx("code",{children:"Symbol"})," keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spread"})," is shallow and copies values; later props win; accessors become data."]}),e.jsxs("li",{children:["For custom prototypes or null-prototype maps, use ",e.jsx("code",{children:"Object.create"}),"."]}),e.jsxs("li",{children:["Avoid relying on legacy ",e.jsx("code",{children:"__proto__"})," in literals; it's better to use the APIs above."]})]})]})]})}export{o as default};
