import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function TypeCoercion() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Type coercion</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Implicit/explicit conversion between primitives and objects via
                    <b> ToPrimitive → ToNumber/ToString/ToBoolean</b>. Prefer explicit casts in critical paths.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Core rules (mental model)</h2>
                <ul>
                    <li>
                        <b>ToPrimitive (hint “number”):</b> try <code>valueOf()</code> then{" "}
                        <code>toString()</code>. (Dates default to hint “string”: <code>toString</code> then{" "}
                        <code>valueOf</code>.)
                    </li>
                    <li>
                        <b>Numeric ops</b> (<code>- * / % &lt; &gt; &lt;= &gt;= | &amp; ^ ~</code>, unary{" "}
                        <code>+</code>): use <b>ToNumber</b> (except BigInt mixing ⇒ TypeError).
                    </li>
                    <li>
                        <b>String concatenation</b> (<code>+</code>): if either side is a string (after
                        ToPrimitive), do string join; else numeric add.
                    </li>
                    <li>
                        <b>Boolean contexts</b> (if/while/?:): use <b>ToBoolean</b> — only the 7 falsy values
                        are false.
                    </li>
                    <li>
                        <b>Symbols:</b> cannot auto-coerce to number/string in concatenation; use{" "}
                        <code>String(sym)</code> explicitly.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples (burn-in)</h2>
                <Styled.Pre>{`// String vs number with +
1 + "2"          // "12"
"3" * "2"        // 6   (numeric op → ToNumber)
+"3"             // 3   (unary plus)

const obj = { valueOf(){ return 7; } };
obj + 1          // 8   (ToPrimitive → valueOf → 7, then numeric add)

const arr = [1,2];
arr + 3          // "1,23" (ToPrimitive → toString "1,2", then string +)

new Date(0) + 1  // "Thu, 01 Jan 1970 ...1" (Date hint "string")

// Boolean coercion
!!""             // false
!![]             // true
!!0n             // false

// Numbers from primitives
Number("")       // 0
Number("  \\n")   // 0
Number(null)     // 0
Number(undefined)// NaN
Number(true)     // 1

// BigInt mixing
1n + 1           // ❌ TypeError (can’t mix BigInt and Number)
Number(1n) + 1   // 2  (explicit)

// Symbols
const s = Symbol("x");
// "" + s        // ❌ TypeError
String(s)        // "Symbol(x)"`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Object → primitive hooks</h2>
                <Styled.Pre>{`const x = {
  [Symbol.toPrimitive](hint){
    if (hint === "string") return "X";
    return 10;
  },
  toString(){ return "tos"; },
  valueOf(){ return 5; }
};

x + 1        // 11 (hint "number" → Symbol.toPrimitive → 10)
String(x)    // "X" (hint "string")`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>JSON vs coercion</h2>
                <ul>
                    <li>
                        <code>JSON.stringify</code>: omits <code>undefined</code>/functions/symbols in objects;
                        turns them into <code>null</code> in arrays; <b>throws</b> on <code>BigInt</code>.
                    </li>
                    <li>
                        Custom <code>toJSON()</code> on objects controls their JSON representation.
                    </li>
                </ul>
                <Styled.Pre>{`JSON.stringify({a:undefined,b:2})   // "{"b":2}"
JSON.stringify([1,undefined,3]) // "[1,null,3]"
// JSON.stringify(10n)          // ❌ TypeError
const d = new Date(0);
d.toJSON()                      // "1970-01-01T00:00:00.000Z"`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Relational notes</h2>
                <ul>
                    <li>
                        <code>&lt;</code>/<code>&gt;</code> use ToPrimitive; if both are strings → lexicographic
                        compare; else numeric.
                    </li>
                    <li>
                        Arrays compare as strings (<code>[2] &lt; [10]</code> ⇒ <code>"2" &lt; "10"</code> ⇒{" "}
                        false).
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>
                        Prefer <b>explicit casts</b>: <code>Number(x)</code>, <code>String(x)</code>,{" "}
                        <code>Boolean(x)</code>.
                    </li>
                    <li>
                        Be mindful with <code>+</code>: one string → whole expression becomes concatenation.
                    </li>
                    <li>
                        Don’t mix <b>BigInt</b> and <b>Number</b> in arithmetic; cast intentionally.
                    </li>
                    <li>
                        For objects, know the order: hint “number” → <code>valueOf</code> then{" "}
                        <code>toString</code> (Dates prefer “string”). Customize with{" "}
                        <code>Symbol.toPrimitive</code> if needed.
                    </li>
                    <li>
                        Avoid accidental coercion in validations/logical flow; combine with{" "}
                        <code>??</code>/<code>?.</code> patterns when appropriate.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
