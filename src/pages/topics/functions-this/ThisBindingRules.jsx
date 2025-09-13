import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function ThisBindingRules() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>this binding rules</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>this</code> is set by the <b>call-site</b> (how a function is
                    invoked), not where it's defined. Arrows are the exception: they capture lexical{" "}
                    <code>this</code>.
                </p>

                <h2>Four binding rules (priority)</h2>
                <ol>
                    <li><b>new</b> — constructor call: <code>new Fn()</code> makes a fresh <code>this</code>.</li>
                    <li>
                        <b>Explicit</b> — <code>call/apply/bind</code> set <code>this</code> to what you pass.
                    </li>
                    <li>
                        <b>Implicit</b> — <code>obj.method()</code> binds <code>this === obj</code> (receiver).
                    </li>
                    <li>
                        <b>Default</b> — plain call: <code>Fn()</code>. In modules/strict:{" "}
                        <code>this === undefined</code>; otherwise global object.
                    </li>
                </ol>

                <h2>Arrow functions (special)</h2>
                <ul>
                    <li>Arrows don't have their own <code>this</code>; they close over the <i>outer</i> one.</li>
                    <li><code>call/apply/bind</code> can't change an arrow's <code>this</code>.</li>
                </ul>

                <h2>Tiny examples</h2>
                <Styled.Pre>{`// 1) new
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
ctx.go();                   // 1  (arrow captured ctx)`}</Styled.Pre>

                <h2>Precedence notes</h2>
                <ul>
                    <li><b>new</b> beats <b>explicit</b>: <code>new (who.bind(x))()</code> makes a fresh <code>this</code> (binding target ignored).</li>
                    <li><b>Explicit</b> beats <b>implicit</b>: <code>obj.who.call(other)</code> → <code>this === other</code>.</li>
                </ul>

                <h2>Common gotchas</h2>
                <ul>
                    <li>
                        <b>Method extraction:</b> <code>const fn = obj.method</code> loses the receiver. Fix with{" "}
                        <code>fn.call(obj,...)</code> or <code>const fn = obj.method.bind(obj)</code>.
                    </li>
                    <li>
                        <b>Callbacks:</b> passing methods to <code>setTimeout</code> / libraries loses{" "}
                        <code>this</code>. Use <code>bind</code> or an arrow wrapper.
                    </li>
                    <li>
                        <b>Event handlers (DOM):</b> in a normal function listener, <code>this</code> is the
                        element; in an arrow, use <code>e.currentTarget</code> instead of <code>this</code>.
                    </li>
                    <li>
                        <b>Class fields:</b> arrow instance fields auto-bind to the instance; prototype methods
                        do not.
                    </li>
                </ul>

                <Styled.Pre>{`// Lost 'this' in a callback → fix with bind or arrow
class Counter {
  count = 0;
  inc(){ this.count++; }

  start() {
    setTimeout(this.inc.bind(this), 0);      // ✅ bind
    setTimeout(() => this.inc(), 0);         // ✅ arrow wrapper
  }
}`}</Styled.Pre>

                <h2>this in modules, functions, classes</h2>
                <ul>
                    <li>Top-level in ES modules: <code>this === undefined</code>.</li>
                    <li>Inside class methods: <code>this</code> is the instance (when called as <code>obj.m()</code>).</li>
                    <li>Inside function declarations/expressions: depends on call-site rules above.</li>
                </ul>

                <h2>Patterns (practical)</h2>
                <ul>
                    <li>Use <b>arrow fields</b> for React/handlers to avoid manual <code>bind</code>.</li>
                    <li>For utility functions, pass the object explicitly instead of relying on <code>this</code>.</li>
                    <li>Avoid storing <code>this</code> in <code>self = this</code>; arrows are cleaner.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Decide by call-site: <b>new → explicit → implicit → default</b>. Arrows are lexical.</li>
                    <li>Extracted methods lose their receiver — bind or wrap.</li>
                    <li>Arrows ignore <code>call/apply/bind</code> for <code>this</code>; use them when you want outer <code>this</code>.</li>
                    <li>Module/global differences: top-level <code>this</code> is <code>undefined</code> in modules.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
