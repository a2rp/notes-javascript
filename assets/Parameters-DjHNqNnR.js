import{j as e}from"./index-D5VEPJXy.js";import{S as r,F as s}from"./index-DihtLOMk.js";import{B as n}from"./Breadcrumbs-_bfjIlB_.js";function l(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:s}),e.jsx(r.Heading,{children:"Parameters"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Parameters define a function's inputs. JS supports positional params, default values, rest (",e.jsx("code",{children:"...args"}),"), and destructuring. Defaults run",e.jsx("b",{children:" left → right"})," on each call and only apply when the passed value is"," ",e.jsx("code",{children:"undefined"}),"."]}),e.jsx("h2",{children:"Basics"}),e.jsx(r.Pre,{children:`function sum(a, b) { return a + b; }
sum(2, 3)        // 5
sum(2)           // NaN  (b is undefined)`}),e.jsx("h2",{children:"Default parameters"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Used when the argument is ",e.jsx("code",{children:"undefined"})," (not for ",e.jsx("code",{children:"null"})," or ",e.jsx("code",{children:"0"}),")."]}),e.jsx("li",{children:"Evaluated per call (fresh objects, fresh dates, etc.)."})]}),e.jsx(r.Pre,{children:`function greet(name = "stranger"){ return "Hi " + name; }
greet()           // "Hi stranger"
greet(undefined)  // "Hi stranger"
greet(null)       // "Hi null" (default NOT used)

function addItem(list = []) { list.push("x"); return list; }
addItem(); addItem(); // ["x"], ["x"]  (different arrays each call)`}),e.jsx("h2",{children:"Evaluation order & TDZ in defaults"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Params evaluate left → right. A default can see earlier params, not later ones."}),e.jsx("li",{children:"Referring to a later param in an earlier default throws (TDZ)."})]}),e.jsx(r.Pre,{children:`function f(a = 1, b = a + 1){ return [a, b]; }
f()              // [1, 2]

// function g(a = b, b = 1) {}  // ❌ ReferenceError (b is in TDZ when a's default runs)`}),e.jsx("h2",{children:"Rest vs spread"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Rest (parameters):"})," collects extra args into an ",e.jsx("i",{children:"array"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spread (call site):"})," expands an iterable into individual args."]})]}),e.jsx(r.Pre,{children:`function collect(first, ...rest){ return [first, rest]; }
collect(1,2,3)   // [1, [2,3]]

const nums = [1,2,3];
Math.max(...nums)  // 3  (spread at call site)`}),e.jsx("h2",{children:"Destructuring parameters (named args pattern)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Great for many options; supports defaults & renaming."}),e.jsxs("li",{children:["Use ",e.jsxs("code",{children:["= ","{}"]})," to make the whole object optional."]})]}),e.jsx(r.Pre,{children:`function connect(
  { host = "localhost", port = 5432, ssl = false } = {}
){ return { host, port, ssl }; }

connect()                 // {host:"localhost", port:5432, ssl:false}
connect({ port: 3306 })   // {host:"localhost", port:3306, ssl:false}

function pickId({ id: userId }) { return userId; }
pickId({ id: 10 })        // 10`}),e.jsxs("h2",{children:[e.jsx("code",{children:"arguments"})," vs rest"]}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"arguments"})," is array-like, not a real array. In strict mode (modules), it's not “linked” to parameter variables. Prefer ",e.jsx("b",{children:"rest"}),"."]})}),e.jsx(r.Pre,{children:`function bad(){
  // arguments is array-like; changes don't sync to params in strict mode
  return Array.prototype.slice.call(arguments);
}
const good = (...args) => args;   // real array`}),e.jsx("h2",{children:"Required parameter pattern"}),e.jsx(r.Pre,{children:`const required = (name) => { throw new Error(name + " required"); };
function createUser(name = required("name")) {
  return { name };
}
// createUser(); // throws "name required"`}),e.jsxs("h2",{children:[e.jsx("code",{children:"Function.length"})," (arity)"]}),e.jsx("ul",{children:e.jsxs("li",{children:["Number of params ",e.jsx("i",{children:"before"})," the first default/rest parameter."]})}),e.jsx(r.Pre,{children:`function a(x, y, z){ }      a.length // 3
function b(x, y = 1, z){ }  b.length // 1
function c(...rest){ }      c.length // 0`}),e.jsx("h2",{children:"Parameter scope notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Defaults run in a scope ",e.jsx("i",{children:"before"})," the function body; accessing body locals there can cause TDZ errors."]}),e.jsx("li",{children:"Duplicate parameter names are disallowed in strict mode."}),e.jsx("li",{children:"Trailing commas are allowed in parameter lists."})]}),e.jsx(r.Pre,{children:`function h(x = y){   // y is from parameter scope or outer scope
  const y = 2;
  // x uses 'y' from outside the body; 'const y' here is not visible yet
}
// h(); // ReferenceError if no outer 'y' exists`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Defaults apply only for ",e.jsx("code",{children:"undefined"}),"; use ",e.jsx("code",{children:"??"})," inside when you want nullish handling."]}),e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"rest"})," over ",e.jsx("code",{children:"arguments"}),"; it's a real array and clearer."]}),e.jsxs("li",{children:["For many options, use an ",e.jsx("b",{children:"object parameter with destructuring defaults"}),"."]}),e.jsx("li",{children:"Beware TDZ in defaults (left→right evaluation); don't reference later params."}),e.jsxs("li",{children:["Function ",e.jsx("code",{children:".length"})," drops params after the first default/rest; don't use it as a validator."]})]})]})]})}export{l as default};
