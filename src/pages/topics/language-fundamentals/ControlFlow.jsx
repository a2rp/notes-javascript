import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function ControlFlow() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Control flow</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Branching constructs: <b>if/else</b>, <b>switch</b>, and the{" "}
                    <b>ternary</b> operator. Use them to select code paths clearly and predictably.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>if / else (bread & butter)</h2>
                <ul>
                    <li>Use braces even for one-liners; prefer <b>guard clauses</b> to reduce nesting.</li>
                    <li>Conditions use truthy/falsy coercion—be explicit when needed.</li>
                    <li>
                        Assignment in a condition is valid; wrap in <code>{`( )`}</code> if intentional (lint:
                        <code> no-cond-assign</code>).
                    </li>
                </ul>
                <Styled.Pre>{`// Guard clauses reduce pyramids
function handle(user) {
  if (!user) return;                 // guard 1
  if (user.locked) throw new Error("locked");  // guard 2
  // ...main path
}

// Be explicit with checks
if (count === 0) { /* ... */ }
// if (count) { }   // would treat 0 as falsy (maybe wrong)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>switch (multi-branch)</h2>
                <ul>
                    <li>
                        Uses <b>strict equality</b> semantics (like <code>===</code>):{" "}
                        <code>NaN</code> won’t match itself; <code>-0</code> equals <code>0</code>.
                    </li>
                    <li>Always <b>break</b> (or return/throw) unless you want fall-through.</li>
                    <li>
                        For lookups, an object/Map is often clearer than a huge <code>switch</code>.
                    </li>
                </ul>
                <Styled.Pre>{`switch (status) {
  case "idle":
  case "pending": doWork(); break;   // intentional fall-through
  case "done":    cleanup(); break;
  default:        throw new Error("unknown status");
}

// NaN never matches
switch (NaN) { case NaN: console.log("hit"); break; default: console.log("no match"); } // "no match"

// Object/Map lookup alt
const label = ({ 0: "zero", 1: "one" }[n]) ?? "other";`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Ternary (?:)</h2>
                <ul>
                    <li>Expression form for small choices—keep it short and flat.</li>
                    <li>Avoid nested ternaries; switch/if is clearer when complex.</li>
                </ul>
                <Styled.Pre>{`const msg = ready ? "go" : "wait";
const max = a > b ? a : b;`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Short-circuit patterns</h2>
                <ul>
                    <li>
                        <code>&amp;&amp;</code> / <code>||</code> return operands (not booleans). Use{" "}
                        <code>??</code> for null/undefined-only defaults.
                    </li>
                </ul>
                <Styled.Pre>{`user && user.login?.();           // call only if user exists
const port = Number(env.PORT ?? 3000); // default only when null/undefined`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Favor guard clauses and early <code>return</code> to keep branches shallow.</li>
                    <li>
                        In <code>switch</code>, comment intentional fall-through and include a{" "}
                        <code>default</code>.
                    </li>
                    <li>Prefer clarity over cleverness—parenthesize complex conditions.</li>
                    <li>Use <code>??</code> when <code>0</code>/<code>""</code>/<code>false</code> are valid.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
