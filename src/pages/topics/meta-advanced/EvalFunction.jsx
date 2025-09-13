import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

export default function EvalFunction() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />

            <Styled.Heading>Eval & Function constructor</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>eval(src)</code> and <code>new Function(args..., body)</code>{" "}
                    compile & run JS from strings. They are powerful but risky: security, performance, and
                    tooling all suffer. Prefer safer alternatives.
                </p>

                <h2>Why avoid</h2>
                <ul>
                    <li><b>Security:</b> code injection if any part of the string is untrusted.</li>
                    <li><b>Performance:</b> disables many engine optimizations; parses at runtime.</li>
                    <li><b>Tooling:</b> breaks static analysis, tree-shaking, bundling.</li>
                    <li><b>CSP:</b> Content-Security-Policy often blocks it (needs <code>unsafe-eval</code>).</li>
                </ul>

                <h2>eval basics (direct vs indirect)</h2>
                <Styled.Pre>{`let x = 1;
function demo(){
  let x = 10;
  // DIRECT eval: shares local scope
  eval("x = x + 5");   // mutates local x
  console.log(x);      // 15

  // INDIRECT eval: runs in global scope
  (0, eval)("var g = 123");
  // "g" becomes a global var
}
demo();`}</Styled.Pre>
                <ul>
                    <li><b>Direct</b> eval (spelled literally <code>eval</code>) executes in the current scope.</li>
                    <li><b>Indirect</b> eval (e.g., <code>(0, eval)(...)</code>) executes in the <b>global</b> scope.</li>
                </ul>

                <h2><code>new Function</code> (always global)</h2>
                <Styled.Pre>{`// new Function(arg1Name, ..., bodyString)
const sum = new Function("a","b","return a + b");
sum(2,3); // 5

// No closure access: cannot see local variables
function makeAdder(n){
  return new Function("x", "return x + n"); // ReferenceError: n is not defined
}`}</Styled.Pre>
                <ul>
                    <li>Code runs in the <b>global scope</b> (no access to local closures).</li>
                    <li>Strict mode only if you include <code>"use strict"</code> in the body.</li>
                </ul>

                <h2>When it's sometimes used</h2>
                <ul>
                    <li>Loading user-written plugins/snippets in a <b>controlled sandbox</b>.</li>
                    <li>Generating small specialized functions (micro-templating)—still risky; prefer templates.</li>
                </ul>

                <h2>Safer alternatives</h2>
                <ul>
                    <li><b>Data, not code:</b> use <code>JSON.parse</code> instead of <code>eval</code>.</li>
                    <li><b>Dynamic modules:</b> <code>await import(url)</code> for code-splitting/plugins.</li>
                    <li><b>Small expression parsers:</b> write/bring a parser for a limited grammar.</li>
                    <li><b>Templating:</b> tagged templates / libraries that <b>escape</b> by default.</li>
                    <li><b>Sanitize HTML:</b> never eval; use DOM APIs + sanitizers (e.g., DOMPurify).</li>
                </ul>
                <Styled.Pre>{`// dynamic import (ESM)
const mod = await import("./math.js");       // static analysis-friendly
console.log(mod.add(2,3));`}</Styled.Pre>

                <h2>Escaping & injection reminder</h2>
                <Styled.Pre>{`// ❌ vulnerable: user input becomes code
const src = "return " + userInput;          // e.g., "process.exit()"
const f = new Function(src);                // code injection risk

// ✅ treat as data, not code
const expr = JSON.parse(userProvidedJson);`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>eval</code> (direct) runs in local scope; indirect eval + <code>new Function</code> run in global scope.</li>
                    <li>No closure access with <code>new Function</code>; add <code>"use strict"</code> yourself if needed.</li>
                    <li>Avoid for untrusted strings; CSP may block it; engines deopt around it.</li>
                    <li>Prefer <b>JSON.parse</b>, <b>dynamic import()</b>, or a limited parser instead.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
