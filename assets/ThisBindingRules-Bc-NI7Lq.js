import{j as e}from"./index-D5VEPJXy.js";import{S as i,F as s}from"./index-DihtLOMk.js";import{B as n}from"./Breadcrumbs-_bfjIlB_.js";function d(){return e.jsxs(i.Wrapper,{children:[e.jsx(n,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:s}),e.jsx(i.Heading,{children:"this binding rules"}),e.jsxs(i.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"this"})," is set by the ",e.jsx("b",{children:"call-site"})," (how a function is invoked), not where it's defined. Arrows are the exception: they capture lexical"," ",e.jsx("code",{children:"this"}),"."]}),e.jsx("h2",{children:"Four binding rules (priority)"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"new"})," — constructor call: ",e.jsx("code",{children:"new Fn()"})," makes a fresh ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Explicit"})," — ",e.jsx("code",{children:"call/apply/bind"})," set ",e.jsx("code",{children:"this"})," to what you pass."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Implicit"})," — ",e.jsx("code",{children:"obj.method()"})," binds ",e.jsx("code",{children:"this === obj"})," (receiver)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default"})," — plain call: ",e.jsx("code",{children:"Fn()"}),". In modules/strict:"," ",e.jsx("code",{children:"this === undefined"}),"; otherwise global object."]})]}),e.jsx("h2",{children:"Arrow functions (special)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Arrows don't have their own ",e.jsx("code",{children:"this"}),"; they close over the ",e.jsx("i",{children:"outer"})," one."]}),e.jsxs("li",{children:[e.jsx("code",{children:"call/apply/bind"})," can't change an arrow's ",e.jsx("code",{children:"this"}),"."]})]}),e.jsx("h2",{children:"Tiny examples"}),e.jsx(i.Pre,{children:`// 1) new
function Person(name){ this.name = name; }
const p = new Person("A");  // p.name === "A"

// 2) explicit
function who(){ return this.tag; }
who.call({ tag: "X" });     // "X"
who.apply({ tag: "Y" });    // "Y"
const bound = who.bind({ tag: "Z" });
bound();                    // "Z"

// 3) implicit (receiver)
const obj = {
  tag: "OBJ",
  who(){ return this.tag; }
};
obj.who();                  // "OBJ"

const f = obj.who;
f();                        // undefined (lost receiver in strict/module)

// 4) default
(function g(){ return this; })(); // undefined in modules/strict

// Arrow: lexical this
const ctx = { val: 1, go(){ const a = () => this.val; return a(); } };
ctx.go();                   // 1  (arrow captured ctx)`}),e.jsx("h2",{children:"Precedence notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"new"})," beats ",e.jsx("b",{children:"explicit"}),": ",e.jsx("code",{children:"new (who.bind(x))()"})," makes a fresh ",e.jsx("code",{children:"this"})," (binding target ignored)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Explicit"})," beats ",e.jsx("b",{children:"implicit"}),": ",e.jsx("code",{children:"obj.who.call(other)"})," → ",e.jsx("code",{children:"this === other"}),"."]})]}),e.jsx("h2",{children:"Common gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Method extraction:"})," ",e.jsx("code",{children:"const fn = obj.method"})," loses the receiver. Fix with"," ",e.jsx("code",{children:"fn.call(obj,...)"})," or ",e.jsx("code",{children:"const fn = obj.method.bind(obj)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Callbacks:"})," passing methods to ",e.jsx("code",{children:"setTimeout"})," / libraries loses"," ",e.jsx("code",{children:"this"}),". Use ",e.jsx("code",{children:"bind"})," or an arrow wrapper."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event handlers (DOM):"})," in a normal function listener, ",e.jsx("code",{children:"this"})," is the element; in an arrow, use ",e.jsx("code",{children:"e.currentTarget"})," instead of ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Class fields:"})," arrow instance fields auto-bind to the instance; prototype methods do not."]})]}),e.jsx(i.Pre,{children:`// Lost 'this' in a callback → fix with bind or arrow
class Counter {
  count = 0;
  inc(){ this.count++; }

  start() {
    setTimeout(this.inc.bind(this), 0);      // ✅ bind
    setTimeout(() => this.inc(), 0);         // ✅ arrow wrapper
  }
}`}),e.jsx("h2",{children:"this in modules, functions, classes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Top-level in ES modules: ",e.jsx("code",{children:"this === undefined"}),"."]}),e.jsxs("li",{children:["Inside class methods: ",e.jsx("code",{children:"this"})," is the instance (when called as ",e.jsx("code",{children:"obj.m()"}),")."]}),e.jsx("li",{children:"Inside function declarations/expressions: depends on call-site rules above."})]}),e.jsx("h2",{children:"Patterns (practical)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"arrow fields"})," for React/handlers to avoid manual ",e.jsx("code",{children:"bind"}),"."]}),e.jsxs("li",{children:["For utility functions, pass the object explicitly instead of relying on ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:["Avoid storing ",e.jsx("code",{children:"this"})," in ",e.jsx("code",{children:"self = this"}),"; arrows are cleaner."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Decide by call-site: ",e.jsx("b",{children:"new → explicit → implicit → default"}),". Arrows are lexical."]}),e.jsx("li",{children:"Extracted methods lose their receiver — bind or wrap."}),e.jsxs("li",{children:["Arrows ignore ",e.jsx("code",{children:"call/apply/bind"})," for ",e.jsx("code",{children:"this"}),"; use them when you want outer ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:["Module/global differences: top-level ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"undefined"})," in modules."]})]})]})]})}export{d as default};
