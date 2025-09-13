import{j as e}from"./index-Cps9Yqi0.js";import{S as n}from"./styled-oEnrM-Hq.js";import{B as s}from"./Breadcrumbs-DTCNvS__.js";import{L as l}from"./index-DLp4i7oy.js";function d(){return e.jsxs(n.Wrapper,{children:[e.jsx(s,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:l}),e.jsx(n.Heading,{children:"Scope"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Scope is ",e.jsx("i",{children:"where a name is visible"}),". JS uses"," ",e.jsx("b",{children:"lexical (static) scope"}),": resolution depends on ",e.jsx("u",{children:"where"})," code is written, not how it’s called."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Kinds of scope"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Global / Script:"})," top-level in non-module scripts. ",e.jsx("code",{children:"var"})," adds a"," ",e.jsx("code",{children:"window"})," property; ",e.jsx("code",{children:"let/const"})," don’t."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module:"})," ES modules have their own top-level scope (not global), strict by default; top-level ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"undefined"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function:"})," params + locals live here (for ",e.jsx("code",{children:"var/let/const"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Block:"})," anything in ",e.jsx("code",{children:"{ ... }"})," for ",e.jsx("code",{children:"let/const/class/function*"})," (modern spec). ",e.jsx("code",{children:"var"})," ignores blocks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Catch binding:"})," ",e.jsx("code",{children:"catch (e)"})," has its own inner binding ",e.jsx("code",{children:"e"}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Resolution & chain"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Lookups walk ",e.jsx("b",{children:"inner → outer"})," environments until global. If not found →"," ",e.jsx("code",{children:"ReferenceError"})," (in strict/module; sloppy assignment ",e.jsx("i",{children:"would"})," create a global—don’t rely on it)."]}),e.jsx("li",{children:"Shadowing: an inner declaration with the same name hides the outer one."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(n.Pre,{children:`// Block scope vs var
if (true) {
  var v = 1;        // function/global (script) scope
  let l = 2;        // block scope
}
v;                  // 1
// l;               // ReferenceError

// Shadowing
const x = 1;
{
  const x = 2;      // shadows outer x
  // ...
}

// Param redeclare (same scope) is illegal; shadow in a new block instead
function f(x) {
  // let x = 2;     // ❌ SyntaxError (same scope as param)
  { let x = 2; }    // ✅ inner block scope
}

// Closures capture by reference (from defining scope)
function makeCounter(){
  let n = 0;
  return () => ++n;
}
const c = makeCounter();
c(); c();           // 1, 2`}),e.jsx(n.Pre,{children:`// Global vs Module top-level
// <script> (non-module)
var A = 1;
let B = 2;
window.A === 1;     // true
("B" in window);    // false

// In ES modules (top-level is module scope):
// var/let/const here DO NOT create window properties
// top-level this === undefined`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Functions in blocks"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["In modern JS (strict/modules), ",e.jsx("b",{children:"function declarations inside blocks are block-scoped"}),"."]}),e.jsxs("li",{children:["Legacy non-strict browsers had odd semantics—avoid relying on them; prefer"," ",e.jsx("code",{children:"const f = function()"})," inside the block."]})]}),e.jsx(n.Pre,{children:`{
  const mode = "inner";
  function g(){ return mode; } // block-scoped in strict/module
  g(); // "inner"
}
// g(); // ReferenceError`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Default ",e.jsx("b",{children:"const"}),", then ",e.jsx("b",{children:"let"}),"; avoid ",e.jsx("b",{children:"var"})," (leaks across blocks)."]}),e.jsx("li",{children:"Declare near first use; keep scopes small; prefer extra braces to limit lifetime."}),e.jsxs("li",{children:["Modules isolate top-level—no accidental globals; use ",e.jsx("code",{children:"globalThis"})," when you truly need the global object."]}),e.jsxs("li",{children:["For loops + closures: use ",e.jsx("code",{children:"let"})," (fresh binding per iteration)."]})]})]})]})}export{d as default};
