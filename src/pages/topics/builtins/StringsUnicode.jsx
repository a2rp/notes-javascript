import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function StringsUnicode() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Strings & Unicode</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JavaScript strings are immutable sequences of <b>UTF-16 code units</b>.
                    <code>length</code> counts code units, not user-visible characters; some characters (emoji,
                    many historic scripts) need two code units (a <i>surrogate pair</i>).
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`const s = "Hi";          // immutable
s.length;                 // 2
s[0];                     // "H"
// s[0] = "h";           // no-op (immutable)`}</Styled.Pre>

                <h2>Code units vs code points</h2>
                <ul>
                    <li><code>length</code> counts 16-bit units; a single emoji may have length 2.</li>
                    <li>Use <code>codePointAt</code> / <code>String.fromCodePoint</code> for full Unicode.</li>
                </ul>
                <Styled.Pre>{`const e = "😀";     // U+1F600
e.length;                 // 2  (surrogate pair)
e.codePointAt(0);         // 128512
String.fromCodePoint(128512); // "😀"

// Incorrect split by units:
"😀a".split("");          // ["\uD83D","\uDE00","a"]
// Iterate by code points (correct):
[..."😀a"];               // ["😀","a"]
Array.from("😀a");        // ["😀","a"]`}</Styled.Pre>

                <h2>Grapheme clusters (what users see)</h2>
                <p>
                    Some "characters" are multiple code points (e.g., letters + combining marks, skin-tone
                    modifiers). For user-perceived characters, use <code>Intl.Segmenter</code> when available.
                </p>
                <Styled.Pre>{`const g = "न̄";                 // "na" + combining overline
g.length;                        // 2 (two code points)
const seg = new Intl.Segmenter("hi", { granularity: "grapheme" });
[...seg.segment(g)].map(s => s.segment); // ["न̄"] (single grapheme)`}</Styled.Pre>

                <h2>Common operations</h2>
                <Styled.Pre>{`const t = "  Hello JS  ";
t.trim();                       // "Hello JS"
t.toLowerCase();               // "  hello js  "
"hello".toUpperCase();         // "HELLO"
"abc".includes("b");           // true
"notebook".startsWith("note"); // true
"app.js".endsWith(".js");      // true
"ab_ab".indexOf("ab", 1);      // 3
"2025-09-13".slice(0, 4);      // "2025"`}</Styled.Pre>

                <h2>Regex quick hits</h2>
                <ul>
                    <li><code>/u</code> flag makes regex Unicode-aware (handles surrogate pairs).</li>
                    <li><code>/g</code> global; <code>/i</code> case-insensitive; <code>/m</code> multiline.</li>
                    <li><code>matchAll</code> returns an iterator of matches (with groups).</li>
                </ul>
                <Styled.Pre>{`// capture words (unicode letters)
const re = /\\p{L}+/gu;
[..."नमस्ते 😀"].join("|").match(re); // without /u often fails
[... "a1b2".matchAll(/(\\w)(\\d)/g)].map(m => m[0]); // ["a1","b2"]`}</Styled.Pre>

                <h2>Normalization (NFC/NFD)</h2>
                <p>
                    Visually identical strings can be stored as different code point sequences. Normalize
                    before equality/search when combining marks are possible.
                </p>
                <Styled.Pre>{`const a = "é";                 // U+00E9 (precomposed)
const b = "e\\u0301";          // "e" + COMBINING ACUTE
a === b;                       // false
a.normalize("NFC") === b.normalize("NFC"); // true`}</Styled.Pre>

                <h2>Locale-aware compare & case</h2>
                <ul>
                    <li><code>localeCompare</code> (or <code>Intl.Collator</code>) for user-facing sorting/search.</li>
                    <li>Case rules vary by locale (e.g., Turkish İ/i). Pass a locale when needed.</li>
                </ul>
                <Styled.Pre>{`"straße".localeCompare("Strasse", "de", { sensitivity:"base" }); // 0 (equal)
const coll = new Intl.Collator("en", { sensitivity:"base", numeric:true });
["file2","file10","file1"].sort(coll.compare); // natural order`}</Styled.Pre>

                <h2>Escapes & literals</h2>
                <Styled.Pre>{`"line\\nnext";          // newline
"tab\\tstop";          // tab
"\\u00E9";             // hex code unit escape
"\\u{1F680}";          // code point escape (rocket) requires /u in regex literals, but in strings it's fine → "🚀"

// Template literals (interpolation + multiline)
const name = "JS";
\`Hello, \${name}!\`;`}</Styled.Pre>

                <h2>Slicing safely by characters</h2>
                <ul>
                    <li>Avoid <code>slice</code> on raw strings for emoji/combining marks.</li>
                    <li>Convert to code points (or graphemes) first, then slice, then join.</li>
                </ul>
                <Styled.Pre>{`const cp = Array.from("😀👍🏽ok"); // ["😀","👍","🏽","o","k"] (note modifier)
cp.slice(0, 2).join("");      // "😀👍"
// Grapheme-aware:
const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const graphemes = [...seg.segment("👍🏽ok")].map(s => s.segment);
graphemes.slice(0,1).join(""); // "👍🏽"`}</Styled.Pre>

                <h2>Performance tips</h2>
                <ul>
                    <li>String concatenation with <code>+</code> is fine for small counts; for many pieces use an array and <code>join</code>.</li>
                    <li>Avoid building huge regexes dynamically in hot paths; precompile when possible.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>UTF-16</b>: <code>length</code> ≠ characters; use code-point aware APIs (<code>for…of</code>, spread, <code>Array.from</code>).</li>
                    <li>Use <code>codePointAt</code> / <code>fromCodePoint</code> for emoji & non-BMP chars.</li>
                    <li>Normalize (<code>NFC</code>) before equality when combining marks may occur.</li>
                    <li>Use <code>localeCompare</code> / <code>Intl.Collator</code> for human sorting & search.</li>
                    <li><code>/u</code> regex flag for proper Unicode matching; prefer <code>matchAll</code>.</li>
                    <li>For user-perceived "characters", consider <code>Intl.Segmenter</code> (graphemes).</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
