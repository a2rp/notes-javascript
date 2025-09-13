// file: src/pages/topics/language-fundamentals/Equality.jsx
import React from "react";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Equality() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Equality</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Three notions: <b>Strict</b> <code>===</code> (no coercion),{" "}
                    <b>Loose</b> <code>==</code> (coercion), and <b>SameValue</b>/<b>SameValueZero</b> (used by
                    <code> Object.is</code>, <code>Set/Map</code>, <code>includes</code>).
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Tiers (quick)</h2>
                <ul>
                    <li>
                        <b>===</b>: same type & value. <code>NaN === NaN</code> → <b>false</b>; <code>-0 === 0</code> → <b>true</b>.
                    </li>
                    <li>
                        <b>==</b>: applies coercion (string⇄number, boolean→number, object→primitive).
                    </li>
                    <li>
                        <b>Object.is</b>: like <code>===</code> but <code>NaN</code> equal and <code>-0</code> ≠ <code>0</code>.
                    </li>
                    <li>
                        <b>SameValueZero</b>: like <code>Object.is</code> but <code>-0</code> = <code>0</code> (used by <code>includes</code>, <code>Set/Map</code>).
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// Loose (==) — small table
"" == 0            // true
"0" == 0           // true
false == 0         // true
true == 1          // true
null == undefined  // true  (only to each other)
0 == null          // false
[] == ""           // true   ([] -> "")
[] == 0            // true   ([] -> "" -> 0)
[0] == 0           // true   ("0" -> 0)
{ } == 0           // false`}</Styled.Pre>

                <Styled.Pre>{`// Strict vs Object.is
NaN === NaN         // false
Object.is(NaN, NaN) // true

-0 === 0            // true
Object.is(-0, 0)    // false

[] === []           // false (different refs)
const a = {}; const b = a; a === b // true`}</Styled.Pre>

                <Styled.Pre>{`// SameValueZero in arrays/sets/maps
[NaN].includes(NaN) // true
[NaN].indexOf(NaN)  // -1   (indexOf uses ===)

const s = new Set([NaN]);
s.has(NaN)          // true

const m = new Map();
m.set(NaN, "x"); m.get(NaN) // "x"`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Relational & BigInt</h2>
                <ul>
                    <li>
                        Relational (<code>&lt;, &gt;</code>) coerce to primitives; arrays compare as strings
                        (e.g., <code>[2] &lt; [10]</code> ⇒ <code>"2" &lt; "10"</code> ⇒ <b>false</b>).
                    </li>
                    <li>
                        <b>BigInt vs Number:</b> <code>1n == 1</code> → true (loose), <code>1n === 1</code> → false (strict).
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know</h2>
                <ul>
                    <li>Default to <b>===</b>. Use <code>Object.is</code> for <code>NaN</code> and <code>-0</code> edge cases.</li>
                    <li>
                        For membership checks, remember <b>SameValueZero</b>: <code>includes</code>/<code>Set</code>/<code>Map</code> match <code>NaN</code>.
                    </li>
                    <li>
                        Avoid <code>==</code> unless intentionally using its rules (e.g., <code>null == undefined</code> only).
                    </li>
                    <li>Objects compare by reference, not structure—use deep compare when needed.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
