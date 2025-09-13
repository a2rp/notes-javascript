import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function BigIntBasics() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>BigInt</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>BigInt</code> is a primitive for <b>arbitrary-precision integers</b>.
                    Use it when you need exact integers beyond <code>±(2^53-1)</code> or when precision matters (IDs, crypto).
                </p>

                <h2>Create</h2>
                <Styled.Pre>{`const a = 9007199254740993n;           // literal (note the 'n')
const b = BigInt("900719925474099312345");  // from string
const c = BigInt(42);                       // from Number (safe only if integer & within range)

// hex/bin/oct with 'n'
0xFFn; 0b1010n; 0o755n;`}</Styled.Pre>

                <h2>Operators (integers only)</h2>
                <ul>
                    <li>Supported: <code>+ - * ** / %</code> and bitwise <code>& | ^ ~ &lt;&lt; &gt;&gt;</code> (no <code>&gt;&gt;&gt;</code>).</li>
                    <li><b>Division truncates toward 0</b>.</li>
                </ul>
                <Styled.Pre>{`5n / 2n;        // 2n  (truncates)
7n % 3n;        // 1n
(2n ** 53n);    // 9007199254740992n
(~0n);          // -1n
1n << 63n;      // 9223372036854775808n`}</Styled.Pre>

                <h2>Mixing with Number</h2>
                <ul>
                    <li>You <b>can't</b> mix in arithmetic: <code>1n + 1</code> → TypeError. Convert first.</li>
                    <li>Relational compare works (<code>&lt;, &gt;, ==</code>) with numeric coercion; <code>===</code> is <b>type-strict</b>.</li>
                </ul>
                <Styled.Pre>{`// convert intentionally
Number(10n) + 5;          // 15  (possible precision loss!)
10n + BigInt(5);          // 15n

1n == 1;                  // true  (loose)
1n === 1;                 // false (strict)
1.5 < 2n;                 // true
NaN < 1n;                 // false`}</Styled.Pre>

                <h2>Coercions & truthiness</h2>
                <ul>
                    <li><code>String(123n)</code> → <code>"123"</code>; <code>Boolean(0n)</code> is <code>false</code>, others <code>true</code>.</li>
                    <li>Unary <code>+</code> is <b>not allowed</b> on BigInt; use <code>BigInt(x)</code>.</li>
                </ul>
                <Styled.Pre>{`String(42n);     // "42"
Boolean(0n);   // false
// +42n        // TypeError
BigInt("42");  // 42n`}</Styled.Pre>

                <h2>APIs & interop</h2>
                <ul>
                    <li><b>No</b> <code>Math.*</code> for BigInt. Use operators or write helpers.</li>
                    <li>Typed arrays: <code>BigInt64Array</code>, <code>BigUint64Array</code>.</li>
                    <li>JSON: <b>not supported</b> → <code>JSON.stringify({`x: 1n `})</code> throws. Convert to string/number in a replacer.</li>
                </ul>
                <Styled.Pre>{`// JSON replacer: BigInt → string
const obj = { id: 123n };
JSON.stringify(obj, (_k, v) => typeof v === "bigint" ? v.toString() : v);
// => '{"id":"123"}'

// BigInt typed arrays
const ta = new BigInt64Array([1n, 2n, -3n]);`}</Styled.Pre>

                <h2>Fixed-width wrap (two's complement)</h2>
                <ul>
                    <li><code>BigInt.asIntN(bits, x)</code> / <code>BigInt.asUintN(bits, x)</code> clamp to N-bit ranges.</li>
                </ul>
                <Styled.Pre>{`BigInt.asIntN(8,  255n);   // -1n (wrap to signed 8-bit)
BigInt.asUintN(8, 255n);   // 255n`}</Styled.Pre>

                <h2>Formatting</h2>
                <ul>
                    <li><code>toString(radix)</code> with 2..36; pad with <code>String.prototype.padStart</code> if needed.</li>
                </ul>
                <Styled.Pre>{`(255n).toString(16);          // "ff"
(10n).toString(2).padStart(8, "0"); // "00001010"`}</Styled.Pre>

                <h2>When to use</h2>
                <ul>
                    <li>IDs, counters, crypto, hashes, large monetary integers (store minor units), precise combinatorics.</li>
                    <li>Not for fractions — BigInt is <b>integers only</b>.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Use <code>n</code> literal or <code>BigInt()</code>; operations require both sides BigInt.</li>
                    <li>Division truncates; bitwise ops work (no unsigned <code>&gt;&gt;&gt;</code>).</li>
                    <li>Don't mix with Number in math; convert explicitly and mind precision loss.</li>
                    <li>JSON doesn't support BigInt — convert via replacer.</li>
                    <li>For fixed-width behavior, use <code>BigInt.asIntN/asUintN</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
