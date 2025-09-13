import{j as e}from"./index-4OJNB7vi.js";import{S as r,B as i}from"./index-APKw0GLP.js";import{B as s}from"./Breadcrumbs-BWCvk1iJ.js";function l(){return e.jsxs(r.Wrapper,{children:[e.jsx(s,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:i}),e.jsx(r.Heading,{children:"Numbers basics"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JavaScript numbers are IEEE-754 ",e.jsx("b",{children:"64-bit floating-point"})," values (double). Special values: ",e.jsx("code",{children:"NaN"}),", ",e.jsx("code",{children:"Infinity"}),", ",e.jsx("code",{children:"-Infinity"}),", and ",e.jsx("code",{children:"-0"}),"."]}),e.jsx("h2",{children:"Literals & bases"}),e.jsx(r.Pre,{children:`123          // decimal
0b1010       // binary (10)
0o755        // octal (493)
0xFF         // hex (255)
1_000_000    // numeric separators (readability)  // ❌ not at edges: _1, 1_, 1._2
`}),e.jsx("h2",{children:"Precision & FP pitfalls"}),e.jsx(r.Pre,{children:`0.1 + 0.2 === 0.3          // false (0.30000000000000004)
Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON  // true  (tolerant compare)

// round to N decimals (copy-safe)
const round = (x, n=2) => Number(Math.round((x + Number.EPSILON) * 10**n) / 10**n);
round(1.005, 2); // 1.01`}),e.jsx("h2",{children:"Safe integers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Exact integer range: ",e.jsx("code",{children:"[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]"})," (±9,007,199,254,740,991)."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Number.isSafeInteger(x)"})," to check; for larger ints use ",e.jsx("b",{children:"BigInt"}),"."]})]}),e.jsx(r.Pre,{children:`Number.MAX_SAFE_INTEGER;  // 9007199254740991
Number.isSafeInteger(2**53);    // false`}),e.jsx("h2",{children:"NaN, Infinity, -0"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"NaN"})," is “not a number” (invalid numeric result). ",e.jsx("code",{children:"NaN !== NaN"}),"."]}),e.jsxs("li",{children:["Check with ",e.jsx("code",{children:"Number.isNaN(x)"})," (don't use global ",e.jsx("code",{children:"isNaN"})," which coerces)."]}),e.jsxs("li",{children:["Detect finite numbers with ",e.jsx("code",{children:"Number.isFinite(x)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"-0"})," exists; useful test: ",e.jsx("code",{children:"Object.is(-0, 0) === false"})," or ",e.jsx("code",{children:"1 / -0 === -Infinity"}),"."]})]}),e.jsx(r.Pre,{children:`Number.isNaN(NaN);         // true
isNaN("foo");               // true (coerces!)  ← avoid
Number.isNaN("foo");        // false (no coerce) ✅
Object.is(-0, 0);           // false
1 / -0;                     // -Infinity`}),e.jsx("h2",{children:"Parsing & coercion"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"Number(str)"})," converts the whole string (strict)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"parseInt"}),"/",e.jsx("code",{children:"parseFloat"})," parse prefix and stop at first invalid char; always pass radix for ",e.jsx("code",{children:"parseInt"}),"."]})]}),e.jsx(r.Pre,{children:`Number("42");           // 42
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
Number([1,2]);         // NaN`}),e.jsx("h2",{children:"Math toolbox (most used)"}),e.jsx(r.Pre,{children:`Math.abs(-3);       // 3
Math.max(1,9,3);  // 9
Math.min(...arr); // spread
Math.floor(2.9);  // 2
Math.ceil(2.1);   // 3
Math.trunc(-2.9); // -2 (drop fraction, toward 0)
Math.round(2.5);  // 3
Math.sign(-7);    // -1
Math.hypot(x,y);  // sqrt(x^2 + y^2)
Math.random();    // [0,1)
`}),e.jsx("h2",{children:"Formatting numbers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"toFixed(n)"})," → string with fixed decimals (rounds)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"toPrecision(n)"})," → significant digits."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Intl.NumberFormat"})," for locale-aware formatting (currency, compact)."]})]}),e.jsx(r.Pre,{children:`(1234.567).toFixed(2);         // "1234.57"
(0.0001234).toPrecision(2);    // "0.00012"
new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(1234567.89); // "12,34,567.89"
new Intl.NumberFormat("en", { style:"currency", currency:"USD" }).format(45.5);  // "$45.50"`}),e.jsx("h2",{children:"Remainder (%) semantics"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"a % b"})," is the ",e.jsx("b",{children:"remainder"}),"; sign follows the dividend (",e.jsx("code",{children:"a"}),"), so it can be negative."]})}),e.jsx(r.Pre,{children:`5 % 3;     // 2
-5 % 3;    // -2  (not 1)
const mod = (a,b) => ((a % b) + b) % b;  // true "mathematical" modulo ≥ 0`}),e.jsx("h2",{children:"Bitwise caveat (32-bit)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Bitwise ops (",e.jsx("code",{children:"| & ^ ~ << >> >>>"}),") convert to signed 32-bit ints; they ",e.jsx("b",{children:"truncate"})," floats and large ints."]})}),e.jsx(r.Pre,{children:`1.9 | 0;          // 1
(2**40) | 0;       // 0  (overflow in 32-bit lane)`}),e.jsx("h2",{children:"Converting to other bases"}),e.jsx(r.Pre,{children:`(255).toString(16);  // "ff"
parseInt("ff", 16); // 255`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["All JS numbers are doubles; expect FP rounding issues — compare with ",e.jsx("code",{children:"EPSILON"})," tolerance."]}),e.jsxs("li",{children:["Stay within ",e.jsx("b",{children:"safe integer"})," range for exact ints; otherwise use ",e.jsx("b",{children:"BigInt"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"Number.isNaN"}),"/",e.jsx("code",{children:"Number.isFinite"})," (no coercion)."]}),e.jsxs("li",{children:["Be aware of ",e.jsx("b",{children:"-0"}),"; detect via ",e.jsx("code",{children:"Object.is"})," if needed."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"parseInt(str, 10)"}),"/",e.jsx("code",{children:"parseFloat"})," for tolerant parsing; ",e.jsx("code",{children:"Number()"})," for strict."]}),e.jsxs("li",{children:[e.jsx("code",{children:"sort"})," numbers with a comparator (",e.jsx("code",{children:"a-b"}),"), not default string order."]}),e.jsx("li",{children:"Bitwise operators clamp to 32-bit; avoid them for big integers."})]})]})]})}export{l as default};
