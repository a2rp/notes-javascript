import{j as e}from"./index-COrpvOC4.js";import{S as r,A as t}from"./index-Bl6SJSVb.js";import{B as n}from"./Breadcrumbs-DQDVi04u.js";function i(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:t}),e.jsx(r.Heading,{children:"AbortController"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"AbortController"})," provides a cancel ",e.jsx("b",{children:"signal"})," you can pass to APIs (like ",e.jsx("code",{children:"fetch"}),") to abort work. Once aborted, the signal stays aborted and carries an optional ",e.jsx("code",{children:"reason"}),"."]}),e.jsx("h2",{children:"Basics"}),e.jsx(r.Pre,{children:`const ac = new AbortController();
const { signal } = ac;
// start some abortable work...
ac.abort(new DOMException("Stopped by user", "AbortError")); // sets signal.aborted = true
signal.aborted;  // true
signal.reason;   // DOMException("Stopped by user")`}),e.jsx("h2",{children:"Abortable fetch"}),e.jsx(r.Pre,{children:`const ac = new AbortController();
try {
  const r = await fetch("/slow.json", { signal: ac.signal });
  const data = await r.json();
} catch (e) {
  if (e.name === "AbortError") console.warn("Request was aborted");
  else throw e;
}
// later, cancel if needed:
ac.abort();`}),e.jsx("h2",{children:"Timeouts"}),e.jsx("ul",{children:e.jsxs("li",{children:["Modern runtimes expose ",e.jsx("code",{children:"AbortSignal.timeout(ms)"}),". Fallback shown below."]})}),e.jsx(r.Pre,{children:`// Preferred (if available)
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
await fetch("/data", { signal });`}),e.jsxs("h2",{children:["Compose signals (abort if ",e.jsx("i",{children:"any"})," aborts)"]}),e.jsx(r.Pre,{children:`function anySignal(...signals){
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
await fetch("/work", { signal: combined });`}),e.jsx("h2",{children:'Abortable "sleep" & custom tasks'}),e.jsx(r.Pre,{children:`export function delay(ms, { signal } = {}){
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
}`}),e.jsx("h2",{children:"Event listeners & streams"}),e.jsx("ul",{children:e.jsxs("li",{children:["Many modern APIs accept ",e.jsx("code",{children:"{ signal }"})," in add/remove or start methods."]})}),e.jsx(r.Pre,{children:`// DOM listener that auto-removes on abort
const ac = new AbortController();
window.addEventListener("click", onClick, { signal: ac.signal });
// later: ac.abort() → listener removed

// Web streams: abort fetch body read by cancelling the reader or aborting fetch's signal`}),e.jsx("h2",{children:"One-shot & scoping"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["A controller is ",e.jsx("b",{children:"one-shot"}),". After ",e.jsx("code",{children:"abort()"}),", create a new controller for the next run."]}),e.jsx("li",{children:"Scope controllers to the lifetime of a task (e.g., component mount → unmount)."})]}),e.jsx("h2",{children:"Node notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Node's ",e.jsx("code",{children:"fetch"})," supports ",e.jsx("code",{children:"{ signal }"}),". Many Node APIs (fs, streams) also accept AbortSignals."]}),e.jsxs("li",{children:["Aborting a request typically rejects with ",e.jsx("code",{children:'DOMException("AbortError")'}),"."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Pass ",e.jsx("code",{children:"signal"})," to abortable APIs (",e.jsx("code",{children:"fetch"}),", listeners, streams)."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"AbortSignal.timeout(ms)"})," when available; otherwise implement a small wrapper."]}),e.jsxs("li",{children:["Compose with helper ",e.jsx("b",{children:"anySignal"})," to cancel on user action or timeout."]}),e.jsx("li",{children:"Controllers are one-shot; create fresh per operation."}),e.jsxs("li",{children:["Always handle ",e.jsx("code",{children:"AbortError"})," as an expected, non-fatal path."]})]})]})]})}export{i as default};
