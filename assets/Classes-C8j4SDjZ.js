import{j as e}from"./index-4OJNB7vi.js";import{S as s,O as r}from"./index-CsFZ2Zom.js";import{B as n}from"./Breadcrumbs-BWCvk1iJ.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(n,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:r}),e.jsx(s.Heading,{children:"Classes"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"class"})," is syntax sugar over prototypes. Instance methods live on"," ",e.jsx("code",{children:"C.prototype"}),"; ",e.jsx("code",{children:"static"})," members live on the constructor ",e.jsx("code",{children:"C"}),". Fields can be public or ",e.jsx("b",{children:"#private"}),"."]}),e.jsx("h2",{children:"Syntax essentials"}),e.jsx(s.Pre,{children:`class Counter {
  // public field (per-instance)
  count = 0;

  // private field (truly private to this class)
  #secret = 1;

  // static field (on constructor function)
  static ZERO = 0;

  constructor(n = 0) {         // runs on 'new Counter(...)'
    this.count = n;
  }

  // instance method (on Counter.prototype)
  inc() { this.count++; }

  // accessors (on prototype)
  get value() { return this.count; }
  set value(v) { this.count = Number(v) || 0; }

  // arrow field: auto-bound to the instance (per-instance function)
  tick = () => { this.count++; }
}

const c = new Counter(2);
c.inc(); c.value;         // 3
Counter.ZERO;             // static → 0`}),e.jsxs("h2",{children:[e.jsx("code",{children:"#private"})," fields & methods"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Lexically declared; inaccessible outside the class body."}),e.jsxs("li",{children:["Not enumerable; not reachable via bracket access or ",e.jsx("code",{children:"in"}),"."]})]}),e.jsx(s.Pre,{children:`class Box {
  #x = 0;
  #bump(){ this.#x++; }
  add(){ this.#bump(); return this.#x; }
}
const b = new Box();
b.add();      // 1
// b.#x;      // SyntaxError
// b["#x"];   // undefined (normal string key, not the private slot)`}),e.jsxs("h2",{children:["Inheritance: ",e.jsx("code",{children:"extends"})," & ",e.jsx("code",{children:"super"})]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Subclass must call ",e.jsx("code",{children:"super()"})," before using ",e.jsx("code",{children:"this"})," in the constructor."]}),e.jsxs("li",{children:[e.jsx("code",{children:"super.m()"})," calls the parent prototype's method."]}),e.jsxs("li",{children:[e.jsx("code",{children:"static"})," members can also use ",e.jsx("code",{children:"super"})," (constructor chain)."]})]}),e.jsx(s.Pre,{children:`class Animal {
  constructor(name){ this.name = name; }
  speak(){ return this.name + " makes a noise"; }
  static kind(){ return "animal"; }
}
class Dog extends Animal {
  constructor(name){ super(name); this.type = "dog"; } // super() first!
  speak(){ return super.speak() + " (woof)"; }
  static kind(){ return super.kind() + " → dog"; }
}

const d = new Dog("Rex");
d.speak();       // "Rex makes a noise (woof)"
Dog.kind();      // "animal → dog"`}),e.jsx("h2",{children:"Extending built-ins"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Works for modern engines; subclassing preserves internals (e.g., Array length)."}),e.jsxs("li",{children:["Many array methods return the subclass; customize with ",e.jsx("code",{children:"Symbol.species"}),"."]})]}),e.jsx(s.Pre,{children:`class List extends Array {
  first(){ return this[0]; }
  static get [Symbol.species]() { return Array; } // make methods like .map() return Array
}
const L = new List(1,2,3);
L.first();             // 1
L.map(x => x*2) instanceof Array; // true (because species → Array)`}),e.jsx("h2",{children:"Class expressions & names"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Classes can be expressions; the inner name is local to the class body."}),e.jsxs("li",{children:["Class declarations are hoisted but in a ",e.jsx("b",{children:"TDZ"}),"; can't use before definition."]})]}),e.jsx(s.Pre,{children:`const C = class Inner {
  id(){ return Inner.name; } // ok inside
};
// new Inner(); // ReferenceError outside
// Using before declaration → ReferenceError (TDZ)`}),e.jsxs("h2",{children:[e.jsx("code",{children:"this"})," & method binding"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prototype methods have dynamic ",e.jsx("code",{children:"this"})," (depends on call-site)."]}),e.jsx("li",{children:"Arrow fields are bound to the instance (useful for callbacks/React handlers), but they create a new function per instance."}),e.jsx("li",{children:"Prefer prototype methods for shared behavior; use arrow fields sparingly for auto-binding."})]}),e.jsx(s.Pre,{children:`class UI {
  clicks = 0;
  // auto-bound handler:
  onClick = () => { this.clicks++; };

  // prototype method (not bound):
  reset(){ this.clicks = 0; }
}`}),e.jsx("h2",{children:"Prototype wiring (facts)"}),e.jsx(s.Pre,{children:`class A {}
class B extends A {}
// instances delegate to .prototype
const b = new B();
Object.getPrototypeOf(b) === B.prototype;       // true
// prototype chain between classes
Object.getPrototypeOf(B.prototype) === A.prototype; // true
// constructor chain (for static 'super')
Object.getPrototypeOf(B) === A;                  // true`}),e.jsx("h2",{children:"Small extras"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"new.target"})," in a constructor tells which constructor was directly invoked (useful for abstract bases)."]}),e.jsx("li",{children:"Methods are non-enumerable by default; fields are enumerable own properties."})]}),e.jsx(s.Pre,{children:`class Base {
  constructor(){
    if (new.target === Base) throw new Error("abstract");
  }
}
class Impl extends Base {}
// new Base(); // throws
new Impl(); // ok`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Instance methods → ",e.jsx("code",{children:"C.prototype"}),"; ",e.jsx("code",{children:"static"})," → ",e.jsx("code",{children:"C"}),"."]}),e.jsxs("li",{children:["Call ",e.jsx("code",{children:"super()"})," before using ",e.jsx("code",{children:"this"})," in derived constructors."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"#private"})," for true encapsulation; not accessible outside."]}),e.jsx("li",{children:"Prefer prototype methods for shared logic; use arrow fields for auto-bound callbacks."}),e.jsx("li",{children:"Class declarations are in TDZ until evaluated; don't use before definition."}),e.jsxs("li",{children:["Subclass built-ins carefully; consider ",e.jsx("code",{children:"Symbol.species"})," for return types."]})]})]})]})}export{o as default};
