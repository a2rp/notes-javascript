import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Scope() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Scope</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Scope is <i>where a name is visible</i>. JS uses{" "}
                    <b>lexical (static) scope</b>: resolution depends on <u>where</u> code is written, not how
                    it’s called.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Kinds of scope</h2>
                <ul>
                    <li>
                        <b>Global / Script:</b> top-level in non-module scripts. <code>var</code> adds a{" "}
                        <code>window</code> property; <code>let/const</code> don’t.
                    </li>
                    <li>
                        <b>Module:</b> ES modules have their own top-level scope (not global), strict by
                        default; top-level <code>this</code> is <code>undefined</code>.
                    </li>
                    <li>
                        <b>Function:</b> params + locals live here (for <code>var/let/const</code>).
                    </li>
                    <li>
                        <b>Block:</b> anything in <code>{`{ ... }`}</code> for <code>let/const/class/function*</code> (modern
                        spec). <code>var</code> ignores blocks.
                    </li>
                    <li>
                        <b>Catch binding:</b> <code>catch (e)</code> has its own inner binding <code>e</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Resolution & chain</h2>
                <ul>
                    <li>
                        Lookups walk <b>inner → outer</b> environments until global. If not found →{" "}
                        <code>ReferenceError</code> (in strict/module; sloppy assignment <i>would</i> create a
                        global—don’t rely on it).
                    </li>
                    <li>
                        Shadowing: an inner declaration with the same name hides the outer one.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// Block scope vs var
if (true) {
  var v = 1;        // function/global (script) scope
  let l = 2;        // block scope
}
v;                  // 1
// l;               // ReferenceError

// Shadowing
const x = 1;
{
  const x = 2;      // shadows outer x
  // ...
}

// Param redeclare (same scope) is illegal; shadow in a new block instead
function f(x) {
  // let x = 2;     // ❌ SyntaxError (same scope as param)
  { let x = 2; }    // ✅ inner block scope
}

// Closures capture by reference (from defining scope)
function makeCounter(){
  let n = 0;
  return () => ++n;
}
const c = makeCounter();
c(); c();           // 1, 2`}</Styled.Pre>

                <Styled.Pre>{`// Global vs Module top-level
// <script> (non-module)
var A = 1;
let B = 2;
window.A === 1;     // true
("B" in window);    // false

// In ES modules (top-level is module scope):
// var/let/const here DO NOT create window properties
// top-level this === undefined`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Functions in blocks</h2>
                <ul>
                    <li>
                        In modern JS (strict/modules), <b>function declarations inside blocks are block-scoped</b>.
                    </li>
                    <li>
                        Legacy non-strict browsers had odd semantics—avoid relying on them; prefer{" "}
                        <code>const f = function(){ }</code> inside the block.
                    </li>
                </ul>
                <Styled.Pre>{`{
  const mode = "inner";
  function g(){ return mode; } // block-scoped in strict/module
  g(); // "inner"
}
// g(); // ReferenceError`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>
                        Default <b>const</b>, then <b>let</b>; avoid <b>var</b> (leaks across blocks).
                    </li>
                    <li>
                        Declare near first use; keep scopes small; prefer extra braces to limit lifetime.
                    </li>
                    <li>
                        Modules isolate top-level—no accidental globals; use <code>globalThis</code> when you
                        truly need the global object.
                    </li>
                    <li>
                        For loops + closures: use <code>let</code> (fresh binding per iteration).
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
