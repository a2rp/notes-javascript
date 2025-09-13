import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function InheritancePatterns() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Inheritance patterns</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> “Inheritance” in JS is <i>delegation</i>: objects point to other
                    objects via the prototype chain. You can model reuse with <b>classes (sugar)</b>,{" "}
                    <b>prototype delegation</b>, or <b>mixins</b>. Prefer <b>composition over deep inheritance</b>.
                </p>

                <h2>Menu of options</h2>
                <ul>
                    <li><b>Classes (ES2015+):</b> ergonomic syntax for prototype chains.</li>
                    <li><b>Prototype delegation:</b> build objects with chosen prototypes (<code>Object.create</code>).</li>
                    <li><b>Mixins:</b> copy reusable methods into a target (via <code>Object.assign</code>).</li>
                    <li><b>Old ES5 “classical”:</b> constructor functions + <code>Object.create</code>.</li>
                </ul>

                <h2>1) Class-based (recommended for hierarchies)</h2>
                <Styled.Pre>{`class Animal {
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
Object.getPrototypeOf(Dog) === Animal;                     // true`}</Styled.Pre>

                <h2>2) Prototype delegation (no classes)</h2>
                <p>Compose behavior by choosing a prototype up-front; great for small, flat designs.</p>
                <Styled.Pre>{`const CanSpeak = {
  speak(){ return this.name + " speaks"; }
};

function makeUser(name){
  const obj = Object.create(CanSpeak); // delegate to capability object
  obj.name = name;
  return obj;
}

const u = makeUser("Ada");
u.speak();            // "Ada speaks" (method lives on CanSpeak)`}</Styled.Pre>

                <h2>3) Mixins (copy methods in)</h2>
                <p>Use when you want methods <i>on</i> the object/prototype (not via delegation).</p>
                <Styled.Pre>{`const Talk = { talk(){ return "talking"; } };
const Walk = { walk(){ return "walking"; } };

class Robot {}
Object.assign(Robot.prototype, Talk, Walk); // shallow copy of methods

new Robot().walk();  // "walking"`}</Styled.Pre>

                <h2>4) ES5 “classical” (constructor functions)</h2>
                <p>For older codebases or when avoiding <code>class</code> syntax.</p>
                <Styled.Pre>{`function Animal(name){ this.name = name; }
Animal.prototype.speak = function(){ return this.name + " noise"; };

function Dog(name){
  Animal.call(this, name); // "super()" for state
}
Dog.prototype = Object.create(Animal.prototype, {
  constructor: { value: Dog, writable: true, configurable: true }
});
Dog.prototype.speak = function(){
  return Animal.prototype.speak.call(this) + " (woof)";
};`}</Styled.Pre>

                <h2>Override vs shadow (write behavior)</h2>
                <ul>
                    <li><b>Override:</b> define the same method name on the child prototype (read hits child first).</li>
                    <li><b>Shadow (data):</b> assigning <code>obj.x = …</code> creates an <i>own</i> prop that hides inherited <code>x</code>.</li>
                </ul>
                <Styled.Pre>{`const base = { x: 1, m(){ return "base"; } };
const obj  = Object.create(base);
obj.x = 2;          // shadows base.x
obj.m = function(){ return "child"; }; // overrides method
obj.x;  // 2
obj.m(); // "child"`}</Styled.Pre>

                <h2>Multiple inheritance?</h2>
                <ul>
                    <li>JS prototypes are <b>single</b>-chain. To combine behaviors, use <b>mixins</b> or composition.</li>
                    <li>Avoid deep/diamond hierarchies—keep chains shallow and behaviors isolated.</li>
                </ul>

                <h2>Gotchas & rules</h2>
                <ul>
                    <li><b>Classes:</b> call <code>super()</code> in subclass constructor before using <code>this</code>.</li>
                    <li><b>Arrow methods in classes:</b> instance fields (e.g., <code>m = () =&gt; …</code>) are per-instance; prefer prototype methods for shared behavior.</li>
                    <li><b>ES5:</b> reset <code>constructor</code> after setting prototype; use <code>Parent.call(this,…)</code> to initialize state.</li>
                    <li><b>Performance:</b> avoid <code>Object.setPrototypeOf</code> after creation—create with the right proto.</li>
                    <li><b>Super in non-classes:</b> there’s no <code>super</code>; call parent method explicitly with <code>Parent.prototype.fn.call(this,…)</code>.</li>
                </ul>

                <h2>Composition &gt; inheritance (practical tip)</h2>
                <Styled.Pre>{`// Instead of deep class trees, compose capabilities:
const WithTimestamps = (o) => Object.assign(o, {
  createdAt: new Date(),
  touch(){ this.updatedAt = new Date(); }
});
const WithId = (o) => Object.assign(o, { id: crypto.randomUUID() });

const createNote = (title) => WithId(WithTimestamps({ title }));`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Classes = cleaner syntax over prototypes; <code>extends</code> wires both instance and constructor chains.</li>
                    <li>Prototype delegation (<code>Object.create</code>) is simple and powerful for flat designs.</li>
                    <li>Mixins copy methods; beware name collisions and shallow copy.</li>
                    <li>In ES5-style, use <code>Parent.call(this)</code> and reset <code>constructor</code> after <code>Object.create</code>.</li>
                    <li>Favor composition; keep inheritance shallow and purposeful.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
