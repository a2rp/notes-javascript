import{j as e}from"./index-COrpvOC4.js";import{S as n,F as s}from"./index-fZW_A1Tb.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";function t(){return e.jsxs(n.Wrapper,{children:[e.jsx(i,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:s}),e.jsx(n.Heading,{children:"Function forms"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JavaScript offers multiple ways to create functions. Each form differs in hoisting, naming, ",e.jsx("code",{children:"this"}),", and return type. Pick the form that matches the job."]}),e.jsx("h2",{children:"1) Function declaration (FD)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Hoisted: callable before its line. In strict/modules, block-scoped inside a block."}),e.jsx("li",{children:"The function name is available inside for recursion."})]}),e.jsx(n.Pre,{children:`greet();                    // "hi" (hoisted)
function greet(){ console.log("hi"); }

{
  function local(){ return 1; }   // block-scoped in strict/modules
}
// local(); // ReferenceError (outside block)
`}),e.jsx("h2",{children:"2) Function expression (FE)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Not hoisted as a function; only the variable hoists."}),e.jsx("li",{children:"Can be anonymous or named (named helps stack traces & self-recursion)."})]}),e.jsx(n.Pre,{children:`const add = function(a, b){ return a + b; };
const fact = function factorial(n){ return n <= 1 ? 1 : n * factorial(n-1); };

console.log(add(2,3));  // 5
// console.log(mult(2,3)); // ReferenceError (not declared yet)
`}),e.jsx("h2",{children:"3) Method shorthand (object/class)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Object literal: concise method syntax. In classes, similar method form."}),e.jsx("li",{children:"Methods are just functions stored on an object; name is inferred."})]}),e.jsx(n.Pre,{children:`const user = {
  name: "A",
  greet(){ return "hi " + this.name; } // method shorthand
};
user.greet(); // "hi A"
`}),e.jsxs("h2",{children:["4) Arrow function ",e.jsx("small",{children:"(separate deep-dive later)"})]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Concise syntax, ",e.jsx("b",{children:"lexical this"}),", no ",e.jsx("code",{children:"arguments"}),", not constructible."]}),e.jsxs("li",{children:["Great for callbacks; avoid for methods that need dynamic ",e.jsx("code",{children:"this"}),"."]})]}),e.jsx(n.Pre,{children:`const inc = x => x + 1;
const pair = (a, b) => ({ a, b });  // returns object
// new inc(); // TypeError (arrows can't be used with new)
`}),e.jsx("h2",{children:"5) Generator function"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"function* g()"})," yields values and returns an ",e.jsx("b",{children:"iterator"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"yield"})," to pause; consume with ",e.jsx("code",{children:"for…of"})," or ",e.jsx("code",{children:"next()"}),"."]})]}),e.jsx(n.Pre,{children:`function* range(n){
  for (let i = 0; i < n; i++) yield i;
}
for (const x of range(3)) { /* 0,1,2 */ }
`}),e.jsx("h2",{children:"6) Async function"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"async function f()"})," returns a ",e.jsx("b",{children:"Promise"}),"; inside you can ",e.jsx("code",{children:"await"}),"."]}),e.jsxs("li",{children:["There are async arrows too: ",e.jsx("code",{children:"const f = async () => "}),"."]})]}),e.jsx(n.Pre,{children:`async function load(){
  const res = await fetch("/api");
  return res.ok;
}
load().then(console.log);
`}),e.jsx("h2",{children:"7) Async generator"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"async function* g()"})," yields Promises/values; consume with ",e.jsx("code",{children:"for await…of"}),"."]})}),e.jsx(n.Pre,{children:`async function* lines(stream){
  for await (const chunk of stream) yield String(chunk);
}
`}),e.jsx("h2",{children:"8) IIFE (Immediately-Invoked Function Expression)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Creates a one-off scope; less needed with ",e.jsx("code",{children:"let/const"})," and modules, still handy in scripts."]})}),e.jsx(n.Pre,{children:`(function(){
  const secret = 42;
  console.log("init once");
})();  // runs immediately
`}),e.jsx("h2",{children:"9) Function constructor"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:'new Function("a","b","return a+b")'})," builds from strings; executes in the global scope."]}),e.jsx("li",{children:"Avoid in application code (security, performance, no closure access)."})]}),e.jsx(n.Pre,{children:`const sum = new Function("a","b","return a+b");
sum(2,3); // 5   // but avoid this pattern
`}),e.jsx("h2",{children:"10) Getters / Setters"}),e.jsx("ul",{children:e.jsx("li",{children:"Accessor functions on objects/classes; act like properties when used."})}),e.jsx(n.Pre,{children:`const p = {
  _x: 1,
  get x(){ return this._x; },
  set x(v){ this._x = v; }
};
p.x = 7; p.x; // 7
`}),e.jsxs("h2",{children:["Name inference & ",e.jsx("code",{children:"Function.name"})]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Anonymous function expressions get a name from their binding: ",e.jsxs("code",{children:["const fn = function()",'; fn.name === "fn"']}),"."]}),e.jsxs("li",{children:["Method shorthand names come from the key; bound functions show ",e.jsx("code",{children:'"bound "'})," prefix."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Need hoisting or recursion? Use a ",e.jsx("b",{children:"function declaration"}),"."]}),e.jsxs("li",{children:["Need a value in an expression or to pass around? Use a ",e.jsx("b",{children:"function expression"})," (often with ",e.jsx("b",{children:"const"}),")."]}),e.jsxs("li",{children:["Callbacks → prefer ",e.jsx("b",{children:"arrow"})," (lexical ",e.jsx("code",{children:"this"}),"); object/class methods → method syntax (not arrows)."]}),e.jsxs("li",{children:["Streams/iterables → ",e.jsx("b",{children:"generators"}),"; async workflows → ",e.jsx("b",{children:"async"})," (and async generators)."]}),e.jsxs("li",{children:["Avoid ",e.jsx("b",{children:"Function constructor"})," unless you truly need dynamic code generation."]})]})]})]})}export{t as default};
