import { Styled } from "./styled";

export default function ValuesTypes() {
    return (
        <Styled.Wrapper>
            <Styled.Heading>Values & types</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JS values are either <b>primitives</b> (copied by value) or{" "}
                    <b>objects</b> (copied by reference). Primitives: <code>string</code>,{" "}
                    <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>symbol</code>,{" "}
                    <code>undefined</code>, <code>null</code>.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Primitives (quick notes)</h2>
                <ul>
                    <li>
                        <code>string</code> — immutable text; UTF-16 code units. Methods return new strings.
                    </li>
                    <li>
                        <code>number</code> — IEEE-754 double; beware precision (<code>0.1+0.2</code>),{" "}
                        <code>NaN</code>, <code>Infinity</code>, <code>-0</code>.
                    </li>
                    <li>
                        <code>bigint</code> — arbitrary precision integers (<code>10n</code>); can't mix with{" "}
                        <code>number</code> without explicit cast.
                    </li>
                    <li>
                        <code>boolean</code> — <code>true/false</code>.
                    </li>
                    <li>
                        <code>symbol</code> — unique opaque identifiers; good for private keys and protocols.
                    </li>
                    <li>
                        <code>undefined</code> — missing value (default for uninitialized bindings).
                    </li>
                    <li>
                        <code>null</code> — intentional empty (set by the programmer).
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Objects (reference semantics)</h2>
                <ul>
                    <li>
                        Objects, arrays, functions, dates, maps/sets are all objects (mutable; shared by
                        reference).
                    </li>
                    <li>
                        Equality: two different objects are never strictly equal even if contents match.
                    </li>
                    <li>
                        Clone vs reference: spread/assign are <b>shallow</b>; nested objects remain shared.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Type queries (what to use)</h2>
                <ul>
                    <li>
                        <code>typeof</code> primitives: works; <code>typeof null === "object"</code> (historic
                        quirk).
                    </li>
                    <li>
                        Arrays: <code>Array.isArray(x)</code>. Dates/Maps/Sets:{" "}
                        <code>Object.prototype.toString.call(x)</code> or feature checks.
                    </li>
                    <li>
                        <code>instanceof</code> for constructor relationships (can break across realms/iframes).
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Boxing & ToPrimitive</h2>
                <ul>
                    <li>
                        Primitives auto-box for method calls (<code>"a".toUpperCase()</code>); wrapper objects
                        like <code>new Number(3)</code> are almost never needed (and are truthy!).
                    </li>
                    <li>
                        Conversions use ToPrimitive + <code>valueOf</code>/<code>toString</code>; prefer
                        explicit casts: <code>Number(x)</code>, <code>String(x)</code>, <code>Boolean(x)</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// typeof quirks & checks
typeof 1              // "number"
typeof 10n            // "bigint"
typeof Symbol()       // "symbol"
typeof null           // "object"  <-- historical quirk
Array.isArray([])     // true

// -0 and NaN
Object.is(-0, 0)      // false
Number.isNaN(NaN)     // true
isNaN("foo")          // true (coerces)  → prefer Number.isNaN

// reference vs value
const a = { x: 1 };
const b = a;          // b references the same object
b.x = 2; a.x          // 2

// shallow copy
const c = { nest: { v: 1 } };
const d = { ...c };   // shallow
d.nest.v = 9; c.nest.v // 9  (shared inner object)

// primitives copy by value
let p = 1, q = p; q = 2; p // 1

// boxing gotcha
Boolean(new Boolean(false)) // true  (object is truthy)
`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Prefer primitives; treat strings as immutable; avoid wrapper objects.</li>
                    <li>
                        Be explicit with casts; don't rely on coercion in critical paths (use{" "}
                        <code>Number/Boolean/String</code>).
                    </li>
                    <li>
                        For safe equality on edge cases: <code>Object.is(NaN, NaN)</code> and{" "}
                        <code>Object.is(-0, 0)</code>.
                    </li>
                    <li>
                        Need deep copy? Use <code>structuredClone</code> (modern) or a proven utility; spread is
                        shallow.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
