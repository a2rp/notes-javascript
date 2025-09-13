import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Closures() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Closures</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> A closure is a function + its <i>lexical environment</i>. Functions
                    “remember” variables from where they were defined, even after that scope has returned.
                    <b> Closures capture bindings (by reference), not copies.</b>
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Why it matters</h2>
                <ul>
                    <li>Encapsulation / private state (counters, caches, modules).</li>
                    <li>Callbacks & async code that need access to outer variables later.</li>
                    <li>Common bugs in loops/timers due to capturing a changing binding.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// 1) Private state / factory
function makeCounter() {
  let n = 0;
  return () => ++n;   // closes over n
}
const c = makeCounter();
c(); c();             // 1, 2`}</Styled.Pre>

                <Styled.Pre>{`// 2) Capture is by binding (live), not by value
let label = "A";
const f = () => label;
label = "B";
f();                  // "B"`}</Styled.Pre>

                <Styled.Pre>{`// 3) Loops: var (one shared binding) vs let (new per-iteration)
var outVar = [];
for (var i = 0; i < 3; i++) outVar.push(() => i);
outVar.map(fn => fn());      // [3, 3, 3] ❌

let outLet = [];
for (let j = 0; j < 3; j++) outLet.push(() => j);
outLet.map(fn => fn());      // [0, 1, 2] ✅`}</Styled.Pre>

                <Styled.Pre>{`// 4) setTimeout with snapshots
for (let i = 1; i <= 3; i++) setTimeout(() => console.log(i), i*10); // 1 2 3 ✅
// With var, create a snapshot using an IIFE or param:
for (var k = 1; k <= 3; k++) (k => setTimeout(() => console.log(k), k*10))(k); // ✅`}</Styled.Pre>

                <Styled.Pre>{`// 5) Module pattern (encapsulation)
function createStore(init = 0){
  let value = init;
  return {
    get: () => value,
    set: (v) => (value = v),
    inc: () => ++value,
  };
}
const s = createStore(10);
s.get(); s.inc();    // 10, 11`}</Styled.Pre>

                <Styled.Pre>{`// 6) Cache via closure
function memoize(fn){
  const cache = new Map();          // closed-over
  return (x) => cache.has(x) ? cache.get(x) : (cache.set(x, fn(x)), cache.get(x));
}
const sq = memoize(x => x*x);
sq(4); sq(4);        // 16 (second call from cache)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Gotchas & tips</h2>
                <ul>
                    <li>
                        <b>Snapshot vs live:</b> if you need the value <i>now</i>, store it in a new binding
                        (e.g., <code>const snapshot = x;</code>) or use <code>let</code> per iteration.
                    </li>
                    <li>
                        <b>this ≠ closure:</b> closures capture variables; <code>this</code> is set by call-site
                        (or lexically with arrows). Don’t confuse them.
                    </li>
                    <li>
                        <b>Memory leaks:</b> long-lived closures keep captured objects alive. Clean up event
                        listeners/timers; avoid capturing big DOM nodes—pass IDs or use <code>WeakMap</code>.
                    </li>
                    <li>
                        <b>Debugging:</b> in devtools, inspect a paused closure’s “Scope” panel to see captured
                        bindings.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Patterns (quick)</h2>
                <ul>
                    <li>
                        <b>Factory + returned methods</b> for private state instead of classes when inheritance
                        isn’t needed.
                    </li>
                    <li>
                        <b>Event handlers</b>: capture the minimal data (id/index), fetch large data on demand.
                    </li>
                    <li>
                        <b>Performance:</b> prefer reusing outer functions over creating closures in hot loops
                        unless they actually need per-iteration state.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
