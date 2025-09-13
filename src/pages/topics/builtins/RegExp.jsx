import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function RegExp() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>RegExp</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Regular expressions describe string patterns. A regex has a{" "}
                    <i>pattern</i> and <i>flags</i> (e.g., <code>/pattern/gi</code> or{" "}
                    <code>new RegExp("pattern", "gi")</code>).
                </p>

                <h2>Flags (most used)</h2>
                <ul>
                    <li><code>g</code> global (find all; affects <code>lastIndex</code>)</li>
                    <li><code>i</code> ignore case</li>
                    <li><code>m</code> multiline: <code>^</code>/<code>$</code> match line boundaries</li>
                    <li><code>s</code> dotAll: <code>.</code> matches newlines</li>
                    <li><code>u</code> Unicode mode: code points, <code>\\u{`...`}</code>, <code>\\p&#123;…&#125;</code></li>
                    <li><code>y</code> sticky: match must start at <code>lastIndex</code></li>
                </ul>

                <h2>Core syntax (cheat sheet)</h2>
                <Styled.Pre>{`// character classes
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
(?<!...)   // negative lookbehind`}</Styled.Pre>

                <h2>Unicode & properties (with <code>/u</code>)</h2>
                <ul>
                    <li>Use code point escapes <code>\\u{`1F600`}</code> and property escapes <code>\\p&#123;…&#125;</code>.</li>
                    <li>Examples: <code>\\p&#123;L&#125;</code> letters, <code>\\p&#123;N&#125;</code> numbers, <code>\\p&#123;Script=Devanagari&#125;</code>.</li>
                </ul>
                <Styled.Pre>{`const re = /\\p{L}+/gu;   // all letters (unicode-aware)
"नमस्ते123".match(re); // ["नमस्ते"]`}</Styled.Pre>

                <h2>Using with strings</h2>
                <Styled.Pre>{`const s = "id: A-12, id: B-34";

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
"one,two  three".split(/[\\s,]+/); // ["one","two","three"]`}</Styled.Pre>

                <h2><code>g</code> vs <code>y</code> (lastIndex behavior)</h2>
                <ul>
                    <li><b>global</b> <code>g</code>: continues after previous match; can skip ahead.</li>
                    <li><b>sticky</b> <code>y</code>: must match <i>exactly</i> at <code>lastIndex</code>.</li>
                </ul>
                <Styled.Pre>{`const reG = /\\d+/g, reY = /\\d+/y;
const s = "12-34";
reG.exec(s); // ["12"], lastIndex=2
reG.exec(s); // ["34"], lastIndex=5 (skipped "-")

reY.exec(s); // ["12"], lastIndex=2
reY.exec(s); // null (next char is "-"); won't skip`}</Styled.Pre>

                <h2>Common patterns</h2>
                <Styled.Pre>{`// 1) Escape user input for dynamic RegExp
const escapeRegExp = (str) => str.replace(/[.*+?^$&#123;}()|[\\]\\\\]/g, "\\\\$&");
new RegExp(escapeRegExp(userQuery), "i");

// 2) Whole-word search (ASCII)
new RegExp(\\\`\\\\b\\\${escapeRegExp(word)}\\\\b\\\`, "i");

// 3) Trim multiple spaces → single
text.replace(/\\s+/g, " ").trim();

// 4) Validate simple ISO date (YYYY-MM-DD)
const iso = /^\\d{4}-\\d{2}-\\d{2}$/; iso.test("2025-09-13"); // true`}</Styled.Pre>

                <h2>Gotchas</h2>
                <ul>
                    <li><b>Greedy by default</b>: add <code>?</code> for lazy (e.g., <code>.+?</code>).</li>
                    <li>Dot <code>.</code> doesn't match newline unless <code>/s</code> flag.</li>
                    <li>With <code>/g</code>, methods like <code>exec</code> mutate <code>lastIndex</code> - reset or use a fresh regex.</li>
                    <li>Use <code>/u</code> for emoji & non-BMP correctness; many shorthand classes are ASCII-centric without it.</li>
                    <li>Escape dynamic strings - never interpolate raw user input into a regex.</li>
                </ul>

                <h2>Performance tips</h2>
                <ul>
                    <li>Precompile regexes outside hot loops.</li>
                    <li>Avoid catastrophic backtracking: prefer atomic pieces, specific classes, and avoid nested <code>.*</code>.</li>
                    <li>Prefer <code>matchAll</code> for global captures instead of manual <code>exec</code> loops.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Flags: <code>g/i/m/s/u/y</code>. Use <code>/u</code> for Unicode safety, <code>/s</code> for dotAll.</li>
                    <li>Capture groups <code>(…)</code>, named <code>(?&lt;name&gt;…)</code>, lookarounds <code>(?=)</code>/<code>(?&lt;=)</code>.</li>
                    <li>String APIs: <code>test</code>, <code>exec</code>, <code>match</code>, <code>matchAll</code>, <code>search</code>, <code>replace*</code>, <code>split</code>.</li>
                    <li>Escape user input with <code>escapeRegExp</code> before building dynamic patterns.</li>
                    <li>Greedy vs lazy matters; <code>lastIndex</code> moves with <code>g</code>/<code>y</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
