import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function ArraysBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Arrays: basics</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Array is an ordered list with a numeric <i>index</i> and a mutable{" "}
                    <code>length</code>. Prefer <b>dense</b> arrays (no holes). Most methods are O(n) and
                    <b> shallow</b> (copy references).
                </p>

                <h2>Create (safe patterns)</h2>
                <Styled.Pre>{`const a = [1,2,3];              // literal (best)
const b = Array.of(5);         // [5]  (avoids 'new Array(5)' trap)
const c = Array.from("abc");   // ["a","b","c"] from iterable/array-like
const d = Array.from({ length: 3 }, (_, i) => i); // [0,1,2] with map`}</Styled.Pre>
                <ul>
                    <li>
                        <b>Avoid</b> <code>new Array(n)</code> unless you mean "length n with holes".
                    </li>
                </ul>

                <h2>Length & indexing</h2>
                <Styled.Pre>{`const xs = [10,20];
xs.length;          // 2
xs.length = 1;      // truncates → [10]
xs[5] = 99;         // creates holes between 1..4 → length = 6 (sparse)
xs.at(-1);          // 99 (negative index reader)`}</Styled.Pre>

                <h2>Sparse vs dense (important)</h2>
                <ul>
                    <li>"Holes" are missing indices; many methods <b>skip</b> holes.</li>
                    <li>Prefer dense arrays: use <code>splice</code> to remove, not <code>delete</code>.</li>
                </ul>
                <Styled.Pre>{`const a = [1,2,3];
delete a[1];        // [1, <hole>, 3]  (sparse)
a.length;           // 3
a.map(x => x);      // [1, <hole>, 3]  (hole preserved)
const b = [1,2,3]; b.splice(1,1); // [1,3] (dense)`}</Styled.Pre>

                <h2>Mutating vs copy (modern APIs)</h2>
                <ul>
                    <li>
                        <b>Mutate:</b> <code>push/pop</code>, <code>shift/unshift</code>, <code>splice</code>,{" "}
                        <code>sort</code>, <code>reverse</code>, <code>fill</code>, <code>copyWithin</code>.
                    </li>
                    <li>
                        <b>Non-mutating copies:</b> <code>toSorted</code>, <code>toReversed</code>,{" "}
                        <code>toSpliced</code>, <code>with</code> (updates one index).
                    </li>
                </ul>
                <Styled.Pre>{`const a = [3,1,2];
a.sort();           // mutates → [1,2,3]

const b = [3,1,2];
const c = b.toSorted();  // b unchanged; c = [1,2,3]

const d = [10,20,30].with(1, 99); // [10,99,30] (copy) `}</Styled.Pre>

                <h2>Essential methods (daily)</h2>
                <Styled.Pre>{`const xs = [1,2,3];
// add/remove
xs.push(4); xs.pop();        // tail
xs.unshift(0); xs.shift();   // head
xs.splice(1, 1, 9);          // at idx 1 remove 1, insert 9

// slice/concat (copying)
const copy = xs.slice();     // shallow clone
const merged = xs.concat([7,8]); // new array

// search
[1,2,NaN].indexOf(NaN);      // -1  (can't find NaN)
[1,2,NaN].includes(NaN);     // true (SameValueZero)

// iteration helpers
for (const x of xs) {}       // values
for (const [i,x] of xs.entries()) {} // index+value
xs.forEach(v => { /* no early return */ });`}</Styled.Pre>

                <h2>Array-like & iterable</h2>
                <ul>
                    <li>
                        Convert with <code>Array.from(arrayLike)</code> or spread <code>[...iterable]</code>.
                    </li>
                    <li>
                        DOM <code>NodeList</code>, <code>arguments</code>, typed arrays are array-likes/iterables.
                    </li>
                </ul>
                <Styled.Pre>{`function f(){ return Array.from(arguments); }  // real array
const els = document.querySelectorAll("div");
[...els].map(e => e.id);`}</Styled.Pre>

                <h2>Type checks</h2>
                <Styled.Pre>{`Array.isArray([]);            // true
Array.isArray({ length: 0 }); // false`}</Styled.Pre>

                <h2>Fill & copyWithin (in-place tools)</h2>
                <Styled.Pre>{`new Array(4).fill(0);     // [0,0,0,0]
[1,2,3,4].copyWithin(1, 0, 2); // [1,1,2,4]  (target=1 ← from 0..2)`}</Styled.Pre>

                <h2>String ↔ array</h2>
                <Styled.Pre>{`"a,b,c".split(",");   // ["a","b","c"]
["a","b"].join("-"); // "a-b"`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Use literals, <code>Array.of</code>, or <code>Array.from</code> to create arrays.</li>
                    <li>
                        Avoid holes; use <code>splice</code> (not <code>delete</code>) to remove so arrays stay dense.
                    </li>
                    <li>
                        Prefer copy helpers (<code>toSorted</code>/<code>toReversed</code>/<code>toSpliced</code>/
                        <code>with</code>) when you need immutability.
                    </li>
                    <li>
                        <code>includes</code> finds <code>NaN</code>; <code>indexOf</code> does not.
                    </li>
                    <li>
                        <code>for…of</code> iterates values; avoid <code>for…in</code> on arrays (it walks keys +
                        prototypes).
                    </li>
                    <li>All common copies are shallow—nested objects are shared references.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
