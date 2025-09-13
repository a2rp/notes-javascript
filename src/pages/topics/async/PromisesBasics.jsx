import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function PromisesBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>Promises: basics</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> A <code>Promise</code> represents a value that may arrive later. It has
                    3 states: <b>pending → fulfilled</b> (value) or <b>rejected</b> (reason). Callbacks are
                    queued with <code>then</code>/<code>catch</code>/<code>finally</code> and run as{" "}
                    <b>microtasks</b>.
                </p>

                <h2>Create</h2>
                <Styled.Pre>{`// From callback API
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(42), 200);
});

// From existing value / error
Promise.resolve(5);            // fulfilled
Promise.reject(new Error("x"));`}</Styled.Pre>

                <h2>Consume</h2>
                <Styled.Pre>{`p.then(v => v * 2)           // chain (returns a new promise)
 .then(x => console.log(x))
 .catch(err => console.error(err))  // handles any prior rejection
 .finally(() => console.log("done"));`}</Styled.Pre>

                <h2>Chaining & return rules</h2>
                <ul>
                    <li>Return a value → next <code>then</code> gets it.</li>
                    <li>Return a promise → chain <i>awaits</i> it.</li>
                    <li>Throw / return rejected promise → jumps to next <code>catch</code>.</li>
                </ul>
                <Styled.Pre>{`Promise.resolve(2)
  .then(x => x + 1)             // 3
  .then(x => Promise.resolve(x * 10)) // 30
  .then(console.log)            // 30
  .catch(console.error);`}</Styled.Pre>

                <h2>Error propagation</h2>
                <Styled.Pre>{`Promise.resolve()
  .then(() => { throw new Error("boom"); })
  .then(() => console.log("won't run"))
  .catch(e => console.log("caught:", e.message))
  .then(() => console.log("continues"));`}</Styled.Pre>

                <h2>Thenables (interop)</h2>
                <p>
                    Any object with <code>then(resolve, reject)</code> is a <i>thenable</i>. Promises
                    assimilate it.
                </p>
                <Styled.Pre>{`const thenable = { then: (res) => res("ok") };
Promise.resolve(thenable).then(console.log); // "ok"`}</Styled.Pre>

                <h2>Microtask timing</h2>
                <Styled.Pre>{`console.log("A");
Promise.resolve().then(() => console.log("micro"));
setTimeout(() => console.log("timer"));
console.log("B");
// A, B, micro, timer`}</Styled.Pre>

                <h2>Converting callbacks → promises (promisify)</h2>
                <Styled.Pre>{`// Node-style: (args..., cb(err, result))
const promisify = (fn) => (...args) => new Promise((res, rej) =>
  fn(...args, (err, val) => err ? rej(err) : res(val))
);`}</Styled.Pre>

                <h2>Common gotchas</h2>
                <ul>
                    <li>
                        <b>Forgot return:</b> always <code>return</code> the inner promise in a <code>then</code>{" "}
                        chain (or use <code>async/await</code>).
                    </li>
                    <li>
                        <b>Double handlers:</b> either chain with <code>then().catch()</code> <i>or</i>{" "}
                        pass both callbacks to one <code>then(onFulfilled, onRejected)</code>, not both.
                    </li>
                    <li>
                        <b>Unreturned setTimeout:</b> work done inside timers isn't part of the chain unless you
                        wrap/return a promise.
                    </li>
                    <li>
                        <b>Unhandled rejections:</b> attach a <code>catch</code>; envs report them globally.
                    </li>
                </ul>

                <h2>Small patterns</h2>
                <Styled.Pre>{`// 1) Wrap fetch with helpful errors
const getJSON = (url) =>
  fetch(url).then(async r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  });

// 2) Timeout a promise
const withTimeout = (p, ms) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error("Timeout")), ms);
  p.then(v => { clearTimeout(t); res(v); },
         e => { clearTimeout(t); rej(e); });
});

// 3) Sequential vs parallel
const seq = async (urls) => {
  const out = [];
  for (const u of urls) out.push(await getJSON(u)); // sequential
  return out;
};
const par = (urls) => Promise.all(urls.map(getJSON)); // parallel`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>States: pending → fulfilled/rejected; callbacks run as <b>microtasks</b>.</li>
                    <li><code>then</code> chains; return values/promises appropriately; <code>catch</code> handles prior errors.</li>
                    <li>Promises assimilate <b>thenables</b>.</li>
                    <li>Always end chains with <code>catch</code> (or use <code>try/await/catch</code>).</li>
                    <li>Prefer parallelizing with <code>Promise.all</code> where possible; use timeouts for I/O.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
