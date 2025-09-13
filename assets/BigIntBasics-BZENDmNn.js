import{j as n}from"./index-D5VEPJXy.js";import{S as i,B as e}from"./index-BYXcVTnH.js";import{B as r}from"./Breadcrumbs-_bfjIlB_.js";function l(){return n.jsxs(i.Wrapper,{children:[n.jsx(r,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:e}),n.jsx(i.Heading,{children:"BigInt"}),n.jsxs(i.Prose,{children:[n.jsxs("p",{children:[n.jsx("b",{children:"Definition."})," ",n.jsx("code",{children:"BigInt"})," is a primitive for ",n.jsx("b",{children:"arbitrary-precision integers"}),". Use it when you need exact integers beyond ",n.jsx("code",{children:"±(2^53-1)"})," or when precision matters (IDs, crypto)."]}),n.jsx("h2",{children:"Create"}),n.jsx(i.Pre,{children:`const a = 9007199254740993n;           // literal (note the 'n')
const b = BigInt("900719925474099312345");  // from string
const c = BigInt(42);                       // from Number (safe only if integer & within range)

// hex/bin/oct with 'n'
0xFFn; 0b1010n; 0o755n;`}),n.jsx("h2",{children:"Operators (integers only)"}),n.jsxs("ul",{children:[n.jsxs("li",{children:["Supported: ",n.jsx("code",{children:"+ - * ** / %"})," and bitwise ",n.jsx("code",{children:"& | ^ ~ << >>"})," (no ",n.jsx("code",{children:">>>"}),")."]}),n.jsxs("li",{children:[n.jsx("b",{children:"Division truncates toward 0"}),"."]})]}),n.jsx(i.Pre,{children:`5n / 2n;        // 2n  (truncates)
7n % 3n;        // 1n
(2n ** 53n);    // 9007199254740992n
(~0n);          // -1n
1n << 63n;      // 9223372036854775808n`}),n.jsx("h2",{children:"Mixing with Number"}),n.jsxs("ul",{children:[n.jsxs("li",{children:["You ",n.jsx("b",{children:"can't"})," mix in arithmetic: ",n.jsx("code",{children:"1n + 1"})," → TypeError. Convert first."]}),n.jsxs("li",{children:["Relational compare works (",n.jsx("code",{children:"<, >, =="}),") with numeric coercion; ",n.jsx("code",{children:"==="})," is ",n.jsx("b",{children:"type-strict"}),"."]})]}),n.jsx(i.Pre,{children:`// convert intentionally
Number(10n) + 5;          // 15  (possible precision loss!)
10n + BigInt(5);          // 15n

1n == 1;                  // true  (loose)
1n === 1;                 // false (strict)
1.5 < 2n;                 // true
NaN < 1n;                 // false`}),n.jsx("h2",{children:"Coercions & truthiness"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("code",{children:"String(123n)"})," → ",n.jsx("code",{children:'"123"'}),"; ",n.jsx("code",{children:"Boolean(0n)"})," is ",n.jsx("code",{children:"false"}),", others ",n.jsx("code",{children:"true"}),"."]}),n.jsxs("li",{children:["Unary ",n.jsx("code",{children:"+"})," is ",n.jsx("b",{children:"not allowed"})," on BigInt; use ",n.jsx("code",{children:"BigInt(x)"}),"."]})]}),n.jsx(i.Pre,{children:`String(42n);     // "42"
Boolean(0n);   // false
// +42n        // TypeError
BigInt("42");  // 42n`}),n.jsx("h2",{children:"APIs & interop"}),n.jsxs("ul",{children:[n.jsxs("li",{children:[n.jsx("b",{children:"No"})," ",n.jsx("code",{children:"Math.*"})," for BigInt. Use operators or write helpers."]}),n.jsxs("li",{children:["Typed arrays: ",n.jsx("code",{children:"BigInt64Array"}),", ",n.jsx("code",{children:"BigUint64Array"}),"."]}),n.jsxs("li",{children:["JSON: ",n.jsx("b",{children:"not supported"})," → ",n.jsxs("code",{children:["JSON.stringify(","x: 1n ",")"]})," throws. Convert to string/number in a replacer."]})]}),n.jsx(i.Pre,{children:`// JSON replacer: BigInt → string
const obj = { id: 123n };
JSON.stringify(obj, (_k, v) => typeof v === "bigint" ? v.toString() : v);
// => '{"id":"123"}'

// BigInt typed arrays
const ta = new BigInt64Array([1n, 2n, -3n]);`}),n.jsx("h2",{children:"Fixed-width wrap (two's complement)"}),n.jsx("ul",{children:n.jsxs("li",{children:[n.jsx("code",{children:"BigInt.asIntN(bits, x)"})," / ",n.jsx("code",{children:"BigInt.asUintN(bits, x)"})," clamp to N-bit ranges."]})}),n.jsx(i.Pre,{children:`BigInt.asIntN(8,  255n);   // -1n (wrap to signed 8-bit)
BigInt.asUintN(8, 255n);   // 255n`}),n.jsx("h2",{children:"Formatting"}),n.jsx("ul",{children:n.jsxs("li",{children:[n.jsx("code",{children:"toString(radix)"})," with 2..36; pad with ",n.jsx("code",{children:"String.prototype.padStart"})," if needed."]})}),n.jsx(i.Pre,{children:`(255n).toString(16);          // "ff"
(10n).toString(2).padStart(8, "0"); // "00001010"`}),n.jsx("h2",{children:"When to use"}),n.jsxs("ul",{children:[n.jsx("li",{children:"IDs, counters, crypto, hashes, large monetary integers (store minor units), precise combinatorics."}),n.jsxs("li",{children:["Not for fractions — BigInt is ",n.jsx("b",{children:"integers only"}),"."]})]}),n.jsx("h2",{children:"Must-know (checklist)"}),n.jsxs("ul",{children:[n.jsxs("li",{children:["Use ",n.jsx("code",{children:"n"})," literal or ",n.jsx("code",{children:"BigInt()"}),"; operations require both sides BigInt."]}),n.jsxs("li",{children:["Division truncates; bitwise ops work (no unsigned ",n.jsx("code",{children:">>>"}),")."]}),n.jsx("li",{children:"Don't mix with Number in math; convert explicitly and mind precision loss."}),n.jsx("li",{children:"JSON doesn't support BigInt — convert via replacer."}),n.jsxs("li",{children:["For fixed-width behavior, use ",n.jsx("code",{children:"BigInt.asIntN/asUintN"}),"."]})]})]})]})}export{l as default};
