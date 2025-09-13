import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function ForOfForIn() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>for…of vs for…in</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>for…of</code> iterates <b>values of an iterable</b> (arrays, strings, Maps, Sets, generators).{" "}
                    <code>for…in</code> iterates <b>enumerable property keys</b> of an object, including inherited ones.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>When to use what</h2>
                <ul>
                    <li><b>Arrays / strings / Maps / Sets:</b> use <code>for…of</code>.</li>
                    <li><b>Plain objects:</b> use <code>Object.keys/values/entries</code> with <code>for…of</code> (or guard <code>for…in</code> with <code>Object.hasOwn</code>).</li>
                    <li><b>Avoid</b> <code>for…in</code> on arrays (indexes as strings, includes inherited keys, order not for performance-critical code).</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// Arrays (values)
for (const v of [10, 20, 30]) {
  // 10, 20, 30
}

// Index + value
const nums = [4,5,6];
for (const [i, v] of nums.entries()) {
  // i=0,1,2 ; v=4,5,6
}

// Strings (code units)
for (const ch of "hi") { /* "h","i" */ }

// Map / Set
const m = new Map([["a",1],["b",2]]);
for (const [k,v] of m) { /* "a",1 then "b",2 */ }

const s = new Set([1,2,3]);
for (const v of s) { /* 1,2,3 */ }`}</Styled.Pre>

                <Styled.Pre>{`// for…in over objects (keys)
const obj = Object.create({ inherited: 1 });
obj.own = 2;

for (const k in obj) {
  // "inherited" and "own" both appear (if enumerable)
  if (!Object.hasOwn(obj, k)) continue; // guard inherited
  // use obj[k]
}`}</Styled.Pre>

                <Styled.Pre>{`// Prefer Object.keys/entries with for…of
for (const k of Object.keys(obj)) {
  // own enumerable keys only
}
for (const [k,v] of Object.entries(obj)) {
  // k, v
}`}</Styled.Pre>

                <Styled.Pre>{`// Sparse arrays: for…of skips holes
const a = [, , 3];           // holes at 0 and 1
[...a];                      // [empty × 2, 3]
for (const v of a) { /* only 3 */ }`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Behavior notes</h2>
                <ul>
                    <li><b>for…of</b> uses the iterable protocol (<code>Symbol.iterator</code>); works with user-defined iterables.</li>
                    <li><b>for…in</b> lists enumerable string keys (skips symbols); includes inherited enumerable properties unless guarded.</li>
                    <li>Property enumeration order is not something to rely on for <code>for…in</code>; use <code>Object.keys</code> when you need predictable own-key order.</li>
                    <li><b>Break/continue/return</b> work with both; unlike <code>forEach</code>, which can’t use <code>break</code>/<code>continue</code> and doesn’t await.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Async note</h2>
                <ul>
                    <li>Use <code>for await…of</code> to consume <b>async iterables</b> (streams, paginated APIs). (Covered in Asynchrony section.)</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Arrays/iterables ⇒ <b>for…of</b>; Objects ⇒ <b>Object.keys/entries + for…of</b>.</li>
                    <li>If you must use <b>for…in</b>, guard with <code>Object.hasOwn(obj, k)</code>.</li>
                    <li>Don’t depend on <b>for…in</b> order; avoid it on arrays.</li>
                    <li>Need index in <b>for…of</b>? Use <code>arr.entries()</code> or a classic <code>for (let i=0…)</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
