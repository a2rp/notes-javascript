import{j as e}from"./index-4OJNB7vi.js";import{S as s,A as r}from"./index-BQk2fBqD.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";function l(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:r}),e.jsx(s.Heading,{children:"Event loop"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," The ",e.jsx("i",{children:"event loop"})," coordinates JS execution (single-threaded) with async work provided by the environment (browser/Web APIs or Node). JS runs on a"," ",e.jsx("b",{children:"call stack"}),"; async callbacks wait in queues until the loop picks them."]}),e.jsx("h2",{children:"Mental model"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stack"}),": where the currently executing frames live."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tasks (macrotasks)"}),": e.g., ",e.jsx("code",{children:"setTimeout"}),", ",e.jsx("code",{children:"message"}),", I/O."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Microtasks (jobs)"}),": e.g., ",e.jsx("code",{children:"Promise.then"}),", ",e.jsx("code",{children:"queueMicrotask"}),"."]}),e.jsxs("li",{children:["Loop rule (browser): run ",e.jsx("b",{children:"one task"})," → then ",e.jsx("b",{children:"drain all microtasks"})," → possibly"," ",e.jsx("b",{children:"render"})," → repeat."]})]}),e.jsx("h2",{children:"Common sources"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tasks:"})," ",e.jsx("code",{children:"setTimeout"}),", ",e.jsx("code",{children:"setInterval"}),", DOM events, network,",e.jsx("code",{children:"postMessage"}),", ",e.jsx("code",{children:"requestAnimationFrame"})," callback (runs in a rendering step)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Microtasks:"})," ",e.jsx("code",{children:"Promise.then/catch/finally"}),","," ",e.jsx("code",{children:"queueMicrotask"}),", ",e.jsx("code",{children:"MutationObserver"}),". (Node also has"," ",e.jsx("code",{children:"process.nextTick"})," which runs even before Promise microtasks.)"]})]}),e.jsx("h2",{children:"Order demo (microtasks beat timers)"}),e.jsx(s.Pre,{children:`console.log("A");
setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("micro"));
console.log("B");
// A, B, micro, timer`}),e.jsx("h2",{children:"Draining microtasks (and starvation)"}),e.jsx("p",{children:"Microtasks run to completion before the next task. Continuously scheduling microtasks can starve timers/UI."}),e.jsx(s.Pre,{children:`let i = 0;
function badSpin(){
  if (i++ < 1_000_000) queueMicrotask(badSpin);
}
queueMicrotask(badSpin);   // UI/timers may stall — avoid tight microtask loops`}),e.jsx("h2",{children:"Yield back to the loop"}),e.jsx("ul",{children:e.jsxs("li",{children:["Break long work into chunks and ",e.jsx("b",{children:"yield"})," to allow rendering/timers."]})}),e.jsx(s.Pre,{children:`// simple yield helpers
const tick = () => new Promise(r => setTimeout(r));      // next task
const micro = () => new Promise(r => queueMicrotask(r));  // next microtask

async function chunked(items, fn){
  for (let i = 0; i < items.length; i++){
    fn(items[i]);
    if (i % 100 === 0) await tick(); // let UI breathe
  }
}`}),e.jsx("h2",{children:"Rendering phase bits (browser)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"requestAnimationFrame(cb)"})," runs ",e.jsx("b",{children:"before paint"})," (good for measuring & animating)."]}),e.jsxs("li",{children:["After each task, the browser ",e.jsx("b",{children:"drains microtasks"})," and may perform layout/paint. If you add microtasks repeatedly, you may delay a frame."]})]}),e.jsx("h2",{children:"Timers: clamping & drift"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Nested timers clamp to ~",e.jsx("b",{children:"4ms minimum"})," in pages; background tabs are throttled (timers may run as slow as ~1s)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"setInterval"})," can drift; prefer recursive ",e.jsx("code",{children:"setTimeout"})," if you need control."]})]}),e.jsx(s.Pre,{children:`function every(ms, fn){
  let cancelled = false;
  (function loop(next){
    if (cancelled) return;
    const t0 = performance.now();
    fn();
    const elapsed = performance.now() - t0;
    setTimeout(() => loop(ms), Math.max(0, ms - elapsed));
  })(ms);
  return () => (cancelled = true);
}`}),e.jsx("h2",{children:"Node.js notes (high level)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Node uses libuv phases: ",e.jsx("i",{children:"timers → pending → poll → check → close"}),"."]}),e.jsxs("li",{children:["After each phase's callbacks, Node processes microtasks."," ",e.jsx("code",{children:"process.nextTick"})," runs ",e.jsx("b",{children:"before"})," Promise microtasks."]})]}),e.jsx(s.Pre,{children:`setTimeout(() => console.log("timer"));
Promise.resolve().then(() => console.log("promise"));
process.nextTick(() => console.log("nextTick"));
// nextTick, promise, timer (typical order)`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"One task at a time → then drain all microtasks → maybe render → repeat."}),e.jsxs("li",{children:["Microtasks (Promises) run ",e.jsx("b",{children:"before"})," timers; don't create infinite microtask loops."]}),e.jsxs("li",{children:["For UI-friendly work, ",e.jsx("b",{children:"yield"})," via ",e.jsx("code",{children:"setTimeout(… ,0)"})," or schedule to"," ",e.jsx("code",{children:"rAF"})," for animation."]}),e.jsx("li",{children:"Timers clamp (≈4ms nested) and throttle in background tabs."}),e.jsxs("li",{children:["In Node, ",e.jsx("code",{children:"process.nextTick"})," runs before Promise microtasks; don't overuse it."]})]})]})]})}export{l as default};
