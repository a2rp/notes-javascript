import { Styled } from "./styled";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function StrictMode() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Strict mode</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>"use strict"</code> enables stricter, safer semantics: throws on
                    silent errors, tighter <code>this</code> rules, cleaner scoping. <b>ES modules & class
                        bodies are strict by default.</b>
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>How to enable</h2>
                <Styled.Pre>{`"use strict";            // whole script (must be first statement)
function f(){ "use strict"; /* only this function */ }`}</Styled.Pre>
                <ul>
                    <li>Directive must be at the top of a script or function body (not inside a block).</li>
                    <li>Modules/classes: no directive needed (already strict).</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Key effects</h2>
                <ul>
                    <li><b>No accidental globals:</b> assigning an undeclared name throws.</li>
                    <li>
                        <b>Function-call <code>this</code> is <code>undefined</code>:</b> not auto-bound to the
                        global object (browser <code>window</code>).
                    </li>
                    <li>
                        <b>Syntax is tighter:</b> no <code>with</code>, no duplicate params, no octal literals
                        like <code>0755</code>.
                    </li>
                    <li>
                        <b>Safer ops:</b> writing to read-only props or deleting non-configurable props throws;
                        <code>delete</code> on identifiers is a SyntaxError.
                    </li>
                    <li>
                        <b><code>eval</code>/<code>arguments</code> reserved & saner:</b> can't be bound as
                        identifiers; direct <code>eval</code> doesn't leak bindings; params aren't aliased to{" "}
                        <code>arguments</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`"use strict";
// 1) No accidental globals
x = 1;            // ❌ ReferenceError (x is not defined)
`}</Styled.Pre>

                <Styled.Pre>{`"use strict";
// 2) 'this' in plain function calls
function f(){ return this; }
f() === undefined; // ✅ in strict (was global object in sloppy)
`}</Styled.Pre>

                <Styled.Pre>{`"use strict";
// 3) Syntax tightness
// function g(a, a){}     // ❌ Duplicate parameter name
// with (obj) {}          // ❌ 'with' forbidden
// 0755                   // ❌ Legacy octal; use 0o755
0o755                    // ✓ modern octal
`}</Styled.Pre>

                <Styled.Pre>{`"use strict";
// 4) Safer property ops
const o = {};
Object.defineProperty(o, "x", { value: 1, writable: false });
// o.x = 2;              // ❌ TypeError in strict (silent no-op in sloppy)

// delete eval;         // ❌ SyntaxError
// delete o.toString;   // ❌ TypeError (non-configurable on Object.prototype)
`}</Styled.Pre>

                <Styled.Pre>{`"use strict";
// 5) eval/arguments behavior
(function(a){
  // a === 1; arguments[0] === 1
  arguments[0] = 9;  // does NOT change 'a' in strict
  // a === 1 still
}) (1);

// const eval = 1;     // ❌ can't bind 'eval' (also 'arguments')
`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Modules & classes are strict: write code expecting strict semantics everywhere.</li>
                    <li>Initialize variables before use; avoid relying on global fallback.</li>
                    <li>
                        Avoid legacy patterns: <code>with</code>, duplicate params, octal escapes (
                        <code>"\\012"</code>).
                    </li>
                    <li>
                        Lint it: <code>no-implicit-globals</code>, <code>no-octal</code>,{" "}
                        <code>no-with</code>, <code>no-caller</code>, <code>no-delete-var</code>.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
