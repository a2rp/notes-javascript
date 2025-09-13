import{j as e}from"./index-4OJNB7vi.js";import{S as r,A as s}from"./index-BQk2fBqD.js";import{B as t}from"./Breadcrumbs-BWCvk1iJ.js";function a(){return e.jsxs(r.Wrapper,{children:[e.jsx(t,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:s}),e.jsx(r.Heading,{children:"Promise utilities"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Combinators orchestrate many promises: wait for all, first, or gather results without failing fast. Use them to run work in parallel, cap concurrency, or wrap tasks with retry/timeout."]}),e.jsx("h2",{children:"Promise.all (fail-fast, preserves input order)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Rejects on the ",e.jsx("b",{children:"first"})," rejection. Results follow ",e.jsx("b",{children:"input order"}),"."]})}),e.jsx(r.Pre,{children:`const urls = ["/a.json","/b.json","/c.json"];
const data = await Promise.all(urls.map(u => fetch(u).then(r => r.json())));
// if any fetch rejects, the whole Promise rejects`}),e.jsx("h2",{children:"Promise.allSettled (never rejects)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Always fulfills with an array of ","{status, value|reason}",". Great for “best effort”."]})}),e.jsx(r.Pre,{children:`const results = await Promise.allSettled(tasks.map(t => t()));
for (const r of results){
  if (r.status === "fulfilled") console.log(r.value);
  else console.warn(r.reason);
}`}),e.jsx("h2",{children:"Promise.race (first to settle: success OR failure)"}),e.jsx(r.Pre,{children:`// timeout wrapper using race
const withTimeout = (p, ms) => Promise.race([
  p,
  new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))
]);`}),e.jsx("h2",{children:"Promise.any (first success)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Resolves on first fulfillment; rejects with ",e.jsx("b",{children:"AggregateError"})," if all reject."]})}),e.jsx(r.Pre,{children:`const firstOk = await Promise.any([
  fetch("/mirror1").then(r => r.ok && r),
  fetch("/mirror2").then(r => r.ok && r),
  fetch("/mirror3").then(r => r.ok && r),
]);`}),e.jsx("h2",{children:"Run tasks with a concurrency limit"}),e.jsx(r.Pre,{children:`// tiny p-limit
function pLimit(concurrency){
  const q = [];
  let active = 0;
  const run = async (fn, resolve, reject) => {
    active++;
    try { resolve(await fn()); }
    catch (e){ reject(e); }
    finally {
      active--;
      if (q.length) q.shift()();
    }
  };
  return (fn) => new Promise((res, rej) => {
    const start = () => run(fn, res, rej);
    active < concurrency ? start() : q.push(start);
  });
}

// usage
const limit = pLimit(3);
const results = await Promise.all(urls.map(u => limit(() => getJSON(u))));`}),e.jsx("h2",{children:"Retry with exponential backoff"}),e.jsx(r.Pre,{children:`async function retry(fn, { retries=3, base=200 } = {}){
  let attempt = 0, lastErr;
  while (attempt <= retries){
    try { return await fn(); }
    catch (e){ lastErr = e; if (attempt++ === retries) break;
      await new Promise(r => setTimeout(r, base * 2**(attempt-1)));
    }
  }
  throw lastErr;
}

// usage
const data = await retry(() => getJSON("/maybe-flaky"));`}),e.jsx("h2",{children:"Cancelable pattern (AbortController)"}),e.jsxs("p",{children:["Promises don't cancel themselves; pair with ",e.jsx("code",{children:"AbortController"})," for I/O."]}),e.jsx(r.Pre,{children:`function fetchJSON(url, { signal } = {}){
  return fetch(url, { signal }).then(r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  });
}

const ac = new AbortController();
const p = fetchJSON("/slow", { signal: ac.signal });
// later…
ac.abort(); // fetch rejects with DOMException(name: "AbortError")`}),e.jsx("h2",{children:"Deferred (create resolve/reject pair)"}),e.jsx("p",{children:"Useful at boundaries; avoid in ordinary code."}),e.jsx(r.Pre,{children:`function deferred(){
  let resolve, reject;
  const promise = new Promise((res, rej) => (resolve = res, reject = rej));
  return { promise, resolve, reject };
}
const d = deferred();
setTimeout(() => d.resolve(42), 100);
const v = await d.promise; // 42`}),e.jsx("h2",{children:"All on objects (preserve keys)"}),e.jsx(r.Pre,{children:`async function allObject(obj){
  const entries = Object.entries(obj);
  const values = await Promise.all(entries.map(([,p]) => p));
  return Object.fromEntries(entries.map(([k], i) => [k, values[i]]));
}
// usage
const out = await allObject({ a: getA(), b: getB() });`}),e.jsx("h2",{children:"Pipeline: parallelize then map results"}),e.jsx(r.Pre,{children:`const ids = [1,2,3,4];
const users = await Promise.all(ids.map(id => getUser(id)));
const names = users.map(u => u.name);`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"all"}),": fail-fast, preserves input order; ",e.jsx("b",{children:"allSettled"}),": never rejects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"race"}),": first settle wins (success or failure); ",e.jsx("b",{children:"any"}),": first success wins."]}),e.jsx("li",{children:"Cap concurrency with a queue; use retries/backoff for transient errors."}),e.jsxs("li",{children:["Promises aren't cancelable-combine with ",e.jsx("b",{children:"AbortController"})," for I/O."]}),e.jsx("li",{children:"Prefer parallel fetch + single await; avoid accidental sequential awaits in loops."})]})]})]})}export{a as default};
