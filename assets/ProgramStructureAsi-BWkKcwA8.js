import{j as e}from"./index-8u32w9KR.js";import{S as n}from"./styled-B7242J7m.js";import{B as r,L as i}from"./index-r3zDAhCy.js";function d(){return e.jsxs(n.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:i}),e.jsx(n.Heading,{children:"Program structure & ASI"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," A program is a sequence of ",e.jsx("i",{children:"statements"})," (steps). Expressions produce values. JavaScript may ",e.jsx("b",{children:"auto-insert semicolons"})," (ASI) at certain line breaks to recover a valid parse."]}),e.jsx(n.SubHeading,{children:"Rules you actually need"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ASI inserts"})," at end-of-input, before ",e.jsx("code",{children:"}"}),", or when the next token can't continue the current statement."]}),e.jsxs("li",{children:[e.jsx("b",{children:"NoLineTerminatorHere"})," (newline ",e.jsx("u",{children:"not allowed"})," after): ",e.jsx("code",{children:"return"}),", ",e.jsx("code",{children:"throw"}),", ",e.jsx("code",{children:"break"}),", ",e.jsx("code",{children:"continue"}),", and between an operand and postfix ",e.jsx("code",{children:"++/--"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Not inserted"})," inside ",e.jsx("code",{children:"for(;;)"})," headers - the semicolons are mandatory."]}),e.jsxs("li",{children:["A newline ",e.jsx("b",{children:"doesn't end"})," the statement if the next token can legally attach to the previous line (e.g., starting with ",e.jsx("code",{children:"("})," or ",e.jsx("code",{children:"["})," for call/index)."]})]}),e.jsx(n.SubHeading,{children:"Tiny examples (burn these in)"}),e.jsx(n.Pre,{children:`// 1) Restricted keywords
function f() {
  return
  1           // ⇒ returns undefined (ASI placed after 'return')
}

function g() {
  throw
  new Error() // ❌ SyntaxError (newline after 'throw')
}`}),e.jsx(n.Pre,{children:`// 2) Postfix operators
let a = 1
a
++            // ❌ Unexpected token: newline splits operand from '++'
`}),e.jsx(n.Pre,{children:`// 3) Line starts with '(' or '[' keeps flowing from previous line
const b = fn
(1, 2)        // parsed as: fn(1, 2) - NOT two separate statements

obj = arr
[0] = 42      // parsed as: (obj = arr)[0] = 42
`}),e.jsx(n.Pre,{children:`// 4) No ASI inside for-header
for (let i = 0   // you must write semicolons here
; i < 3
; i++) console.log(i)
`}),e.jsx(n.SubHeading,{children:"Defensive patterns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"End statements with ';'"})," - simplest rule, least surprises."]}),e.jsxs("li",{children:["Never newline after ",e.jsx("code",{children:"return/throw/break/continue"}),"."]}),e.jsxs("li",{children:["When a line intentionally begins with ",e.jsx("code",{children:"("})," or ",e.jsx("code",{children:"["})," (IIFE, array access), prefix it with a ",e.jsx("b",{children:"leading semicolon"}),":",e.jsx(n.Pre,{children:`;(() => {/* IIFE */})()
;[1,2].forEach(()=>{})`})]}),e.jsx("li",{children:"Add parentheses to make intent explicit when splitting long expressions across lines."})]}),e.jsx(n.SubHeading,{children:"Senior checklist"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["If a line starts with ",e.jsx("code",{children:"("})," / ",e.jsx("code",{children:"["})," right after an expression, will it accidentally call/index the previous line?"]}),e.jsxs("li",{children:["Any newline after ",e.jsx("code",{children:"return/throw/…"}),"? If yes, fix it."]}),e.jsxs("li",{children:["Any postfix ",e.jsx("code",{children:"++/--"})," separated by newline? If yes, fix it."]}),e.jsxs("li",{children:["Prettier/ESLint: enable ",e.jsx("code",{children:"semi: true"})," and ",e.jsx("code",{children:"no-unexpected-multiline"}),"."]})]})]})]})}export{d as default};
