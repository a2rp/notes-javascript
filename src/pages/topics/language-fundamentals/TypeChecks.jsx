import { Styled } from "./styled";

export default function TypeChecks() {
    return (
        <Styled.Wrapper>
            <Styled.Heading>Type checks</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Reliable ways to detect what a value is (primitive vs object, which
                    built-in, cross-realm safe). Pick the tool based on <i>what</i> you need to know.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Go-to checks (when to use what)</h2>
                <ul>
                    <li>
                        <b><code>typeof</code> (primitives & functions):</b> fast, simple. Quirk:
                        <code> typeof null === "object"</code>.
                    </li>
                    <li>
                        <b><code>Array.isArray(x)</code>:</b> the correct array check (cross-realm).
                    </li>
                    <li>
                        <b>Tag check (safe for built-ins):</b>{" "}
                        <code>Object.prototype.toString.call(x)</code> → <code>"[object Map]"</code>,{" "}
                        <code>"[object Date]"</code>, etc.
                    </li>
                    <li>
                        <b><code>instanceof</code>:</b> for class/constructor relationships; can fail across
                        realms/ifames and with different globals.
                    </li>
                    <li>
                        <b>Typed arrays/DataView:</b>{" "}
                        <code>ArrayBuffer.isView(x)</code> (true for all typed arrays & DataView).
                    </li>
                    <li>
                        <b>Numbers:</b>{" "}
                        <code>Number.isNaN</code>/<code>Number.isFinite</code> (don't use global{" "}
                        <code>isNaN/isFinite</code> due to coercion). <code>Number.isInteger</code>,{" "}
                        <code>Number.isSafeInteger</code> exist too.
                    </li>
                    <li>
                        <b>BigInt & Symbol:</b> <code>typeof x === "bigint"</code> / <code>"symbol"</code>.
                    </li>
                    <li>
                        <b>Plain object:</b> <code>toStringTag === "[object Object]"</code> & prototype is{" "}
                        <code>Object.prototype</code> or <code>null</code>.
                    </li>
                    <li>
                        <b>Promise-like:</b> thenable test — <code>x &amp;&amp; typeof x.then === "function"</code>
                        .
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// typeof (primitives + functions)
typeof 1           // "number"
typeof 10n         // "bigint"
typeof "a"         // "string"
typeof false       // "boolean"
typeof undefined   // "undefined"
typeof Symbol()    // "symbol"
typeof null        // "object"  // historical quirk
typeof (()=>{})    // "function"

// Arrays & built-ins
Array.isArray([])  // true
Object.prototype.toString.call(new Map())   // "[object Map]"
Object.prototype.toString.call(new Date())  // "[object Date]"

// instanceof (constructor relation; watch cross-realm)
[] instanceof Array        // true (but can be false across iframes)
new Date() instanceof Date // true

// Numbers: NaN & finite
Number.isNaN(NaN)          // true
isNaN("foo")               // true (coerces!)  → avoid
Number.isFinite(42)        // true
isFinite("42")             // true (coerces)   → avoid

// Typed arrays / DataView
ArrayBuffer.isView(new Uint8Array())   // true
ArrayBuffer.isView(new DataView(new ArrayBuffer(8))) // true
ArrayBuffer.isView(new ArrayBuffer(8)) // false

// Plain object check
const isPlainObject = (x) => {
  if (Object.prototype.toString.call(x) !== "[object Object]") return false;
  const proto = Object.getPrototypeOf(x);
  return proto === Object.prototype || proto === null;
};

// Promise-like (thenable)
const isThenable = (x) => x && typeof x.then === "function";

// Function subtypes via tags
Object.prototype.toString.call(async function(){})     // "[object AsyncFunction]"
Object.prototype.toString.call(function*(){})          // "[object GeneratorFunction]"`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Choose by need: <code>typeof</code> for primitives, <code>Array.isArray</code> for arrays, tag check for built-ins.</li>
                    <li><code>instanceof</code> is fragile across realms; prefer tag check or feature checks.</li>
                    <li>Avoid global <code>isNaN</code>/<code>isFinite</code>; use the <code>Number.</code> versions.</li>
                    <li>Spread/assign are shallow; a “plain object” test doesn't guarantee deep shape.</li>
                    <li><code>Symbol.toStringTag</code> can be customized (rare); feature detection is the safest when possible.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
