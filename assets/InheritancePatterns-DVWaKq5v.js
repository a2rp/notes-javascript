import{j as e}from"./index-COrpvOC4.js";import{S as s,O as t}from"./index-BMvjhO8Z.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:t}),e.jsx(s.Heading,{children:"Inheritance patterns"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," “Inheritance” in JS is ",e.jsx("i",{children:"delegation"}),": objects point to other objects via the prototype chain. You can model reuse with ",e.jsx("b",{children:"classes (sugar)"}),","," ",e.jsx("b",{children:"prototype delegation"}),", or ",e.jsx("b",{children:"mixins"}),". Prefer ",e.jsx("b",{children:"composition over deep inheritance"}),"."]}),e.jsx("h2",{children:"Menu of options"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Classes (ES2015+):"})," ergonomic syntax for prototype chains."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prototype delegation:"})," build objects with chosen prototypes (",e.jsx("code",{children:"Object.create"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mixins:"})," copy reusable methods into a target (via ",e.jsx("code",{children:"Object.assign"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Old ES5 “classical”:"})," constructor functions + ",e.jsx("code",{children:"Object.create"}),"."]})]}),e.jsx("h2",{children:"1) Class-based (recommended for hierarchies)"}),e.jsx(s.Pre,{children:`class Animal {
  constructor(name){ this.name = name; }
  speak(){ return this.name + " makes a noise"; }
  static kind(){ return "animal"; }
}
class Dog extends Animal {
  constructor(name){ super(name); }            // must call super() before using 'this'
  speak(){ return super.speak() + " (woof)"; } // super resolves on prototype chain
}

const d = new Dog("Rex");
d.speak();       // "Rex makes a noise (woof)"
Dog.kind();      // "animal" (constructor chain Dog.__proto__ === Animal)

// Chain facts:
Object.getPrototypeOf(Dog.prototype) === Animal.prototype; // true
Object.getPrototypeOf(Dog) === Animal;                     // true`}),e.jsx("h2",{children:"2) Prototype delegation (no classes)"}),e.jsx("p",{children:"Compose behavior by choosing a prototype up-front; great for small, flat designs."}),e.jsx(s.Pre,{children:`const CanSpeak = {
  speak(){ return this.name + " speaks"; }
};

function makeUser(name){
  const obj = Object.create(CanSpeak); // delegate to capability object
  obj.name = name;
  return obj;
}

const u = makeUser("Ada");
u.speak();            // "Ada speaks" (method lives on CanSpeak)`}),e.jsx("h2",{children:"3) Mixins (copy methods in)"}),e.jsxs("p",{children:["Use when you want methods ",e.jsx("i",{children:"on"})," the object/prototype (not via delegation)."]}),e.jsx(s.Pre,{children:`const Talk = { talk(){ return "talking"; } };
const Walk = { walk(){ return "walking"; } };

class Robot {}
Object.assign(Robot.prototype, Talk, Walk); // shallow copy of methods

new Robot().walk();  // "walking"`}),e.jsx("h2",{children:"4) ES5 “classical” (constructor functions)"}),e.jsxs("p",{children:["For older codebases or when avoiding ",e.jsx("code",{children:"class"})," syntax."]}),e.jsx(s.Pre,{children:`function Animal(name){ this.name = name; }
Animal.prototype.speak = function(){ return this.name + " noise"; };

function Dog(name){
  Animal.call(this, name); // "super()" for state
}
Dog.prototype = Object.create(Animal.prototype, {
  constructor: { value: Dog, writable: true, configurable: true }
});
Dog.prototype.speak = function(){
  return Animal.prototype.speak.call(this) + " (woof)";
};`}),e.jsx("h2",{children:"Override vs shadow (write behavior)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Override:"})," define the same method name on the child prototype (read hits child first)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shadow (data):"})," assigning ",e.jsx("code",{children:"obj.x = …"})," creates an ",e.jsx("i",{children:"own"})," prop that hides inherited ",e.jsx("code",{children:"x"}),"."]})]}),e.jsx(s.Pre,{children:`const base = { x: 1, m(){ return "base"; } };
const obj  = Object.create(base);
obj.x = 2;          // shadows base.x
obj.m = function(){ return "child"; }; // overrides method
obj.x;  // 2
obj.m(); // "child"`}),e.jsx("h2",{children:"Multiple inheritance?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["JS prototypes are ",e.jsx("b",{children:"single"}),"-chain. To combine behaviors, use ",e.jsx("b",{children:"mixins"})," or composition."]}),e.jsx("li",{children:"Avoid deep/diamond hierarchies—keep chains shallow and behaviors isolated."})]}),e.jsx("h2",{children:"Gotchas & rules"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Classes:"})," call ",e.jsx("code",{children:"super()"})," in subclass constructor before using ",e.jsx("code",{children:"this"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Arrow methods in classes:"})," instance fields (e.g., ",e.jsx("code",{children:"m = () => …"}),") are per-instance; prefer prototype methods for shared behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ES5:"})," reset ",e.jsx("code",{children:"constructor"})," after setting prototype; use ",e.jsx("code",{children:"Parent.call(this,…)"})," to initialize state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," avoid ",e.jsx("code",{children:"Object.setPrototypeOf"})," after creation—create with the right proto."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Super in non-classes:"})," there’s no ",e.jsx("code",{children:"super"}),"; call parent method explicitly with ",e.jsx("code",{children:"Parent.prototype.fn.call(this,…)"}),"."]})]}),e.jsx("h2",{children:"Composition > inheritance (practical tip)"}),e.jsx(s.Pre,{children:`// Instead of deep class trees, compose capabilities:
const WithTimestamps = (o) => Object.assign(o, {
  createdAt: new Date(),
  touch(){ this.updatedAt = new Date(); }
});
const WithId = (o) => Object.assign(o, { id: crypto.randomUUID() });

const createNote = (title) => WithId(WithTimestamps({ title }));`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Classes = cleaner syntax over prototypes; ",e.jsx("code",{children:"extends"})," wires both instance and constructor chains."]}),e.jsxs("li",{children:["Prototype delegation (",e.jsx("code",{children:"Object.create"}),") is simple and powerful for flat designs."]}),e.jsx("li",{children:"Mixins copy methods; beware name collisions and shallow copy."}),e.jsxs("li",{children:["In ES5-style, use ",e.jsx("code",{children:"Parent.call(this)"})," and reset ",e.jsx("code",{children:"constructor"})," after ",e.jsx("code",{children:"Object.create"}),"."]}),e.jsx("li",{children:"Favor composition; keep inheritance shallow and purposeful."})]})]})]})}export{c as default};
