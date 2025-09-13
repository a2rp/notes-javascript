import{j as e}from"./index-Cps9Yqi0.js";import{S as i}from"./styled-oEnrM-Hq.js";import{B as s}from"./Breadcrumbs-DTCNvS__.js";import{L as n}from"./index-DLp4i7oy.js";function h(){return e.jsxs(i.Wrapper,{children:[e.jsx(s,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(i.Heading,{children:"Operator basics & precedence"}),e.jsxs(i.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("i",{children:"Precedence"})," = which operator binds first; ",e.jsx("i",{children:"associativity"})," = tie-breaker direction at the same level. When unsure, add parentheses."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Cheat sheet (high → low)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Grouping"}),": ",e.jsx("code",{children:"( ... )"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Member / call"}),": ",e.jsx("code",{children:"."}),", ",e.jsx("code",{children:"[]"}),", ",e.jsx("code",{children:"()"}),", ",e.jsx("code",{children:"new fn(...)"}),","," ","optional chaining ",e.jsx("code",{children:"?."})," (short-circuits like its neighbor)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unary"}),": ",e.jsx("code",{children:"delete"}),", ",e.jsx("code",{children:"void"}),", ",e.jsx("code",{children:"typeof"}),", ",e.jsx("code",{children:"+"}),","," ",e.jsx("code",{children:"-"}),", ",e.jsx("code",{children:"~"}),", ",e.jsx("code",{children:"!"}),", ",e.jsx("code",{children:"await"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exponent"}),": ",e.jsx("code",{children:"**"})," (right-associative; cannot have unary on the ",e.jsx("i",{children:"left"})," → use parentheses)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Multiplicative"}),": ",e.jsx("code",{children:"* / %"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Additive"}),": ",e.jsx("code",{children:"+ -"})," (string concat when any side is string after ToPrimitive)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shift"}),": ",e.jsx("code",{children:"<< >> >>>"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relational"}),": ",e.jsx("code",{children:"< <= > >="}),", ",e.jsx("code",{children:"in"}),", ",e.jsx("code",{children:"instanceof"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Equality"}),": ",e.jsx("code",{children:"== != === !=="})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bitwise"}),": ",e.jsx("code",{children:"&"})," → ",e.jsx("code",{children:"^"})," → ",e.jsx("code",{children:"|"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Logical"}),": ",e.jsx("code",{children:"&&"})," (AND) binds tighter than ",e.jsx("code",{children:"||"})," (OR)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nullish"}),": ",e.jsx("code",{children:"??"})," (do ",e.jsx("u",{children:"not"})," mix with ",e.jsx("code",{children:"&&"}),"/",e.jsx("code",{children:"||"})," without parentheses; grammar error)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ternary"}),": ",e.jsx("code",{children:"cond ? a : b"})," (lower than ",e.jsx("code",{children:"&&"}),"/",e.jsx("code",{children:"||"}),")"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assignment"})," (right-assoc): ",e.jsx("code",{children:"="}),", ",e.jsx("code",{children:"+="}),"… ",e.jsx("code",{children:"&&="}),","," ",e.jsx("code",{children:"||="}),", ",e.jsx("code",{children:"??="})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Comma"}),": ",e.jsx("code",{children:","})," (lowest; evaluates left→right, yields last)"]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx(i.Pre,{children:`// Multiplicative > Additive
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
let v = (doSideEffect(), 42); // v = 42`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Common footguns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsxs("b",{children:["Mixing ",e.jsx("code",{children:"??"})," with ",e.jsx("code",{children:"&&"}),"/",e.jsx("code",{children:"||"})]}),": always add parentheses (the grammar forbids direct mix)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Unary with ",e.jsx("code",{children:"**"})]}),": write ",e.jsx("code",{children:"-(a ** b)"})," or ",e.jsx("code",{children:"(-a) ** b"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"String concat vs add"}),": any string → whole ",e.jsx("code",{children:"+"})," chain becomes concatenation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Destructuring assignment"})," needs parens when used as an expression: ",e.jsx("code",{children:"({ x } = obj)"}),"."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Remember anchors: ",e.jsx("b",{children:"Unary"})," → ",e.jsx("b",{children:"**"})," → ",e.jsx("b",{children:"* / %"})," → ",e.jsx("b",{children:"+ -"})," → ",e.jsx("b",{children:"&&"})," → ",e.jsx("b",{children:"||"})," → ",e.jsx("b",{children:"?:"})," → ",e.jsx("b",{children:"="})," → ",e.jsx("b",{children:","})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Right-assoc:"})," ",e.jsx("code",{children:"**"}),", assignments, ternary (as a whole)."]}),e.jsxs("li",{children:["When mixing short-circuiting ops (",e.jsx("code",{children:"&&"}),"/",e.jsx("code",{children:"||"}),"/",e.jsx("code",{children:"??"}),"), add parentheses for clarity."]}),e.jsx("li",{children:"Prefer explicit grouping in reviews; saves brain cycles and bugs."})]})]})]})}export{h as default};
