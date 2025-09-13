import React from "react";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Hoisting() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Hoisting</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> During compile, <i>declarations</i> are moved to the top of their scope.
                    <b> Initialization stays in place.</b> Effects differ by kind: <code>var</code> gets
                    <code> undefined</code>, <code>let/const/class</code> enter the <b>TDZ</b>, function
                    <b> declarations hoist fully</b>.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Rules (quick)</h2>
                <ul>
                    <li>
                        <b>var:</b> function/global scoped; hoisted and <i>initialized to</i>{" "}
                        <code>undefined</code>. Multiple <code>var</code> redecls merge.
                    </li>
                    <li>
                        <b>let/const/class:</b> hoisted to the block but uninitialized → <b>TDZ</b> until the
                        declaration line. Even <code>typeof</code> throws in TDZ.
                    </li>
                    <li>
                        <b>Function declaration:</b> binding + body hoist; callable before its line. In strict
                        mode & modules, block-scoped if placed inside a block.
                    </li>
                    <li>
                        <b>Function expression / arrow:</b> only the variable hoists (<code>var</code>→
                        <code>undefined</code>; <code>let/const</code>→ TDZ). The function itself does <i>not</i>
                        hoist.
                    </li>
                    <li>
                        <b>Class declaration:</b> hoisted to TDZ; use only after its line. Class expressions don’t
                        hoist.
                    </li>
                    <li>
                        <b>Annex B (legacy browsers, non-strict)</b> had odd block-function semantics; in modern
                        code treat block functions as <b>block-scoped</b> or use <code>const f = () =&gt; { }</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// var — hoisted & initialized
console.log(v); // undefined
var v = 1;      // init happens here`}</Styled.Pre>

                <Styled.Pre>{`// let/const — hoisted to TDZ (no access before line)
console.log(l); // ReferenceError (TDZ)
let l = 1;

typeof c;       // ReferenceError (TDZ)
const c = 2;`}</Styled.Pre>

                <Styled.Pre>{`// Function declaration — fully hoisted
greet();                 // "hi"
function greet(){ console.log("hi"); }`}</Styled.Pre>

                <Styled.Pre>{`// Function expression / arrow — not hoisted as a function
console.log(add); // undefined (var hoists)
var add = function(a,b){ return a+b; };
// add(1,2) now works

// const/let + arrow in TDZ
// inc(1)              // ReferenceError
const inc = (x) => x + 1;`}</Styled.Pre>

                <Styled.Pre>{`// Class declaration — TDZ
// new Person();       // ReferenceError
class Person { constructor(name){ this.name = name; } }
new Person("A");       // ok after declaration`}</Styled.Pre>

                <Styled.Pre>{`// Block-scoped function in strict/modules
{
  function local(){ return 1; } // block-scoped here
  local(); // 1
}
// local(); // ReferenceError (outside the block)`}</Styled.Pre>

                <Styled.Pre>{`// "Last declaration wins" for function declarations in same scope
function which(){ return "A"; }
function which(){ return "B"; }
which(); // "B"`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Interplay notes</h2>
                <ul>
                    <li>
                        Default parameters evaluate <b>left→right</b> before the body; referencing a later param
                        is like TDZ.
                    </li>
                    <li>
                        Imports in ES modules are created before evaluation (live bindings); avoid circular
                        dependencies or read-before-init cycles.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Declare <b>before</b> use. Prefer <b>const</b>/<b>let</b>, avoid <b>var</b>.</li>
                    <li>Call functions early only if they’re <b>declarations</b>, not expressions.</li>
                    <li>
                        Don’t rely on block function hoisting across environments—use{" "}
                        <code>const f = () =&gt; { }</code> inside blocks.
                    </li>
                    <li>
                        Lint: <code>no-use-before-define</code> (allow functions if desired),{" "}
                        <code>no-var</code>.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
