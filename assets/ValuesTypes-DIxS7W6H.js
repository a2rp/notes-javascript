import{j as e}from"./index-D5VEPJXy.js";import{S as s}from"./styled-C4KleH81.js";import{B as i}from"./Breadcrumbs-_bfjIlB_.js";import{L as r}from"./index-BHpXNq8N.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:r}),e.jsx(s.Heading,{children:"Values & types"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JS values are either ",e.jsx("b",{children:"primitives"})," (copied by value) or"," ",e.jsx("b",{children:"objects"})," (copied by reference). Primitives: ",e.jsx("code",{children:"string"}),","," ",e.jsx("code",{children:"number"}),", ",e.jsx("code",{children:"bigint"}),", ",e.jsx("code",{children:"boolean"}),", ",e.jsx("code",{children:"symbol"}),","," ",e.jsx("code",{children:"undefined"}),", ",e.jsx("code",{children:"null"}),"."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Primitives (quick notes)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"string"})," — immutable text; UTF-16 code units. Methods return new strings."]}),e.jsxs("li",{children:[e.jsx("code",{children:"number"})," — IEEE-754 double; beware precision (",e.jsx("code",{children:"0.1+0.2"}),"),"," ",e.jsx("code",{children:"NaN"}),", ",e.jsx("code",{children:"Infinity"}),", ",e.jsx("code",{children:"-0"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"bigint"})," — arbitrary precision integers (",e.jsx("code",{children:"10n"}),"); can't mix with"," ",e.jsx("code",{children:"number"})," without explicit cast."]}),e.jsxs("li",{children:[e.jsx("code",{children:"boolean"})," — ",e.jsx("code",{children:"true/false"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"symbol"})," — unique opaque identifiers; good for private keys and protocols."]}),e.jsxs("li",{children:[e.jsx("code",{children:"undefined"})," — missing value (default for uninitialized bindings)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"null"})," — intentional empty (set by the programmer)."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Objects (reference semantics)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Objects, arrays, functions, dates, maps/sets are all objects (mutable; shared by reference)."}),e.jsx("li",{children:"Equality: two different objects are never strictly equal even if contents match."}),e.jsxs("li",{children:["Clone vs reference: spread/assign are ",e.jsx("b",{children:"shallow"}),"; nested objects remain shared."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Type queries (what to use)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"typeof"})," primitives: works; ",e.jsx("code",{children:'typeof null === "object"'})," (historic quirk)."]}),e.jsxs("li",{children:["Arrays: ",e.jsx("code",{children:"Array.isArray(x)"}),". Dates/Maps/Sets:"," ",e.jsx("code",{children:"Object.prototype.toString.call(x)"})," or feature checks."]}),e.jsxs("li",{children:[e.jsx("code",{children:"instanceof"})," for constructor relationships (can break across realms/iframes)."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Boxing & ToPrimitive"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Primitives auto-box for method calls (",e.jsx("code",{children:'"a".toUpperCase()'}),"); wrapper objects like ",e.jsx("code",{children:"new Number(3)"})," are almost never needed (and are truthy!)."]}),e.jsxs("li",{children:["Conversions use ToPrimitive + ",e.jsx("code",{children:"valueOf"}),"/",e.jsx("code",{children:"toString"}),"; prefer explicit casts: ",e.jsx("code",{children:"Number(x)"}),", ",e.jsx("code",{children:"String(x)"}),", ",e.jsx("code",{children:"Boolean(x)"}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`// typeof quirks & checks
typeof 1              // "number"
typeof 10n            // "bigint"
typeof Symbol()       // "symbol"
typeof null           // "object"  <-- historical quirk
Array.isArray([])     // true

// -0 and NaN
Object.is(-0, 0)      // false
Number.isNaN(NaN)     // true
isNaN("foo")          // true (coerces)  → prefer Number.isNaN

// reference vs value
const a = { x: 1 };
const b = a;          // b references the same object
b.x = 2; a.x          // 2

// shallow copy
const c = { nest: { v: 1 } };
const d = { ...c };   // shallow
d.nest.v = 9; c.nest.v // 9  (shared inner object)

// primitives copy by value
let p = 1, q = p; q = 2; p // 1

// boxing gotcha
Boolean(new Boolean(false)) // true  (object is truthy)
`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Prefer primitives; treat strings as immutable; avoid wrapper objects."}),e.jsxs("li",{children:["Be explicit with casts; don't rely on coercion in critical paths (use"," ",e.jsx("code",{children:"Number/Boolean/String"}),")."]}),e.jsxs("li",{children:["For safe equality on edge cases: ",e.jsx("code",{children:"Object.is(NaN, NaN)"})," and"," ",e.jsx("code",{children:"Object.is(-0, 0)"}),"."]}),e.jsxs("li",{children:["Need deep copy? Use ",e.jsx("code",{children:"structuredClone"})," (modern) or a proven utility; spread is shallow."]})]})]})]})}export{o as default};
