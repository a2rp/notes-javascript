import{j as r}from"./index-D5VEPJXy.js";import{S as e,E as s}from"./index-B_8JQQek.js";import{B as n}from"./Breadcrumbs-_bfjIlB_.js";function l(){return r.jsxs(e.Wrapper,{children:[r.jsx(n,{sectionLabel:"Errors & Robustness",sectionPath:"/errors-robustness",topics:s}),r.jsx(e.Heading,{children:"Error types"}),r.jsxs(e.Prose,{children:[r.jsxs("p",{children:[r.jsx("b",{children:"Definition."})," Errors are thrown to signal failures. Each built-in error type represents a class of mistakes. Create with ",r.jsx("code",{children:"new TypeError(msg)"})," etc., or",r.jsx("code",{children:"throw"})," any value (prefer ",r.jsx("code",{children:"Error"})," objects)."]}),r.jsx("h2",{children:"Core constructors (when they occur)"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("b",{children:"Error"})," - generic base class."]}),r.jsxs("li",{children:[r.jsx("b",{children:"TypeError"})," - value is of wrong type or not callable/iterable."]}),r.jsxs("li",{children:[r.jsx("b",{children:"RangeError"})," - numeric/length out of range (e.g., ",r.jsx("code",{children:"toFixed(-1)"}),")."]}),r.jsxs("li",{children:[r.jsx("b",{children:"ReferenceError"})," - unknown identifier (e.g., using an undeclared variable)."]}),r.jsxs("li",{children:[r.jsx("b",{children:"SyntaxError"})," - invalid JS source; only seen at parse time (e.g., via ",r.jsx("code",{children:"eval"}),"/",r.jsx("code",{children:"new Function"})," or bundlers)."]}),r.jsxs("li",{children:[r.jsx("b",{children:"URIError"})," - bad URI component (e.g., ",r.jsx("code",{children:'decodeURIComponent("%")'}),")."]}),r.jsxs("li",{children:[r.jsx("b",{children:"AggregateError"})," - wraps multiple errors (e.g., ",r.jsx("code",{children:"Promise.any"})," rejection)."]}),r.jsxs("li",{children:[r.jsx("b",{children:"EvalError"})," - historical; rarely used today."]}),r.jsxs("li",{children:[r.jsx("b",{children:"DOMException"})," (browser) - Web APIs throw these (e.g., ",r.jsx("code",{children:"AbortError"})," from fetch abort)."]})]}),r.jsx("h2",{children:"Creating & throwing"}),r.jsx(e.Pre,{children:`// pick a specific type when possible
function parseJson(s){
  try {
    return JSON.parse(s);
  } catch (err) {
    throw new SyntaxError("Invalid JSON", { cause: err });
  }
}

// using "cause" (ES2022) preserves the root error chain
try { parseJson("{"); }
catch (e) {
  console.error(e.message); // "Invalid JSON"
  console.error(e.cause);   // original SyntaxError from JSON.parse
}`}),r.jsx("h2",{children:"Inspecting errors"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("code",{children:"err instanceof TypeError"})," to branch by kind."]}),r.jsxs("li",{children:[r.jsx("code",{children:"err.name"}),", ",r.jsx("code",{children:"err.message"}),", and (non-standard but common) ",r.jsx("code",{children:"err.stack"})," for diagnostics."]})]}),r.jsx(e.Pre,{children:`try { (42)(); } catch (err) {
  if (err instanceof TypeError) {/* handle */}
  console.log(err.name, err.message);
  console.log(String(err)); // "TypeError: ... "
}`}),r.jsx("h2",{children:"Examples per type"}),r.jsx(e.Pre,{children:`// TypeError
[1,2,3].map();                 // "map is not a function" if not callable

// RangeError
(123.45).toFixed(1000);        // digits out of range

// ReferenceError
console.log(notDeclared);      // using unknown identifier

// SyntaxError (runtime only via eval/new Function)
try { new Function("let let = 1;") } catch (e){ /* SyntaxError */ }

// URIError
decodeURIComponent("%");       // malformed escape

// AggregateError (Promise.any)
const any = Promise.any([Promise.reject("x"), Promise.reject("y")])
  .catch(err => {
    // err instanceof AggregateError
    for (const e of err.errors) console.log(e);
  });`}),r.jsx("h2",{children:"Best practices"}),r.jsxs("ul",{children:[r.jsxs("li",{children:["Throw ",r.jsx("b",{children:"specific"})," error types; include actionable messages."]}),r.jsxs("li",{children:["Preserve the original failure using ",r.jsx("code",{children:"cause"}),"."]}),r.jsxs("li",{children:["Don't overuse ",r.jsx("code",{children:"try/catch"}),"-catch at boundaries (I/O, parsing, API edges)."]}),r.jsxs("li",{children:["Never rely on ",r.jsx("code",{children:"stack"})," format for logic; it's for logging only."]}),r.jsxs("li",{children:["In async code, unhandled rejections surface as ",r.jsx("i",{children:"unhandledrejection"})," (browser) / process handler (Node)."]})]}),r.jsx("h2",{children:"Must-know (checklist)"}),r.jsxs("ul",{children:[r.jsxs("li",{children:["Prefer ",r.jsx("code",{children:"Error"})," subclasses; avoid throwing plain strings."]}),r.jsxs("li",{children:["Use ",r.jsx("code",{children:"instanceof"})," to branch; ",r.jsx("code",{children:"name/message"})," for logs only."]}),r.jsxs("li",{children:[r.jsx("code",{children:"SyntaxError"})," appears when dynamically compiling code; not from normal execution."]}),r.jsxs("li",{children:[r.jsx("code",{children:"AggregateError"})," groups failures (e.g., ",r.jsx("code",{children:"Promise.any"}),"); inspect ",r.jsx("code",{children:".errors"}),"."]}),r.jsxs("li",{children:["Attach context via ",r.jsx("code",{children:"new Error(msg, { cause })"}),"."]})]})]})]})}export{l as default};
