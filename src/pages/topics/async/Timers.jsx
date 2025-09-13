import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function Timers() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>Timers</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>setTimeout</code>/<code>setInterval</code> schedule callbacks as{" "}
                    <b>tasks</b> (not microtasks). Delays are minimums; execution is not precise (clamping,
                    throttling, event loop load).
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`const id = setTimeout(() => console.log("later"), 300);
clearTimeout(id); // cancel

const iid = setInterval(tick, 1000);
clearInterval(iid); // cancel

// pass args
setTimeout((who) => console.log("hi", who), 0, "Ada");`}</Styled.Pre>

                <h2>Zero delay? (clamping)</h2>
                <ul>
                    <li><code>setTimeout(fn, 0)</code> runs <i>after</i> the current task, not immediately.</li>
                    <li>Nested timers clamp (~4ms minimum in pages). Background tabs get heavily throttled.</li>
                </ul>

                <h2>Interval drift & a better interval</h2>
                <ul>
                    <li><code>setInterval</code> doesn't compensate for callback time → drift.</li>
                    <li>Prefer recursive <code>setTimeout</code> and compute the next fire time.</li>
                </ul>
                <Styled.Pre>{`function every(ms, fn){
  let next = performance.now() + ms;
  let stop = false;
  (function loop(){
    if (stop) return;
    const now = performance.now();
    const delay = Math.max(0, next - now);
    setTimeout(() => {
      const start = performance.now();
      fn();
      // schedule based on original cadence
      next += ms;
      // if we fell behind a lot, catch up by skipping ahead
      while (next < performance.now()) next += ms;
      loop();
    }, delay);
  })();
  return () => { stop = true; };
}
// usage
const cancel = every(1000, () => console.log(new Date().toISOString()));
// cancel();`}</Styled.Pre>

                <h2>requestAnimationFrame (rAF)</h2>
                <ul>
                    <li>Runs before the next paint (~60fps). Best for animations & measuring layout.</li>
                    <li>Use <code>cancelAnimationFrame</code> to stop.</li>
                </ul>
                <Styled.Pre>{`let rafId;
function animate(t0){
  rafId = requestAnimationFrame(animate);
  // do animation work tied to frames
}
rafId = requestAnimationFrame(animate);
// cancelAnimationFrame(rafId);`}</Styled.Pre>

                <h2>Microtask vs task ordering</h2>
                <Styled.Pre>{`console.log("A");
setTimeout(() => console.log("task"));
queueMicrotask(() => console.log("micro"));
console.log("B");
// A, B, micro, task`}</Styled.Pre>

                <h2>Sleep / next tick helpers</h2>
                <Styled.Pre>{`// sleep with timeout (task)
const sleep = (ms=0) => new Promise(r => setTimeout(r, ms));

// yield to microtask queue (runs before timers)
const nextMicro = () => new Promise(r => queueMicrotask(r));`}</Styled.Pre>

                <h2>Debounce & throttle (practical)</h2>
                <Styled.Pre>{`// Debounce: run once after N ms of inactivity
function debounce(fn, ms=300){
  let t; 
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

// Throttle: run at most once every N ms (trailing)
function throttle(fn, ms=200){
  let last = 0, t, lastArgs;
  return (...args) => {
    const now = Date.now(); lastArgs = args;
    const remain = ms - (now - last);
    if (remain <= 0){
      last = now; fn(...lastArgs);
    } else if (!t){
      t = setTimeout(() => { t = null; last = Date.now(); fn(...lastArgs); }, remain);
    }
  };
}`}</Styled.Pre>

                <h2>Cleanup patterns</h2>
                <ul>
                    <li>Always keep the id to cancel on unmount/abort.</li>
                    <li>Combine with <b>AbortController</b> for timeouts around async I/O.</li>
                </ul>
                <Styled.Pre>{`async function withTimeout(promise, ms){
  const t = new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
  return Promise.race([promise, t]);
}`}</Styled.Pre>

                <h2>Node.js notes</h2>
                <ul>
                    <li><code>setImmediate</code> queues a task after I/O callbacks (Node only).</li>
                    <li><code>timer.unref()</code> lets the process exit even if a timer is pending.</li>
                </ul>
                <Styled.Pre>{`const id = setInterval(work, 1000);
id.unref(); // process can exit if nothing else is pending (Node)`}</Styled.Pre>

                <h2>Idle callbacks (browser)</h2>
                <ul>
                    <li><code>requestIdleCallback</code> runs when the browser is idle (low-priority work). Not supported everywhere.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Timers schedule <b>tasks</b>; microtasks (Promises) run first.</li>
                    <li>Delays are minimums; expect clamping and throttling (esp. background tabs).</li>
                    <li>Avoid <code>setInterval</code> drift: prefer recursive timeout with <code>performance.now()</code>.</li>
                    <li>Use <code>requestAnimationFrame</code> for visuals; debounce/throttle for noisy events.</li>
                    <li>Always cancel timers; pair I/O with timeouts/AbortController for robustness.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
