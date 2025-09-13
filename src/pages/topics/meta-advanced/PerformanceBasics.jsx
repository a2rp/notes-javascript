import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

export default function PerformanceBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />

            <Styled.Heading>Performance basics</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Performance is about doing <i>less work</i>, doing it <i>later</i>, or
                    doing it <i>elsewhere</i>. Always <b>measure first</b>, then fix the biggest bottleneck.
                </p>

                <h2>Measure (first!)</h2>
                <ul>
                    <li>Use DevTools Performance (record flame chart), FPS meter, Coverage.</li>
                    <li>Quick timers: <code>performance.now()</code>, marks/measures.</li>
                </ul>
                <Styled.Pre>{`performance.mark("A");
// ...work...
performance.mark("B");
performance.measure("task", "A", "B");
console.table(performance.getEntriesByName("task"));`}</Styled.Pre>

                <h2>Do less work</h2>
                <ul>
                    <li>Pick better algorithms/data-structures (O(n) vs O(n²)).</li>
                    <li>Avoid repeated computation; memoize pure helpers.</li>
                    <li>Short-circuit early; skip when no-op.</li>
                </ul>
                <Styled.Pre>{`// naive O(n²) duplicate check -> O(n)
function hasDupes(arr){
  const seen = new Set();
  for (const x of arr) { if (seen.has(x)) return true; seen.add(x); }
  return false;
}`}</Styled.Pre>

                <h2>Batch & schedule work (keep UI smooth)</h2>
                <ul>
                    <li>Batch DOM writes; avoid layout thrash (read → write order).</li>
                    <li>Chunk big loops and yield to the loop/rAF.</li>
                </ul>
                <Styled.Pre>{`// chunk processing to avoid jank
const tick = () => new Promise(r => setTimeout(r));
async function process(items, fn){
  for (let i=0;i<items.length;i++){
    fn(items[i]);
    if (i % 200 === 0) await tick(); // let UI breathe
  }
}`}</Styled.Pre>

                <h2>Avoid allocations (hot paths)</h2>
                <ul>
                    <li>Don't create new arrays/objects in tight loops if reusable.</li>
                    <li>Prefer <code>push</code> over <code>concat</code>; reuse buffers where safe.</li>
                </ul>
                <Styled.Pre>{`// avoid spread inside hot loops
const out = [];
for (const x of input) out.push(transform(x));`}</Styled.Pre>

                <h2>Object shapes & deopts (engines)</h2>
                <ul>
                    <li>Keep objects' property set/order consistent; avoid adding props later.</li>
                    <li>Avoid mixed types in the same field (e.g., number then string).</li>
                </ul>
                <Styled.Pre>{`// stable shape
function makeUser(name, age){
  return { name, age, active: false }; // define all upfront
}`}</Styled.Pre>

                <h2>Do it later / elsewhere</h2>
                <ul>
                    <li><b>Code-split</b> rarely used features (dynamic <code>import()</code>).</li>
                    <li>Use <b>Web Workers</b> for CPU-heavy tasks.</li>
                </ul>
                <Styled.Pre>{`// worker quickstart
// main.js
const w = new Worker(new URL("./heavy.worker.js", import.meta.url));
w.onmessage = (e) => console.log("result", e.data);
w.postMessage({ payload });

// heavy.worker.js
self.onmessage = (e) => {
  const res = heavyCompute(e.data.payload);
  self.postMessage(res);
};`}</Styled.Pre>

                <h2>Network wins (the usual 80/20)</h2>
                <ul>
                    <li>Tree-shake + minify; compress (gzip/brotli); cache (ETag/immutable).</li>
                    <li>Lazy load routes/widgets; <code>modulepreload</code> for near-term use.</li>
                </ul>

                <h2>Event storm control</h2>
                <ul>
                    <li>Debounce or throttle high-frequency events (scroll, input, resize).</li>
                    <li>Use event delegation on lists.</li>
                </ul>
                <Styled.Pre>{`// throttle
function throttle(fn, ms=100){
  let t=0;
  return (...a)=>{ const now=Date.now(); if (now-t>ms){ t=now; fn(...a); } };
}
window.addEventListener("scroll", throttle(onScroll, 100));`}</Styled.Pre>

                <h2>Memory ↔ performance</h2>
                <ul>
                    <li>Leaks → GC pressure → jank. Clear timers/listeners; null out large refs.</li>
                    <li>Avoid retaining big arrays in caches; cap size (LRU) and expire.</li>
                </ul>
                <Styled.Pre>{`// simple LRU cap
const cache = new Map();
function put(k,v){ cache.set(k,v); if (cache.size>200) cache.delete(cache.keys().next().value); }`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Profile first: flame chart, FPS, memory; fix the fattest frame.</li>
                    <li>Prefer linear algorithms; precompute/memoize; skip work early.</li>
                    <li>Batch reads/writes; chunk long tasks; use rAF for visuals.</li>
                    <li>Avoid needless allocations; keep object shapes stable.</li>
                    <li>Code-split & move CPU work to Workers when needed.</li>
                    <li>Control event storms with debounce/throttle; delegate events.</li>
                    <li>Watch memory (timers/listeners, caches) to prevent GC jank.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
