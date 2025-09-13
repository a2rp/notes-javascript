import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function ClassFields() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Class fields</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <i>Class fields</i> let you declare data on the instance or on the
                    constructor (static) directly inside the class body. They include <b>public fields</b>,
                    <b> #private fields</b>, <b>static</b> variants of both, and <b>static blocks</b> for
                    setup.
                </p>

                <h2>Public instance fields (own properties)</h2>
                <ul>
                    <li>Created per instance; live on the object itself (not on the prototype).</li>
                    <li>Enumerable and writable by default unless you freeze/seal later.</li>
                </ul>
                <Styled.Pre>{`class Counter {
  count = 0;                 // public field (per instance)
  label = "ctr";
  inc(){ this.count++; }     // method (on prototype)
}
const c = new Counter();
Object.hasOwn(c, "count");   // true
"inc" in c;                  // true (inherited from prototype)
`}</Styled.Pre>

                <h2>#Private instance fields</h2>
                <ul>
                    <li>Truly private; accessible only inside the class body that declares them.</li>
                    <li>Presence check: <code>#x in obj</code>. Not enumerable; not reachable by brackets.</li>
                </ul>
                <Styled.Pre>{`class Box {
  #x = 0;
  add(){ this.#x++; return this.#x; }
  hasX(obj){ return #x in obj; }   // presence test
}
const b = new Box();
b.add();                 // 1
// b.#x    // SyntaxError
// b["#x"] // undefined`}</Styled.Pre>

                <h2>Arrow field vs method</h2>
                <ul>
                    <li>
                        <b>Method</b> lives on the prototype (one function shared by all instances). <b>Dynamic this</b>.
                    </li>
                    <li>
                        <b>Arrow field</b> is created per instance and auto-binds to that instance (handy for callbacks).
                    </li>
                </ul>
                <Styled.Pre>{`class UI {
  clicks = 0;
  onClick = () => { this.clicks++; }; // per instance, auto-bound
  reset(){ this.clicks = 0; }         // shared on prototype
}
const u1 = new UI(), u2 = new UI();
u1.onClick === u2.onClick;  // false (different functions)
u1.reset === u2.reset;      // true  (same prototype method)`}</Styled.Pre>

                <h2>Static fields & static private fields</h2>
                <ul>
                    <li><b>static</b> lives on the constructor function (<code>ClassName</code>), not on instances.</li>
                    <li>Private static: <code>static #cache = new Map()</code>; accessible only inside the class.</li>
                </ul>
                <Styled.Pre>{`class Registry {
  static items = new Map();
  static #hits = 0;
  static get(id){ this.#hits++; return this.items.get(id); }
  static stats(){ return { size: this.items.size, hits: this.#hits }; }
}
Registry.items.set("a", 1);
Registry.get("a");
Registry.stats(); // { size:1, hits:1 }`}</Styled.Pre>

                <h2>Static blocks (one-time class init)</h2>
                <ul>
                    <li>Run once when the class is evaluated. Can read/write static fields, including private ones.</li>
                    <li>Useful for complex setup, try/catch, or conditional initialization.</li>
                </ul>
                <Styled.Pre>{`class Config {
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
}`}</Styled.Pre>

                <h2>Initialization order (important)</h2>
                <ul>
                    <li>
                        <b>Within a class</b>, fields are initialized in <b>textual order</b>.
                    </li>
                    <li>
                        <b>Derived classes:</b> you must call <code>super()</code> first. After <code>super()</code>, instance
                        field initializers run, then the rest of the constructor body executes.
                    </li>
                    <li>
                        <b>Base classes (no extends):</b> instance fields initialize at the start of construction, before the body runs.
                    </li>
                    <li><b>Static</b> fields/blocks run at class definition time, top-to-bottom.</li>
                </ul>
                <Styled.Pre>{`class A {
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
new B().trace; // ["A field","A ctor","B field","B ctor"] (illustrative)`}</Styled.Pre>

                <h2>Defaults & expressions</h2>
                <ul>
                    <li>Field initializers are normal expressions; they can reference earlier fields or call functions.</li>
                    <li>Avoid heavy work in initializers for performance; prefer lightweight defaults.</li>
                </ul>
                <Styled.Pre>{`class User {
  id = crypto.randomUUID();
  createdAt = new Date();
  prefs = { theme: "dark" };
}`}</Styled.Pre>

                <h2>Descriptors & enumerability</h2>
                <ul>
                    <li>Public fields become <b>own, enumerable, writable, configurable</b> data properties.</li>
                    <li>Methods are non-enumerable on the prototype.</li>
                    <li>Private fields are not properties; they're internal slots (not visible to descriptor APIs).</li>
                </ul>
                <Styled.Pre>{`class C { x = 1; m(){} }
const c = new C();
Object.getOwnPropertyDescriptor(c, "x");
// { value:1, writable:true, enumerable:true, configurable:true }
Object.getOwnPropertyDescriptor(C.prototype, "m").enumerable; // false`}</Styled.Pre>

                <h2>Gotchas</h2>
                <ul>
                    <li>In derived constructors, <b>never use</b> <code>this</code> before <code>super()</code>.</li>
                    <li>Arrow fields are convenient but increase memory (one function per instance).</li>
                    <li>Private names are lexical to the class; you must declare <code>#x</code> before using it in field initializers.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Public fields → own, enumerable; methods → prototype & non-enumerable.</li>
                    <li>#Private fields are truly private; use <code>#x in obj</code> for presence checks.</li>
                    <li>Static fields/blocks initialize at class definition time; instance fields after <code>super()</code> in derived classes.</li>
                    <li>Use arrow fields to auto-bind callbacks; prefer prototype methods for shared behavior.</li>
                    <li>Keep field initializers light; move heavy setup to the constructor or a factory.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
