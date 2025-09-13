import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function AbortControllerNotes() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>AbortController</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>AbortController</code> provides a cancel <b>signal</b> you can pass
                    to APIs (like <code>fetch</code>) to abort work. Once aborted, the signal stays aborted and
                    carries an optional <code>reason</code>.
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`const ac = new AbortController();
const { signal } = ac;
// start some abortable work...
ac.abort(new DOMException("Stopped by user", "AbortError")); // sets signal.aborted = true
signal.aborted;  // true
signal.reason;   // DOMException("Stopped by user")`}</Styled.Pre>

                <h2>Abortable fetch</h2>
                <Styled.Pre>{`const ac = new AbortController();
try {
  const r = await fetch("/slow.json", { signal: ac.signal });
  const data = await r.json();
} catch (e) {
  if (e.name === "AbortError") console.warn("Request was aborted");
  else throw e;
}
// later, cancel if needed:
ac.abort();`}</Styled.Pre>

                <h2>Timeouts</h2>
                <ul>
                    <li>Modern runtimes expose <code>AbortSignal.timeout(ms)</code>. Fallback shown below.</li>
                </ul>
                <Styled.Pre>{`// Preferred (if available)
const r = await fetch("/data", { signal: AbortSignal.timeout(8000) });

// Fallback helper
function withTimeout(signal, ms){
  const ac = new AbortController();
  const onAbort = () => ac.abort(signal?.reason ?? new DOMException("Upstream aborted", "AbortError"));
  signal?.addEventListener("abort", onAbort, { once: true });
  const t = setTimeout(() => ac.abort(new DOMException("Timeout", "AbortError")), ms);
  ac.signal.addEventListener("abort", () => clearTimeout(t), { once: true });
  return ac.signal;
}
const signal = withTimeout(undefined, 8000);
await fetch("/data", { signal });`}</Styled.Pre>

                <h2>Compose signals (abort if <i>any</i> aborts)</h2>
                <Styled.Pre>{`function anySignal(...signals){
  const ac = new AbortController();
  const abort = (s) => ac.abort(s.reason ?? new DOMException("Aborted", "AbortError"));
  for (const s of signals) {
    if (!s) continue;
    if (s.aborted) { abort(s); break; }
    s.addEventListener("abort", () => abort(s), { once: true });
  }
  return ac.signal;
}

// usage: user cancel OR timeout cancels fetch
const userAC = new AbortController();
const timeoutSig = AbortSignal.timeout ? AbortSignal.timeout(8000) : withTimeout(undefined, 8000);
const combined = anySignal(userAC.signal, timeoutSig);
await fetch("/work", { signal: combined });`}</Styled.Pre>

                <h2>Abortable "sleep" & custom tasks</h2>
                <Styled.Pre>{`export function delay(ms, { signal } = {}){
  return new Promise((res, rej) => {
    const t = setTimeout(res, ms);
    const onAbort = () => { clearTimeout(t); rej(signal.reason ?? new DOMException("Aborted","AbortError")); };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

// Example: retry with abort support
async function retry(fn, { retries=3, base=200, signal } = {}){
  for (let i=0;; i++){
    try { return await fn({ signal }); }
    catch (e){
      if (signal?.aborted || i === retries) throw e;
      await delay(base * 2**i, { signal });
    }
  }
}`}</Styled.Pre>

                <h2>Event listeners & streams</h2>
                <ul>
                    <li>Many modern APIs accept <code>{`{ signal }`}</code> in add/remove or start methods.</li>
                </ul>
                <Styled.Pre>{`// DOM listener that auto-removes on abort
const ac = new AbortController();
window.addEventListener("click", onClick, { signal: ac.signal });
// later: ac.abort() → listener removed

// Web streams: abort fetch body read by cancelling the reader or aborting fetch's signal`}</Styled.Pre>

                <h2>One-shot & scoping</h2>
                <ul>
                    <li>A controller is <b>one-shot</b>. After <code>abort()</code>, create a new controller for the next run.</li>
                    <li>Scope controllers to the lifetime of a task (e.g., component mount → unmount).</li>
                </ul>

                <h2>Node notes</h2>
                <ul>
                    <li>Node's <code>fetch</code> supports <code>{`{ signal }`}</code>. Many Node APIs (fs, streams) also accept AbortSignals.</li>
                    <li>Aborting a request typically rejects with <code>DOMException("AbortError")</code>.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Pass <code>signal</code> to abortable APIs (<code>fetch</code>, listeners, streams).</li>
                    <li>Use <code>AbortSignal.timeout(ms)</code> when available; otherwise implement a small wrapper.</li>
                    <li>Compose with helper <b>anySignal</b> to cancel on user action or timeout.</li>
                    <li>Controllers are one-shot; create fresh per operation.</li>
                    <li>Always handle <code>AbortError</code> as an expected, non-fatal path.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
