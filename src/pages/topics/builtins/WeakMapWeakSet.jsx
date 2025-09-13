import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function WeakMapWeakSet() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>WeakMap / WeakSet</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>WeakMap</code> and <code>WeakSet</code> hold <b>weak references</b> to their object
                    keys/items. If the only remaining reference to an object is from a weak collection, it can be
                    <b> garbage-collected</b>. They are not enumerable (no size/iteration).
                </p>

                <h2>WeakMap (object → value)</h2>
                <ul>
                    <li>Keys must be non-null <b>objects</b>. Values can be anything.</li>
                    <li>APIs: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>.</li>
                    <li>No <code>size</code>, no <code>keys()</code>, no iteration (by design).</li>
                </ul>
                <Styled.Pre>{`const wm = new WeakMap();
const obj = {};
wm.set(obj, { meta: 1 });
wm.get(obj);     // { meta: 1 }
wm.has(obj);     // true
wm.delete(obj);  // true
// If 'obj' becomes unreachable elsewhere, entry is eligible for GC.`}</Styled.Pre>

                <h2>WeakSet (object membership)</h2>
                <ul>
                    <li>Stores unique <b>objects</b> only (no primitives); weakly held.</li>
                    <li>APIs: <code>add</code>, <code>has</code>, <code>delete</code>.</li>
                </ul>
                <Styled.Pre>{`const ws = new WeakSet();
const node = {};
ws.add(node);
ws.has(node);   // true
ws.delete(node);`}</Styled.Pre>

                <h2>When to use weak collections</h2>
                <ul>
                    <li>Attach metadata to objects you don't own (DOM elements, AST nodes, cache keys) without causing leaks.</li>
                    <li>Track “visited” objects in graphs during traversal; entries vanish when objects do.</li>
                    <li>Per-instance private data (pre-#private era) without preventing GC.</li>
                </ul>

                <h2>Privacy via WeakMap (per-instance state)</h2>
                <Styled.Pre>{`const _priv = new WeakMap();
class Counter {
  constructor(){ _priv.set(this, { n: 0 }); }
  inc(){ _priv.get(this).n++; }
  get value(){ return _priv.get(this).n; }
}
const c = new Counter();
c.inc(); c.value; // 1
// When 'c' is unreachable, its private record can be GC'd.`}</Styled.Pre>

                <h2>Caching without leaks</h2>
                <Styled.Pre>{`// cache heavy result per object key
const cache = new WeakMap();
function compute(obj){
  if (cache.has(obj)) return cache.get(obj);
  const result = expensiveWork(obj);
  cache.set(obj, result);
  return result;
}`}</Styled.Pre>

                <h2>DOM metadata pattern</h2>
                <p>Associate data with nodes; removing the node frees the metadata automatically.</p>
                <Styled.Pre>{`const meta = new WeakMap();
function bind(el){
  meta.set(el, { clicks: 0 });
  el.addEventListener("click", () => meta.get(el).clicks++);
}
// later: el.remove() → el eligible for GC → meta entry can vanish`}</Styled.Pre>

                <h2>Map vs WeakMap (leak demo)</h2>
                <Styled.Pre>{`// Using Map may leak if keys are never deleted:
const strong = new Map();
(function(){
  const tmp = {};
  strong.set(tmp, "data"); // stays forever unless manually deleted
})();

// Using WeakMap avoids this class of leak:
const weak = new WeakMap();
(function(){
  const tmp = {};
  weak.set(tmp, "data");   // entry eligible for GC when tmp goes out of scope
})();`}</Styled.Pre>

                <h2>Limitations / gotchas</h2>
                <ul>
                    <li>No iteration or <code>size</code> - you can't inspect contents (prevents keeping keys alive).</li>
                    <li>Keys (WeakMap) / values (WeakSet) must be objects; primitives are not allowed.</li>
                    <li>You cannot rely on <i>when</i> GC happens; treat cleanup as eventual.</li>
                </ul>

                <h2>WeakRef & FinalizationRegistry (advanced, use sparingly)</h2>
                <ul>
                    <li><code>WeakRef</code> holds a weak pointer; <code>.deref()</code> may return the object or <code>undefined</code>.</li>
                    <li><code>FinalizationRegistry</code> schedules a callback sometime after an object is collected.</li>
                    <li><b>Do not</b> use finalizers for logic you must guarantee - GC timing is non-deterministic.</li>
                </ul>
                <Styled.Pre>{`// WeakRef example
let obj = { big: "data" };
const ref = new WeakRef(obj);
obj = null;
// later...
const maybe = ref.deref(); // object or undefined

// FinalizationRegistry example (debug/cleanup hints)
const fr = new FinalizationRegistry(token => {
  // called eventually after target is GC'd
  // side-effects should be idempotent and best-effort only
});
let target = {};
fr.register(target, "target-1");
// later: target = null; // eligible for GC → fr callback may run eventually`}</Styled.Pre>

                <h2>Patterns: visited set (graph/DFS)</h2>
                <Styled.Pre>{`function walk(node, visit, seen = new WeakSet()){
  if (node && typeof node === "object" && !seen.has(node)){
    seen.add(node);
    visit(node);
    for (const child of node.children ?? []) walk(child, visit, seen);
  }
}`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>WeakMap:</b> object keys only; <code>set/get/has/delete</code>; no size/iteration.</li>
                    <li><b>WeakSet:</b> object membership; <code>add/has/delete</code>; no size/iteration.</li>
                    <li>Use for metadata/caches keyed by objects to avoid leaks.</li>
                    <li>GC is non-deterministic - never base correctness on finalization timing.</li>
                    <li><code>WeakRef</code>/<code>FinalizationRegistry</code> exist for niche cases; prefer weak collections first.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
