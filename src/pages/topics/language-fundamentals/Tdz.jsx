import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function Tdz() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>TDZ (Temporal Dead Zone)</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> The time between scope entry and the <i>actual initialization</i> of a{" "}
                    <code>let</code>/<code>const</code>/<code>class</code> binding. Accessing the name here
                    throws <b>ReferenceError</b>.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Key rules</h2>
                <ul>
                    <li>
                        <code>let/const/class</code> are hoisted to the top of their block but remain
                        <b> uninitialized</b> until the declaration line → TDZ.
                    </li>
                    <li>
                        <code>typeof</code> on a TDZ name <b>throws</b> (unlike an undeclared global where it
                        returns <code>"undefined"</code>).
                    </li>
                    <li>
                        The TDZ also applies to <b>inner shadowing</b>: an inner <code>let x</code> hides the
                        outer <code>x</code> even before its line.
                    </li>
                    <li><code>var</code> has no TDZ (initialized to <code>undefined</code>).</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// 1) Basic TDZ
a;                 // ❌ ReferenceError (TDZ)
let a = 1;

// 2) typeof on TDZ name throws
typeof b;          // ❌ ReferenceError (b exists in TDZ)
let b;

// 3) var is hoisted & initialized
c;                 // undefined
var c = 1;`}</Styled.Pre>

                <Styled.Pre>{`// 4) Shadowing creates TDZ for the inner name
let x = 10;
{
  // x;             // ❌ ReferenceError (inner x in TDZ, outer x is shadowed)
  let x = 20;
}`}</Styled.Pre>

                <Styled.Pre>{`// 5) Self / forward references in initializers
// let y = y;      // ❌ TDZ (y uninitialized when read)
let z = 1;
// let w = z + q;  // ❌ TDZ (q not initialized yet)
// let q = 2;`}</Styled.Pre>

                <Styled.Pre>{`// 6) Classes are also TDZ
// new Foo();      // ❌ ReferenceError
class Foo {}       // only usable after this line`}</Styled.Pre>

                <Styled.Pre>{`// 7) Function parameters evaluate left→right (TDZ inside parameter scope)
function f(a = b, b = 1) { return a + b; }
// f();            // ❌ b is in TDZ when evaluating 'a = b'

function g(x = y) { let y = 2; return x; }
// g();            // ❌ 'y' belongs to body scope, not available for default`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Patterns (avoid TDZ bugs)</h2>
                <ul>
                    <li>Declare before use; keep declarations at the top of the block.</li>
                    <li>Avoid circular/forward references in initializers and default parameters.</li>
                    <li>When shadowing, don’t read the name before its inner declaration.</li>
                    <li>
                        Prefer function <b>declarations</b> (fully hoisted) over function expressions if early
                        calls are needed.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
