import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

export default function MemoryGcBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />

            <Styled.Heading>Memory & GC basics</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JS uses automatic garbage collection (mark-and-sweep). Anything
                    <b> reachable</b> from roots (globals, current stack, active closures, DOM) is kept. Lose
                    the last strong reference → object becomes collectible.
                </p>

                <h2>How GC decides</h2>
                <ul>
                    <li><b>Roots:</b> global objects, current call stack, pending tasks/microtasks, active DOM.</li>
                    <li><b>Reachability graph:</b> references from roots keep things alive.</li>
                    <li><b>Pause & sweep:</b> collectors periodically mark reachable objects and free the rest.</li>
                </ul>

                <h2>Typical leak sources (and fixes)</h2>
                <Styled.Pre>{`// 1) Uncleared timers
const id = setInterval(poll, 1000);
// fix: clear on teardown
return () => clearInterval(id);

// 2) Event listeners not removed
elem.addEventListener("click", onClick);
// fix: use AbortController (auto-remove)
const ac = new AbortController();
elem.addEventListener("click", onClick, { signal: ac.signal });
// later: ac.abort();

// 3) Global caches that only grow
const cache = [];
function log(item){ cache.push(item); } // grows forever
// fix: cap size (LRU/TTL) or use dev-only logging

// 4) Detached DOM kept by JS references
const list = document.getElementById("list");
const li = document.createElement("li");
list.append(li);
const stash = new Map();
stash.set(li, "meta"); // li stays alive even if removed from DOM
// fix: prefer WeakMap for DOM→meta
const meta = new WeakMap();
meta.set(li, "meta"); // auto-collect when li is unreachable`}</Styled.Pre>

                <h2>Weak collections (no strong hold)</h2>
                <ul>
                    <li><b>WeakMap&lt;object, T&gt;</b> & <b>WeakSet&lt;object&gt;</b> don't prevent GC of keys.</li>
                    <li>Use for metadata by object, memoization by object key, or tracking DOM nodes.</li>
                    <li>They're not enumerable (by design).</li>
                </ul>
                <Styled.Pre>{`// metadata per object
const meta = new WeakMap();
function tag(obj, info){ meta.set(obj, info); }
function getTag(obj){ return meta.get(obj); }`}</Styled.Pre>

                <h2>WeakRef & FinalizationRegistry (advanced)</h2>
                <ul>
                    <li><b>WeakRef</b> lets you <i>optionally</i> access an object without keeping it alive.</li>
                    <li><b>FinalizationRegistry</b> runs a callback sometime after an object is collected.</li>
                    <li><b>Caution:</b> timing is non-deterministic; don't use for core logic or security.</li>
                </ul>
                <Styled.Pre>{`// soft cache example
const cache = new Map(); // key -> WeakRef(value)
function getSoft(key, factory){
  const wr = cache.get(key);
  let val = wr?.deref();
  if (!val){ val = factory(); cache.set(key, new WeakRef(val)); }
  return val;
}`}</Styled.Pre>

                <h2>Memory-friendly patterns</h2>
                <ul>
                    <li>Prefer <b>local scope</b> over module-wide singletons; pass dependencies in.</li>
                    <li>Null out large arrays/objects when done (<code>buf = null</code>) if they outlive scope.</li>
                    <li>Abort fetches/streams; clear intervals/timeouts in <code>finally</code>/unmount.</li>
                    <li>Cap caches (LRU) and expire entries; store only what you need.</li>
                    <li>For DOM lists, use <b>event delegation</b> instead of per-item listeners.</li>
                    <li>When using <code>URL.createObjectURL(blob)</code>, call <code>URL.revokeObjectURL</code> after use.</li>
                </ul>

                <h2>Measuring & debugging</h2>
                <ul>
                    <li><b>Chrome DevTools → Memory:</b> Heap snapshot (look at <i>Retained size</i> and <i>Dominators</i>).</li>
                    <li><b>Performance → record</b> and check <i>JS heap</i> graph for steady growth.</li>
                    <li>Use <code>console.profile()</code>, <code>performance.measure()</code> around allocations.</li>
                </ul>

                <h2>Node specifics</h2>
                <ul>
                    <li>Streams: remove listeners or use <code>once</code>/<code>signal</code>. End/close on error.</li>
                    <li>Long-living processes: watch heap usage; restart on leaks; expose health endpoints.</li>
                </ul>

                <h2>Small utilities</h2>
                <Styled.Pre>{`// Simple LRU (cap by count)
function makeLRU(limit = 200){
  const map = new Map();
  return {
    get(k){ if (!map.has(k)) return; const v = map.get(k); map.delete(k); map.set(k, v); return v; },
    set(k,v){ if (map.has(k)) map.delete(k); map.set(k,v); if (map.size > limit) map.delete(map.keys().next().value); },
    clear(){ map.clear(); }
  };
}`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>GC frees what's <b>unreachable</b>; leaks keep hidden references alive.</li>
                    <li>Clear timers/listeners; prefer <b>AbortController</b> and <code>{`{ signal }`}</code>.</li>
                    <li>Use <b>WeakMap/WeakSet</b> for metadata keyed by objects/DOM; avoid strong Maps for that.</li>
                    <li>Use <b>LRU/TTL</b> caches; don't let arrays/maps grow unbounded.</li>
                    <li><b>WeakRef/FinalizationRegistry</b> are niche; avoid for critical correctness.</li>
                    <li>Diagnose with heap snapshots and retained size; look for detached DOM, ever-growing Maps/Sets.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
