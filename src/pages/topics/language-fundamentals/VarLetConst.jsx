import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function VarLetConst() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>var vs let vs const</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Three ways to declare bindings:
                    <b> var</b> (function-scoped, hoisted, re-declarable),
                    <b> let</b> (block-scoped, reassignable),
                    <b> const</b> (block-scoped, non-reassignable).
                    Prefer <b>const</b> → <b>let</b>; avoid <b>var</b>.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Scope & lifetime</h2>
                <Styled.Pre>{`function demo() {
  if (true) {
    var v = 1;     // function-scoped
    let l = 2;     // block-scoped
    const c = 3;   // block-scoped
  }
  v;  // ✅ 1
  // l; // ❌ ReferenceError
  // c; // ❌ ReferenceError
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Hoisting & TDZ</h2>
                <Styled.Pre>{`console.log(v); // undefined (var hoisted & initialized)
var v = 1;

console.log(l); // ❌ ReferenceError (TDZ)
let l = 1;

console.log(c); // ❌ ReferenceError (TDZ)
const c = 1;`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Reassign & redeclare</h2>
                <Styled.Pre>{`let x = 1;  x = 2;  // ✅
const y = 1; // y = 2; // ❌ TypeError (no reassign)

// Redeclare in same scope:
var a = 1; var a = 2; // ✅ (but risky)
let b = 1; // let b = 2; // ❌
const d = 1; // const d = 2; // ❌`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Objects with const (mutation vs reassignment)</h2>
                <Styled.Pre>{`const user = { name: "A" };
user.name = "B";   // ✅ mutation allowed
// user = {};      // ❌ reassignment

Object.freeze(user);  // shallow freeze (nested still mutable)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Globals & modules</h2>
                <ul>
                    <li>
                        In non-module scripts, <b>var</b> at top level creates a property on{" "}
                        <code>window/globalThis</code>; <b>let/const</b> do <i>not</i>.
                    </li>
                    <li>ES modules: top-level bindings are module-scoped (no globals).</li>
                </ul>
                <Styled.Pre>{`// <script> (non-module)
var A = 1;
let B = 2;
window.A === 1;   // true
" B" in window;   // false (let/const don't become window props)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Loops & closures (use let)</h2>
                <Styled.Pre>{`// 'var' captures one shared binding → classic bug
var fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
fns.map(fn => fn()); // [3,3,3] ❌

// 'let' creates a fresh binding per iteration
let gns = [];
for (let j = 0; j < 3; j++) gns.push(() => j);
gns.map(fn => fn()); // [0,1,2] ✅`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>for…of / for…in with const</h2>
                <Styled.Pre>{`for (const v of [1,2,3]) {
  // v is a new binding each iteration; you just can't reassign v
  // v++; // ❌ if you try to reassign
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Patterns & lint rules</h2>
                <ul>
                    <li>
                        <b>Default to const.</b> Upgrade to <b>let</b> only when you truly reassign.
                    </li>
                    <li>
                        Favor <b>immutable updates</b> for objects/arrays; freeze critical configs.
                    </li>
                    <li>
                        Lint: <code>no-var</code>, <code>prefer-const</code>, <code>no-redeclare</code>,{" "}
                        <code>no-use-before-define</code>.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
