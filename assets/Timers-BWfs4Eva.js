import{j as e}from"./index-4OJNB7vi.js";import{S as s,A as r}from"./index-BQk2fBqD.js";import{B as t}from"./Breadcrumbs-BWCvk1iJ.js";function l(){return e.jsxs(s.Wrapper,{children:[e.jsx(t,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:r}),e.jsx(s.Heading,{children:"Timers"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"setTimeout"}),"/",e.jsx("code",{children:"setInterval"})," schedule callbacks as"," ",e.jsx("b",{children:"tasks"})," (not microtasks). Delays are minimums; execution is not precise (clamping, throttling, event loop load)."]}),e.jsx("h2",{children:"Basics"}),e.jsx(s.Pre,{children:`const id = setTimeout(() => console.log("later"), 300);
clearTimeout(id); // cancel

const iid = setInterval(tick, 1000);
clearInterval(iid); // cancel

// pass args
setTimeout((who) => console.log("hi", who), 0, "Ada");`}),e.jsx("h2",{children:"Zero delay? (clamping)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"setTimeout(fn, 0)"})," runs ",e.jsx("i",{children:"after"})," the current task, not immediately."]}),e.jsx("li",{children:"Nested timers clamp (~4ms minimum in pages). Background tabs get heavily throttled."})]}),e.jsx("h2",{children:"Interval drift & a better interval"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"setInterval"})," doesn't compensate for callback time → drift."]}),e.jsxs("li",{children:["Prefer recursive ",e.jsx("code",{children:"setTimeout"})," and compute the next fire time."]})]}),e.jsx(s.Pre,{children:`function every(ms, fn){
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
// cancel();`}),e.jsx("h2",{children:"requestAnimationFrame (rAF)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Runs before the next paint (~60fps). Best for animations & measuring layout."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"cancelAnimationFrame"})," to stop."]})]}),e.jsx(s.Pre,{children:`let rafId;
function animate(t0){
  rafId = requestAnimationFrame(animate);
  // do animation work tied to frames
}
rafId = requestAnimationFrame(animate);
// cancelAnimationFrame(rafId);`}),e.jsx("h2",{children:"Microtask vs task ordering"}),e.jsx(s.Pre,{children:`console.log("A");
setTimeout(() => console.log("task"));
queueMicrotask(() => console.log("micro"));
console.log("B");
// A, B, micro, task`}),e.jsx("h2",{children:"Sleep / next tick helpers"}),e.jsx(s.Pre,{children:`// sleep with timeout (task)
const sleep = (ms=0) => new Promise(r => setTimeout(r, ms));

// yield to microtask queue (runs before timers)
const nextMicro = () => new Promise(r => queueMicrotask(r));`}),e.jsx("h2",{children:"Debounce & throttle (practical)"}),e.jsx(s.Pre,{children:`// Debounce: run once after N ms of inactivity
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
}`}),e.jsx("h2",{children:"Cleanup patterns"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Always keep the id to cancel on unmount/abort."}),e.jsxs("li",{children:["Combine with ",e.jsx("b",{children:"AbortController"})," for timeouts around async I/O."]})]}),e.jsx(s.Pre,{children:`async function withTimeout(promise, ms){
  const t = new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
  return Promise.race([promise, t]);
}`}),e.jsx("h2",{children:"Node.js notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"setImmediate"})," queues a task after I/O callbacks (Node only)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"timer.unref()"})," lets the process exit even if a timer is pending."]})]}),e.jsx(s.Pre,{children:`const id = setInterval(work, 1000);
id.unref(); // process can exit if nothing else is pending (Node)`}),e.jsx("h2",{children:"Idle callbacks (browser)"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"requestIdleCallback"})," runs when the browser is idle (low-priority work). Not supported everywhere."]})}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Timers schedule ",e.jsx("b",{children:"tasks"}),"; microtasks (Promises) run first."]}),e.jsx("li",{children:"Delays are minimums; expect clamping and throttling (esp. background tabs)."}),e.jsxs("li",{children:["Avoid ",e.jsx("code",{children:"setInterval"})," drift: prefer recursive timeout with ",e.jsx("code",{children:"performance.now()"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"requestAnimationFrame"})," for visuals; debounce/throttle for noisy events."]}),e.jsx("li",{children:"Always cancel timers; pair I/O with timeouts/AbortController for robustness."})]})]})]})}export{l as default};
