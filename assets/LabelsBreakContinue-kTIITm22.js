import{j as e}from"./index-8u32w9KR.js";import{S as l}from"./styled-B7242J7m.js";import{B as r,L as n}from"./index-r3zDAhCy.js";function t(){return e.jsxs(l.Wrapper,{children:[e.jsx(r,{sectionLabel:"Language Fundamentals",sectionPath:"/language-fundamentals",topics:n}),e.jsx(l.Heading,{children:"Labels, break, continue"}),e.jsxs(l.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"break"})," exits a loop/switch; ",e.jsx("code",{children:"continue"})," skips to the next loop iteration. A ",e.jsx("b",{children:"label"})," (",e.jsx("code",{children:"name:"}),") can target an outer loop or a labeled block for early exit. Use labels sparingly."]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Rules (quick)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"break;"})," — exits the nearest loop or switch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"break label;"})," — exits the ",e.jsx("i",{children:"labeled statement"})," (loop or block)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"continue;"})," — skips to the next iteration of the nearest loop."]}),e.jsxs("li",{children:[e.jsx("b",{children:"continue label;"})," — jumps to the next iteration of the ",e.jsx("i",{children:"labeled loop"})," (loops only)."]}),e.jsxs("li",{children:["Labels prefix any single statement: ",e.jsx("code",{children:"outer: for (...) { ... }"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"continue"})," cannot target a plain block or ",e.jsx("code",{children:"switch"})," (loops only)."]}),e.jsx("li",{children:"You can’t jump across function boundaries."})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Tiny examples"}),e.jsx("p",{children:e.jsx("b",{children:"1) Exit multiple loops (labeled break)"})}),e.jsx(l.Pre,{children:`outer:
for (let i = 0; i < A.length; i++) {
  for (let j = 0; j < B.length; j++) {
    if (match(A[i], B[j])) {
      result = [i, j];
      break outer;              // exits both loops
    }
  }
}`}),e.jsx("p",{children:e.jsx("b",{children:"2) Skip outer loop iteration (labeled continue)"})}),e.jsx(l.Pre,{children:`rows:
for (let r = 0; r < table.length; r++) {
  for (let c = 0; c < table[r].length; c++) {
    if (isBadCell(table[r][c])) continue rows; // next row
  }
  processRow(table[r]);  // only rows with all good cells reach here
}`}),e.jsx("p",{children:e.jsx("b",{children:"3) Labeled blocks with break (no continue here)"})}),e.jsx(l.Pre,{children:`parse:
{
  if (!src) { error = "empty"; break parse; }
  init();
  if (!ok()) { error = "init failed"; break parse; }
  run();
}
if (error) handle(error);`}),e.jsx("p",{children:e.jsx("b",{children:"4) switch inside a loop — break vs continue"})}),e.jsx(l.Pre,{children:`for (const t of tokens) {
  switch (t.type) {
    case "skip":
      continue;        // goes to next loop iteration
    case "stop":
      break;           // breaks only the switch, loop continues
    default:
      handle(t);
  }
}`}),e.jsx("p",{children:e.jsx("b",{children:"5) finally still runs on break/continue/return"})}),e.jsx(l.Pre,{children:`outer:
for (const x of xs) {
  try {
    if (stop(x)) break outer;
    if (skip(x)) continue outer;
  } finally {
    cleanup(x);        // always runs
  }
}`}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"When to use labels (and when not to)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Good:"})," rare cases of nested loops where a clean early exit improves clarity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid:"})," complex spaghetti flows—prefer extracting to functions + ",e.jsx("code",{children:"return"}),", or restructure with flags/guards."]}),e.jsxs("li",{children:["Linters: consider enabling ",e.jsx("code",{children:"no-labels"})," / ",e.jsx("code",{children:"no-extra-label"})," and allow exceptions where helpful."]})]}),e.jsx("h2",{style:{margin:"28px 0 12px"},children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"continue label"})," targets loops only; ",e.jsx("code",{children:"break label"})," can target loops or labeled blocks."]}),e.jsxs("li",{children:["Don’t jump into a block—labels only jump ",e.jsx("i",{children:"out"})," of one."]}),e.jsxs("li",{children:["Prefer readability: if labels feel confusing, extract logic to a function and use ",e.jsx("code",{children:"return"}),"."]})]})]})]})}export{t as default};
