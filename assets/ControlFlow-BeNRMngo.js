import{j as e}from"./index-Cud8-B-g.js";import{S as s}from"./styled-ou-l2Jgl.js";import{B as n}from"./Breadcrumbs-BUXMDEQY.js";import{L as r}from"./index-B6WK1LZv.js";function t(){return e.jsxs(s.Wrapper,{children:[e.jsx(n,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:r}),e.jsx(s.Heading,{children:"Control flow"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Branching constructs: ",e.jsx("b",{children:"if/else"}),", ",e.jsx("b",{children:"switch"}),", and the"," ",e.jsx("b",{children:"ternary"})," operator. Use them to select code paths clearly and predictably."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"if / else (bread & butter)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use braces even for one-liners; prefer ",e.jsx("b",{children:"guard clauses"})," to reduce nesting."]}),e.jsx("li",{children:"Conditions use truthy/falsy coercion—be explicit when needed."}),e.jsxs("li",{children:["Assignment in a condition is valid; wrap in ",e.jsx("code",{children:"( )"})," if intentional (lint:",e.jsx("code",{children:" no-cond-assign"}),")."]})]}),e.jsx(s.Pre,{children:`// Guard clauses reduce pyramids
function handle(user) {
  if (!user) return;                 // guard 1
  if (user.locked) throw new Error("locked");  // guard 2
  // ...main path
}

// Be explicit with checks
if (count === 0) { /* ... */ }
// if (count) { }   // would treat 0 as falsy (maybe wrong)`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"switch (multi-branch)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Uses ",e.jsx("b",{children:"strict equality"})," semantics (like ",e.jsx("code",{children:"==="}),"):"," ",e.jsx("code",{children:"NaN"})," won’t match itself; ",e.jsx("code",{children:"-0"})," equals ",e.jsx("code",{children:"0"}),"."]}),e.jsxs("li",{children:["Always ",e.jsx("b",{children:"break"})," (or return/throw) unless you want fall-through."]}),e.jsxs("li",{children:["For lookups, an object/Map is often clearer than a huge ",e.jsx("code",{children:"switch"}),"."]})]}),e.jsx(s.Pre,{children:`switch (status) {
  case "idle":
  case "pending": doWork(); break;   // intentional fall-through
  case "done":    cleanup(); break;
  default:        throw new Error("unknown status");
}

// NaN never matches
switch (NaN) { case NaN: console.log("hit"); break; default: console.log("no match"); } // "no match"

// Object/Map lookup alt
const label = ({ 0: "zero", 1: "one" }[n]) ?? "other";`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Ternary (?:)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Expression form for small choices—keep it short and flat."}),e.jsx("li",{children:"Avoid nested ternaries; switch/if is clearer when complex."})]}),e.jsx(s.Pre,{children:`const msg = ready ? "go" : "wait";
const max = a > b ? a : b;`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Short-circuit patterns"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"&&"})," / ",e.jsx("code",{children:"||"})," return operands (not booleans). Use"," ",e.jsx("code",{children:"??"})," for null/undefined-only defaults."]})}),e.jsx(s.Pre,{children:`user && user.login?.();           // call only if user exists
const port = Number(env.PORT ?? 3000); // default only when null/undefined`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Favor guard clauses and early ",e.jsx("code",{children:"return"})," to keep branches shallow."]}),e.jsxs("li",{children:["In ",e.jsx("code",{children:"switch"}),", comment intentional fall-through and include a"," ",e.jsx("code",{children:"default"}),"."]}),e.jsx("li",{children:"Prefer clarity over cleverness—parenthesize complex conditions."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"??"})," when ",e.jsx("code",{children:"0"}),"/",e.jsx("code",{children:'""'}),"/",e.jsx("code",{children:"false"})," are valid."]})]})]})]})}export{t as default};
