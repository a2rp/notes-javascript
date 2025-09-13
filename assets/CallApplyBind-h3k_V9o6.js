import{j as e}from"./index-Cps9Yqi0.js";import{S as n,F as i}from"./index-DYA0VHX6.js";import{B as s}from"./Breadcrumbs-DTCNvS__.js";function t(){return e.jsxs(n.Wrapper,{children:[e.jsx(s,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:i}),e.jsx(n.Heading,{children:"call / apply / bind"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Utilities on ",e.jsx("code",{children:"Function.prototype"})," to control"," ",e.jsx("code",{children:"this"})," and pass arguments."]}),e.jsx("h2",{children:"What they do"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"fn.call(thisArg, ...args)"})})," — invoke now, pass args one by one."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"fn.apply(thisArg, argsArrayLike)"})})," — invoke now, pass an array/array-like."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx("code",{children:"fn.bind(thisArg, ...preset)"})})," — returns a ",e.jsx("i",{children:"new"})," function with"," ",e.jsx("code",{children:"this"})," and leading args locked in (partial application)."]})]}),e.jsx("h2",{children:"Tiny examples"}),e.jsx(n.Pre,{children:`function who(prefix){ return prefix + (this?.name ?? "??"); }
who.call({ name: "A" }, "@")    // "@A"
who.apply({ name: "B" }, ["#"]) // "#B"

const bound = who.bind({ name: "C" }, "!");
bound()                          // "!C"  (later args append after "!")
`}),e.jsx("h2",{children:"Using arrays with apply vs spread"}),e.jsx(n.Pre,{children:`const nums = [1, 9, 3];
Math.max.apply(null, nums)  // 9
Math.max(...nums)           // 9  (modern & clearer)

// Borrowing array methods for array-likes:
function argsToArray(){ return Array.prototype.slice.call(arguments); }
function better(...args){ return args; } // rest is simpler

// Or with Reflect.apply (explicit 'this'):
Reflect.apply(Array.prototype.slice, arguments, [0])`}),e.jsx("h2",{children:"Binding rules (important)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"new beats bind:"})," ",e.jsx("code",{children:"new (Ctor.bind(obj, 1))()"})," creates a new instance;"," ","the bound ",e.jsx("code",{children:"thisArg"})," is ignored, but preset args are used."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bound functions can’t be re-bound:"})," ",e.jsx("code",{children:"bound.call(other)"})," keeps the original ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Arrows ignore call/apply/bind for ",e.jsx("code",{children:"this"}),":"]})," they capture lexical"," ",e.jsx("code",{children:"this"}),"."]})]}),e.jsx(n.Pre,{children:`function Ctor(x){ this.x = x; }
const B = Ctor.bind({ fake: true }, 10);
const inst = new B();       // 'this' is the new instance, not {fake:true}
inst.x                      // 10 (preset arg still applied)`}),e.jsx("h2",{children:"Strict vs non-strict"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["In ",e.jsx("b",{children:"strict"})," code, ",e.jsx("code",{children:"thisArg"})," is used as-is (can be a primitive or"," ",e.jsx("code",{children:"undefined"}),")."]}),e.jsxs("li",{children:["In ",e.jsx("b",{children:"sloppy"})," code, ",e.jsx("code",{children:"null/undefined"})," become the global object and primitives get boxed."]})]}),e.jsx(n.Pre,{children:`(function(){ "use strict"; return this; }).call(5) // 5
(function(){ return this;            }).call(5) // Number(5) boxed in sloppy`}),e.jsx("h2",{children:"Partial application with bind"}),e.jsx(n.Pre,{children:`const add = (a,b,c) => a+b+c;
const add5 = add.bind(null, 5);
add5(2,3) // 10

// Preserve methods with bound 'this'
const logger = {
  tag: "[L]",
  log(msg){ console.log(this.tag, msg); }
};
const print = logger.log.bind(logger);
print("ready"); // [L] ready`}),e.jsx("h2",{children:"Method extraction (fix “lost this”)"}),e.jsx(n.Pre,{children:`const btn = {
  id: "ok",
  click(){ return this.id; }
};

const fn = btn.click;
try { fn(); } catch{}          // 'this' lost (undefined in strict/modules)

const safe = btn.click.bind(btn);
safe();                        // "ok"`}),e.jsx("h2",{children:"Meta: name & length of bound functions"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"boundFn.name"})," usually prefixes with ",e.jsx("code",{children:'"bound "'}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"boundFn.length"})," = ",e.jsx("code",{children:"Math.max(0, target.length - presetCount)"}),"."]})]}),e.jsx(n.Pre,{children:`function f(a,b,c){} 
const g = f.bind(null, 1);
g.length   // 2
g.name     // "bound f"`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"call"})," → now (variadic), ",e.jsx("code",{children:"apply"})," → now (array), ",e.jsx("code",{children:"bind"})," → later (locks this + args)."]}),e.jsxs("li",{children:["Prefer spread over ",e.jsx("code",{children:"apply"})," in modern code; use ",e.jsx("code",{children:"Reflect.apply"})," for explicit borrowing."]}),e.jsxs("li",{children:["Extracted methods lose their receiver — fix with ",e.jsx("code",{children:"bind"})," or wrap in an arrow."]}),e.jsxs("li",{children:[e.jsx("code",{children:"new"})," overrides a bound ",e.jsx("code",{children:"this"}),", but not bound arguments."]}),e.jsx("li",{children:"Don’t bind inside hot loops/renders; create once and reuse."})]})]})]})}export{t as default};
