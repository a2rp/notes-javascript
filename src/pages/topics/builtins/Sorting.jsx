import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function Sorting() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Sorting correctly</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Array.prototype.sort</code> sorts <b>in place</b> and, without
                    a comparator, compares items as <b>strings</b> (Unicode code units). Since ES2019, sort is
                    <b> stable</b> (ties keep original order). Use <code>toSorted()</code> for an immutable copy.
                </p>

                <h2>Default sort (string/lexicographic)</h2>
                <Styled.Pre>{`["10","2","1"].sort();   // ["1","10","2"]  (strings)
["b","A","a"].sort();      // ["A","a","b"]`}</Styled.Pre>

                <h2>Numeric sort (pass a comparator)</h2>
                <ul>
                    <li>Comparator returns <code>&lt;0</code>, <code>0</code>, or <code>&gt;0</code>.</li>
                    <li>Don't return booleans; return numbers.</li>
                </ul>
                <Styled.Pre>{`[10,2,1].sort((a,b) => a - b);      // ascending
[10,2,1].sort((a,b) => b - a);      // descending

// by a numeric field
users.sort((a,b) => a.age - b.age);

// Dates (compare timestamps)
events.sort((a,b) => a.date - b.date);`}</Styled.Pre>

                <h2>Immutable version</h2>
                <Styled.Pre>{`const a = [3,1,2];
const b = a.toSorted((x,y) => x - y);  // b = [1,2,3], a unchanged`}</Styled.Pre>

                <h2>Case-insensitive & "natural" sorting</h2>
                <Styled.Pre>{`// Case-insensitive (simple)
names.sort((a,b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

// Natural order with numbers inside strings
files.toSorted((a,b) => a.localeCompare(b, undefined, { numeric: true })); // ["file1","file2","file10"]

// Faster reusable collator
const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
items.sort(collator.compare);`}</Styled.Pre>

                <h2>Multi-key sorting (tie-breakers)</h2>
                <Styled.Pre>{`// Primary: lastName (asc), Secondary: age (desc)
people.sort((a, b) =>
  a.last.localeCompare(b.last) || (b.age - a.age)
);`}</Styled.Pre>

                <h2>Handling null/undefined</h2>
                <Styled.Pre>{`// Push null/undefined to the end
arr.sort((a,b) => (a == null) - (b == null) || (a - b));`}</Styled.Pre>

                <h2>Sparse arrays & NaN</h2>
                <ul>
                    <li>Holes act like <code>undefined</code> and are moved to the end.</li>
                    <li><code>NaN</code> is treated like a number; your comparator must handle it.</li>
                </ul>
                <Styled.Pre>{`[1,,3,2].sort((a,b) => (a ?? Infinity) - (b ?? Infinity)); // [1,2,3, <hole>]`}</Styled.Pre>

                <h2>Sort helpers (small utilities)</h2>
                <Styled.Pre>{`// 1) sortBy: project then compare
const sortBy = (proj, dir = 1) => (a,b) => {
  const x = proj(a), y = proj(b);
  return x < y ? -1*dir : x > y ? 1*dir : 0;
};
users.sort(sortBy(u => u.name));            // asc by name
users.sort(sortBy(u => u.score, -1));       // desc by score

// 2) compose comparators (multi-key)
const by = (...comps) => (a,b) => {
  for (const c of comps) { const r = c(a,b); if (r) return r; }
  return 0;
};
people.sort(by(
  sortBy(p => p.city),
  sortBy(p => p.last),
  sortBy(p => p.first)
));`}</Styled.Pre>

                <h2>Performance notes</h2>
                <ul>
                    <li>Time complexity: O(<i>n</i> log <i>n</i>) typical; keep comparators cheap.</li>
                    <li>Avoid allocating heavy objects inside the comparator; precompute when possible.</li>
                    <li>For frequent sorts by the same key, cache the key ("Schwartzian transform").</li>
                </ul>
                <Styled.Pre>{`// Schwartzian transform (decorate → sort → undecorate)
const sorted = items
  .map(x => ({ x, key: expensiveKey(x) }))
  .sort((a,b) => a.key - b.key)
  .map(({ x }) => x);`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>sort</code> mutates; <code>toSorted</code> returns a copy.</li>
                    <li>Default is string ordering; pass a comparator for numbers/dates/objects.</li>
                    <li>Comparator must return negative/zero/positive — not booleans.</li>
                    <li>Sort is stable (ties keep original order) in modern JS.</li>
                    <li>Use <code>localeCompare</code>/<code>Intl.Collator</code> for human-friendly and numeric-aware sorting.</li>
                    <li>Compose comparators for multi-key sorts; push nullish values to the end when needed.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
