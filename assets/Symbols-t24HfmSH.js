import{j as e}from"./index-Cps9Yqi0.js";import{S as s,O as r}from"./index-_MRbf5X-.js";import{B as i}from"./Breadcrumbs-DTCNvS__.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:r}),e.jsx(s.Heading,{children:"Symbols"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Symbol"})," is a primitive for creating ",e.jsx("b",{children:"unique"})," keys. Every call to ",e.jsx("code",{children:"Symbol()"})," makes a distinct value (even with the same description). Ideal for “hidden” property keys and meta-protocols."]}),e.jsx("h2",{children:"Create & basics"}),e.jsx(s.Pre,{children:`const s1 = Symbol("id");
const s2 = Symbol("id");
s1 === s2;                 // false (always unique)
String(s1);                // "Symbol(id)"
s1.description;            // "id"
typeof s1;                 // "symbol"
// new Symbol()            // ❌ TypeError (not a constructor)`}),e.jsx("h2",{children:"As property keys (non-string keys)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Use bracket syntax to define/read a symbol-keyed property."}),e.jsxs("li",{children:["Not listed by ",e.jsx("code",{children:"Object.keys"})," or ",e.jsx("code",{children:"for...in"}),"."]})]}),e.jsx(s.Pre,{children:`const KEY = Symbol("secret");
const obj = { [KEY]: 123, public: 1 };

Object.keys(obj);                 // ["public"]
Object.getOwnPropertySymbols(obj);// [KEY]
Reflect.ownKeys(obj);             // ["public", KEY]
obj[KEY];                         // 123`}),e.jsx("h2",{children:"Global symbol registry"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Symbol.for(key)"})," returns the same shared symbol for that key."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Symbol.keyFor(sym)"})," gives the key for ",e.jsx("i",{children:"registry"})," symbols."]})]}),e.jsx(s.Pre,{children:`const a = Symbol.for("app.user");
const b = Symbol.for("app.user");
a === b;                          // true
Symbol.keyFor(a);                 // "app.user"
Symbol.keyFor(Symbol("x"));       // undefined (not in registry)`}),e.jsx("h2",{children:"Well-known symbols (protocol hooks)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"iterator"})," - makes objects iterable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"toPrimitive"})," - customize coercion to number/string."]}),e.jsxs("li",{children:[e.jsx("b",{children:"toStringTag"})," - label for ",e.jsx("code",{children:"Object.prototype.toString"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"hasInstance"})," - customize ",e.jsx("code",{children:"instanceof"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"species"})," - control constructor used by methods (e.g., ",e.jsx("code",{children:"map"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"isConcatSpreadable"})," - control ",e.jsx("code",{children:"concat"})," flattening."]})]}),e.jsx(s.Pre,{children:`// iterator
const bag = { *[Symbol.iterator](){ yield 1; yield 2; } };
[...bag];                         // [1, 2]

// toPrimitive
const amt = {
  val: 5,
  [Symbol.toPrimitive](hint){ return hint === "string" ? "₹" + this.val : this.val; }
};
+amt;                             // 5
String(amt);                      // "₹5"

// toStringTag
const p = { [Symbol.toStringTag]: "Point" };
Object.prototype.toString.call(p);// "[object Point]"

// hasInstance
class Num {
  static [Symbol.hasInstance](v){ return typeof v === "number"; }
}
(3 instanceof Num);               // true

// species (method return type)
class List extends Array {
  static get [Symbol.species]() { return Array; }
}
new List(1,2).map(x=>x) instanceof Array; // true

// isConcatSpreadable (treat array-like as spreadable)
const like = { 0:"a", 1:"b", length:2, [Symbol.isConcatSpreadable]: true };
[].concat(like);                  // ["a","b"]`}),e.jsx("h2",{children:"Enumeration & copying behavior"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Symbol keys are skipped by ",e.jsx("code",{children:"Object.keys"}),", ",e.jsx("code",{children:"for...in"}),", ",e.jsx("code",{children:"JSON.stringify"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Object.getOwnPropertySymbols"})," or ",e.jsx("code",{children:"Reflect.ownKeys"})," to read them."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Object.assign"})," and object ",e.jsx("b",{children:"spread"})," ",e.jsx("code",{children:"...obj"})," copy ",e.jsx("b",{children:"enumerable"})," symbol keys."]})]}),e.jsx("h2",{children:"JSON & serialization"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"JSON.stringify"})," ignores symbol keys and values."]}),e.jsx("li",{children:"For persistence, map symbols to strings manually if needed."})]}),e.jsx("h2",{children:"Use cases"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Library “hidden” metadata: attach data without risking key collisions."}),e.jsxs("li",{children:["Enum-like unique tokens / sentinels (e.g., ",e.jsx("code",{children:"const NONE = Symbol()"}),")."]}),e.jsx("li",{children:"Opt-in protocol support via well-known symbols."})]}),e.jsx("h2",{children:"Notes & gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Symbols are ",e.jsx("b",{children:"not security"}),": if someone holds the symbol value, they can access the property."]}),e.jsxs("li",{children:["Prefer local ",e.jsx("code",{children:"Symbol()"})," for privacy; use ",e.jsx("code",{children:"Symbol.for"})," only for cross-module agreements."]}),e.jsxs("li",{children:["When logging, use ",e.jsx("code",{children:"sym.description"})," for readable output."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Symbol()"})," → unique primitive; bracket access for keys."]}),e.jsxs("li",{children:["Hidden from normal enumeration; fetch with ",e.jsx("code",{children:"getOwnPropertySymbols"})," or ",e.jsx("code",{children:"Reflect.ownKeys"}),"."]}),e.jsxs("li",{children:["Registry: ",e.jsx("code",{children:"Symbol.for/keyFor"})," for shared symbols."]}),e.jsx("li",{children:"Leverage well-known symbols for iteration, coercion, branding, etc."}),e.jsx("li",{children:"JSON ignores symbols; assign/spread copy enumerable symbol keys."})]})]})]})}export{c as default};
