import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function Symbols() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Symbols</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Symbol</code> is a primitive for creating <b>unique</b> keys.
                    Every call to <code>Symbol()</code> makes a distinct value (even with the same description).
                    Ideal for “hidden” property keys and meta-protocols.
                </p>

                <h2>Create & basics</h2>
                <Styled.Pre>{`const s1 = Symbol("id");
const s2 = Symbol("id");
s1 === s2;                 // false (always unique)
String(s1);                // "Symbol(id)"
s1.description;            // "id"
typeof s1;                 // "symbol"
// new Symbol()            // ❌ TypeError (not a constructor)`}</Styled.Pre>

                <h2>As property keys (non-string keys)</h2>
                <ul>
                    <li>Use bracket syntax to define/read a symbol-keyed property.</li>
                    <li>Not listed by <code>Object.keys</code> or <code>for...in</code>.</li>
                </ul>
                <Styled.Pre>{`const KEY = Symbol("secret");
const obj = { [KEY]: 123, public: 1 };

Object.keys(obj);                 // ["public"]
Object.getOwnPropertySymbols(obj);// [KEY]
Reflect.ownKeys(obj);             // ["public", KEY]
obj[KEY];                         // 123`}</Styled.Pre>

                <h2>Global symbol registry</h2>
                <ul>
                    <li><code>Symbol.for(key)</code> returns the same shared symbol for that key.</li>
                    <li><code>Symbol.keyFor(sym)</code> gives the key for <i>registry</i> symbols.</li>
                </ul>
                <Styled.Pre>{`const a = Symbol.for("app.user");
const b = Symbol.for("app.user");
a === b;                          // true
Symbol.keyFor(a);                 // "app.user"
Symbol.keyFor(Symbol("x"));       // undefined (not in registry)`}</Styled.Pre>

                <h2>Well-known symbols (protocol hooks)</h2>
                <ul>
                    <li><b>iterator</b> - makes objects iterable.</li>
                    <li><b>toPrimitive</b> - customize coercion to number/string.</li>
                    <li><b>toStringTag</b> - label for <code>Object.prototype.toString</code>.</li>
                    <li><b>hasInstance</b> - customize <code>instanceof</code>.</li>
                    <li><b>species</b> - control constructor used by methods (e.g., <code>map</code>).</li>
                    <li><b>isConcatSpreadable</b> - control <code>concat</code> flattening.</li>
                </ul>
                <Styled.Pre>{`// iterator
const bag = { *[Symbol.iterator](){ yield 1; yield 2; } };
[...bag];                         // [1, 2]

// toPrimitive
const amt = {
  val: 5,
  [Symbol.toPrimitive](hint){ return hint === "string" ? "₹" + this.val : this.val; }
};
+amt;                             // 5
String(amt);                      // "₹5"

// toStringTag
const p = { [Symbol.toStringTag]: "Point" };
Object.prototype.toString.call(p);// "[object Point]"

// hasInstance
class Num {
  static [Symbol.hasInstance](v){ return typeof v === "number"; }
}
(3 instanceof Num);               // true

// species (method return type)
class List extends Array {
  static get [Symbol.species]() { return Array; }
}
new List(1,2).map(x=>x) instanceof Array; // true

// isConcatSpreadable (treat array-like as spreadable)
const like = { 0:"a", 1:"b", length:2, [Symbol.isConcatSpreadable]: true };
[].concat(like);                  // ["a","b"]`}</Styled.Pre>

                <h2>Enumeration & copying behavior</h2>
                <ul>
                    <li>Symbol keys are skipped by <code>Object.keys</code>, <code>for...in</code>, <code>JSON.stringify</code>.</li>
                    <li>Use <code>Object.getOwnPropertySymbols</code> or <code>Reflect.ownKeys</code> to read them.</li>
                    <li><code>Object.assign</code> and object <b>spread</b> <code>{`...obj`}</code> copy <b>enumerable</b> symbol keys.</li>
                </ul>

                <h2>JSON & serialization</h2>
                <ul>
                    <li><code>JSON.stringify</code> ignores symbol keys and values.</li>
                    <li>For persistence, map symbols to strings manually if needed.</li>
                </ul>

                <h2>Use cases</h2>
                <ul>
                    <li>Library “hidden” metadata: attach data without risking key collisions.</li>
                    <li>Enum-like unique tokens / sentinels (e.g., <code>const NONE = Symbol()</code>).</li>
                    <li>Opt-in protocol support via well-known symbols.</li>
                </ul>

                <h2>Notes & gotchas</h2>
                <ul>
                    <li>Symbols are <b>not security</b>: if someone holds the symbol value, they can access the property.</li>
                    <li>Prefer local <code>Symbol()</code> for privacy; use <code>Symbol.for</code> only for cross-module agreements.</li>
                    <li>When logging, use <code>sym.description</code> for readable output.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>Symbol()</code> → unique primitive; bracket access for keys.</li>
                    <li>Hidden from normal enumeration; fetch with <code>getOwnPropertySymbols</code> or <code>Reflect.ownKeys</code>.</li>
                    <li>Registry: <code>Symbol.for/keyFor</code> for shared symbols.</li>
                    <li>Leverage well-known symbols for iteration, coercion, branding, etc.</li>
                    <li>JSON ignores symbols; assign/spread copy enumerable symbol keys.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
