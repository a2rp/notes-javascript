import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function ArithmeticComparisonLogical() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Arithmetic, comparison, logical</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Daily operators: arithmetic (<code>+ - * / % **</code>), comparison
                    (<code>&lt; &gt; &lt;= &gt;=</code>), and logical (<code>&amp;&amp; || !</code>). Know their
                    coercion + short-circuit rules.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Arithmetic (number basics)</h2>
                <ul>
                    <li>
                        Most ops use <b>ToNumber</b>. <code>+</code> is special: if either side becomes a string
                        (after ToPrimitive), it concatenates.
                    </li>
                    <li>
                        <code>**</code> is right-associative; unary minus cannot be on the left operand (use
                        parentheses).
                    </li>
                    <li>
                        <code>%</code> is remainder (same sign as dividend), not mathematical modulo.
                    </li>
                    <li>
                        <b>BigInt</b> can’t mix with <b>Number</b> in arithmetic (TypeError). Cast intentionally.
                    </li>
                    <li>
                        Dividing by 0 yields <code>Infinity</code>/<code>-Infinity</code>; <code>0/0</code> ⇒{" "}
                        <code>NaN</code>.
                    </li>
                </ul>
                <Styled.Pre>{`1 + 2 * 3        // 7
1 + "2"          // "12" (string +)
"3" * "2"        // 6   (numeric op)
2 ** 3 ** 2      // 512  (2 ** (3 ** 2))
-(2 ** 2)        // -4
5 % 2            // 1
-5 % 2           // -1  (remainder keeps sign)
1 / 0            // Infinity
Number(1n) + 1   // 2   (cast BigInt explicitly)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Inc/Dec</h2>
                <ul>
                    <li>
                        Prefix returns the updated value; postfix returns the old value (then updates).
                    </li>
                </ul>
                <Styled.Pre>{`let x = 1;
++x        // 2, x = 2
x++        // returns 2, x becomes 3`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Comparison</h2>
                <ul>
                    <li>
                        Uses ToPrimitive; if both primitives are strings → lexicographic compare, else numeric.
                    </li>
                    <li>
                        Arrays become strings (e.g., <code>[2]</code> → <code>"2"</code>).
                    </li>
                    <li>
                        Any compare with <code>NaN</code> is <b>false</b> (except <code>!=</code> which is{" "}
                        <b>true</b>).
                    </li>
                    <li>
                        Number ↔ BigInt comparisons are allowed; arithmetic mixing is not.
                    </li>
                </ul>
                <Styled.Pre>{`"20" < "3"    // true (string compare: "2" < "3")
20 < "3"       // false (numeric compare: 20 < 3)
[2] < [10]     // false ("2" < "10" → false)
NaN < 1        // false
NaN >= 1       // false
1n < 2         // true
1n == 1        // true (loose); 1n === 1 // false`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Logical (short-circuit)</h2>
                <ul>
                    <li>
                        <code>&amp;&amp;</code> returns the <i>first falsy</i> or the last value;{" "}
                        <code>||</code> returns the <i>first truthy</i> or the last value.
                    </li>
                    <li>
                        They return the operand (not strict booleans). Use <code>Boolean(x)</code> or{" "}
                        <code>!!x</code> when you need a bool.
                    </li>
                    <li>
                        For null/undefined-only fallbacks use <code>??</code> (lives in “Modern operators” topic).
                    </li>
                </ul>
                <Styled.Pre>{`"a" && 5        // 5
""  && 5        // ""  (empty string is falsy)
0   || 10       // 10
"hi" || 10      // "hi"
const ok = !!user && user.isActive === true;`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>
                        <code>+</code>: any string → concatenation; otherwise numeric add.
                    </li>
                    <li>
                        Use parentheses around exponent/unary combos; <code>**</code> is right-assoc.
                    </li>
                    <li>
                        Comparisons with strings are lexicographic—coerce to numbers if that’s what you mean.
                    </li>
                    <li>
                        Don’t mix BigInt with Number in math; comparisons are fine.
                    </li>
                    <li>
                        <code>&amp;&amp;</code>/<code>||</code> return operands; use <code>??</code> for
                        nullish-only fallbacks.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
