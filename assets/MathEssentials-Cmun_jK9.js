import{j as e}from"./index-4OJNB7vi.js";import{S as r,B as n}from"./index-APKw0GLP.js";import{B as a}from"./Breadcrumbs-BWCvk1iJ.js";function o(){return e.jsxs(r.Wrapper,{children:[e.jsx(a,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:n}),e.jsx(r.Heading,{children:"Math essentials"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Math"})," hosts numeric helpers (all ",e.jsx("i",{children:"static"}),"): constants, rounding, powers/logs, random, geometry, and odds & ends. Numbers are IEEE-754 doubles."]}),e.jsx("h2",{children:"Core constants"}),e.jsx(r.Pre,{children:`Math.PI;     // 3.14159…
Math.E;      // 2.71828…
Math.LN2;    // ln(2)
Math.LOG2E;  // log2(e)
Math.LN10;   // ln(10)
Math.LOG10E; // log10(e)
Math.SQRT2;  // √2
Math.SQRT1_2;// 1/√2
// handy: const TAU = 2 * Math.PI;`}),e.jsx("h2",{children:"Rounding family (and negatives)"}),e.jsx(r.Pre,{children:`Math.floor( 2.9 );   // 2    (toward -∞)
Math.ceil(  2.1 );   // 3    (toward +∞)
Math.trunc( 2.9 );   // 2    (drop fraction)
Math.round( 2.5 );   // 3    (to nearest; .5 → up)
Math.round(-2.5 );   // -2   (ties away from 0)
Math.sign(-7  );     // -1

// Round to N decimals (safe-ish)
const roundN = (x, n=2) =>
  Number(Math.round((x + Number.EPSILON) * 10**n) / 10**n);`}),e.jsx("h2",{children:"Clamp, lerp, mapRange"}),e.jsx(r.Pre,{children:`const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
clamp(15, 0, 10);     // 10

const lerp = (a, b, t) => a + (b - a) * t;
lerp(0, 100, 0.3);    // 30

const mapRange = (x, inA, inB, outA, outB) =>
  outA + (outB - outA) * ((x - inA) / (inB - inA));`}),e.jsx("h2",{children:"Powers, roots, logs"}),e.jsx(r.Pre,{children:`2 ** 10;                 // 1024   (operator)
Math.pow(2, 10);         // 1024   (same)

Math.sqrt(9);            // 3
Math.cbrt(27);           // 3
Math.hypot(3, 4);        // 5      (√(x²+y²+…); avoids overflow/underflow)

Math.log(Math.E);        // 1      (natural log)
Math.log10(1000);        // 3
Math.log2(1024);         // 10
Math.expm1(1e-6);        // e^x-1 (accurate near 0)
Math.log1p(1e-6);        // ln(1+x) (accurate near 0)`}),e.jsx("h2",{children:"Random numbers (and safe integers)"}),e.jsx(r.Pre,{children:`Math.random(); // [0,1)

// int in [min, max] inclusive (uniform)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

randomInt(1, 6);  // dice-like

// Cryptographic randomness (tokens/ids) → use Web Crypto:
crypto.getRandomValues(new Uint32Array(1))[0];`}),e.jsx("h2",{children:"Shuffling (don’t use sort+random)"}),e.jsx(r.Pre,{children:`// Fisher–Yates (uniform)
function shuffle(a){
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}`}),e.jsx("h2",{children:"Degrees ↔ Radians"}),e.jsx(r.Pre,{children:`const toRad = d => d * (Math.PI / 180);
const toDeg = r => r * (180 / Math.PI);

Math.cos(toRad(60)); // 0.5`}),e.jsx("h2",{children:"32-bit & single-precision helpers"}),e.jsx(r.Pre,{children:`Math.imul(0xFFFFFFFF, 2); //  -2 (true 32-bit multiply)
Math.fround(1/3);          // 0.3333333432674408 (float32 rounding)

// Beware: bitwise ops clamp to 32 bits:
(2**40) | 0;               // 0`}),e.jsx("h2",{children:"Aggregations (arrays)"}),e.jsx(r.Pre,{children:`// min/max over arrays
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
}`}),e.jsx("h2",{children:"Nearly-equal compare (FP)"}),e.jsx(r.Pre,{children:`const nearlyEqual = (a, b, eps = Number.EPSILON * 4) =>
  Math.abs(a - b) <= eps * Math.max(1, Math.abs(a), Math.abs(b));

nearlyEqual(0.1 + 0.2, 0.3); // true`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"floor/ceil/trunc/round"})," behave differently for negatives—know which you need."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"clamp"}),", ",e.jsx("b",{children:"lerp"}),", ",e.jsx("b",{children:"mapRange"})," for UI/math utilities."]}),e.jsxs("li",{children:[e.jsx("b",{children:"hypot"})," is the safe Euclidean norm; avoids overflow/underflow."]}),e.jsxs("li",{children:[e.jsx("b",{children:"randomInt"})," formula above for uniform ints; for security use ",e.jsx("b",{children:"Web Crypto"}),"."]}),e.jsxs("li",{children:["Never shuffle with ",e.jsx("code",{children:"sort(() => Math.random()-0.5)"}),"; use Fisher–Yates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"imul"})," and bitwise ops clamp to 32-bit; ",e.jsx("b",{children:"fround"})," snaps to float32."]}),e.jsxs("li",{children:["Compare floats with an ",e.jsx("b",{children:"epsilon"}),", not strict equality."]})]})]})]})}export{o as default};
