import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function OperatorBasicsPrecedence() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Operator basics & precedence</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <i>Precedence</i> = which operator binds first; <i>associativity</i> =
                    tie-breaker direction at the same level. When unsure, add parentheses.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Cheat sheet (high → low)</h2>
                <ul>
                    <li><b>Grouping</b>: <code>( ... )</code></li>
                    <li>
                        <b>Member / call</b>: <code>.</code>, <code>[]</code>, <code>()</code>, <code>new fn(...)</code>,{" "}
                        optional chaining <code>?.</code> (short-circuits like its neighbor).
                    </li>
                    <li>
                        <b>Unary</b>: <code>delete</code>, <code>void</code>, <code>typeof</code>, <code>+</code>,{" "}
                        <code>-</code>, <code>~</code>, <code>!</code>, <code>await</code>.
                    </li>
                    <li>
                        <b>Exponent</b>: <code>**</code> (right-associative; cannot have unary on the <i>left</i> → use parentheses).
                    </li>
                    <li><b>Multiplicative</b>: <code>* / %</code></li>
                    <li><b>Additive</b>: <code>+ -</code> (string concat when any side is string after ToPrimitive)</li>
                    <li><b>Shift</b>: <code>&lt;&lt; &gt;&gt; &gt;&gt;&gt;</code></li>
                    <li><b>Relational</b>: <code>&lt; &lt;= &gt; &gt;=</code>, <code>in</code>, <code>instanceof</code></li>
                    <li><b>Equality</b>: <code>== != === !==</code></li>
                    <li><b>Bitwise</b>: <code>&amp;</code> → <code>^</code> → <code>|</code></li>
                    <li><b>Logical</b>: <code>&amp;&amp;</code> (AND) binds tighter than <code>||</code> (OR)</li>
                    <li>
                        <b>Nullish</b>: <code>??</code> (do <u>not</u> mix with <code>&amp;&amp;</code>/<code>||</code> without parentheses; grammar error)
                    </li>
                    <li><b>Ternary</b>: <code>cond ? a : b</code> (lower than <code>&amp;&amp;</code>/<code>||</code>)</li>
                    <li>
                        <b>Assignment</b> (right-assoc): <code>=</code>, <code>+=</code>… <code>&amp;&amp;=</code>,{" "}
                        <code>||=</code>, <code>??=</code>
                    </li>
                    <li><b>Comma</b>: <code>,</code> (lowest; evaluates left→right, yields last)</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// Multiplicative > Additive
1 + 2 * 3            // 7

// AND > OR
true || false && false  // true  (false && false -> false; true || false -> true)

// Nullish mixing needs parens
// a ?? b || c        // ❌ SyntaxError
(a ?? b) || c         // ✅
a ?? (b || c)         // ✅ (different meaning)

// Exponent is right-assoc, and tighter than unary minus (with a grammar rule)
2 ** 3 ** 2           // 512  (2 ** (3 ** 2))
-2 ** 2               // ❌ SyntaxError
-(2 ** 2)             // -4
(-2) ** 2             // 4

// '+' concatenates if a string is involved after ToPrimitive
"1" + 2 + 3           // "123"
1 + 2 + "3"           // "33"

// Assignment is right-assoc
let x, y, z;
x = y = z = 5         // x=5, y=5, z=5

// Ternary lower than logical
const out = ok && ready ? "go" : "wait";
// parsed as: (ok && ready) ? "go" : "wait"

// Optional chaining binds like '.'/'[]'/'()'
user?.profile.name
user?.get?.().value

// Comma operator (lowest)
let v = (doSideEffect(), 42); // v = 42`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Common footguns</h2>
                <ul>
                    <li>
                        <b>Mixing <code>??</code> with <code>&amp;&amp;</code>/<code>||</code></b>: always add parentheses (the grammar forbids direct mix).
                    </li>
                    <li>
                        <b>Unary with <code>**</code></b>: write <code>-(a ** b)</code> or <code>(-a) ** b</code>.
                    </li>
                    <li>
                        <b>String concat vs add</b>: any string → whole <code>+</code> chain becomes concatenation.
                    </li>
                    <li>
                        <b>Destructuring assignment</b> needs parens when used as an expression: <code>{`({ x } = obj)`}</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Remember anchors: <b>Unary</b> → <b>**</b> → <b>* / %</b> → <b>+ -</b> → <b>&amp;&amp;</b> → <b>||</b> → <b>?:</b> → <b>=</b> → <b>,</b></li>
                    <li><b>Right-assoc:</b> <code>**</code>, assignments, ternary (as a whole).</li>
                    <li>When mixing short-circuiting ops (<code>&amp;&amp;</code>/<code>||</code>/<code>??</code>), add parentheses for clarity.</li>
                    <li>Prefer explicit grouping in reviews; saves brain cycles and bugs.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
