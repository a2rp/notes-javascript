import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function Classes() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Classes</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>class</code> is syntax sugar over prototypes. Instance methods live on{" "}
                    <code>C.prototype</code>; <code>static</code> members live on the constructor <code>C</code>. Fields can be
                    public or <b>#private</b>.
                </p>

                <h2>Syntax essentials</h2>
                <Styled.Pre>{`class Counter {
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
Counter.ZERO;             // static → 0`}</Styled.Pre>

                <h2><code>#private</code> fields & methods</h2>
                <ul>
                    <li>Lexically declared; inaccessible outside the class body.</li>
                    <li>Not enumerable; not reachable via bracket access or <code>in</code>.</li>
                </ul>
                <Styled.Pre>{`class Box {
  #x = 0;
  #bump(){ this.#x++; }
  add(){ this.#bump(); return this.#x; }
}
const b = new Box();
b.add();      // 1
// b.#x;      // SyntaxError
// b["#x"];   // undefined (normal string key, not the private slot)`}</Styled.Pre>

                <h2>Inheritance: <code>extends</code> & <code>super</code></h2>
                <ul>
                    <li>Subclass must call <code>super()</code> before using <code>this</code> in the constructor.</li>
                    <li><code>super.m()</code> calls the parent prototype's method.</li>
                    <li><code>static</code> members can also use <code>super</code> (constructor chain).</li>
                </ul>
                <Styled.Pre>{`class Animal {
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
Dog.kind();      // "animal → dog"`}</Styled.Pre>

                <h2>Extending built-ins</h2>
                <ul>
                    <li>Works for modern engines; subclassing preserves internals (e.g., Array length).</li>
                    <li>Many array methods return the subclass; customize with <code>Symbol.species</code>.</li>
                </ul>
                <Styled.Pre>{`class List extends Array {
  first(){ return this[0]; }
  static get [Symbol.species]() { return Array; } // make methods like .map() return Array
}
const L = new List(1,2,3);
L.first();             // 1
L.map(x => x*2) instanceof Array; // true (because species → Array)`}</Styled.Pre>

                <h2>Class expressions & names</h2>
                <ul>
                    <li>Classes can be expressions; the inner name is local to the class body.</li>
                    <li>Class declarations are hoisted but in a <b>TDZ</b>; can't use before definition.</li>
                </ul>
                <Styled.Pre>{`const C = class Inner {
  id(){ return Inner.name; } // ok inside
};
// new Inner(); // ReferenceError outside
// Using before declaration → ReferenceError (TDZ)`}</Styled.Pre>

                <h2><code>this</code> & method binding</h2>
                <ul>
                    <li>Prototype methods have dynamic <code>this</code> (depends on call-site).</li>
                    <li>Arrow fields are bound to the instance (useful for callbacks/React handlers), but they create a new function per instance.</li>
                    <li>Prefer prototype methods for shared behavior; use arrow fields sparingly for auto-binding.</li>
                </ul>
                <Styled.Pre>{`class UI {
  clicks = 0;
  // auto-bound handler:
  onClick = () => { this.clicks++; };

  // prototype method (not bound):
  reset(){ this.clicks = 0; }
}`}</Styled.Pre>

                <h2>Prototype wiring (facts)</h2>
                <Styled.Pre>{`class A {}
class B extends A {}
// instances delegate to .prototype
const b = new B();
Object.getPrototypeOf(b) === B.prototype;       // true
// prototype chain between classes
Object.getPrototypeOf(B.prototype) === A.prototype; // true
// constructor chain (for static 'super')
Object.getPrototypeOf(B) === A;                  // true`}</Styled.Pre>

                <h2>Small extras</h2>
                <ul>
                    <li><code>new.target</code> in a constructor tells which constructor was directly invoked (useful for abstract bases).</li>
                    <li>Methods are non-enumerable by default; fields are enumerable own properties.</li>
                </ul>
                <Styled.Pre>{`class Base {
  constructor(){
    if (new.target === Base) throw new Error("abstract");
  }
}
class Impl extends Base {}
// new Base(); // throws
new Impl(); // ok`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Instance methods → <code>C.prototype</code>; <code>static</code> → <code>C</code>.</li>
                    <li>Call <code>super()</code> before using <code>this</code> in derived constructors.</li>
                    <li>Use <b>#private</b> for true encapsulation; not accessible outside.</li>
                    <li>Prefer prototype methods for shared logic; use arrow fields for auto-bound callbacks.</li>
                    <li>Class declarations are in TDZ until evaluated; don't use before definition.</li>
                    <li>Subclass built-ins carefully; consider <code>Symbol.species</code> for return types.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
