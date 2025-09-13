import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function PromiseUtilities() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>Promise utilities</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Combinators orchestrate many promises: wait for all, first, or gather
                    results without failing fast. Use them to run work in parallel, cap concurrency, or wrap
                    tasks with retry/timeout.
                </p>

                <h2>Promise.all (fail-fast, preserves input order)</h2>
                <ul>
                    <li>Rejects on the <b>first</b> rejection. Results follow <b>input order</b>.</li>
                </ul>
                <Styled.Pre>{`const urls = ["/a.json","/b.json","/c.json"];
const data = await Promise.all(urls.map(u => fetch(u).then(r => r.json())));
// if any fetch rejects, the whole Promise rejects`}</Styled.Pre>

                <h2>Promise.allSettled (never rejects)</h2>
                <ul>
                    <li>Always fulfills with an array of {`{status, value|reason}`}. Great for “best effort”.</li>
                </ul>
                <Styled.Pre>{`const results = await Promise.allSettled(tasks.map(t => t()));
for (const r of results){
  if (r.status === "fulfilled") console.log(r.value);
  else console.warn(r.reason);
}`}</Styled.Pre>

                <h2>Promise.race (first to settle: success OR failure)</h2>
                <Styled.Pre>{`// timeout wrapper using race
const withTimeout = (p, ms) => Promise.race([
  p,
  new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms))
]);`}</Styled.Pre>

                <h2>Promise.any (first success)</h2>
                <ul>
                    <li>Resolves on first fulfillment; rejects with <b>AggregateError</b> if all reject.</li>
                </ul>
                <Styled.Pre>{`const firstOk = await Promise.any([
  fetch("/mirror1").then(r => r.ok && r),
  fetch("/mirror2").then(r => r.ok && r),
  fetch("/mirror3").then(r => r.ok && r),
]);`}</Styled.Pre>

                <h2>Run tasks with a concurrency limit</h2>
                <Styled.Pre>{`// tiny p-limit
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
const results = await Promise.all(urls.map(u => limit(() => getJSON(u))));`}</Styled.Pre>

                <h2>Retry with exponential backoff</h2>
                <Styled.Pre>{`async function retry(fn, { retries=3, base=200 } = {}){
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
const data = await retry(() => getJSON("/maybe-flaky"));`}</Styled.Pre>

                <h2>Cancelable pattern (AbortController)</h2>
                <p>Promises don't cancel themselves; pair with <code>AbortController</code> for I/O.</p>
                <Styled.Pre>{`function fetchJSON(url, { signal } = {}){
  return fetch(url, { signal }).then(r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  });
}

const ac = new AbortController();
const p = fetchJSON("/slow", { signal: ac.signal });
// later…
ac.abort(); // fetch rejects with DOMException(name: "AbortError")`}</Styled.Pre>

                <h2>Deferred (create resolve/reject pair)</h2>
                <p>Useful at boundaries; avoid in ordinary code.</p>
                <Styled.Pre>{`function deferred(){
  let resolve, reject;
  const promise = new Promise((res, rej) => (resolve = res, reject = rej));
  return { promise, resolve, reject };
}
const d = deferred();
setTimeout(() => d.resolve(42), 100);
const v = await d.promise; // 42`}</Styled.Pre>

                <h2>All on objects (preserve keys)</h2>
                <Styled.Pre>{`async function allObject(obj){
  const entries = Object.entries(obj);
  const values = await Promise.all(entries.map(([,p]) => p));
  return Object.fromEntries(entries.map(([k], i) => [k, values[i]]));
}
// usage
const out = await allObject({ a: getA(), b: getB() });`}</Styled.Pre>

                <h2>Pipeline: parallelize then map results</h2>
                <Styled.Pre>{`const ids = [1,2,3,4];
const users = await Promise.all(ids.map(id => getUser(id)));
const names = users.map(u => u.name);`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>all</b>: fail-fast, preserves input order; <b>allSettled</b>: never rejects.</li>
                    <li><b>race</b>: first settle wins (success or failure); <b>any</b>: first success wins.</li>
                    <li>Cap concurrency with a queue; use retries/backoff for transient errors.</li>
                    <li>Promises aren't cancelable-combine with <b>AbortController</b> for I/O.</li>
                    <li>Prefer parallel fetch + single await; avoid accidental sequential awaits in loops.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
