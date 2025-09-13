import { Styled } from "./styled";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function TruthyFalsy() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Truthy & falsy</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> In boolean contexts, values coerce to <b>true</b> (truthy) or{" "}
                    <b>false</b> (falsy). Know the exact falsy set; everything else is truthy.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>The falsy list (complete)</h2>
                <ul>
                    <li><code>false</code></li>
                    <li><code>0</code>, <code>-0</code>, <code>0n</code> (BigInt zero)</li>
                    <li><code>""</code> (empty string)</li>
                    <li><code>null</code>, <code>undefined</code></li>
                    <li><code>NaN</code></li>
                </ul>
                <p>Everything else is <b>truthy</b>: non-empty strings, objects/arrays/functions, non-zero numbers, <code>Infinity</code>, dates, regexes, etc.</p>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`Boolean("")        // false
Boolean("0")       // true   (non-empty string)
Boolean([])        // true
Boolean({})        // true
Boolean(0)         // false
Boolean(0n)        // false
Boolean(NaN)       // false
Boolean(new Boolean(false)) // true (object is truthy)`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Short-circuit gotchas</h2>
                <Styled.Pre>{`// || picks the right-hand side when left is *falsy* (0, "", etc.)
const size = user.size || 16;    // if size = 0 (valid), this becomes 16 ❌

// ?? only falls back on null/undefined — keeps 0, "" and false
const safeSize = user.size ?? 16; // if size = 0, stays 0 ✅

const label = user.name && "Has name"; // returns "Has name" or a falsy value (not strictly boolean)
`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Patterns</h2>
                <ul>
                    <li><b>Coerce to boolean:</b> <code>Boolean(x)</code> (preferred) or <code>!!x</code>.</li>
                    <li>
                        <b>Fallbacks:</b> use <code>??</code> when <code>0</code>/<code>""</code>/<code>false</code> are legitimate values.
                    </li>
                    <li>
                        <b>Guarded access:</b> combine with optional chaining — <code>user?.age ?? 0</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Edge notes</h2>
                <ul>
                    <li>
                        Objects are always truthy—even "empty" ones. Don't check emptiness with <code>if (obj)</code>; test keys/length.
                    </li>
                    <li>
                        Legacy quirk: <code>document.all</code> is treated as falsy and special in loose checks; avoid relying on it.
                    </li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
