import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function PrototypeChain() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Prototype chain</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Every object has an internal <code>[[Prototype]]</code> link to another
                    object (or <code>null</code>). Property reads walk this <b>prototype chain</b> upward until
                    found or the end (<code>null</code>). Methods live on prototypes; instances delegate to them.
                </p>

                <h2>Reading & setting the prototype</h2>
                <ul>
                    <li><code>Object.getPrototypeOf(obj)</code> → current prototype (or <code>null</code>).</li>
                    <li><code>Object.setPrototypeOf(obj, proto)</code> → changes it (avoid in hot paths; deopts).</li>
                    <li>
                        Legacy <code>__proto__</code> getter/setter lives on <code>Object.prototype</code>; prefer the APIs above.
                    </li>
                    <li>Create with a specific proto: <code>Object.create(proto, descriptors?)</code>.</li>
                </ul>
                <Styled.Pre>{`const proto = { greet(){ return "hi"; } };
const o = Object.create(proto);
Object.getPrototypeOf(o) === proto; // true
o.greet();                          // "hi" (delegation)`}</Styled.Pre>

                <h2>Lookup rules (read / write / delete)</h2>
                <ul>
                    <li>
                        <b>Read:</b> if <code>obj</code> lacks an own property, JS looks up <code>[[Prototype]]</code> chain.
                    </li>
                    <li>
                        <b>Write:</b> assignment creates/updates an <b>own</b> property on the receiver, unless an
                        <i>inherited accessor setter</i> handles it.
                    </li>
                    <li>
                        <b>Delete:</b> only removes an <b>own</b> property; it won't affect inherited ones.
                    </li>
                </ul>
                <Styled.Pre>{`const base = { x: 1, set y(v){ this._y = v; } };
const obj  = Object.create(base);

obj.x;                 // 1 (found on base)
obj.x = 2;             // creates own 'x' (shadows base.x)
delete obj.x;          // removes own 'x'; base.x visible again (1)

obj.y = 10;            // calls inherited setter → writes obj._y = 10 (no own 'y' created)`}</Styled.Pre>

                <h2>Functions, constructors & instances</h2>
                <ul>
                    <li>
                        A function used as a constructor has a <code>.prototype</code> object. Instances created
                        with <code>new C()</code> have <code>[[Prototype]] === C.prototype</code>.
                    </li>
                    <li>
                        Methods you want shared by all instances should live on <code>C.prototype</code>.
                    </li>
                </ul>
                <Styled.Pre>{`function Counter(){ this.n = 0; }
Counter.prototype.inc = function(){ this.n++; };

const c = new Counter();
c.inc(); // uses method from Counter.prototype`}</Styled.Pre>

                <h2>Class syntax (sugar over prototypes)</h2>
                <ul>
                    <li>
                        <code>class</code> puts instance methods on <code>C.prototype</code>; <code>static</code> methods on the constructor <code>C</code>.
                    </li>
                    <li>
                        <code>extends</code> wires both chains: instances delegate to <code>Child.prototype</code> → <code>Parent.prototype</code>;
                        and the constructor chain <code>Child.__proto__ === Parent</code>.
                    </li>
                </ul>
                <Styled.Pre>{`class A { ping(){ return "A"; } static s(){ return "As"; } }
class B extends A { pong(){ return "B"; } }

const b = new B();
b.ping();  // from A.prototype
b.pong();  // from B.prototype
B.s();     // from A via constructor chain (B.__proto__ === A)`}</Styled.Pre>

                <h2>Chains for built-ins (typical)</h2>
                <Styled.Pre>{`const arr = [];
Object.getPrototypeOf(arr) === Array.prototype;        // true
Object.getPrototypeOf(Array.prototype) === Object.prototype; // true
Object.getPrototypeOf(Object.prototype) === null;      // true`}</Styled.Pre>

                <h2>Ownership & enumeration</h2>
                <ul>
                    <li><code>Object.hasOwn(obj, k)</code> checks only own keys. <code>k in obj</code> also sees prototypes.</li>
                    <li><code>for…in</code> iterates enumerable string keys including inherited; avoid on arrays/for data transforms.</li>
                    <li><code>Object.keys/values/entries</code> list own enumerable keys only.</li>
                </ul>
                <Styled.Pre>{`const p = { a:1 }; const o = Object.create(p); o.b = 2;
Object.hasOwn(o, "a");  // false
"a" in o;               // true (inherited)
Object.keys(o);         // ["b"]`}</Styled.Pre>

                <h2>Null-prototype objects (dictionary mode)</h2>
                <ul>
                    <li>
                        <code>Object.create(null)</code> makes an object with no prototype — no accidental collisions with
                        <code>toString</code>, etc.
                    </li>
                    <li>Use when you need a pure key→value map (or just use <code>Map</code>).</li>
                </ul>
                <Styled.Pre>{`const dict = Object.create(null);
dict["__proto__"]; // undefined (safe)
Object.getPrototypeOf(dict) === null; // true`}</Styled.Pre>

                <h2>Performance & safety notes</h2>
                <ul>
                    <li>Changing prototypes at runtime (<code>Object.setPrototypeOf</code> / <code>__proto__</code>) can deopt; prefer creating with the right proto up front.</li>
                    <li>Composition often beats inheritance: attach needed functions directly instead of deep chains.</li>
                    <li>
                        Don't confuse <code>this</code> binding with prototypes: <code>this</code> depends on the call-site, while method
                        lookup uses the prototype chain.
                    </li>
                </ul>

                <h2>Quick mental model</h2>
                <Styled.Pre>{`// read: obj.k ?
// 1) own? return it
// 2) else walk [[Prototype]]: proto.k ? return
// 3) keep walking until null → undefined`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Instances delegate to <code>Constructor.prototype</code>; classes are syntactic sugar over this.</li>
                    <li>Reads walk the chain; writes create/modify <b>own</b> props unless an inherited setter handles it.</li>
                    <li>Use <code>Object.create</code> to set prototypes; avoid <code>setPrototypeOf</code> in hot paths.</li>
                    <li>Use <code>Object.hasOwn</code> vs <code>in</code> depending on whether prototypes should count.</li>
                    <li>Null-prototype objects for dictionaries; consider <code>Map</code> for richer key types.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
