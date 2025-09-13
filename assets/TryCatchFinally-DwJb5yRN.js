import{j as e}from"./index-D5VEPJXy.js";import{S as r,E as s}from"./index-B_8JQQek.js";import{B as n}from"./Breadcrumbs-_bfjIlB_.js";function t(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Errors & Robustness",sectionPath:"/errors-robustness",topics:s}),e.jsx(r.Heading,{children:"try / catch / finally"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"try"})," runs code; if it throws, control jumps to"," ",e.jsx("code",{children:"catch"}),". ",e.jsx("code",{children:"finally"})," runs ",e.jsx("i",{children:"always"})," (after try or catch) and is ideal for cleanup. Catch can omit the binding: ",e.jsx("code",{children:"catch { ... }"}),"."]}),e.jsx("h2",{children:"Basics"}),e.jsx(r.Pre,{children:`try {
  mightFail();
} catch (err) {
  console.error("Failed:", err.message);
} finally {
  releaseResources();
}`}),e.jsx("h2",{children:"Optional catch binding"}),e.jsx(r.Pre,{children:`try { doRisky(); }
catch { /* log, fallback, etc. */ }`}),e.jsx("h2",{children:"Rethrow & error mapping"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Handle what you know; otherwise ",e.jsx("b",{children:"rethrow"})," so callers can decide."]}),e.jsxs("li",{children:["Convert low-level errors to domain errors with ",e.jsx("code",{children:"cause"}),"."]})]}),e.jsx(r.Pre,{children:`try {
  parseUserConfig(text);
} catch (e) {
  if (e instanceof SyntaxError) {
    throw new Error("Config file is invalid", { cause: e });
  }
  throw e; // unknown: bubble up
}`}),e.jsx("h2",{children:"Finally semantics"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Runs on success, on thrown errors, and even after ",e.jsx("code",{children:"return"}),"."]}),e.jsxs("li",{children:["If ",e.jsx("b",{children:"finally throws/returns"}),", it overrides earlier result."]})]}),e.jsx(r.Pre,{children:`function demo(){
  try { return 1; }
  finally { return 2; } // overrides → demo() === 2
}`}),e.jsx("h2",{children:"Async code"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["With ",e.jsx("b",{children:"Promises"}),": use ",e.jsx("code",{children:".catch"})," / ",e.jsx("code",{children:".finally"})," or wrap in"," ",e.jsx("code",{children:"try/await/catch"}),"."]}),e.jsx("li",{children:"Unhandled rejections: attach global handlers (env-specific)."})]}),e.jsx(r.Pre,{children:`// async/await
async function load(){
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (e) {
    // network/parse error
    throw new Error("Fetch failed", { cause: e });
  } finally {
    spinner.hide();
  }
}

// promises
fetch(url)
  .then(r => r.json())
  .catch(e => report(e))
  .finally(() => spinner.hide());

// global (browser)
window.addEventListener("unhandledrejection", e => console.error(e.reason));`}),e.jsx("h2",{children:"Narrowing what you catch"}),e.jsx(r.Pre,{children:`try { fn(); }
catch (e) {
  if (e instanceof RangeError) handleRange(e);
  else throw e; // don't swallow unrelated bugs
}`}),e.jsx("h2",{children:"Resource guards (classic pattern)"}),e.jsx(r.Pre,{children:`const conn = await db.open();
try {
  await conn.query("...");
} finally {
  await conn.close(); // always closes
}`}),e.jsx("h2",{children:"Multiple “catches” (emulate)"}),e.jsx(r.Pre,{children:`try { work(); }
catch (e) {
  if (isTransient(e)) retry();
  else if (e instanceof PermissionError) showPerms();
  else throw e;
}`}),e.jsx("h2",{children:"Where to place try/catch"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Prefer ",e.jsx("b",{children:"boundaries"}),": I/O, parsing, API edges, task schedulers."]}),e.jsxs("li",{children:["Don't wrap huge blocks; keep the ",e.jsx("i",{children:"risky"})," line(s) inside the try for clarity."]}),e.jsx("li",{children:"Use logging with context (input, ids) to make failures actionable."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"finally"})," always runs; if it returns/throws, it overrides previous outcome."]}),e.jsxs("li",{children:["Catch only what you can handle; otherwise ",e.jsx("b",{children:"rethrow"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"catch { ... }"})," when you don't need the error value."]}),e.jsxs("li",{children:["In async code, prefer ",e.jsx("code",{children:"try/await/catch"})," plus ",e.jsx("code",{children:"finally"})," for cleanup."]}),e.jsxs("li",{children:["Attach root cause via ",e.jsx("code",{children:"new Error(msg, { cause })"})," when remapping."]}),e.jsx("li",{children:"Put try/catch at boundaries; keep the risky statements small and explicit."})]})]})]})}export{t as default};
