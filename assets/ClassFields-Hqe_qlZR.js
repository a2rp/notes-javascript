import{j as e}from"./index-Cud8-B-g.js";import{S as s,O as i}from"./index-_xV6Xjf9.js";import{B as t}from"./Breadcrumbs-BUXMDEQY.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(t,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:i}),e.jsx(s.Heading,{children:"Class fields"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("i",{children:"Class fields"})," let you declare data on the instance or on the constructor (static) directly inside the class body. They include ",e.jsx("b",{children:"public fields"}),",",e.jsx("b",{children:" #private fields"}),", ",e.jsx("b",{children:"static"})," variants of both, and ",e.jsx("b",{children:"static blocks"})," for setup."]}),e.jsx("h2",{children:"Public instance fields (own properties)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Created per instance; live on the object itself (not on the prototype)."}),e.jsx("li",{children:"Enumerable and writable by default unless you freeze/seal later."})]}),e.jsx(s.Pre,{children:`class Counter {
  count = 0;                 // public field (per instance)
  label = "ctr";
  inc(){ this.count++; }     // method (on prototype)
}
const c = new Counter();
Object.hasOwn(c, "count");   // true
"inc" in c;                  // true (inherited from prototype)
`}),e.jsx("h2",{children:"#Private instance fields"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Truly private; accessible only inside the class body that declares them."}),e.jsxs("li",{children:["Presence check: ",e.jsx("code",{children:"#x in obj"}),". Not enumerable; not reachable by brackets."]})]}),e.jsx(s.Pre,{children:`class Box {
  #x = 0;
  add(){ this.#x++; return this.#x; }
  hasX(obj){ return #x in obj; }   // presence test
}
const b = new Box();
b.add();                 // 1
// b.#x    // SyntaxError
// b["#x"] // undefined`}),e.jsx("h2",{children:"Arrow field vs method"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Method"})," lives on the prototype (one function shared by all instances). ",e.jsx("b",{children:"Dynamic this"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Arrow field"})," is created per instance and auto-binds to that instance (handy for callbacks)."]})]}),e.jsx(s.Pre,{children:`class UI {
  clicks = 0;
  onClick = () => { this.clicks++; }; // per instance, auto-bound
  reset(){ this.clicks = 0; }         // shared on prototype
}
const u1 = new UI(), u2 = new UI();
u1.onClick === u2.onClick;  // false (different functions)
u1.reset === u2.reset;      // true  (same prototype method)`}),e.jsx("h2",{children:"Static fields & static private fields"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"static"})," lives on the constructor function (",e.jsx("code",{children:"ClassName"}),"), not on instances."]}),e.jsxs("li",{children:["Private static: ",e.jsx("code",{children:"static #cache = new Map()"}),"; accessible only inside the class."]})]}),e.jsx(s.Pre,{children:`class Registry {
  static items = new Map();
  static #hits = 0;
  static get(id){ this.#hits++; return this.items.get(id); }
  static stats(){ return { size: this.items.size, hits: this.#hits }; }
}
Registry.items.set("a", 1);
Registry.get("a");
Registry.stats(); // { size:1, hits:1 }`}),e.jsx("h2",{children:"Static blocks (one-time class init)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Run once when the class is evaluated. Can read/write static fields, including private ones."}),e.jsx("li",{children:"Useful for complex setup, try/catch, or conditional initialization."})]}),e.jsx(s.Pre,{children:`class Config {
  static #loaded = false;
  static options = {};
  static {
    try {
      this.options = { retry: 3, timeout: 1000 };
      this.#loaded = true;
    } catch {
      this.options = { retry: 1 };
    }
  }
}`}),e.jsx("h2",{children:"Initialization order (important)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Within a class"}),", fields are initialized in ",e.jsx("b",{children:"textual order"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived classes:"})," you must call ",e.jsx("code",{children:"super()"})," first. After ",e.jsx("code",{children:"super()"}),", instance field initializers run, then the rest of the constructor body executes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Base classes (no extends):"})," instance fields initialize at the start of construction, before the body runs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Static"})," fields/blocks run at class definition time, top-to-bottom."]})]}),e.jsx(s.Pre,{children:`class A {
  a = (this.trace.push("A field"), 1);
  trace = [];
  constructor(){ this.trace.push("A ctor"); }
}
class B extends A {
  b = (this.trace.push("B field"), 2);
  constructor(){
    super();                   // creates 'this' via A, then runs A's fields, then...
    this.trace.push("B ctor"); // now B fields run (textual) before this line completes
  }
}
new B().trace; // ["A field","A ctor","B field","B ctor"] (illustrative)`}),e.jsx("h2",{children:"Defaults & expressions"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Field initializers are normal expressions; they can reference earlier fields or call functions."}),e.jsx("li",{children:"Avoid heavy work in initializers for performance; prefer lightweight defaults."})]}),e.jsx(s.Pre,{children:`class User {
  id = crypto.randomUUID();
  createdAt = new Date();
  prefs = { theme: "dark" };
}`}),e.jsx("h2",{children:"Descriptors & enumerability"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Public fields become ",e.jsx("b",{children:"own, enumerable, writable, configurable"})," data properties."]}),e.jsx("li",{children:"Methods are non-enumerable on the prototype."}),e.jsx("li",{children:"Private fields are not properties; they're internal slots (not visible to descriptor APIs)."})]}),e.jsx(s.Pre,{children:`class C { x = 1; m(){} }
const c = new C();
Object.getOwnPropertyDescriptor(c, "x");
// { value:1, writable:true, enumerable:true, configurable:true }
Object.getOwnPropertyDescriptor(C.prototype, "m").enumerable; // false`}),e.jsx("h2",{children:"Gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["In derived constructors, ",e.jsx("b",{children:"never use"})," ",e.jsx("code",{children:"this"})," before ",e.jsx("code",{children:"super()"}),"."]}),e.jsx("li",{children:"Arrow fields are convenient but increase memory (one function per instance)."}),e.jsxs("li",{children:["Private names are lexical to the class; you must declare ",e.jsx("code",{children:"#x"})," before using it in field initializers."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Public fields → own, enumerable; methods → prototype & non-enumerable."}),e.jsxs("li",{children:["#Private fields are truly private; use ",e.jsx("code",{children:"#x in obj"})," for presence checks."]}),e.jsxs("li",{children:["Static fields/blocks initialize at class definition time; instance fields after ",e.jsx("code",{children:"super()"})," in derived classes."]}),e.jsx("li",{children:"Use arrow fields to auto-bind callbacks; prefer prototype methods for shared behavior."}),e.jsx("li",{children:"Keep field initializers light; move heavy setup to the constructor or a factory."})]})]})]})}export{c as default};
