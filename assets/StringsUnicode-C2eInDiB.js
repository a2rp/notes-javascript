import{j as e}from"./index-D5VEPJXy.js";import{S as s,B as r}from"./index-BYXcVTnH.js";import{B as i}from"./Breadcrumbs-_bfjIlB_.js";function o(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:r}),e.jsx(s.Heading,{children:"Strings & Unicode"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JavaScript strings are immutable sequences of ",e.jsx("b",{children:"UTF-16 code units"}),".",e.jsx("code",{children:"length"})," counts code units, not user-visible characters; some characters (emoji, many historic scripts) need two code units (a ",e.jsx("i",{children:"surrogate pair"}),")."]}),e.jsx("h2",{children:"Basics"}),e.jsx(s.Pre,{children:`const s = "Hi";          // immutable
s.length;                 // 2
s[0];                     // "H"
// s[0] = "h";           // no-op (immutable)`}),e.jsx("h2",{children:"Code units vs code points"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"length"})," counts 16-bit units; a single emoji may have length 2."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"codePointAt"})," / ",e.jsx("code",{children:"String.fromCodePoint"})," for full Unicode."]})]}),e.jsx(s.Pre,{children:`const e = "😀";     // U+1F600
e.length;                 // 2  (surrogate pair)
e.codePointAt(0);         // 128512
String.fromCodePoint(128512); // "😀"

// Incorrect split by units:
"😀a".split("");          // ["\uD83D","\uDE00","a"]
// Iterate by code points (correct):
[..."😀a"];               // ["😀","a"]
Array.from("😀a");        // ["😀","a"]`}),e.jsx("h2",{children:"Grapheme clusters (what users see)"}),e.jsxs("p",{children:['Some "characters" are multiple code points (e.g., letters + combining marks, skin-tone modifiers). For user-perceived characters, use ',e.jsx("code",{children:"Intl.Segmenter"})," when available."]}),e.jsx(s.Pre,{children:`const g = "न̄";                 // "na" + combining overline
g.length;                        // 2 (two code points)
const seg = new Intl.Segmenter("hi", { granularity: "grapheme" });
[...seg.segment(g)].map(s => s.segment); // ["न̄"] (single grapheme)`}),e.jsx("h2",{children:"Common operations"}),e.jsx(s.Pre,{children:`const t = "  Hello JS  ";
t.trim();                       // "Hello JS"
t.toLowerCase();               // "  hello js  "
"hello".toUpperCase();         // "HELLO"
"abc".includes("b");           // true
"notebook".startsWith("note"); // true
"app.js".endsWith(".js");      // true
"ab_ab".indexOf("ab", 1);      // 3
"2025-09-13".slice(0, 4);      // "2025"`}),e.jsx("h2",{children:"Regex quick hits"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"/u"})," flag makes regex Unicode-aware (handles surrogate pairs)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/g"})," global; ",e.jsx("code",{children:"/i"})," case-insensitive; ",e.jsx("code",{children:"/m"})," multiline."]}),e.jsxs("li",{children:[e.jsx("code",{children:"matchAll"})," returns an iterator of matches (with groups)."]})]}),e.jsx(s.Pre,{children:`// capture words (unicode letters)
const re = /\\p{L}+/gu;
[..."नमस्ते 😀"].join("|").match(re); // without /u often fails
[... "a1b2".matchAll(/(\\w)(\\d)/g)].map(m => m[0]); // ["a1","b2"]`}),e.jsx("h2",{children:"Normalization (NFC/NFD)"}),e.jsx("p",{children:"Visually identical strings can be stored as different code point sequences. Normalize before equality/search when combining marks are possible."}),e.jsx(s.Pre,{children:`const a = "é";                 // U+00E9 (precomposed)
const b = "e\\u0301";          // "e" + COMBINING ACUTE
a === b;                       // false
a.normalize("NFC") === b.normalize("NFC"); // true`}),e.jsx("h2",{children:"Locale-aware compare & case"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"localeCompare"})," (or ",e.jsx("code",{children:"Intl.Collator"}),") for user-facing sorting/search."]}),e.jsx("li",{children:"Case rules vary by locale (e.g., Turkish İ/i). Pass a locale when needed."})]}),e.jsx(s.Pre,{children:`"straße".localeCompare("Strasse", "de", { sensitivity:"base" }); // 0 (equal)
const coll = new Intl.Collator("en", { sensitivity:"base", numeric:true });
["file2","file10","file1"].sort(coll.compare); // natural order`}),e.jsx("h2",{children:"Escapes & literals"}),e.jsx(s.Pre,{children:`"line\\nnext";          // newline
"tab\\tstop";          // tab
"\\u00E9";             // hex code unit escape
"\\u{1F680}";          // code point escape (rocket) requires /u in regex literals, but in strings it's fine → "🚀"

// Template literals (interpolation + multiline)
const name = "JS";
\`Hello, \${name}!\`;`}),e.jsx("h2",{children:"Slicing safely by characters"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Avoid ",e.jsx("code",{children:"slice"})," on raw strings for emoji/combining marks."]}),e.jsx("li",{children:"Convert to code points (or graphemes) first, then slice, then join."})]}),e.jsx(s.Pre,{children:`const cp = Array.from("😀👍🏽ok"); // ["😀","👍","🏽","o","k"] (note modifier)
cp.slice(0, 2).join("");      // "😀👍"
// Grapheme-aware:
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const graphemes = [...seg.segment("👍🏽ok")].map(s => s.segment);
graphemes.slice(0,1).join(""); // "👍🏽"`}),e.jsx("h2",{children:"Performance tips"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["String concatenation with ",e.jsx("code",{children:"+"})," is fine for small counts; for many pieces use an array and ",e.jsx("code",{children:"join"}),"."]}),e.jsx("li",{children:"Avoid building huge regexes dynamically in hot paths; precompile when possible."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"UTF-16"}),": ",e.jsx("code",{children:"length"})," ≠ characters; use code-point aware APIs (",e.jsx("code",{children:"for…of"}),", spread, ",e.jsx("code",{children:"Array.from"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"codePointAt"})," / ",e.jsx("code",{children:"fromCodePoint"})," for emoji & non-BMP chars."]}),e.jsxs("li",{children:["Normalize (",e.jsx("code",{children:"NFC"}),") before equality when combining marks may occur."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"localeCompare"})," / ",e.jsx("code",{children:"Intl.Collator"})," for human sorting & search."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/u"})," regex flag for proper Unicode matching; prefer ",e.jsx("code",{children:"matchAll"}),"."]}),e.jsxs("li",{children:['For user-perceived "characters", consider ',e.jsx("code",{children:"Intl.Segmenter"})," (graphemes)."]})]})]})]})}export{o as default};
