import{j as e}from"./index-4OJNB7vi.js";import{S as n}from"./styled-CSyC-YA8.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";import{L as s}from"./index-DfUzXn8d.js";function t(){return e.jsxs(n.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:s}),e.jsx(n.Heading,{children:"Hoisting"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," During compile, ",e.jsx("i",{children:"declarations"})," are moved to the top of their scope.",e.jsx("b",{children:" Initialization stays in place."})," Effects differ by kind: ",e.jsx("code",{children:"var"})," gets",e.jsx("code",{children:" undefined"}),", ",e.jsx("code",{children:"let/const/class"})," enter the ",e.jsx("b",{children:"TDZ"}),", function",e.jsx("b",{children:" declarations hoist fully"}),"."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Rules (quick)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"var:"})," function/global scoped; hoisted and ",e.jsx("i",{children:"initialized to"})," ",e.jsx("code",{children:"undefined"}),". Multiple ",e.jsx("code",{children:"var"})," redecls merge."]}),e.jsxs("li",{children:[e.jsx("b",{children:"let/const/class:"})," hoisted to the block but uninitialized → ",e.jsx("b",{children:"TDZ"})," until the declaration line. Even ",e.jsx("code",{children:"typeof"})," throws in TDZ."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function declaration:"})," binding + body hoist; callable before its line. In strict mode & modules, block-scoped if placed inside a block."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function expression / arrow:"})," only the variable hoists (",e.jsx("code",{children:"var"}),"→",e.jsx("code",{children:"undefined"}),"; ",e.jsx("code",{children:"let/const"}),"→ TDZ). The function itself does ",e.jsx("i",{children:"not"}),"hoist."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Class declaration:"})," hoisted to TDZ; use only after its line. Class expressions don’t hoist."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Annex B (legacy browsers, non-strict)"})," had odd block-function semantics; in modern code treat block functions as ",e.jsx("b",{children:"block-scoped"})," or use ",e.jsx("code",{children:"const f = () => "}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(n.Pre,{children:`// var — hoisted & initialized
console.log(v); // undefined
var v = 1;      // init happens here`}),e.jsx(n.Pre,{children:`// let/const — hoisted to TDZ (no access before line)
console.log(l); // ReferenceError (TDZ)
let l = 1;

typeof c;       // ReferenceError (TDZ)
const c = 2;`}),e.jsx(n.Pre,{children:`// Function declaration — fully hoisted
greet();                 // "hi"
function greet(){ console.log("hi"); }`}),e.jsx(n.Pre,{children:`// Function expression / arrow — not hoisted as a function
console.log(add); // undefined (var hoists)
var add = function(a,b){ return a+b; };
// add(1,2) now works

// const/let + arrow in TDZ
// inc(1)              // ReferenceError
const inc = (x) => x + 1;`}),e.jsx(n.Pre,{children:`// Class declaration — TDZ
// new Person();       // ReferenceError
class Person { constructor(name){ this.name = name; } }
new Person("A");       // ok after declaration`}),e.jsx(n.Pre,{children:`// Block-scoped function in strict/modules
{
  function local(){ return 1; } // block-scoped here
  local(); // 1
}
// local(); // ReferenceError (outside the block)`}),e.jsx(n.Pre,{children:`// "Last declaration wins" for function declarations in same scope
function which(){ return "A"; }
function which(){ return "B"; }
which(); // "B"`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Interplay notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Default parameters evaluate ",e.jsx("b",{children:"left→right"})," before the body; referencing a later param is like TDZ."]}),e.jsx("li",{children:"Imports in ES modules are created before evaluation (live bindings); avoid circular dependencies or read-before-init cycles."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Declare ",e.jsx("b",{children:"before"})," use. Prefer ",e.jsx("b",{children:"const"}),"/",e.jsx("b",{children:"let"}),", avoid ",e.jsx("b",{children:"var"}),"."]}),e.jsxs("li",{children:["Call functions early only if they’re ",e.jsx("b",{children:"declarations"}),", not expressions."]}),e.jsxs("li",{children:["Don’t rely on block function hoisting across environments—use"," ",e.jsx("code",{children:"const f = () => "})," inside blocks."]}),e.jsxs("li",{children:["Lint: ",e.jsx("code",{children:"no-use-before-define"})," (allow functions if desired),"," ",e.jsx("code",{children:"no-var"}),"."]})]})]})]})}export{t as default};
