import{j as e}from"./index-8u32w9KR.js";import{S as s}from"./styled-B7242J7m.js";import{B as i,L as n}from"./index-r3zDAhCy.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(s.Heading,{children:"Strict mode"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:'"use strict"'})," enables stricter, safer semantics: throws on silent errors, tighter ",e.jsx("code",{children:"this"})," rules, cleaner scoping. ",e.jsx("b",{children:"ES modules & class bodies are strict by default."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"How to enable"}),e.jsx(s.Pre,{children:`"use strict";            // whole script (must be first statement)
function f(){ "use strict"; /* only this function */ }`}),e.jsxs("ul",{children:[e.jsx("li",{children:"Directive must be at the top of a script or function body (not inside a block)."}),e.jsx("li",{children:"Modules/classes: no directive needed (already strict)."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Key effects"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"No accidental globals:"})," assigning an undeclared name throws."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Function-call ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"undefined"}),":"]})," not auto-bound to the global object (browser ",e.jsx("code",{children:"window"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Syntax is tighter:"})," no ",e.jsx("code",{children:"with"}),", no duplicate params, no octal literals like ",e.jsx("code",{children:"0755"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Safer ops:"})," writing to read-only props or deleting non-configurable props throws;",e.jsx("code",{children:"delete"})," on identifiers is a SyntaxError."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"eval"}),"/",e.jsx("code",{children:"arguments"})," reserved & saner:"]})," can't be bound as identifiers; direct ",e.jsx("code",{children:"eval"})," doesn't leak bindings; params aren't aliased to"," ",e.jsx("code",{children:"arguments"}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`"use strict";
// 1) No accidental globals
x = 1;            // ❌ ReferenceError (x is not defined)
`}),e.jsx(s.Pre,{children:`"use strict";
// 2) 'this' in plain function calls
function f(){ return this; }
f() === undefined; // ✅ in strict (was global object in sloppy)
`}),e.jsx(s.Pre,{children:`"use strict";
// 3) Syntax tightness
// function g(a, a){}     // ❌ Duplicate parameter name
// with (obj) {}          // ❌ 'with' forbidden
// 0755                   // ❌ Legacy octal; use 0o755
0o755                    // ✓ modern octal
`}),e.jsx(s.Pre,{children:`"use strict";
// 4) Safer property ops
const o = {};
Object.defineProperty(o, "x", { value: 1, writable: false });
// o.x = 2;              // ❌ TypeError in strict (silent no-op in sloppy)

// delete eval;         // ❌ SyntaxError
// delete o.toString;   // ❌ TypeError (non-configurable on Object.prototype)
`}),e.jsx(s.Pre,{children:`"use strict";
// 5) eval/arguments behavior
(function(a){
  // a === 1; arguments[0] === 1
  arguments[0] = 9;  // does NOT change 'a' in strict
  // a === 1 still
}) (1);

// const eval = 1;     // ❌ can't bind 'eval' (also 'arguments')
`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Modules & classes are strict: write code expecting strict semantics everywhere."}),e.jsx("li",{children:"Initialize variables before use; avoid relying on global fallback."}),e.jsxs("li",{children:["Avoid legacy patterns: ",e.jsx("code",{children:"with"}),", duplicate params, octal escapes (",e.jsx("code",{children:'"\\\\012"'}),")."]}),e.jsxs("li",{children:["Lint it: ",e.jsx("code",{children:"no-implicit-globals"}),", ",e.jsx("code",{children:"no-octal"}),","," ",e.jsx("code",{children:"no-with"}),", ",e.jsx("code",{children:"no-caller"}),", ",e.jsx("code",{children:"no-delete-var"}),"."]})]})]})]})}export{c as default};
