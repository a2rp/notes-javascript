import{j as e}from"./index-4OJNB7vi.js";import{S as s}from"./styled-CSyC-YA8.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";import{L as n}from"./index-DfUzXn8d.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(s.Heading,{children:"Bitwise & shift"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Bitwise ops work on ",e.jsx("b",{children:"signed 32-bit integers"})," (values are truncated/wrapped to int32). Useful for flags, masks, and fast math."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Operators"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"&"})," AND, ",e.jsx("code",{children:"|"})," OR, ",e.jsx("code",{children:"^"})," XOR, ",e.jsx("code",{children:"~"})," NOT."]}),e.jsxs("li",{children:["Shifts: ",e.jsx("code",{children:"<<"})," left, ",e.jsx("code",{children:">>"})," right (sign-propagating),",e.jsx("code",{children:" >>>"})," unsigned right (zero-fill)."]}),e.jsxs("li",{children:["Coercion: numbers → int32; bits beyond 32 drop. ",e.jsx("code",{children:"~n"})," equals ",e.jsx("code",{children:"-(n+1)"}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(s.Pre,{children:`// Basics
5 & 3      // 1   (0101 & 0011 = 0001)
5 | 2      // 7   (0101 | 0010 = 0111)
5 ^ 1      // 4   (0101 ^ 0001 = 0100)
~0         // -1
1 << 3     // 8
8 >> 1     // 4
-8 >> 1    // -4   (sign bit kept)
-8 >>> 1   // 2147483644  (unsigned right shift)

// Force unsigned 32-bit (handy for hashes)
( -1 >>> 0 )        // 4294967295

// Truncation to int32
(1e9 << 2)          // wraps within 32-bit range`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Flags & masks (common pattern)"}),e.jsx(s.Pre,{children:`// bit positions
const READ = 1 << 0;   // 0001
const WRITE = 1 << 1;  // 0010
const EXEC = 1 << 2;   // 0100

let perms = 0;
perms |= READ | WRITE;         // set flags
(perms & READ) !== 0;          // has READ?
perms &= ~WRITE;               // clear WRITE
perms ^= EXEC;                 // toggle EXEC`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Extracting bytes"}),e.jsx(s.Pre,{children:`const color = 0x123456;
const r = (color >>> 16) & 0xff;  // 0x12
const g = (color >>> 8)  & 0xff;  // 0x34
const b =  color         & 0xff;  // 0x56`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Notes on BigInt"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["BigInt supports ",e.jsx("code",{children:"&"}),", ",e.jsx("code",{children:"|"}),", ",e.jsx("code",{children:"^"}),", ",e.jsx("code",{children:"~"}),","," ",e.jsx("code",{children:"<<"}),", ",e.jsx("code",{children:">>"})," (no unsigned ",e.jsx("code",{children:">>>"}),")."]}),e.jsx("li",{children:"Don’t mix Number and BigInt in one op—cast intentionally."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["All bitwise ops coerce to ",e.jsx("b",{children:"signed int32"}),"; beware overflow/wrap."]}),e.jsxs("li",{children:[e.jsx("code",{children:">>"})," keeps sign; ",e.jsx("code",{children:">>>"})," zero-fills and yields an unsigned 32-bit result."]}),e.jsxs("li",{children:["Use masks for set/clear/toggle checks; use ",e.jsx("code",{children:"& 0xff"})," to clamp a byte."]}),e.jsxs("li",{children:["For pure unsigned math on Numbers, coerce with ",e.jsx("code",{children:"x >>> 0"})," (returns 0…2³²-1)."]}),e.jsx("li",{children:"Prefer BigInt when you truly need more than 32 bits or exact integer math."})]})]})]})}export{o as default};
