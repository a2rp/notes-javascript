import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function ReturnPatterns() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>Return patterns</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> A function either returns a value or finishes without one (result is{" "}
                    <code>undefined</code>). Use clear, predictable return shapes; prefer early returns over deep nesting.
                </p>

                <h2>Basics</h2>
                <ul>
                    <li>If execution hits a <code>return expr</code>, that value is produced.</li>
                    <li>No <code>return</code> → result is <code>undefined</code>.</li>
                    <li>Arrows: expression body has <b>implicit return</b>; block body needs explicit <code>return</code>.</li>
                </ul>
                <Styled.Pre>{`function f(){ }         // undefined
const inc = x => x + 1;      // implicit return
const obj = (a,b) => ({ a, b }); // return object needs ( )`}</Styled.Pre>

                <h2>Early-return (guard clauses)</h2>
                <ul>
                    <li>Fail-fast at the top; keeps the “happy path” unindented and readable.</li>
                </ul>
                <Styled.Pre>{`function save(user){
  if (!user) return { ok:false, error:"no user" };
  if (!user.id) return { ok:false, error:"missing id" };
  // happy path
  return { ok:true };
}`}</Styled.Pre>

                <h2>Returning objects vs arrays</h2>
                <ul>
                    <li><b>Objects</b> for named fields (order-free, self-documenting).</li>
                    <li><b>Arrays</b> for small, fixed tuples where position is obvious.</li>
                </ul>
                <Styled.Pre>{`function stats(nums){
  const sum = nums.reduce((a,b)=>a+b,0);
  const avg = sum / nums.length || 0;
  return { sum, avg };             // named fields
}
// tuple style:
const pair = () => [200, "OK"];    // [status, message]`}</Styled.Pre>

                <h2>Error vs value</h2>
                <ul>
                    <li><b>Throw</b> for exceptional situations; let caller handle with try/catch.</li>
                    <li>For expected failures, return a <b>Result</b>-like shape (<code>{`{ ok:boolean, value|error }`}</code>).</li>
                    <li>Don't mix patterns within the same API.</li>
                </ul>
                <Styled.Pre>{`// 1) Throwing API
function parseJson(s){
  if (typeof s !== "string") throw new TypeError("string required");
  return JSON.parse(s);
}
try { parseJson("x"); } catch (e) { /* handle */ }

// 2) Result API
function safeParse(s){
  try { return { ok:true, value: JSON.parse(s) }; }
  catch (e) { return { ok:false, error:e }; }
}`}</Styled.Pre>

                <h2>Async returns</h2>
                <ul>
                    <li><b>async</b> functions always return a <code>Promise</code>.</li>
                    <li>To catch errors inside, you must <b>await</b>; returning a promise without awaiting won't hit local <code>catch</code>.</li>
                </ul>
                <Styled.Pre>{`async function load(){
  // both lines make the returned promise adopt fetch()'s state
  // but only the first lets try/catch see the rejection here
  try {
    const res = await fetch("/api"); // local try/catch can handle
    return res.ok;
  } catch (e) {
    return false;
  }
}
// vs:
async function load2(){
  try { return fetch("/api"); }       // returning promise directly
  catch { return false; }             // won't catch fetch rejection here
}`}</Styled.Pre>

                <h2>Generators & return</h2>
                <ul>
                    <li><code>return value</code> in a generator sets <code>done:true</code> with a final value.</li>
                    <li>Consumers using <code>for…of</code> ignore that final value; it's visible via <code>iter.next()</code>.</li>
                </ul>
                <Styled.Pre>{`function* g(){ yield 1; return 99; }
const it = g();
it.next();      // { value:1, done:false }
it.next();      // { value:99, done:true }  // not seen by for…of`}</Styled.Pre>

                <h2>try/finally interaction</h2>
                <ul>
                    <li><code>finally</code> runs even after <code>return</code>. If <code>finally</code> itself returns/throws, it <b>overrides</b> the earlier return.</li>
                </ul>
                <Styled.Pre>{`function demo(){
  try { return 1; }
  finally { return 2; } // overrides
}
demo(); // 2`}</Styled.Pre>

                <h2>Loops & callbacks</h2>
                <ul>
                    <li><code>return</code> exits the entire function, not just the loop.</li>
                    <li><code>Array.prototype.forEach</code> ignores <code>return</code>/<code>break</code>; use a loop or <code>some</code>/<code>every</code>/<code>find</code>.</li>
                </ul>
                <Styled.Pre>{`function hasZero(a){
  for (const x of a) if (x === 0) return true; // early exit
  return false;
}
// forEach can't early-return outer function:
function hasZeroBad(a){
  a.forEach(x => { if (x === 0) return true; }); // returns from callback only
  return false;
}`}</Styled.Pre>

                <h2>Small patterns</h2>
                <ul>
                    <li><b>Nullish default inside:</b> <code>return (v ?? 0);</code></li>
                    <li><b>Short-circuit:</b> <code>if (!ok) return;</code></li>
                    <li><b>Void</b> to signal “intentionally no value”: <code>return void 0;</code> (rare; usually just <code>return;</code>).</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Keep returns consistent in shape and meaning; prefer early returns.</li>
                    <li>When returning objects from arrows, wrap in <code>( )</code> for implicit return.</li>
                    <li>Pick one failure strategy: throw <i>or</i> Result-type, not both.</li>
                    <li>In async functions, <b>await</b> if you want local try/catch to handle errors.</li>
                    <li>Avoid <code>forEach</code> for early exits; use loops or <code>some/every/find</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
