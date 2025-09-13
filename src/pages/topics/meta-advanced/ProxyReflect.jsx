import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

export default function ProxyReflect() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />

            <Styled.Heading>Proxy & Reflect</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Proxy(target, handler)</code> lets you intercept fundamental
                    operations (get, set, call, new, property ops…). <code>Reflect.*</code> mirrors the
                    language's internal operations and is ideal for forwarding inside traps.
                </p>

                <h2>Quick start</h2>
                <Styled.Pre>{`const user = { name: "Ada", age: 36 };
const p = new Proxy(user, {
  get(t, k, r){ console.log("get", k); return Reflect.get(t, k, r); },
  set(t, k, v, r){ console.log("set", k, v); return Reflect.set(t, k, v, r); }
});
p.name;         // logs "get name"
p.age = 37;     // logs "set age 37"`}</Styled.Pre>

                <h2>Common traps</h2>
                <ul>
                    <li><b>get / set</b> — property access/assign; mind the <i>receiver</i> for <code>this</code> binding.</li>
                    <li><b>has</b> — <code>k in obj</code>.</li>
                    <li><b>ownKeys</b> — <code>Object.keys</code>, spread, <code>Reflect.ownKeys</code>.</li>
                    <li><b>defineProperty / deleteProperty</b> — define/delete ops.</li>
                    <li><b>getPrototypeOf / setPrototypeOf / isExtensible / preventExtensions</b>.</li>
                    <li><b>apply</b> — calling a function; <b>construct</b> — with <code>new</code>.</li>
                </ul>

                <h2>Use Reflect to forward</h2>
                <p>Forward with <code>Reflect.*</code> to preserve default semantics & return types.</p>
                <Styled.Pre>{`const logged = new Proxy(fn, {
  apply(t, thisArg, args){
    console.time("fn"); try { return Reflect.apply(t, thisArg, args); }
    finally { console.timeEnd("fn"); }
  }
});`}</Styled.Pre>

                <h2>Validation / guarding</h2>
                <Styled.Pre>{`const person = new Proxy({}, {
  set(t, k, v, r){
    if (k === "age" && !Number.isInteger(v)) throw new TypeError("age int");
    return Reflect.set(t, k, v, r);
  }
});
person.age = 40;        // ok
// person.age = "40";   // throws`}</Styled.Pre>

                <h2>Readonly-ish wrapper</h2>
                <Styled.Pre>{`const readonly = (obj) => new Proxy(obj, {
  set(){ return false; },
  defineProperty(){ return false; },
  deleteProperty(){ return false; },
});
const cfg = readonly({ api: "/v1" });
// cfg.api = "/v2";  // silently fails (or throws in strict mode)`}</Styled.Pre>

                <h2>Negative indices for arrays</h2>
                <Styled.Pre>{`const withNegIndex = (arr) => new Proxy(arr, {
  get(t, k, r){
    if (typeof k === "string" && /^-\\d+$/.test(k)){
      k = t.length + Number(k); // -1 -> last
    }
    return Reflect.get(t, k, r);
  }
});
const a = withNegIndex([10,20,30]);
a[-1]; // 30`}</Styled.Pre>

                <h2>Revocable proxies</h2>
                <Styled.Pre>{`const { proxy, revoke } = Proxy.revocable({ secret: 123 }, {});
proxy.secret; // 123
revoke();
// proxy.secret; // TypeError: revoked`}</Styled.Pre>

                <h2>Receiver & <code>this</code> gotcha</h2>
                <p>
                    Methods retrieved via a proxy get <code>this</code>=<b>receiver</b> (the proxy), not the target.
                    Use the 3rd arg to <code>Reflect.get</code> to control it.
                </p>
                <Styled.Pre>{`const target = {
  x: 1,
  getX(){ return this.x; }
};
const proxy = new Proxy(target, {
  get(t, k, r){ return Reflect.get(t, k, r); } // r = proxy → this == proxy
});
proxy.x = 2;
proxy.getX(); // 2 (this === proxy), could differ from target.x`}</Styled.Pre>

                <h2>Invariants (must respect)</h2>
                <ul>
                    <li>Can't report a property as existing/rewritable if target says otherwise (e.g., a non-configurable prop).</li>
                    <li><code>ownKeys</code> must include all non-configurable keys of the target.</li>
                    <li>Violating invariants throws a <code>TypeError</code>.</li>
                </ul>

                <h2>Reflect essentials (mirror ops)</h2>
                <Styled.Pre>{`Reflect.get(obj, key, receiver?);
Reflect.set(obj, key, value, receiver?);          // -> boolean
Reflect.has(obj, key);                             // "in"
Reflect.ownKeys(obj);                              // string & symbol keys
Reflect.defineProperty(obj, key, desc);            // -> boolean
Reflect.deleteProperty(obj, key);                  // -> boolean
Reflect.apply(fn, thisArg, argsArray);
Reflect.construct(Ctor, args, newTarget?);`}</Styled.Pre>

                <h2>Patterns & notes</h2>
                <ul>
                    <li>Use <b>WeakMap</b> to hold private state; expose safe view via Proxy.</li>
                    <li>Proxies change identity (<code>proxy !== target</code>); don't mix as Map keys unless intended.</li>
                    <li>Overhead exists; avoid proxies in tight hot paths.</li>
                    <li>JSON/stringify uses traps like <code>get</code> (and <code>toJSON</code>); behavior is observable.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Create with <code>new Proxy(target, handler)</code>; forward with <code>Reflect.*</code>.</li>
                    <li>Traps: get/set/has/ownKeys/defineProperty/deleteProperty/apply/construct…</li>
                    <li>Respect engine <b>invariants</b> or you'll get <code>TypeError</code>.</li>
                    <li>Mind <b>receiver</b> for correct <code>this</code> binding in methods.</li>
                    <li>Use <b>revocable</b> proxies for resources that must be invalidated.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
