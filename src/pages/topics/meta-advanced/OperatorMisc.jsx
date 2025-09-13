import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

export default function OperatorMisc() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />

            <Styled.Heading>Operators often missed</Styled.Heading>

            <Styled.Prose>
                <p>
                    Short notes on the less-used but important operators: <b>in</b>, <b>delete</b>,{" "}
                    <b>typeof</b>, <b>instanceof</b>, <b>new/new.target</b>, <b>void</b>, and the{" "}
                    <b>comma</b> operator.
                </p>

                <h2><code>in</code> - property existence (via prototype chain)</h2>
                <ul>
                    <li><code>k in obj</code> → <b>true</b> if <i>own or inherited</i> property named <code>k</code> exists.</li>
                    <li>Use <code>Object.hasOwn(obj, k)</code> for <b>own-only</b> checks.</li>
                    <li>Inside class bodies you may test <b>private fields</b>: <code>#x in obj</code> (only where <code>#x</code> is in scope).</li>
                </ul>
                <Styled.Pre>{`"toString" in {};          // true (inherited)
Object.hasOwn({ x:1 }, "x");  // true (own)
class C { #p = 1; has(o){ return #p in o; } }`}</Styled.Pre>

                <h2><code>delete</code> - remove a property (if configurable)</h2>
                <ul>
                    <li>Deletes <b>own</b> properties; returns <b>true</b> if deletion succeeded or key didn't exist.</li>
                    <li>Cannot delete <code>let/const/class</code> bindings; in strict mode attempting to delete certain things throws.</li>
                    <li>On arrays, <code>delete a[i]</code> leaves a <b>hole</b> (sparse array). Prefer <code>splice</code> to reindex.</li>
                </ul>
                <Styled.Pre>{`const o = { a:1 }; delete o.a;   // true, o.a gone
const a = [1,2,3]; delete a[1]; // [1, <empty>, 3] (length stays 3)
// delete non-configurable → false (or throws in strict mode)`}</Styled.Pre>

                <h2><code>typeof</code> - safe type probe</h2>
                <ul>
                    <li>Returns a <b>string</b>; safe on <b>undeclared</b> identifiers.</li>
                    <li>Gotchas: <code>typeof null === "object"</code>; functions → <code>"function"</code>.</li>
                </ul>
                <Styled.Pre>{`typeof x === "undefined";  // safe even if x is undeclared
typeof null;               // "object" (historic quirk)
typeof (()=>{});           // "function"`}</Styled.Pre>

                <h2><code>instanceof</code> - prototype relation</h2>
                <ul>
                    <li>Checks if <code>Ctor.prototype</code> is in the object's prototype chain.</li>
                    <li>Cross-realm objects (e.g., iframes) can fail; prefer <code>Array.isArray</code> / brand checks when needed.</li>
                    <li>Customizable via <code>Symbol.hasInstance</code> on the constructor.</li>
                </ul>
                <Styled.Pre>{`[] instanceof Array;                  // true (same realm)
class V { static [Symbol.hasInstance](v){ return v && v.tag === "V"; } }
({ tag:"V" }) instanceof V;            // true (custom)`}</Styled.Pre>

                <h2><code>new</code> & <code>new.target</code></h2>
                <ul>
                    <li><code>new C(args)</code> creates an object, sets its [[Prototype]] to <code>C.prototype</code>, binds <code>this</code>, runs <code>C</code>.</li>
                    <li><code>new.target</code> (inside a function/constructor) is the constructor actually called with <code>new</code> (helps enforce usage).</li>
                    <li><b>Precedence gotcha:</b> <code>new f().m</code> ≠ <code>new f.m()</code>. The latter is <code>new (f.m)()</code>.</li>
                </ul>
                <Styled.Pre>{`function C(){ if (!new.target) throw new Error("use new"); }
// precedence
new Date().getTime();  // OK
// new Date.getTime(); // BAD: new (Date.getTime)() -> TypeError`}</Styled.Pre>

                <h2><code>void</code> - evaluate but return <code>undefined</code></h2>
                <ul>
                    <li>For “intentionally ignore result” or to prevent link navigation (legacy).</li>
                </ul>
                <Styled.Pre>{`void doSideEffect();  // always yields undefined
// <a href="javascript:void 0">Link</a>  // discouraged in modern apps`}</Styled.Pre>

                <h2>Comma operator <code>,</code> - sequence, returns last</h2>
                <ul>
                    <li>Evaluates left to right, returns the last value. Useful in <code>for</code> headers; avoid in normal code for clarity.</li>
                </ul>
                <Styled.Pre>{`let x = 0, y = 0;
const v = (x++, y++ , x + y); // x=1, y=1, v=2
for (let i=0, j=n-1; i<j; i++, j--) { /* ... */ }`}</Styled.Pre>

                <h2>Related reminders</h2>
                <ul>
                    <li>For null/undefined handling use <code>??</code> and <code>?.</code> (covered earlier).</li>
                    <li>For own-prop tests prefer <code>Object.hasOwn(obj, k)</code> over <code>obj.hasOwnProperty(k)</code>.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>"k" in obj</code> checks prototype chain; <code>Object.hasOwn</code> for own-only.</li>
                    <li><code>delete</code> removes configurable own props; <code>delete a[i]</code> leaves holes.</li>
                    <li><code>typeof</code> works on undeclared identifiers; beware <code>null → "object"</code>.</li>
                    <li><code>instanceof</code> is prototype-based; can be customized via <code>Symbol.hasInstance</code>.</li>
                    <li><code>new</code> precedence: <code>new f().m</code> vs <code>new (f.m)()</code> - don't omit parentheses carelessly.</li>
                    <li><code>void</code> discards value; comma returns last - use sparingly for readability.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
