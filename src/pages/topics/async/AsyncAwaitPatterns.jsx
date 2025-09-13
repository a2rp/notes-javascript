import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function AsyncAwaitPatterns() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>async/await patterns</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>async</code> functions always return a <b>Promise</b>.
                    <code>await</code> pauses inside an async function (or TLA module) until the awaited value
                    settles; it works with Promises and thenables.
                </p>

                <h2>Rules & conversions</h2>
                <ul>
                    <li><code>return x</code> → fulfills with <code>x</code>; <code>throw e</code> → rejects with <code>e</code>.</li>
                    <li><code>await p</code> unwraps <code>p</code> (or any thenable) and yields its value or throws its reason.</li>
                    <li>Use <code>try/catch</code> around awaits to handle rejections.</li>
                </ul>
                <Styled.Pre>{`async function work(){
  try {
    const data = await getJSON("/api");
    return transform(data);
  } catch (e) {
    throw new Error("Work failed", { cause: e });
  } finally {
    // cleanup
  }
}`}</Styled.Pre>

                <h2>Sequential vs parallel</h2>
                <ul>
                    <li><b>Sequential:</b> each await waits for the previous one. Simple but slower.</li>
                    <li><b>Parallel:</b> start all promises first, then <code>await Promise.all</code>.</li>
                </ul>
                <Styled.Pre>{`// sequential (slow)
for (const u of urls){
  results.push(await getJSON(u));
}

// parallel (fast)
const ps = urls.map(u => getJSON(u));
const results = await Promise.all(ps);`}</Styled.Pre>

                <h2>Start early, await later</h2>
                <p>Kick off independent tasks together; await when you need their results.</p>
                <Styled.Pre>{`const userP = getUser(id);
const postsP = getPosts(id);
// do other CPU work here...
const [user, posts] = await Promise.all([userP, postsP]);`}</Styled.Pre>

                <h2>Per-item error handling</h2>
                <ul>
                    <li>Wrap each task if you want “best-effort” behavior; collect failures.</li>
                </ul>
                <Styled.Pre>{`const ps = urls.map(async u => {
  try { return await getJSON(u); }
  catch (e){ return { error: e, url: u }; }
});
const out = await Promise.all(ps);`}</Styled.Pre>

                <h2>Loop gotchas</h2>
                <ul>
                    <li><code>forEach</code> ignores async/await — don't use it for async loops.</li>
                    <li><code>map(async)</code> creates promises; remember to <code>await Promise.all</code>.</li>
                </ul>
                <Styled.Pre>{`// ❌ won't wait
items.forEach(async item => {
  await save(item);
});

// ✅
for (const item of items) await save(item); // sequential
// or
await Promise.all(items.map(item => save(item))); // parallel`}</Styled.Pre>

                <h2>Timeouts & cancellation with AbortController</h2>
                <Styled.Pre>{`const withTimeout = (signal, ms) => {
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
const data = await fetchJSON("/slow", { signal });`}</Styled.Pre>

                <h2>Concurrency limit (pooling)</h2>
                <Styled.Pre>{`function pLimit(n){
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
const results = await Promise.all(tasks.map(t => limit(t)));`}</Styled.Pre>

                <h2>Retry/backoff (sketch)</h2>
                <Styled.Pre>{`async function retry(fn, { retries=3, base=200 } = {}){
  let last;
  for (let i=0; i<=retries; i++){
    try { return await fn(); }
    catch (e){ last = e; if (i === retries) break;
      await new Promise(r => setTimeout(r, base * 2**i));
    }
  }
  throw last;
}`}</Styled.Pre>

                <h2>Fire-and-forget (be explicit)</h2>
                <ul>
                    <li>If you intentionally don't await, attach a <code>.catch()</code> to avoid unhandled rejections.</li>
                </ul>
                <Styled.Pre>{`void logEvent(payload).catch(console.error);`}</Styled.Pre>

                <h2>Top-level await (TLA)</h2>
                <ul>
                    <li>Only in modules; importers wait for the module to finish evaluating.</li>
                    <li>Prefer parallelizing inside TLA to avoid waterfalls.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>async</code> → Promise; <code>await</code> unwraps or throws.</li>
                    <li>Parallelize independent work: start promises, then <code>await Promise.all</code>.</li>
                    <li>Never use <code>forEach</code> with <code>await</code>; use <code>for...of</code> or <code>Promise.all</code>.</li>
                    <li>Use <b>try/catch</b> at boundaries; per-item try/catch or <code>allSettled</code> for best-effort.</li>
                    <li>Pair async I/O with <b>AbortController</b>; consider timeouts, retry/backoff, and concurrency limits.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
