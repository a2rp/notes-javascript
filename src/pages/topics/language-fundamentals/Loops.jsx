import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Loops() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Loops</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Repetition constructs: <b>for</b>, <b>while</b>, <b>do…while</b>. Use array methods for pure transforms; loops are great for early exits and complex control.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>for</h2>
                <ul>
                    <li>Classic counter; init → test → update each iteration.</li>
                    <li>Use <b>let</b> for the index (fresh per iteration; plays well with closures).</li>
                </ul>
                <Styled.Pre>{`for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) { found = i; break; }
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>while / do…while</h2>
                <ul>
                    <li><b>while</b>: runs while condition is truthy.</li>
                    <li><b>do…while</b>: runs once, then checks.</li>
                </ul>
                <Styled.Pre>{`let n = 3;
while (n--) { /* runs 3 times */ }

let input;
do { input = get(); } while (!valid(input));`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Iterating arrays & iterables</h2>
                <ul>
                    <li><b>for…of</b> iterates values of any iterable (arrays, strings, Maps, Sets).</li>
                    <li><b>for…in</b> iterates <i>keys</i> (incl. inherited) — avoid on arrays (use its own topic for details).</li>
                </ul>
                <Styled.Pre>{`for (const v of [10,20,30]) { /* v = 10,20,30 */ }
for (const ch of "hi") { /* h, i */ }

// Map / Set
for (const [k,v] of new Map([["a",1]])) { /* ... */ }`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Early exit & skipping</h2>
                <ul>
                    <li><b>break</b> exits the loop; <b>continue</b> skips to next iteration.</li>
                    <li>For nested loops, labels are possible but use sparingly (see “Labels, break, continue”).</li>
                </ul>
                <Styled.Pre>{`for (const v of arr) {
  if (!v) continue;
  if (v.id === id) { result = v; break; }
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>When to prefer methods</h2>
                <ul>
                    <li><b>map/filter/reduce</b> for pure transformations.</li>
                    <li><b>some/every/find</b> express intent + allow early result.</li>
                </ul>
                <Styled.Pre>{`const names = users.map(u => u.name);
const firstAdult = users.find(u => u.age >= 18);
const allValid = items.every(isValid);`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Async notes</h2>
                <ul>
                    <li><b>await in a plain loop</b> runs sequentially (good for rate limits, slower overall).</li>
                    <li>For parallel work: collect promises then <code>await Promise.all(promises)</code>.</li>
                    <li><b>for await…of</b> consumes async iterables (streams, paginated APIs).</li>
                </ul>
                <Styled.Pre>{`// sequential (ordered)
for (const url of urls) {
  const res = await fetch(url);
}

// parallel
const promises = urls.map(u => fetch(u));
const results = await Promise.all(promises);

// async iterable
for await (const chunk of stream) {
  // handle chunk
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Performance & safety</h2>
                <ul>
                    <li>Avoid reading <code>arr.length</code> each time in hot paths (cache it).</li>
                    <li>Mutating array while iterating can skip/duplicate work; prefer immutable updates or iterate a copy.</li>
                    <li>Use numeric <code>for</code> for tight loops; readability first.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Use <b>for…of</b> for values; avoid <b>for…in</b> on arrays.</li>
                    <li>Prefer array methods for pure transforms; loops for early exit / complex control.</li>
                    <li>Pick sequential vs parallel consciously when using <code>await</code>.</li>
                    <li>Keep loop variables block-scoped with <b>let</b>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
