import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function MathEssentials() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Math essentials</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>Math</code> hosts numeric helpers (all <i>static</i>): constants,
                    rounding, powers/logs, random, geometry, and odds & ends. Numbers are IEEE-754 doubles.
                </p>

                <h2>Core constants</h2>
                <Styled.Pre>{`Math.PI;     // 3.14159…
Math.E;      // 2.71828…
Math.LN2;    // ln(2)
Math.LOG2E;  // log2(e)
Math.LN10;   // ln(10)
Math.LOG10E; // log10(e)
Math.SQRT2;  // √2
Math.SQRT1_2;// 1/√2
// handy: const TAU = 2 * Math.PI;`}</Styled.Pre>

                <h2>Rounding family (and negatives)</h2>
                <Styled.Pre>{`Math.floor( 2.9 );   // 2    (toward -∞)
Math.ceil(  2.1 );   // 3    (toward +∞)
Math.trunc( 2.9 );   // 2    (drop fraction)
Math.round( 2.5 );   // 3    (to nearest; .5 → up)
Math.round(-2.5 );   // -2   (ties away from 0)
Math.sign(-7  );     // -1

// Round to N decimals (safe-ish)
const roundN = (x, n=2) =>
  Number(Math.round((x + Number.EPSILON) * 10**n) / 10**n);`}</Styled.Pre>

                <h2>Clamp, lerp, mapRange</h2>
                <Styled.Pre>{`const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
clamp(15, 0, 10);     // 10

const lerp = (a, b, t) => a + (b - a) * t;
lerp(0, 100, 0.3);    // 30

const mapRange = (x, inA, inB, outA, outB) =>
  outA + (outB - outA) * ((x - inA) / (inB - inA));`}</Styled.Pre>

                <h2>Powers, roots, logs</h2>
                <Styled.Pre>{`2 ** 10;                 // 1024   (operator)
Math.pow(2, 10);         // 1024   (same)

Math.sqrt(9);            // 3
Math.cbrt(27);           // 3
Math.hypot(3, 4);        // 5      (√(x²+y²+…); avoids overflow/underflow)

Math.log(Math.E);        // 1      (natural log)
Math.log10(1000);        // 3
Math.log2(1024);         // 10
Math.expm1(1e-6);        // e^x-1 (accurate near 0)
Math.log1p(1e-6);        // ln(1+x) (accurate near 0)`}</Styled.Pre>

                <h2>Random numbers (and safe integers)</h2>
                <Styled.Pre>{`Math.random(); // [0,1)

// int in [min, max] inclusive (uniform)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

randomInt(1, 6);  // dice-like

// Cryptographic randomness (tokens/ids) → use Web Crypto:
crypto.getRandomValues(new Uint32Array(1))[0];`}</Styled.Pre>

                <h2>Shuffling (don’t use sort+random)</h2>
                <Styled.Pre>{`// Fisher–Yates (uniform)
function shuffle(a){
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}`}</Styled.Pre>

                <h2>Degrees ↔ Radians</h2>
                <Styled.Pre>{`const toRad = d => d * (Math.PI / 180);
const toDeg = r => r * (180 / Math.PI);

Math.cos(toRad(60)); // 0.5`}</Styled.Pre>

                <h2>32-bit & single-precision helpers</h2>
                <Styled.Pre>{`Math.imul(0xFFFFFFFF, 2); //  -2 (true 32-bit multiply)
Math.fround(1/3);          // 0.3333333432674408 (float32 rounding)

// Beware: bitwise ops clamp to 32 bits:
(2**40) | 0;               // 0`}</Styled.Pre>

                <h2>Aggregations (arrays)</h2>
                <Styled.Pre>{`// min/max over arrays
const min = arr => arr.reduce((m,x) => x < m ? x : m,  Infinity);
const max = arr => arr.reduce((m,x) => x > m ? x : m, -Infinity);

// stable-ish sum (Kahan)
function sumKahan(arr){
  let sum = 0, c = 0;
  for (let x of arr){
    const y = x - c;
    const t = sum + y;
    c = (t - sum) - y;
    sum = t;
  }
  return sum;
}`}</Styled.Pre>

                <h2>Nearly-equal compare (FP)</h2>
                <Styled.Pre>{`const nearlyEqual = (a, b, eps = Number.EPSILON * 4) =>
  Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));

nearlyEqual(0.1 + 0.2, 0.3); // true`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>floor/ceil/trunc/round</b> behave differently for negatives—know which you need.</li>
                    <li>Use <b>clamp</b>, <b>lerp</b>, <b>mapRange</b> for UI/math utilities.</li>
                    <li><b>hypot</b> is the safe Euclidean norm; avoids overflow/underflow.</li>
                    <li><b>randomInt</b> formula above for uniform ints; for security use <b>Web Crypto</b>.</li>
                    <li>Never shuffle with <code>sort(() =&gt; Math.random()-0.5)</code>; use Fisher–Yates.</li>
                    <li><b>imul</b> and bitwise ops clamp to 32-bit; <b>fround</b> snaps to float32.</li>
                    <li>Compare floats with an <b>epsilon</b>, not strict equality.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
