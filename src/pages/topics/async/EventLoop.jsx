import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function EventLoop() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>Event loop</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> The <i>event loop</i> coordinates JS execution (single-threaded) with
                    async work provided by the environment (browser/Web APIs or Node). JS runs on a{" "}
                    <b>call stack</b>; async callbacks wait in queues until the loop picks them.
                </p>

                <h2>Mental model</h2>
                <ul>
                    <li><b>Stack</b>: where the currently executing frames live.</li>
                    <li><b>Tasks (macrotasks)</b>: e.g., <code>setTimeout</code>, <code>message</code>, I/O.</li>
                    <li><b>Microtasks (jobs)</b>: e.g., <code>Promise.then</code>, <code>queueMicrotask</code>.</li>
                    <li>
                        Loop rule (browser): run <b>one task</b> → then <b>drain all microtasks</b> → possibly{" "}
                        <b>render</b> → repeat.
                    </li>
                </ul>

                <h2>Common sources</h2>
                <ul>
                    <li><b>Tasks:</b> <code>setTimeout</code>, <code>setInterval</code>, DOM events, network,
                        <code>postMessage</code>, <code>requestAnimationFrame</code> callback (runs in a
                        rendering step).</li>
                    <li>
                        <b>Microtasks:</b> <code>Promise.then/catch/finally</code>,{" "}
                        <code>queueMicrotask</code>, <code>MutationObserver</code>. (Node also has{" "}
                        <code>process.nextTick</code> which runs even before Promise microtasks.)
                    </li>
                </ul>

                <h2>Order demo (microtasks beat timers)</h2>
                <Styled.Pre>{`console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("micro"));
console.log("B");
// A, B, micro, timer`}</Styled.Pre>

                <h2>Draining microtasks (and starvation)</h2>
                <p>
                    Microtasks run to completion before the next task. Continuously scheduling microtasks can
                    starve timers/UI.
                </p>
                <Styled.Pre>{`let i = 0;
function badSpin(){
  if (i++ < 1_000_000) queueMicrotask(badSpin);
}
queueMicrotask(badSpin);   // UI/timers may stall — avoid tight microtask loops`}</Styled.Pre>

                <h2>Yield back to the loop</h2>
                <ul>
                    <li>Break long work into chunks and <b>yield</b> to allow rendering/timers.</li>
                </ul>
                <Styled.Pre>{`// simple yield helpers
const tick = () => new Promise(r => setTimeout(r));      // next task
const micro = () => new Promise(r => queueMicrotask(r));  // next microtask

async function chunked(items, fn){
  for (let i = 0; i < items.length; i++){
    fn(items[i]);
    if (i % 100 === 0) await tick(); // let UI breathe
  }
}`}</Styled.Pre>

                <h2>Rendering phase bits (browser)</h2>
                <ul>
                    <li>
                        <code>requestAnimationFrame(cb)</code> runs <b>before paint</b> (good for measuring &
                        animating).
                    </li>
                    <li>
                        After each task, the browser <b>drains microtasks</b> and may perform layout/paint. If
                        you add microtasks repeatedly, you may delay a frame.
                    </li>
                </ul>

                <h2>Timers: clamping & drift</h2>
                <ul>
                    <li>
                        Nested timers clamp to ~<b>4ms minimum</b> in pages; background tabs are throttled
                        (timers may run as slow as ~1s).
                    </li>
                    <li>
                        <code>setInterval</code> can drift; prefer recursive <code>setTimeout</code> if you need
                        control.
                    </li>
                </ul>
                <Styled.Pre>{`function every(ms, fn){
  let cancelled = false;
  (function loop(next){
    if (cancelled) return;
    const t0 = performance.now();
    fn();
    const elapsed = performance.now() - t0;
    setTimeout(() => loop(ms), Math.max(0, ms - elapsed));
  })(ms);
  return () => (cancelled = true);
}`}</Styled.Pre>

                <h2>Node.js notes (high level)</h2>
                <ul>
                    <li>Node uses libuv phases: <i>timers → pending → poll → check → close</i>.</li>
                    <li>
                        After each phase's callbacks, Node processes microtasks.{" "}
                        <code>process.nextTick</code> runs <b>before</b> Promise microtasks.
                    </li>
                </ul>
                <Styled.Pre>{`setTimeout(() => console.log("timer"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
// nextTick, promise, timer (typical order)`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>One task at a time → then drain all microtasks → maybe render → repeat.</li>
                    <li>Microtasks (Promises) run <b>before</b> timers; don't create infinite microtask loops.</li>
                    <li>
                        For UI-friendly work, <b>yield</b> via <code>setTimeout(… ,0)</code> or schedule to{" "}
                        <code>rAF</code> for animation.
                    </li>
                    <li>Timers clamp (≈4ms nested) and throttle in background tabs.</li>
                    <li>In Node, <code>process.nextTick</code> runs before Promise microtasks; don't overuse it.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
