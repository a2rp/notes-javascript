import{j as e}from"./index-D5VEPJXy.js";import{S as s}from"./styled-C4KleH81.js";import{B as r}from"./Breadcrumbs-_bfjIlB_.js";import{L as n}from"./index-BHpXNq8N.js";function t(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(s.Heading,{children:"var vs let vs const"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Three ways to declare bindings:",e.jsx("b",{children:" var"})," (function-scoped, hoisted, re-declarable),",e.jsx("b",{children:" let"})," (block-scoped, reassignable),",e.jsx("b",{children:" const"})," (block-scoped, non-reassignable). Prefer ",e.jsx("b",{children:"const"})," → ",e.jsx("b",{children:"let"}),"; avoid ",e.jsx("b",{children:"var"}),"."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Scope & lifetime"}),e.jsx(s.Pre,{children:`function demo() {
  if (true) {
    var v = 1;     // function-scoped
    let l = 2;     // block-scoped
    const c = 3;   // block-scoped
  }
  v;  // ✅ 1
  // l; // ❌ ReferenceError
  // c; // ❌ ReferenceError
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Hoisting & TDZ"}),e.jsx(s.Pre,{children:`console.log(v); // undefined (var hoisted & initialized)
var v = 1;

console.log(l); // ❌ ReferenceError (TDZ)
let l = 1;

console.log(c); // ❌ ReferenceError (TDZ)
const c = 1;`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Reassign & redeclare"}),e.jsx(s.Pre,{children:`let x = 1;  x = 2;  // ✅
const y = 1; // y = 2; // ❌ TypeError (no reassign)

// Redeclare in same scope:
var a = 1; var a = 2; // ✅ (but risky)
let b = 1; // let b = 2; // ❌
const d = 1; // const d = 2; // ❌`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Objects with const (mutation vs reassignment)"}),e.jsx(s.Pre,{children:`const user = { name: "A" };
user.name = "B";   // ✅ mutation allowed
// user = {};      // ❌ reassignment

Object.freeze(user);  // shallow freeze (nested still mutable)`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Globals & modules"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["In non-module scripts, ",e.jsx("b",{children:"var"})," at top level creates a property on"," ",e.jsx("code",{children:"window/globalThis"}),"; ",e.jsx("b",{children:"let/const"})," do ",e.jsx("i",{children:"not"}),"."]}),e.jsx("li",{children:"ES modules: top-level bindings are module-scoped (no globals)."})]}),e.jsx(s.Pre,{children:`// <script> (non-module)
var A = 1;
let B = 2;
window.A === 1;   // true
" B" in window;   // false (let/const don't become window props)`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Loops & closures (use let)"}),e.jsx(s.Pre,{children:`// 'var' captures one shared binding → classic bug
var fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
fns.map(fn => fn()); // [3,3,3] ❌

// 'let' creates a fresh binding per iteration
let gns = [];
for (let j = 0; j < 3; j++) gns.push(() => j);
gns.map(fn => fn()); // [0,1,2] ✅`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"for…of / for…in with const"}),e.jsx(s.Pre,{children:`for (const v of [1,2,3]) {
  // v is a new binding each iteration; you just can't reassign v
  // v++; // ❌ if you try to reassign
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Patterns & lint rules"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Default to const."})," Upgrade to ",e.jsx("b",{children:"let"})," only when you truly reassign."]}),e.jsxs("li",{children:["Favor ",e.jsx("b",{children:"immutable updates"})," for objects/arrays; freeze critical configs."]}),e.jsxs("li",{children:["Lint: ",e.jsx("code",{children:"no-var"}),", ",e.jsx("code",{children:"prefer-const"}),", ",e.jsx("code",{children:"no-redeclare"}),","," ",e.jsx("code",{children:"no-use-before-define"}),"."]})]})]})]})}export{t as default};
