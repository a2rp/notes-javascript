import{j as e}from"./index-4OJNB7vi.js";import{S as s,M as i}from"./index-DrTtPcpR.js";import{B as n}from"./Breadcrumbs-BWCvk1iJ.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(n,{sectionLabel:"Meta & Advanced",sectionPath:"/meta-advanced",topics:i}),e.jsx(s.Heading,{children:"Eval & Function constructor"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"eval(src)"})," and ",e.jsx("code",{children:"new Function(args..., body)"})," ","compile & run JS from strings. They are powerful but risky: security, performance, and tooling all suffer. Prefer safer alternatives."]}),e.jsx("h2",{children:"Why avoid"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Security:"})," code injection if any part of the string is untrusted."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," disables many engine optimizations; parses at runtime."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tooling:"})," breaks static analysis, tree-shaking, bundling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CSP:"})," Content-Security-Policy often blocks it (needs ",e.jsx("code",{children:"unsafe-eval"}),")."]})]}),e.jsx("h2",{children:"eval basics (direct vs indirect)"}),e.jsx(s.Pre,{children:`let x = 1;
function demo(){
  let x = 10;
  // DIRECT eval: shares local scope
  eval("x = x + 5");   // mutates local x
  console.log(x);      // 15

  // INDIRECT eval: runs in global scope
  (0, eval)("var g = 123");
  // "g" becomes a global var
}
demo();`}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Direct"})," eval (spelled literally ",e.jsx("code",{children:"eval"}),") executes in the current scope."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Indirect"})," eval (e.g., ",e.jsx("code",{children:"(0, eval)(...)"}),") executes in the ",e.jsx("b",{children:"global"})," scope."]})]}),e.jsxs("h2",{children:[e.jsx("code",{children:"new Function"})," (always global)"]}),e.jsx(s.Pre,{children:`// new Function(arg1Name, ..., bodyString)
const sum = new Function("a","b","return a + b");
sum(2,3); // 5

// No closure access: cannot see local variables
function makeAdder(n){
  return new Function("x", "return x + n"); // ReferenceError: n is not defined
}`}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Code runs in the ",e.jsx("b",{children:"global scope"})," (no access to local closures)."]}),e.jsxs("li",{children:["Strict mode only if you include ",e.jsx("code",{children:'"use strict"'})," in the body."]})]}),e.jsx("h2",{children:"When it's sometimes used"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Loading user-written plugins/snippets in a ",e.jsx("b",{children:"controlled sandbox"}),"."]}),e.jsx("li",{children:"Generating small specialized functions (micro-templating)—still risky; prefer templates."})]}),e.jsx("h2",{children:"Safer alternatives"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data, not code:"})," use ",e.jsx("code",{children:"JSON.parse"})," instead of ",e.jsx("code",{children:"eval"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic modules:"})," ",e.jsx("code",{children:"await import(url)"})," for code-splitting/plugins."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Small expression parsers:"})," write/bring a parser for a limited grammar."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Templating:"})," tagged templates / libraries that ",e.jsx("b",{children:"escape"})," by default."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sanitize HTML:"})," never eval; use DOM APIs + sanitizers (e.g., DOMPurify)."]})]}),e.jsx(s.Pre,{children:`// dynamic import (ESM)
const mod = await import("./math.js");       // static analysis-friendly
console.log(mod.add(2,3));`}),e.jsx("h2",{children:"Escaping & injection reminder"}),e.jsx(s.Pre,{children:`// ❌ vulnerable: user input becomes code
const src = "return " + userInput;          // e.g., "process.exit()"
const f = new Function(src);                // code injection risk

// ✅ treat as data, not code
const expr = JSON.parse(userProvidedJson);`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"eval"})," (direct) runs in local scope; indirect eval + ",e.jsx("code",{children:"new Function"})," run in global scope."]}),e.jsxs("li",{children:["No closure access with ",e.jsx("code",{children:"new Function"}),"; add ",e.jsx("code",{children:'"use strict"'})," yourself if needed."]}),e.jsx("li",{children:"Avoid for untrusted strings; CSP may block it; engines deopt around it."}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"JSON.parse"}),", ",e.jsx("b",{children:"dynamic import()"}),", or a limited parser instead."]})]})]})]})}export{d as default};
