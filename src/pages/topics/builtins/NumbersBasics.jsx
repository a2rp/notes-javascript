import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function NumbersBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Numbers basics</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JavaScript numbers are IEEE-754 <b>64-bit floating-point</b> values
                    (double). Special values: <code>NaN</code>, <code>Infinity</code>, <code>-Infinity</code>, and <code>-0</code>.
                </p>

                <h2>Literals & bases</h2>
                <Styled.Pre>{`123          // decimal
0b1010       // binary (10)
0o755        // octal (493)
0xFF         // hex (255)
1_000_000    // numeric separators (readability)  // ❌ not at edges: _1, 1_, 1._2
`}</Styled.Pre>

                <h2>Precision & FP pitfalls</h2>
                <Styled.Pre>{`0.1 + 0.2 === 0.3          // false (0.30000000000000004)
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON  // true  (tolerant compare)

// round to N decimals (copy-safe)
const round = (x, n=2) => Number(Math.round((x + Number.EPSILON) * 10**n) / 10**n);
round(1.005, 2); // 1.01`}</Styled.Pre>

                <h2>Safe integers</h2>
                <ul>
                    <li>Exact integer range: <code>[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]</code> (±9,007,199,254,740,991).</li>
                    <li>Use <code>Number.isSafeInteger(x)</code> to check; for larger ints use <b>BigInt</b>.</li>
                </ul>
                <Styled.Pre>{`Number.MAX_SAFE_INTEGER;  // 9007199254740991
Number.isSafeInteger(2**53);    // false`}</Styled.Pre>

                <h2>NaN, Infinity, -0</h2>
                <ul>
                    <li><b>NaN</b> is “not a number” (invalid numeric result). <code>NaN !== NaN</code>.</li>
                    <li>Check with <code>Number.isNaN(x)</code> (don't use global <code>isNaN</code> which coerces).</li>
                    <li>Detect finite numbers with <code>Number.isFinite(x)</code>.</li>
                    <li><b>-0</b> exists; useful test: <code>Object.is(-0, 0) === false</code> or <code>1 / -0 === -Infinity</code>.</li>
                </ul>
                <Styled.Pre>{`Number.isNaN(NaN);         // true
isNaN("foo");               // true (coerces!)  ← avoid
Number.isNaN("foo");        // false (no coerce) ✅
Object.is(-0, 0);           // false
1 / -0;                     // -Infinity`}</Styled.Pre>

                <h2>Parsing & coercion</h2>
                <ul>
                    <li><code>Number(str)</code> converts the whole string (strict).</li>
                    <li><code>parseInt</code>/<code>parseFloat</code> parse prefix and stop at first invalid char; always pass radix for <code>parseInt</code>.</li>
                </ul>
                <Styled.Pre>{`Number("42");           // 42
Number("42px");        // NaN
parseInt("42px", 10);  // 42
parseFloat("3.14s");   // 3.14
parseInt("08", 10);    // 8

// quirky but standard coercions
Number("");            // 0
Number("   ");         // 0
Number(null);          // 0
Number(undefined);     // NaN
Number([1]);           // 1
Number([1,2]);         // NaN`}</Styled.Pre>

                <h2>Math toolbox (most used)</h2>
                <Styled.Pre>{`Math.abs(-3);       // 3
Math.max(1,9,3);  // 9
Math.min(...arr); // spread
Math.floor(2.9);  // 2
Math.ceil(2.1);   // 3
Math.trunc(-2.9); // -2 (drop fraction, toward 0)
Math.round(2.5);  // 3
Math.sign(-7);    // -1
Math.hypot(x,y);  // sqrt(x^2 + y^2)
Math.random();    // [0,1)
`}</Styled.Pre>

                <h2>Formatting numbers</h2>
                <ul>
                    <li><code>toFixed(n)</code> → string with fixed decimals (rounds).</li>
                    <li><code>toPrecision(n)</code> → significant digits.</li>
                    <li><code>Intl.NumberFormat</code> for locale-aware formatting (currency, compact).</li>
                </ul>
                <Styled.Pre>{`(1234.567).toFixed(2);         // "1234.57"
(0.0001234).toPrecision(2);    // "0.00012"
new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(1234567.89); // "12,34,567.89"
new Intl.NumberFormat("en", { style:"currency", currency:"USD" }).format(45.5);  // "$45.50"`}</Styled.Pre>

                <h2>Remainder (%) semantics</h2>
                <ul>
                    <li><code>a % b</code> is the <b>remainder</b>; sign follows the dividend (<code>a</code>), so it can be negative.</li>
                </ul>
                <Styled.Pre>{`5 % 3;     // 2
-5 % 3;    // -2  (not 1)
const mod = (a,b) => ((a % b) + b) % b;  // true "mathematical" modulo ≥ 0`}</Styled.Pre>

                <h2>Bitwise caveat (32-bit)</h2>
                <ul>
                    <li>Bitwise ops (<code>| & ^ ~ &lt;&lt; &gt;&gt; &gt;&gt;&gt;</code>) convert to signed 32-bit ints; they <b>truncate</b> floats and large ints.</li>
                </ul>
                <Styled.Pre>{`1.9 | 0;          // 1
(2**40) | 0;       // 0  (overflow in 32-bit lane)`}</Styled.Pre>

                <h2>Converting to other bases</h2>
                <Styled.Pre>{`(255).toString(16);  // "ff"
parseInt("ff", 16); // 255`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>All JS numbers are doubles; expect FP rounding issues — compare with <code>EPSILON</code> tolerance.</li>
                    <li>Stay within <b>safe integer</b> range for exact ints; otherwise use <b>BigInt</b>.</li>
                    <li>Use <code>Number.isNaN</code>/<code>Number.isFinite</code> (no coercion).</li>
                    <li>Be aware of <b>-0</b>; detect via <code>Object.is</code> if needed.</li>
                    <li>Use <code>parseInt(str, 10)</code>/<code>parseFloat</code> for tolerant parsing; <code>Number()</code> for strict.</li>
                    <li><code>sort</code> numbers with a comparator (<code>a-b</code>), not default string order.</li>
                    <li>Bitwise operators clamp to 32-bit; avoid them for big integers.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
