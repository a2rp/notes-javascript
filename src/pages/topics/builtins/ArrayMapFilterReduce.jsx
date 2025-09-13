import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function ArrayMapFilterReduce() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Array: map / filter / reduce</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> The "big three" pure data transforms:
                    <b> map</b> (shape each item), <b>filter</b> (keep some items), <b>reduce</b> (fold many → one).
                    Callbacks receive <code>(value, index, array)</code> and optional <code>thisArg</code>.
                </p>

                <h2>map (1 → 1)</h2>
                <ul>
                    <li>Returns a <b>new array</b> of the same length.</li>
                    <li>Skips holes; keeps holes in the same positions (result may be sparse).</li>
                </ul>
                <Styled.Pre>{`const nums = [1, 2, 3];
nums.map(x => x * 2);          // [2,4,6]

// with index
["a","b","c"].map((ch, i) => i + ":" + ch); // ["0:a","1:b","2:c"]

// thisArg
function times(v){ return v * this.k; }
[1,2].map(times, { k: 10 });   // [10,20]

// common pitfall: parseInt + map (index becomes radix!)
["10","11","12"].map(parseInt); // [10, NaN, 1]
["10","11","12"].map(Number);   // [10,11,12] ✅`}</Styled.Pre>

                <h2>filter (0/1 → keep?)</h2>
                <ul>
                    <li>Returns a <b>new, dense</b> array (holes are removed).</li>
                    <li>Truthy result keeps the item; falsy removes.</li>
                </ul>
                <Styled.Pre>{`const xs = [1,2,3,4,5];
xs.filter(x => x % 2 === 0);      // [2,4]

// quick remove falsy:
["", "ok", 0, "x", null].filter(Boolean);  // ["ok","x"]`}</Styled.Pre>

                <h2>flatMap (map + flatten one level)</h2>
                <ul>
                    <li>Good for "map then filter/flatten" in one pass.</li>
                </ul>
                <Styled.Pre>{`// expand numbers into [n, n*n]
[2,3].flatMap(n => [n, n*n]);     // [2,4,3,9]

// map + conditional keep:
["a","", "b"].flatMap(s => s ? [s.toUpperCase()] : []); // ["A","B"]`}</Styled.Pre>

                <h2>reduce (fold to a single value)</h2>
                <ul>
                    <li>Signature: <code>arr.reduce((acc, v, i, arr) =&gt; nextAcc, initAcc)</code>.</li>
                    <li><b>Always provide an initial value</b> to avoid edge cases on empty arrays.</li>
                    <li>Use <code>reduceRight</code> to fold from right.</li>
                </ul>
                <Styled.Pre>{`// sum
[1,2,3].reduce((acc, x) => acc + x, 0);                  // 6

// max
[3,9,4].reduce((m,x) => x > m ? x : m, -Infinity);       // 9

// group by key
const users = [{role:"admin"},{role:"user"},{role:"admin"}];
const groups = users.reduce((acc, u) => {
  (acc[u.role] ??= []).push(u);
  return acc;
}, {});   // { admin:[…], user:[…] }

// frequency map
const freq = ["a","b","a"].reduce((acc, k) => (acc[k]=(acc[k]||0)+1, acc), {}); // {a:2,b:1}

// build Map (not Object)
const map = [["a",1],["b",2]].reduce((m,[k,v]) => m.set(k,v), new Map());`}</Styled.Pre>

                <h2>Chaining patterns</h2>
                <ul>
                    <li>Readable: <code>arr.filter(...).map(...)</code> for "select then project".</li>
                    <li>Performance: use <code>flatMap</code> or a single <code>reduce</code> when hot paths matter.</li>
                </ul>
                <Styled.Pre>{`// pipeline
const result = products
  .filter(p => p.inStock)
  .map(p => ({ id: p.id, price: p.price }));`}</Styled.Pre>

                <h2>Async note</h2>
                <ul>
                    <li><code>map(async ...)</code> returns an array of <b>promises</b>. Use <code>await Promise.all()</code>.</li>
                </ul>
                <Styled.Pre>{`const urls = ["a.json","b.json"];
const promises = urls.map(u => fetch(u).then(r => r.json()));
const data = await Promise.all(promises);`}</Styled.Pre>

                <h2>Early exit?</h2>
                <ul>
                    <li><code>map</code>/<code>filter</code>/<code>reduce</code> can't early break. For queries use:</li>
                    <li><b>find</b> (first match), <b>some</b> (any match), <b>every</b> (all match).</li>
                </ul>
                <Styled.Pre>{`[1,4,7].some(x => x > 5);   // true
[1,4,7].every(x => x < 10); // true
[1,4,7].find(x => x % 2 === 0); // 4`}</Styled.Pre>

                <h2>Immutability helpers (copy versions)</h2>
                <ul>
                    <li>When returning arrays from reducers, keep copies shallow but consistent.</li>
                    <li>Use <code>toSorted</code>/<code>toReversed</code>/<code>toSpliced</code>/<code>with</code> to avoid mutation.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>map</b> transforms, <b>filter</b> selects, <b>reduce</b> accumulates into one value.</li>
                    <li><b>Always pass an initial value</b> to <code>reduce</code>.</li>
                    <li><code>map(parseInt)</code> is a trap; use <code>Number</code> or a custom callback.</li>
                    <li><code>flatMap</code> = map + one-level flatten; great for conditional expands.</li>
                    <li><b>Async map</b> → array of promises → <code>await Promise.all</code>.</li>
                    <li>Prefer readability (chain) unless profiling shows a hot path—then fuse passes.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
