import{j as e}from"./index-Cps9Yqi0.js";import{S as r}from"./styled-oEnrM-Hq.js";import{B as i}from"./Breadcrumbs-DTCNvS__.js";import{L as s}from"./index-DLp4i7oy.js";function l(){return e.jsxs(r.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:s}),e.jsx(r.Heading,{children:"Type checks"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Reliable ways to detect what a value is (primitive vs object, which built-in, cross-realm safe). Pick the tool based on ",e.jsx("i",{children:"what"})," you need to know."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Go-to checks (when to use what)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"typeof"})," (primitives & functions):"]})," fast, simple. Quirk:",e.jsx("code",{children:' typeof null === "object"'}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"Array.isArray(x)"}),":"]})," the correct array check (cross-realm)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tag check (safe for built-ins):"})," ",e.jsx("code",{children:"Object.prototype.toString.call(x)"})," → ",e.jsx("code",{children:'"[object Map]"'}),","," ",e.jsx("code",{children:'"[object Date]"'}),", etc."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"instanceof"}),":"]})," for class/constructor relationships; can fail across realms/ifames and with different globals."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typed arrays/DataView:"})," ",e.jsx("code",{children:"ArrayBuffer.isView(x)"})," (true for all typed arrays & DataView)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Numbers:"})," ",e.jsx("code",{children:"Number.isNaN"}),"/",e.jsx("code",{children:"Number.isFinite"})," (don't use global"," ",e.jsx("code",{children:"isNaN/isFinite"})," due to coercion). ",e.jsx("code",{children:"Number.isInteger"}),","," ",e.jsx("code",{children:"Number.isSafeInteger"})," exist too."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BigInt & Symbol:"})," ",e.jsx("code",{children:'typeof x === "bigint"'})," / ",e.jsx("code",{children:'"symbol"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plain object:"})," ",e.jsx("code",{children:'toStringTag === "[object Object]"'})," & prototype is"," ",e.jsx("code",{children:"Object.prototype"})," or ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Promise-like:"})," thenable test — ",e.jsx("code",{children:'x && typeof x.then === "function"'}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(r.Pre,{children:`// typeof (primitives + functions)
typeof 1           // "number"
typeof 10n         // "bigint"
typeof "a"         // "string"
typeof false       // "boolean"
typeof undefined   // "undefined"
typeof Symbol()    // "symbol"
typeof null        // "object"  // historical quirk
typeof (()=>{})    // "function"

// Arrays & built-ins
Array.isArray([])  // true
Object.prototype.toString.call(new Map())   // "[object Map]"
Object.prototype.toString.call(new Date())  // "[object Date]"

// instanceof (constructor relation; watch cross-realm)
[] instanceof Array        // true (but can be false across iframes)
new Date() instanceof Date // true

// Numbers: NaN & finite
Number.isNaN(NaN)          // true
isNaN("foo")               // true (coerces!)  → avoid
Number.isFinite(42)        // true
isFinite("42")             // true (coerces)   → avoid

// Typed arrays / DataView
ArrayBuffer.isView(new Uint8Array())   // true
ArrayBuffer.isView(new DataView(new ArrayBuffer(8))) // true
ArrayBuffer.isView(new ArrayBuffer(8)) // false

// Plain object check
const isPlainObject = (x) => {
  if (Object.prototype.toString.call(x) !== "[object Object]") return false;
  const proto = Object.getPrototypeOf(x);
  return proto === Object.prototype || proto === null;
};

// Promise-like (thenable)
const isThenable = (x) => x && typeof x.then === "function";

// Function subtypes via tags
Object.prototype.toString.call(async function(){})     // "[object AsyncFunction]"
Object.prototype.toString.call(function*(){})          // "[object GeneratorFunction]"`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Choose by need: ",e.jsx("code",{children:"typeof"})," for primitives, ",e.jsx("code",{children:"Array.isArray"})," for arrays, tag check for built-ins."]}),e.jsxs("li",{children:[e.jsx("code",{children:"instanceof"})," is fragile across realms; prefer tag check or feature checks."]}),e.jsxs("li",{children:["Avoid global ",e.jsx("code",{children:"isNaN"}),"/",e.jsx("code",{children:"isFinite"}),"; use the ",e.jsx("code",{children:"Number."})," versions."]}),e.jsx("li",{children:"Spread/assign are shallow; a “plain object” test doesn't guarantee deep shape."}),e.jsxs("li",{children:[e.jsx("code",{children:"Symbol.toStringTag"})," can be customized (rare); feature detection is the safest when possible."]})]})]})]})}export{l as default};
