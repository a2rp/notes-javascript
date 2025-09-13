import{j as e}from"./index-COrpvOC4.js";import{S as s,A as r}from"./index-Bl6SJSVb.js";import{B as t}from"./Breadcrumbs-DQDVi04u.js";function l(){return e.jsxs(s.Wrapper,{children:[e.jsx(t,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:r}),e.jsx(s.Heading,{children:"async/await patterns"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"async"})," functions always return a ",e.jsx("b",{children:"Promise"}),".",e.jsx("code",{children:"await"})," pauses inside an async function (or TLA module) until the awaited value settles; it works with Promises and thenables."]}),e.jsx("h2",{children:"Rules & conversions"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"return x"})," → fulfills with ",e.jsx("code",{children:"x"}),"; ",e.jsx("code",{children:"throw e"})," → rejects with ",e.jsx("code",{children:"e"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"await p"})," unwraps ",e.jsx("code",{children:"p"})," (or any thenable) and yields its value or throws its reason."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"try/catch"})," around awaits to handle rejections."]})]}),e.jsx(s.Pre,{children:`async function work(){
  try {
    const data = await getJSON("/api");
    return transform(data);
  } catch (e) {
    throw new Error("Work failed", { cause: e });
  } finally {
    // cleanup
  }
}`}),e.jsx("h2",{children:"Sequential vs parallel"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Sequential:"})," each await waits for the previous one. Simple but slower."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parallel:"})," start all promises first, then ",e.jsx("code",{children:"await Promise.all"}),"."]})]}),e.jsx(s.Pre,{children:`// sequential (slow)
for (const u of urls){
  results.push(await getJSON(u));
}

// parallel (fast)
const ps = urls.map(u => getJSON(u));
const results = await Promise.all(ps);`}),e.jsx("h2",{children:"Start early, await later"}),e.jsx("p",{children:"Kick off independent tasks together; await when you need their results."}),e.jsx(s.Pre,{children:`const userP = getUser(id);
const postsP = getPosts(id);
// do other CPU work here...
const [user, posts] = await Promise.all([userP, postsP]);`}),e.jsx("h2",{children:"Per-item error handling"}),e.jsx("ul",{children:e.jsx("li",{children:"Wrap each task if you want “best-effort” behavior; collect failures."})}),e.jsx(s.Pre,{children:`const ps = urls.map(async u => {
  try { return await getJSON(u); }
  catch (e){ return { error: e, url: u }; }
});
const out = await Promise.all(ps);`}),e.jsx("h2",{children:"Loop gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"forEach"})," ignores async/await — don't use it for async loops."]}),e.jsxs("li",{children:[e.jsx("code",{children:"map(async)"})," creates promises; remember to ",e.jsx("code",{children:"await Promise.all"}),"."]})]}),e.jsx(s.Pre,{children:`// ❌ won't wait
items.forEach(async item => {
  await save(item);
});

// ✅
for (const item of items) await save(item); // sequential
// or
await Promise.all(items.map(item => save(item))); // parallel`}),e.jsx("h2",{children:"Timeouts & cancellation with AbortController"}),e.jsx(s.Pre,{children:`const withTimeout = (signal, ms) => {
  if (signal?.aborted) return signal;
  const ac = new AbortController();
  const onAbort = () => ac.abort();
  signal?.addEventListener("abort", onAbort, { once: true });
  setTimeout(() => ac.abort(), ms);
  return ac.signal;
};

async function fetchJSON(url, { signal } = {}){
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
  return r.json();
}

// usage
const ac = new AbortController();
const signal = withTimeout(ac.signal, 8000);
const data = await fetchJSON("/slow", { signal });`}),e.jsx("h2",{children:"Concurrency limit (pooling)"}),e.jsx(s.Pre,{children:`function pLimit(n){
  let act = 0, q = [];
  const next = () => { if (act < n && q.length) q.shift()(); };
  return (fn) => new Promise((res, rej) => {
    const run = async () => {
      act++; try { res(await fn()); } catch(e){ rej(e); } finally { act--; next(); }
    };
    act < n ? run() : q.push(run);
  });
}

const limit = pLimit(4);
const results = await Promise.all(tasks.map(t => limit(t)));`}),e.jsx("h2",{children:"Retry/backoff (sketch)"}),e.jsx(s.Pre,{children:`async function retry(fn, { retries=3, base=200 } = {}){
  let last;
  for (let i=0; i<=retries; i++){
    try { return await fn(); }
    catch (e){ last = e; if (i === retries) break;
      await new Promise(r => setTimeout(r, base * 2**i));
    }
  }
  throw last;
}`}),e.jsx("h2",{children:"Fire-and-forget (be explicit)"}),e.jsx("ul",{children:e.jsxs("li",{children:["If you intentionally don't await, attach a ",e.jsx("code",{children:".catch()"})," to avoid unhandled rejections."]})}),e.jsx(s.Pre,{children:"void logEvent(payload).catch(console.error);"}),e.jsx("h2",{children:"Top-level await (TLA)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Only in modules; importers wait for the module to finish evaluating."}),e.jsx("li",{children:"Prefer parallelizing inside TLA to avoid waterfalls."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"async"})," → Promise; ",e.jsx("code",{children:"await"})," unwraps or throws."]}),e.jsxs("li",{children:["Parallelize independent work: start promises, then ",e.jsx("code",{children:"await Promise.all"}),"."]}),e.jsxs("li",{children:["Never use ",e.jsx("code",{children:"forEach"})," with ",e.jsx("code",{children:"await"}),"; use ",e.jsx("code",{children:"for...of"})," or ",e.jsx("code",{children:"Promise.all"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"try/catch"})," at boundaries; per-item try/catch or ",e.jsx("code",{children:"allSettled"})," for best-effort."]}),e.jsxs("li",{children:["Pair async I/O with ",e.jsx("b",{children:"AbortController"}),"; consider timeouts, retry/backoff, and concurrency limits."]})]})]})]})}export{l as default};
