import{j as e}from"./index-Cps9Yqi0.js";import{S as r,B as s}from"./index-Da5ERLYl.js";import{B as i}from"./Breadcrumbs-DTCNvS__.js";function a(){return e.jsxs(r.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:s}),e.jsx(r.Heading,{children:"Sorting correctly"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"Array.prototype.sort"})," sorts ",e.jsx("b",{children:"in place"})," and, without a comparator, compares items as ",e.jsx("b",{children:"strings"})," (Unicode code units). Since ES2019, sort is",e.jsx("b",{children:" stable"})," (ties keep original order). Use ",e.jsx("code",{children:"toSorted()"})," for an immutable copy."]}),e.jsx("h2",{children:"Default sort (string/lexicographic)"}),e.jsx(r.Pre,{children:`["10","2","1"].sort();   // ["1","10","2"]  (strings)
["b","A","a"].sort();      // ["A","a","b"]`}),e.jsx("h2",{children:"Numeric sort (pass a comparator)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Comparator returns ",e.jsx("code",{children:"<0"}),", ",e.jsx("code",{children:"0"}),", or ",e.jsx("code",{children:">0"}),"."]}),e.jsx("li",{children:"Don't return booleans; return numbers."})]}),e.jsx(r.Pre,{children:`[10,2,1].sort((a,b) => a - b);      // ascending
[10,2,1].sort((a,b) => b - a);      // descending

// by a numeric field
users.sort((a,b) => a.age - b.age);

// Dates (compare timestamps)
events.sort((a,b) => a.date - b.date);`}),e.jsx("h2",{children:"Immutable version"}),e.jsx(r.Pre,{children:`const a = [3,1,2];
const b = a.toSorted((x,y) => x - y);  // b = [1,2,3], a unchanged`}),e.jsx("h2",{children:'Case-insensitive & "natural" sorting'}),e.jsx(r.Pre,{children:`// Case-insensitive (simple)
names.sort((a,b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

// Natural order with numbers inside strings
files.toSorted((a,b) => a.localeCompare(b, undefined, { numeric: true })); // ["file1","file2","file10"]

// Faster reusable collator
const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
items.sort(collator.compare);`}),e.jsx("h2",{children:"Multi-key sorting (tie-breakers)"}),e.jsx(r.Pre,{children:`// Primary: lastName (asc), Secondary: age (desc)
people.sort((a, b) =>
  a.last.localeCompare(b.last) || (b.age - a.age)
);`}),e.jsx("h2",{children:"Handling null/undefined"}),e.jsx(r.Pre,{children:`// Push null/undefined to the end
arr.sort((a,b) => (a == null) - (b == null) || (a - b));`}),e.jsx("h2",{children:"Sparse arrays & NaN"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Holes act like ",e.jsx("code",{children:"undefined"})," and are moved to the end."]}),e.jsxs("li",{children:[e.jsx("code",{children:"NaN"})," is treated like a number; your comparator must handle it."]})]}),e.jsx(r.Pre,{children:"[1,,3,2].sort((a,b) => (a ?? Infinity) - (b ?? Infinity)); // [1,2,3, <hole>]"}),e.jsx("h2",{children:"Sort helpers (small utilities)"}),e.jsx(r.Pre,{children:`// 1) sortBy: project then compare
const sortBy = (proj, dir = 1) => (a,b) => {
  const x = proj(a), y = proj(b);
  return x < y ? -1*dir : x > y ? 1*dir : 0;
};
users.sort(sortBy(u => u.name));            // asc by name
users.sort(sortBy(u => u.score, -1));       // desc by score

// 2) compose comparators (multi-key)
const by = (...comps) => (a,b) => {
  for (const c of comps) { const r = c(a,b); if (r) return r; }
  return 0;
};
people.sort(by(
  sortBy(p => p.city),
  sortBy(p => p.last),
  sortBy(p => p.first)
));`}),e.jsx("h2",{children:"Performance notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Time complexity: O(",e.jsx("i",{children:"n"})," log ",e.jsx("i",{children:"n"}),") typical; keep comparators cheap."]}),e.jsx("li",{children:"Avoid allocating heavy objects inside the comparator; precompute when possible."}),e.jsx("li",{children:'For frequent sorts by the same key, cache the key ("Schwartzian transform").'})]}),e.jsx(r.Pre,{children:`// Schwartzian transform (decorate → sort → undecorate)
const sorted = items
  .map(x => ({ x, key: expensiveKey(x) }))
  .sort((a,b) => a.key - b.key)
  .map(({ x }) => x);`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"sort"})," mutates; ",e.jsx("code",{children:"toSorted"})," returns a copy."]}),e.jsx("li",{children:"Default is string ordering; pass a comparator for numbers/dates/objects."}),e.jsx("li",{children:"Comparator must return negative/zero/positive — not booleans."}),e.jsx("li",{children:"Sort is stable (ties keep original order) in modern JS."}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"localeCompare"}),"/",e.jsx("code",{children:"Intl.Collator"})," for human-friendly and numeric-aware sorting."]}),e.jsx("li",{children:"Compose comparators for multi-key sorts; push nullish values to the end when needed."})]})]})]})}export{a as default};
