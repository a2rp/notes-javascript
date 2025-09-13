import{j as e}from"./index-COrpvOC4.js";import{S as n}from"./styled-djaoR-0a.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";import{L as r}from"./index-BjsdJmQf.js";function o(){return e.jsxs(n.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:r}),e.jsx(n.Heading,{children:"TDZ (Temporal Dead Zone)"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," The time between scope entry and the ",e.jsx("i",{children:"actual initialization"})," of a"," ",e.jsx("code",{children:"let"}),"/",e.jsx("code",{children:"const"}),"/",e.jsx("code",{children:"class"})," binding. Accessing the name here throws ",e.jsx("b",{children:"ReferenceError"}),"."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Key rules"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"let/const/class"})," are hoisted to the top of their block but remain",e.jsx("b",{children:" uninitialized"})," until the declaration line → TDZ."]}),e.jsxs("li",{children:[e.jsx("code",{children:"typeof"})," on a TDZ name ",e.jsx("b",{children:"throws"})," (unlike an undeclared global where it returns ",e.jsx("code",{children:'"undefined"'}),")."]}),e.jsxs("li",{children:["The TDZ also applies to ",e.jsx("b",{children:"inner shadowing"}),": an inner ",e.jsx("code",{children:"let x"})," hides the outer ",e.jsx("code",{children:"x"})," even before its line."]}),e.jsxs("li",{children:[e.jsx("code",{children:"var"})," has no TDZ (initialized to ",e.jsx("code",{children:"undefined"}),")."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(n.Pre,{children:`// 1) Basic TDZ
a;                 // ❌ ReferenceError (TDZ)
let a = 1;

// 2) typeof on TDZ name throws
typeof b;          // ❌ ReferenceError (b exists in TDZ)
let b;

// 3) var is hoisted & initialized
c;                 // undefined
var c = 1;`}),e.jsx(n.Pre,{children:`// 4) Shadowing creates TDZ for the inner name
let x = 10;
{
  // x;             // ❌ ReferenceError (inner x in TDZ, outer x is shadowed)
  let x = 20;
}`}),e.jsx(n.Pre,{children:`// 5) Self / forward references in initializers
// let y = y;      // ❌ TDZ (y uninitialized when read)
let z = 1;
// let w = z + q;  // ❌ TDZ (q not initialized yet)
// let q = 2;`}),e.jsx(n.Pre,{children:`// 6) Classes are also TDZ
// new Foo();      // ❌ ReferenceError
class Foo {}       // only usable after this line`}),e.jsx(n.Pre,{children:`// 7) Function parameters evaluate left→right (TDZ inside parameter scope)
function f(a = b, b = 1) { return a + b; }
// f();            // ❌ b is in TDZ when evaluating 'a = b'

function g(x = y) { let y = 2; return x; }
// g();            // ❌ 'y' belongs to body scope, not available for default`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Patterns (avoid TDZ bugs)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Declare before use; keep declarations at the top of the block."}),e.jsx("li",{children:"Avoid circular/forward references in initializers and default parameters."}),e.jsx("li",{children:"When shadowing, don’t read the name before its inner declaration."}),e.jsxs("li",{children:["Prefer function ",e.jsx("b",{children:"declarations"})," (fully hoisted) over function expressions if early calls are needed."]})]})]})]})}export{o as default};
