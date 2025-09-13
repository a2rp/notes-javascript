import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ER_TOPICS } from "./topics.meta";

export default function TryCatchFinally() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Errors & Robustness"
                sectionPath="/errors-robustness"
                topics={ER_TOPICS}
            />

            <Styled.Heading>try / catch / finally</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>try</code> runs code; if it throws, control jumps to{" "}
                    <code>catch</code>. <code>finally</code> runs <i>always</i> (after try or catch) and is
                    ideal for cleanup. Catch can omit the binding: <code>catch &#123; ... &#125;</code>.
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`try {
  mightFail();
} catch (err) {
  console.error("Failed:", err.message);
} finally {
  releaseResources();
}`}</Styled.Pre>

                <h2>Optional catch binding</h2>
                <Styled.Pre>{`try { doRisky(); }
catch { /* log, fallback, etc. */ }`}</Styled.Pre>

                <h2>Rethrow & error mapping</h2>
                <ul>
                    <li>Handle what you know; otherwise <b>rethrow</b> so callers can decide.</li>
                    <li>Convert low-level errors to domain errors with <code>cause</code>.</li>
                </ul>
                <Styled.Pre>{`try {
  parseUserConfig(text);
} catch (e) {
  if (e instanceof SyntaxError) {
    throw new Error("Config file is invalid", { cause: e });
  }
  throw e; // unknown: bubble up
}`}</Styled.Pre>

                <h2>Finally semantics</h2>
                <ul>
                    <li>Runs on success, on thrown errors, and even after <code>return</code>.</li>
                    <li>If <b>finally throws/returns</b>, it overrides earlier result.</li>
                </ul>
                <Styled.Pre>{`function demo(){
  try { return 1; }
  finally { return 2; } // overrides → demo() === 2
}`}</Styled.Pre>

                <h2>Async code</h2>
                <ul>
                    <li>
                        With <b>Promises</b>: use <code>.catch</code> / <code>.finally</code> or wrap in{" "}
                        <code>try/await/catch</code>.
                    </li>
                    <li>Unhandled rejections: attach global handlers (env-specific).</li>
                </ul>
                <Styled.Pre>{`// async/await
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
window.addEventListener("unhandledrejection", e => console.error(e.reason));`}</Styled.Pre>

                <h2>Narrowing what you catch</h2>
                <Styled.Pre>{`try { fn(); }
catch (e) {
  if (e instanceof RangeError) handleRange(e);
  else throw e; // don't swallow unrelated bugs
}`}</Styled.Pre>

                <h2>Resource guards (classic pattern)</h2>
                <Styled.Pre>{`const conn = await db.open();
try {
  await conn.query("...");
} finally {
  await conn.close(); // always closes
}`}</Styled.Pre>

                <h2>Multiple “catches” (emulate)</h2>
                <Styled.Pre>{`try { work(); }
catch (e) {
  if (isTransient(e)) retry();
  else if (e instanceof PermissionError) showPerms();
  else throw e;
}`}</Styled.Pre>

                <h2>Where to place try/catch</h2>
                <ul>
                    <li>Prefer <b>boundaries</b>: I/O, parsing, API edges, task schedulers.</li>
                    <li>Don't wrap huge blocks; keep the <i>risky</i> line(s) inside the try for clarity.</li>
                    <li>Use logging with context (input, ids) to make failures actionable.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>finally</code> always runs; if it returns/throws, it overrides previous outcome.</li>
                    <li>Catch only what you can handle; otherwise <b>rethrow</b>.</li>
                    <li>Use <code>catch &#123; ... &#125;</code> when you don't need the error value.</li>
                    <li>In async code, prefer <code>try/await/catch</code> plus <code>finally</code> for cleanup.</li>
                    <li>Attach root cause via <code>new Error(msg, &#123; cause &#125;)</code> when remapping.</li>
                    <li>Put try/catch at boundaries; keep the risky statements small and explicit.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
