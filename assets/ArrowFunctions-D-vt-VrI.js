import{j as e}from"./index-Cps9Yqi0.js";import{S as s,F as n}from"./index-DYA0VHX6.js";import{B as r}from"./Breadcrumbs-DTCNvS__.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:n}),e.jsx(s.Heading,{children:"Arrow functions"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Concise function syntax with a ",e.jsx("b",{children:"lexical"})," (captured)"," ",e.jsx("code",{children:"this"}),". Arrows don't have their own ",e.jsx("code",{children:"this"}),","," ",e.jsx("code",{children:"arguments"}),", ",e.jsx("code",{children:"super"}),", or ",e.jsx("code",{children:"new.target"}),", and they're not constructible."]}),e.jsx("h2",{children:"Syntax essentials"}),e.jsx(s.Pre,{children:`const inc = x => x + 1;         // single param, implicit return
const pair = (a, b) => ({ a, b }); // return object → wrap in ( )
const none = () => 42;             // zero params
const block = (x) => {             // block body needs 'return'
  const y = x * 2;
  return y;
};
const rest = (...args) => args;    // use rest instead of 'arguments'
const asyncLoad = async () => (await fetch("/api")).ok;`}),e.jsxs("h2",{children:["Lexical ",e.jsx("code",{children:"this"})," (biggest difference)"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Arrows capture ",e.jsx("code",{children:"this"})," from the surrounding scope; ",e.jsx("code",{children:"call/apply/bind"})," cannot change it."]}),e.jsxs("li",{children:["Great for callbacks where you want the outer ",e.jsx("code",{children:"this"})," (e.g., inside class methods)."]})]}),e.jsx(s.Pre,{children:`const obj = {
  n: 0,
  incLater() {
    setTimeout(() => { this.n++; }, 0);  // 'this' is obj ✅
  },
  bad() {
    setTimeout(function(){ this.n++; }, 0); // 'this' is global/undefined ❌
  }
};`}),e.jsx(s.Pre,{children:`// call/apply/bind can't rebind 'this' of an arrow:
const outerThis = this;
const getThis = () => this;
getThis.call({ x: 1 }) === outerThis; // true
// 'bind' still works for partial args (not for 'this')`}),e.jsx("h2",{children:"Not a constructor, no prototype"}),e.jsx(s.Pre,{children:`const A = () => {};
// new A();                    // TypeError ❌
A.prototype;                    // undefined`}),e.jsxs("h2",{children:["No own ",e.jsx("code",{children:"arguments"})]}),e.jsx(s.Pre,{children:`const f = () => arguments; // resolves to outer scope; often ReferenceError
// Prefer rest:
const g = (...args) => args; g(1,2); // [1,2]`}),e.jsx("h2",{children:"Methods vs arrows (choose correctly)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Object/class ",e.jsx("b",{children:"methods"})," should usually be normal functions (need dynamic ",e.jsx("code",{children:"this"}),")."]}),e.jsxs("li",{children:["Inside a class, ",e.jsx("b",{children:"instance fields with arrows"})," are handy to auto-bind callbacks."]})]}),e.jsx(s.Pre,{children:`// Class pattern
class Counter {
  count = 0;
  // auto-bound to each instance:
  inc = () => { this.count++; };
  // method (good when you don't need binding):
  reset(){ this.count = 0; }
}`}),e.jsx("h2",{children:"Common pitfalls"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Returning an object with implicit return requires parentheses: ",e.jsx("code",{children:"x => ({x})"}),"."]}),e.jsxs("li",{children:["Don't use arrows for event handlers if you rely on element-bound ",e.jsx("code",{children:"this"})," — use the event object instead (",e.jsx("code",{children:"e.currentTarget"}),")."]}),e.jsxs("li",{children:["Arrows can't be generators (",e.jsx("code",{children:"yield"})," not allowed)."]})]}),e.jsx(s.Pre,{children:`// Event handler: prefer event.currentTarget over 'this'
button.addEventListener("click", (e) => {
  e.currentTarget.classList.add("active");
});`}),e.jsx("h2",{children:"When to use arrows"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Inline callbacks: ",e.jsx("code",{children:"map/filter/reduce"}),", Promises, timers."]}),e.jsxs("li",{children:["Closures that should “remember” the surrounding ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:["Instance fields in classes to avoid manual ",e.jsx("code",{children:"bind"})," in constructors."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Lexical ",e.jsx("code",{children:"this"}),"; ",e.jsx("code",{children:"call/apply/bind"})," won't change it."]}),e.jsxs("li",{children:["No own ",e.jsx("code",{children:"arguments"})," — use rest params."]}),e.jsxs("li",{children:["Not constructible; no ",e.jsx("code",{children:"prototype"}),"."]}),e.jsxs("li",{children:["Implicit return only for single expressions; wrap objects in ",e.jsx("code",{children:"( )"}),"."]}),e.jsxs("li",{children:["Use normal methods when you need a dynamic ",e.jsx("code",{children:"this"})," or want the function on the prototype."]})]})]})]})}export{o as default};
