import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function ArrowFunctions() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>Arrow functions</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Concise function syntax with a <b>lexical</b> (captured){" "}
                    <code>this</code>. Arrows don't have their own <code>this</code>,{" "}
                    <code>arguments</code>, <code>super</code>, or <code>new.target</code>, and they're not
                    constructible.
                </p>

                <h2>Syntax essentials</h2>
                <Styled.Pre>{`const inc = x => x + 1;         // single param, implicit return
const pair = (a, b) => ({ a, b }); // return object → wrap in ( )
const none = () => 42;             // zero params
const block = (x) => {             // block body needs 'return'
  const y = x * 2;
  return y;
};
const rest = (...args) => args;    // use rest instead of 'arguments'
const asyncLoad = async () => (await fetch("/api")).ok;`}</Styled.Pre>

                <h2>Lexical <code>this</code> (biggest difference)</h2>
                <ul>
                    <li>Arrows capture <code>this</code> from the surrounding scope; <code>call/apply/bind</code> cannot change it.</li>
                    <li>Great for callbacks where you want the outer <code>this</code> (e.g., inside class methods).</li>
                </ul>
                <Styled.Pre>{`const obj = {
  n: 0,
  incLater() {
    setTimeout(() => { this.n++; }, 0);  // 'this' is obj ✅
  },
  bad() {
    setTimeout(function(){ this.n++; }, 0); // 'this' is global/undefined ❌
  }
};`}</Styled.Pre>

                <Styled.Pre>{`// call/apply/bind can't rebind 'this' of an arrow:
const outerThis = this;
const getThis = () => this;
getThis.call({ x: 1 }) === outerThis; // true
// 'bind' still works for partial args (not for 'this')`}</Styled.Pre>

                <h2>Not a constructor, no prototype</h2>
                <Styled.Pre>{`const A = () => {};
// new A();                    // TypeError ❌
A.prototype;                    // undefined`}</Styled.Pre>

                <h2>No own <code>arguments</code></h2>
                <Styled.Pre>{`const f = () => arguments; // resolves to outer scope; often ReferenceError
// Prefer rest:
const g = (...args) => args; g(1,2); // [1,2]`}</Styled.Pre>

                <h2>Methods vs arrows (choose correctly)</h2>
                <ul>
                    <li>Object/class <b>methods</b> should usually be normal functions (need dynamic <code>this</code>).</li>
                    <li>Inside a class, <b>instance fields with arrows</b> are handy to auto-bind callbacks.</li>
                </ul>
                <Styled.Pre>{`// Class pattern
class Counter {
  count = 0;
  // auto-bound to each instance:
  inc = () => { this.count++; };
  // method (good when you don't need binding):
  reset(){ this.count = 0; }
}`}</Styled.Pre>

                <h2>Common pitfalls</h2>
                <ul>
                    <li>Returning an object with implicit return requires parentheses: <code>{`x => ({x})`}</code>.</li>
                    <li>Don't use arrows for event handlers if you rely on element-bound <code>this</code> — use the event object instead (<code>e.currentTarget</code>).</li>
                    <li>Arrows can't be generators (<code>yield</code> not allowed).</li>
                </ul>
                <Styled.Pre>{`// Event handler: prefer event.currentTarget over 'this'
button.addEventListener("click", (e) => {
  e.currentTarget.classList.add("active");
});`}</Styled.Pre>

                <h2>When to use arrows</h2>
                <ul>
                    <li>Inline callbacks: <code>map/filter/reduce</code>, Promises, timers.</li>
                    <li>Closures that should “remember” the surrounding <code>this</code>.</li>
                    <li>Instance fields in classes to avoid manual <code>bind</code> in constructors.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Lexical <code>this</code>; <code>call/apply/bind</code> won't change it.</li>
                    <li>No own <code>arguments</code> — use rest params.</li>
                    <li>Not constructible; no <code>prototype</code>.</li>
                    <li>Implicit return only for single expressions; wrap objects in <code>( )</code>.</li>
                    <li>Use normal methods when you need a dynamic <code>this</code> or want the function on the prototype.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
