import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ER_TOPICS } from "./topics.meta";

export default function ErrorTypes() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Errors & Robustness"
                sectionPath="/errors-robustness"
                topics={ER_TOPICS}
            />

            <Styled.Heading>Error types</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Errors are thrown to signal failures. Each built-in error type
                    represents a class of mistakes. Create with <code>new TypeError(msg)</code> etc., or
                    <code>throw</code> any value (prefer <code>Error</code> objects).
                </p>

                <h2>Core constructors (when they occur)</h2>
                <ul>
                    <li><b>Error</b> - generic base class.</li>
                    <li><b>TypeError</b> - value is of wrong type or not callable/iterable.</li>
                    <li><b>RangeError</b> - numeric/length out of range (e.g., <code>toFixed(-1)</code>).</li>
                    <li><b>ReferenceError</b> - unknown identifier (e.g., using an undeclared variable).</li>
                    <li><b>SyntaxError</b> - invalid JS source; only seen at parse time (e.g., via <code>eval</code>/<code>new Function</code> or bundlers).</li>
                    <li><b>URIError</b> - bad URI component (e.g., <code>decodeURIComponent("%")</code>).</li>
                    <li><b>AggregateError</b> - wraps multiple errors (e.g., <code>Promise.any</code> rejection).</li>
                    <li><b>EvalError</b> - historical; rarely used today.</li>
                    <li><b>DOMException</b> (browser) - Web APIs throw these (e.g., <code>AbortError</code> from fetch abort).</li>
                </ul>

                <h2>Creating & throwing</h2>
                <Styled.Pre>{`// pick a specific type when possible
function parseJson(s){
  try {
    return JSON.parse(s);
  } catch (err) {
    throw new SyntaxError("Invalid JSON", { cause: err });
  }
}

// using "cause" (ES2022) preserves the root error chain
try { parseJson("{"); }
catch (e) {
  console.error(e.message); // "Invalid JSON"
  console.error(e.cause);   // original SyntaxError from JSON.parse
}`}</Styled.Pre>

                <h2>Inspecting errors</h2>
                <ul>
                    <li><code>err instanceof TypeError</code> to branch by kind.</li>
                    <li><code>err.name</code>, <code>err.message</code>, and (non-standard but common) <code>err.stack</code> for diagnostics.</li>
                </ul>
                <Styled.Pre>{`try { (42)(); } catch (err) {
  if (err instanceof TypeError) {/* handle */}
  console.log(err.name, err.message);
  console.log(String(err)); // "TypeError: ... "
}`}</Styled.Pre>

                <h2>Examples per type</h2>
                <Styled.Pre>{`// TypeError
[1,2,3].map();                 // "map is not a function" if not callable

// RangeError
(123.45).toFixed(1000);        // digits out of range

// ReferenceError
console.log(notDeclared);      // using unknown identifier

// SyntaxError (runtime only via eval/new Function)
try { new Function("let let = 1;") } catch (e){ /* SyntaxError */ }

// URIError
decodeURIComponent("%");       // malformed escape

// AggregateError (Promise.any)
const any = Promise.any([Promise.reject("x"), Promise.reject("y")])
  .catch(err => {
    // err instanceof AggregateError
    for (const e of err.errors) console.log(e);
  });`}</Styled.Pre>

                <h2>Best practices</h2>
                <ul>
                    <li>Throw <b>specific</b> error types; include actionable messages.</li>
                    <li>Preserve the original failure using <code>cause</code>.</li>
                    <li>Don't overuse <code>try/catch</code>-catch at boundaries (I/O, parsing, API edges).</li>
                    <li>Never rely on <code>stack</code> format for logic; it's for logging only.</li>
                    <li>In async code, unhandled rejections surface as <i>unhandledrejection</i> (browser) / process handler (Node).</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Prefer <code>Error</code> subclasses; avoid throwing plain strings.</li>
                    <li>Use <code>instanceof</code> to branch; <code>name/message</code> for logs only.</li>
                    <li><code>SyntaxError</code> appears when dynamically compiling code; not from normal execution.</li>
                    <li><code>AggregateError</code> groups failures (e.g., <code>Promise.any</code>); inspect <code>.errors</code>.</li>
                    <li>Attach context via <code>new Error(msg, &#123; cause &#125;)</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
