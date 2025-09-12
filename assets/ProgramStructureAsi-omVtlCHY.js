import{d as i,l as d,m as s,j as e}from"./index-fvJ4-P_X.js";const r={accent:"orangered",fg:"#ddd",muted:"#aaa",cardBg:"hsl(0 0% 100% / 0.04)",border:"1px solid hsl(0 0% 100% / 0.10)",radius:"16px",pad:"18px"},t=s`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`,o=d`
    color: ${r.accent};
    text-decoration: underline;
`,n={Wrapper:i.div`
        padding: 50px;
        color: ${r.fg};
        @media (width < 900px) {
            padding: 15px;
        }
        animation: ${t} 0.2s ease-out;
    `,Heading:i.h1`
        margin: 0 0 30px;
        font-weight: 700;
        letter-spacing: 0.4px;
    `,SubHeading:i.h2`
        margin: 28px 0 12px;
        font-size: 1.25rem;
    `,ListWrapper:i.div``,List:i.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        li {
            width: 250px;
            list-style: none;

            a {
                display: flex;
                color: ${r.muted};
                text-decoration: none;

                &:hover {
                    ${o}
                }
                &.active {
                    color: ${r.accent};
                    text-decoration: none;
                }
            }
        }
    `,Prose:i.div`
        line-height: 1.7;
        color: ${r.fg};

        p,
        ul,
        ol {
            margin: 0 0 10px;
        }
        ul,
        ol {
            padding-left: 1.25rem;
        }

        a {
            color: ${r.muted};
            text-decoration: none;
            &:hover {
                ${o}
            }
        }

        code {
            background: hsl(0 0% 100% / 0.06);
            border: ${r.border};
            padding: 2px 0.5rem;
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
            font-size: 0.95em;
            color: ${r.fg};
        }

        blockquote {
            margin: 12px 0;
            border-left: 3px solid ${r.accent};
            padding: 8px 12px;
            background: ${r.cardBg};
            border-radius: 10px;
        }

        hr {
            border: 0;
            border-top: ${r.border};
            margin: 18px 0;
        }
    `,Pre:i.pre`
        background: #0f0f0f;
        border: ${r.border};
        border-radius: ${r.radius};
        padding: 14px;
        overflow: auto;
        margin: 12px 0;
        font-size: 0.95rem;
        line-height: 1.55;
    `,Kbd:i.kbd`
        padding: 2px 6px;
        border: ${r.border};
        border-bottom-width: 2px;
        border-radius: 6px;
        background: hsl(0 0% 100% / 0.06);
        font-size: 0.9em;
    `,Card:i.div`
        background: ${r.cardBg};
        border: ${r.border};
        border-radius: ${r.radius};
        padding: ${r.pad};
    `,Callout:i.div`
        border-left: 4px solid ${r.accent};
        background: ${r.cardBg};
        border-radius: 12px;
        padding: 12px 14px;
        margin: 12px 0;
    `,Table:i.table`
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
        th,
        td {
            border: ${r.border};
            padding: 8px 10px;
            text-align: left;
        }
        th {
            background: hsl(0 0% 100% / 0.06);
        }
    `};function l(){return e.jsxs(n.Wrapper,{children:[e.jsx(n.Heading,{children:"Program structure & ASI"}),e.jsxs(n.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," A program is a sequence of ",e.jsx("i",{children:"statements"})," (steps). Expressions produce values. JavaScript may ",e.jsx("b",{children:"auto-insert semicolons"})," (ASI) at certain line breaks to recover a valid parse."]}),e.jsx(n.SubHeading,{children:"Rules you actually need"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ASI inserts"})," at end-of-input, before ",e.jsx("code",{children:"}"}),", or when the next token can't continue the current statement."]}),e.jsxs("li",{children:[e.jsx("b",{children:"NoLineTerminatorHere"})," (newline ",e.jsx("u",{children:"not allowed"})," after): ",e.jsx("code",{children:"return"}),", ",e.jsx("code",{children:"throw"}),", ",e.jsx("code",{children:"break"}),", ",e.jsx("code",{children:"continue"}),", and between an operand and postfix ",e.jsx("code",{children:"++/--"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Not inserted"})," inside ",e.jsx("code",{children:"for(;;)"})," headers - the semicolons are mandatory."]}),e.jsxs("li",{children:["A newline ",e.jsx("b",{children:"doesn't end"})," the statement if the next token can legally attach to the previous line (e.g., starting with ",e.jsx("code",{children:"("})," or ",e.jsx("code",{children:"["})," for call/index)."]})]}),e.jsx(n.SubHeading,{children:"Tiny examples (burn these in)"}),e.jsx(n.Pre,{children:`// 1) Restricted keywords
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
;[1,2].forEach(()=>{})`})]}),e.jsx("li",{children:"Add parentheses to make intent explicit when splitting long expressions across lines."})]}),e.jsx(n.SubHeading,{children:"Senior checklist"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["If a line starts with ",e.jsx("code",{children:"("})," / ",e.jsx("code",{children:"["})," right after an expression, will it accidentally call/index the previous line?"]}),e.jsxs("li",{children:["Any newline after ",e.jsx("code",{children:"return/throw/…"}),"? If yes, fix it."]}),e.jsxs("li",{children:["Any postfix ",e.jsx("code",{children:"++/--"})," separated by newline? If yes, fix it."]}),e.jsxs("li",{children:["Prettier/ESLint: enable ",e.jsx("code",{children:"semi: true"})," and ",e.jsx("code",{children:"no-unexpected-multiline"}),"."]})]})]})]})}export{l as default};
