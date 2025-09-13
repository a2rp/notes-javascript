import{j as e}from"./index-Cps9Yqi0.js";import{S as s,B as c}from"./index-Da5ERLYl.js";import{B as r}from"./Breadcrumbs-DTCNvS__.js";function l(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:c}),e.jsx(s.Heading,{children:"RegExp"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Regular expressions describe string patterns. A regex has a"," ",e.jsx("i",{children:"pattern"})," and ",e.jsx("i",{children:"flags"})," (e.g., ",e.jsx("code",{children:"/pattern/gi"})," or"," ",e.jsx("code",{children:'new RegExp("pattern", "gi")'}),")."]}),e.jsx("h2",{children:"Flags (most used)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"g"})," global (find all; affects ",e.jsx("code",{children:"lastIndex"}),")"]}),e.jsxs("li",{children:[e.jsx("code",{children:"i"})," ignore case"]}),e.jsxs("li",{children:[e.jsx("code",{children:"m"})," multiline: ",e.jsx("code",{children:"^"}),"/",e.jsx("code",{children:"$"})," match line boundaries"]}),e.jsxs("li",{children:[e.jsx("code",{children:"s"})," dotAll: ",e.jsx("code",{children:"."})," matches newlines"]}),e.jsxs("li",{children:[e.jsx("code",{children:"u"})," Unicode mode: code points, ",e.jsxs("code",{children:["\\\\u","..."]}),", ",e.jsx("code",{children:"\\\\p{…}"})]}),e.jsxs("li",{children:[e.jsx("code",{children:"y"})," sticky: match must start at ",e.jsx("code",{children:"lastIndex"})]})]}),e.jsx("h2",{children:"Core syntax (cheat sheet)"}),e.jsx(s.Pre,{children:`// character classes
\\d  // digit [0-9]
\\w  // word [A-Za-z0-9_]
\\s  // whitespace
.    // any char (not newline unless /s)
[^...] // negated set
[a-z]  // range

// anchors & boundaries
^   // start of string (or line with /m)
$   // end of string (or line with /m)
\\b  // word boundary

// quantifiers
a*   // 0+    (greedy)
a+   // 1+
a?   // 0/1
a{2,5} // 2 to 5
a+?  // lazy
a{2,}? // lazy versions

// groups & alternation
(abc)      // capture
(?:abc)    // non-capturing
a|b        // or
(?<name>...) // named capture
\\1, \\k<name> // backrefs

// lookaround
(?=...)    // lookahead
(?!...)    // negative lookahead
(?<=...)   // lookbehind
(?<!...)   // negative lookbehind`}),e.jsxs("h2",{children:["Unicode & properties (with ",e.jsx("code",{children:"/u"}),")"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use code point escapes ",e.jsxs("code",{children:["\\\\u","1F600"]})," and property escapes ",e.jsx("code",{children:"\\\\p{…}"}),"."]}),e.jsxs("li",{children:["Examples: ",e.jsx("code",{children:"\\\\p{L}"})," letters, ",e.jsx("code",{children:"\\\\p{N}"})," numbers, ",e.jsx("code",{children:"\\\\p{Script=Devanagari}"}),"."]})]}),e.jsx(s.Pre,{children:`const re = /\\p{L}+/gu;   // all letters (unicode-aware)
"नमस्ते123".match(re); // ["नमस्ते"]`}),e.jsx("h2",{children:"Using with strings"}),e.jsx(s.Pre,{children:`const s = "id: A-12, id: B-34";

// test / exec
/\\bA-\\d+\\b/.test(s);          // true
/\\b([A-Z])-([0-9]+)\\b/.exec(s);
// ["A-12", "A", "12", index: 4, ...]

// match / matchAll
s.match(/[A-Z]-\\d+/g);         // ["A-12","B-34"]
[...s.matchAll(/(?<tag>[A-Z])-(?<num>\\d+)/g)]
  .map(m => m.groups);          // [{tag:"A",num:"12"}, {tag:"B",num:"34"}]

// search
"hello.js".search(/\\.js$/);     // 5

// replace / replaceAll (with groups)
"2025-09-13".replace(/(\\d{4})-(\\d{2})-(\\d{2})/, "$3/$2/$1"); // "13/09/2025"
"A_1 A_2".replaceAll(/A_(\\d)/g, (_, d) => \`Item-\${d}\`);     // "Item-1 Item-2"

// split
"one,two  three".split(/[\\s,]+/); // ["one","two","three"]`}),e.jsxs("h2",{children:[e.jsx("code",{children:"g"})," vs ",e.jsx("code",{children:"y"})," (lastIndex behavior)"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"global"})," ",e.jsx("code",{children:"g"}),": continues after previous match; can skip ahead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"sticky"})," ",e.jsx("code",{children:"y"}),": must match ",e.jsx("i",{children:"exactly"})," at ",e.jsx("code",{children:"lastIndex"}),"."]})]}),e.jsx(s.Pre,{children:`const reG = /\\d+/g, reY = /\\d+/y;
const s = "12-34";
reG.exec(s); // ["12"], lastIndex=2
reG.exec(s); // ["34"], lastIndex=5 (skipped "-")

reY.exec(s); // ["12"], lastIndex=2
reY.exec(s); // null (next char is "-"); won't skip`}),e.jsx("h2",{children:"Common patterns"}),e.jsx(s.Pre,{children:`// 1) Escape user input for dynamic RegExp
const escapeRegExp = (str) => str.replace(/[.*+?^$&#123;}()|[\\]\\\\]/g, "\\\\$&");
new RegExp(escapeRegExp(userQuery), "i");

// 2) Whole-word search (ASCII)
new RegExp(\\\`\\\\b\\\${escapeRegExp(word)}\\\\b\\\`, "i");

// 3) Trim multiple spaces → single
text.replace(/\\s+/g, " ").trim();

// 4) Validate simple ISO date (YYYY-MM-DD)
const iso = /^\\d{4}-\\d{2}-\\d{2}$/; iso.test("2025-09-13"); // true`}),e.jsx("h2",{children:"Gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Greedy by default"}),": add ",e.jsx("code",{children:"?"})," for lazy (e.g., ",e.jsx("code",{children:".+?"}),")."]}),e.jsxs("li",{children:["Dot ",e.jsx("code",{children:"."})," doesn't match newline unless ",e.jsx("code",{children:"/s"})," flag."]}),e.jsxs("li",{children:["With ",e.jsx("code",{children:"/g"}),", methods like ",e.jsx("code",{children:"exec"})," mutate ",e.jsx("code",{children:"lastIndex"})," - reset or use a fresh regex."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"/u"})," for emoji & non-BMP correctness; many shorthand classes are ASCII-centric without it."]}),e.jsx("li",{children:"Escape dynamic strings - never interpolate raw user input into a regex."})]}),e.jsx("h2",{children:"Performance tips"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Precompile regexes outside hot loops."}),e.jsxs("li",{children:["Avoid catastrophic backtracking: prefer atomic pieces, specific classes, and avoid nested ",e.jsx("code",{children:".*"}),"."]}),e.jsxs("li",{children:["Prefer ",e.jsx("code",{children:"matchAll"})," for global captures instead of manual ",e.jsx("code",{children:"exec"})," loops."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Flags: ",e.jsx("code",{children:"g/i/m/s/u/y"}),". Use ",e.jsx("code",{children:"/u"})," for Unicode safety, ",e.jsx("code",{children:"/s"})," for dotAll."]}),e.jsxs("li",{children:["Capture groups ",e.jsx("code",{children:"(…)"}),", named ",e.jsx("code",{children:"(?<name>…)"}),", lookarounds ",e.jsx("code",{children:"(?=)"}),"/",e.jsx("code",{children:"(?<=)"}),"."]}),e.jsxs("li",{children:["String APIs: ",e.jsx("code",{children:"test"}),", ",e.jsx("code",{children:"exec"}),", ",e.jsx("code",{children:"match"}),", ",e.jsx("code",{children:"matchAll"}),", ",e.jsx("code",{children:"search"}),", ",e.jsx("code",{children:"replace*"}),", ",e.jsx("code",{children:"split"}),"."]}),e.jsxs("li",{children:["Escape user input with ",e.jsx("code",{children:"escapeRegExp"})," before building dynamic patterns."]}),e.jsxs("li",{children:["Greedy vs lazy matters; ",e.jsx("code",{children:"lastIndex"})," moves with ",e.jsx("code",{children:"g"}),"/",e.jsx("code",{children:"y"}),"."]})]})]})]})}export{l as default};
