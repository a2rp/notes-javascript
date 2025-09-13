import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function Encapsulation() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Encapsulation</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Encapsulation hides internal state/implementation and exposes a small, stable API.
                    In JS you can do this with <b>closures</b>, <b>#private class fields</b>, <b>WeakMap</b>, symbols,
                    and descriptor/immutability tricks.
                </p>

                <h2>1) Closure-based modules (factory pattern)</h2>
                <ul>
                    <li>State lives in the function's scope; only returned methods can access it.</li>
                    <li>Hard privacy (can't be reached from outside).</li>
                </ul>
                <Styled.Pre>{`function createCounter(n = 0){
  let count = n;                // private via closure
  return {
    inc(){ count++; },
    get value(){ return count; }
  };
}
const c = createCounter();
c.count;        // undefined
c.inc(); c.value; // 1`}</Styled.Pre>

                <h2>2) Class with <code>#private</code> fields (hard privacy)</h2>
                <ul>
                    <li>Truly private; not enumerable, not accessible by brackets/reflection.</li>
                    <li>Use <code>#x in obj</code> for presence checks.</li>
                </ul>
                <Styled.Pre>{`class Counter {
  #count = 0;
  inc(){ this.#count++; }
  get value(){ return this.#count; }
}
const c2 = new Counter();
// c2.#count; // SyntaxError (private)
c2.inc(); c2.value; // 1`}</Styled.Pre>

                <h2>3) WeakMap privacy (pre-# alternative)</h2>
                <ul>
                    <li>Data stored off-object; keys are instances; memory-safe via GC.</li>
                </ul>
                <Styled.Pre>{`const _priv = new WeakMap();
class User {
  constructor(name){
    _priv.set(this, { name });
  }
  get name(){ return _priv.get(this).name; }
}
new User("Ada").name; // "Ada"`}</Styled.Pre>

                <h2>4) Symbols & non-enumerable props (soft privacy)</h2>
                <ul>
                    <li>Not truly hidden; just harder to collide/enumerate.</li>
                </ul>
                <Styled.Pre>{`const SECRET = Symbol("secret");
const obj = {};
Object.defineProperty(obj, SECRET, { value: 42, enumerable: false });
Object.keys(obj);          // []
obj[SECRET];               // 42 (still reachable if you have the symbol)`}</Styled.Pre>

                <h2>5) API shaping with descriptors & immutability</h2>
                <ul>
                    <li>Use <code>Object.defineProperty</code> to make fields read-only or hidden.</li>
                    <li>Use <code>Object.freeze</code> / <code>seal</code> on public objects to prevent accidental mutation (shallow).</li>
                </ul>
                <Styled.Pre>{`const makePoint = (x, y) => {
  const p = {};
  Object.defineProperty(p, "x", { value: x, writable: false, enumerable: true });
  Object.defineProperty(p, "y", { value: y, writable: false, enumerable: true });
  return Object.freeze(p); // cannot add/remove/modify own data props (shallow)
};`}</Styled.Pre>

                <h2>6) Proxies for controlled access (guards/logging)</h2>
                <ul>
                    <li>Intercept get/set to validate or deny access; still not a privacy boundary by itself.</li>
                </ul>
                <Styled.Pre>{`const guarded = new Proxy(createCounter(), {
  set(){ throw new Error("read-only"); }
});
guarded.value; // ok
// guarded.value = 10; // throws`}</Styled.Pre>

                <h2>Choosing a technique</h2>
                <ul>
                    <li><b>Library/public API:</b> prefer #private or closures for hard privacy.</li>
                    <li><b>App code:</b> often enough to freeze exposed shapes and keep state local.</li>
                    <li><b>Share methods across instances?</b> classes/prototypes; need per-instance hidden state? #private/WeakMap.</li>
                </ul>

                <h2>Gotchas</h2>
                <ul>
                    <li>Closures can keep large objects alive → beware leaks; null out references when done.</li>
                    <li><code>Object.freeze</code> is shallow; deeply nested objects remain mutable unless also frozen (or use <code>structuredClone</code> then freeze).</li>
                    <li>#Private fields are not serialized (JSON ignores them) and are invisible to reflection APIs.</li>
                    <li>Symbols aren't secure; if the symbol is shared/imported, consumers can read it.</li>
                </ul>

                <h2>Small patterns</h2>
                <Styled.Pre>{`// 1) Public tiny surface, private heavy impl
function createService(deps){
  const state = new Map();     // private
  function get(id){ return state.get(id); }
  function set(id, v){ state.set(id, v); }
  return Object.freeze({ get, set }); // expose only what you need
}

// 2) Readonly view
const asReadonly = (obj) => new Proxy(obj, {
  set(){ return false; }, defineProperty(){ return false; }, deleteProperty(){ return false; }
});`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>Hard privacy:</b> closures, module scope, <code>#private</code>, WeakMap.</li>
                    <li><b>Soft privacy:</b> symbols, non-enumerable props, naming conventions (<code>_x</code>).</li>
                    <li>Freeze public API objects; keep mutable implementation details inside closures/privates.</li>
                    <li>Prefer composition; expose a minimal, intention-revealing surface.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
