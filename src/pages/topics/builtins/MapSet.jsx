import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function MapSet() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Map/Set vs Object/Array</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Map</code> & <code>Set</code> are general-purpose collections:
                    <b> Map</b> stores key→value pairs (keys of <i>any</i> type, ordered), <b>Set</b> stores unique values.
                    Prefer them over <code>Object</code>/<code>Array</code> when you need arbitrary-key dictionaries,
                    fast membership tests, stable insertion order, and a clean API.
                </p>

                <h2>Map - dictionary with any keys</h2>
                <ul>
                    <li>Keys can be objects, functions, NaN, etc. Insertion order is preserved.</li>
                    <li>Core ops: <code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, <code>clear</code>, <code>size</code>.</li>
                </ul>
                <Styled.Pre>{`const m = new Map();
const k = { id: 1 };
m.set("a", 10).set(k, 20);
m.get("a");           // 10
m.get({ id: 1 });     // undefined (different object identity)
m.get(k);             // 20
m.has("a");           // true
m.size;               // 2

// iterate (in insertion order)
for (const [key, value] of m) { /* ... */ }     // same as m.entries()
[...m.keys()];   // keys
[...m.values()]; // values`}</Styled.Pre>

                <h2>Object vs Map (when to use what)</h2>
                <ul>
                    <li><b>Use Map</b> for dynamic keys, non-string keys, frequent adds/removes, or when order matters.</li>
                    <li><b>Use Object</b> for simple JSON-like records / fixed shapes; faster property access, serializable.</li>
                    <li><code>Object</code> keys are strings/symbols only; integer-like keys enumerate first, then insertion order.</li>
                </ul>

                <h2>Converting Object ⇄ Map</h2>
                <Styled.Pre>{`// Object → Map
const m2 = new Map(Object.entries({ a:1, b:2 }));

// Map → Object (string keys only!)
const obj = Object.fromEntries(new Map([["a",1],["b",2]]));

// Exact (stringify-unsafe) note: non-string keys will coerce if you force to Object.`}</Styled.Pre>

                <h2>Patterns with Map</h2>
                <Styled.Pre>{`// Frequency counter
const freq = new Map();
for (const x of ["a","b","a"]) freq.set(x, (freq.get(x) ?? 0) + 1);

// LRU cache (sketch): move key to the end on get/set
class LRU {
  constructor(limit=100){ this.limit = limit; this.m = new Map(); }
  get(k){ if(!this.m.has(k)) return undefined;
    const v = this.m.get(k); this.m.delete(k); this.m.set(k, v); return v; }
  set(k,v){ if(this.m.has(k)) this.m.delete(k);
    this.m.set(k,v); if(this.m.size > this.limit) this.m.delete(this.m.keys().next().value); }
}`}</Styled.Pre>

                <h2>Set - unique values with O(1) membership</h2>
                <ul>
                    <li>Core ops: <code>add</code>, <code>has</code>, <code>delete</code>, <code>clear</code>, <code>size</code>.</li>
                    <li>Great for dedup, fast lookups, set algebra.</li>
                </ul>
                <Styled.Pre>{`const s = new Set([1,2,2,3]);
s.size;        // 3
s.add(4).add(2);
s.has(3);      // true
[...s];        // [1,2,3,4]

// Deduplicate array
const unique = [...new Set([3,1,3,2,1])];  // [3,1,2] (keeps first occurrence order)`}</Styled.Pre>

                <h2>Set algebra (union/intersection/difference)</h2>
                <Styled.Pre>{`const A = new Set([1,2,3]), B = new Set([3,4]);
const union        = new Set([...A, ...B]);                   // {1,2,3,4}
const intersection = new Set([...A].filter(x => B.has(x)));   // {3}
const difference   = new Set([...A].filter(x => !B.has(x)));  // {1,2}`}</Styled.Pre>

                <h2>Array vs Set (membership & deletes)</h2>
                <ul>
                    <li><b>Array</b>: membership is O(n) via <code>includes</code>; delete by value is O(n).</li>
                    <li><b>Set</b>: membership & delete are O(1) on average; iteration preserves insertion order.</li>
                </ul>

                <h2>WeakMap / WeakSet (preview)</h2>
                <ul>
                    <li>Keys (WeakMap) / values (WeakSet) must be objects and are held <b>weakly</b> - do not prevent GC.</li>
                    <li>No size/iteration; ideal for private per-instance data or caches. (Covered in next topic.)</li>
                </ul>

                <h2>JSON & serialization</h2>
                <ul>
                    <li><code>JSON.stringify</code> does not handle Map/Set directly. Convert with spreads/entries.</li>
                </ul>
                <Styled.Pre>{`const jsonMap = JSON.stringify([...m]);     // pairs array
const jsonSet = JSON.stringify([...s]);     // values array
// revive:
const mBack = new Map(JSON.parse(jsonMap));
const sBack = new Set(JSON.parse(jsonSet));`}</Styled.Pre>

                <h2>Performance & gotchas</h2>
                <ul>
                    <li><code>Map/Set</code> have predictable <b>O(1)</b> ops; objects may require <code>hasOwn</code> checks and can collide with prototypes unless <code>Object.create(null)</code>.</li>
                    <li>Always use <b>.size</b> (not <code>length</code>) for Map/Set.</li>
                    <li>Object identity matters for Map keys / Set values: two equal-looking objects are different keys.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>Map</b>: any-type keys, ordered, <code>set/get/has/delete/size</code>, easy iteration.</li>
                    <li><b>Set</b>: unique values, fast membership, dedup & set ops, ordered iteration.</li>
                    <li>Prefer <b>Map/Set</b> for dynamic dictionaries and membership tests; prefer <b>Object/Array</b> for fixed shapes and JSON.</li>
                    <li>Convert via <code>Object.entries</code>/<code>fromEntries</code> and spreads; JSON needs manual conversion.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
