import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function ModernOperators() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Modern operators</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Focus.</b> <code>?.</code> (optional chaining), <code>??</code> (nullish coalescing),
                    and logical assignment <code>||=</code>, <code>&amp;&amp;=</code>, <code>??=</code>.
                    These bring safe access, sane fallbacks, and concise updates.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Optional chaining <code>?.</code></h2>
                <ul>
                    <li>Short-circuits when the left side is <b>null or undefined</b> only.</li>
                    <li>Forms: property <code>obj?.prop</code>, index <code>obj?.[key]</code>, call <code>obj?.fn?.(args)</code>.</li>
                    <li>Does <b>not</b> catch thrown errors (e.g., getters/funcs can still throw).</li>
                    <li>Cannot be on the <i>assignment target</i> (left side): <code>{`obj?.x = 1`}</code> ❌</li>
                </ul>
                <Styled.Pre>{`const user = maybeGetUser();           // user may be null/undefined
const city = user?.address?.city ?? "N/A";
user?.notify?.("hi");                 // calls if both exist; otherwise returns undefined

// Deletes are allowed:
delete user?.temp;                    // no-op if user is nullish`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Nullish coalescing <code>??</code></h2>
                <ul>
                    <li>Fallback only when the left is <b>null/undefined</b> (keeps <code>0</code>, <code>""</code>, <code>false</code>).</li>
                    <li>Use instead of <code>||</code> when <code>0</code>/<code>""</code>/<code>false</code> are valid values.</li>
                </ul>
                <Styled.Pre>{`0 || 16        // 16  (oops: 0 is falsy)
0 ?? 16        // 0   ✅

const label = user.name ?? "(anonymous)";`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Logical assignment</h2>
                <ul>
                    <li><code>a ||= b</code> → <code>a || (a = b)</code> (assign when <i>a</i> is falsy).</li>
                    <li><code>a &amp;&amp;= b</code> → <code>a &amp;&amp; (a = b)</code> (assign when <i>a</i> is truthy).</li>
                    <li><code>a ??= b</code> → <code>a ?? (a = b)</code> (assign when <i>a</i> is nullish).</li>
                    <li>Left side is evaluated once (good for getters / computed keys).</li>
                </ul>
                <Styled.Pre>{`const opts = {};
opts.theme ||= "dark";          // sets when missing/falsy
opts.timeout ??= 0;             // sets only if null/undefined (keeps 0)
opts.enabled &&= false;         // flip off only if currently truthy

// With computed keys:
const key = "cache";
obj[key] ??= new Map();         // creates once`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Mixing rules & patterns</h2>
                <ul>
                    <li><b>Grammar:</b> you can't mix <code>??</code> directly with <code>||</code>/<code>&amp;&amp;</code> without parentheses.</li>
                    <li>Common combo: <code>user?.prefs?.theme ?? "dark"</code>.</li>
                    <li>Guarded calls: <code>maybeCb?.(value)</code> — safe optional function call.</li>
                </ul>
                <Styled.Pre>{`// Parens required:
(a ?? b) || c
a ?? (b || c)

// Patterns
const port = Number(env.PORT) || 3000;        // treat 0 as invalid here
const safePort = Number(env.PORT ?? 3000);    // keep numbers; default only on null/undefined

// Optional call keeps 'this' when used as method:
obj.method?.();   // if method exists, 'this' is obj`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>Use <code>??</code> for defaulting; prefer it over <code>||</code> if <code>0</code>/<code>""</code>/<code>false</code> are valid.</li>
                    <li>Use <code>?.</code> for deep optional access/calls; remember it won't swallow thrown errors.</li>
                    <li>Prefer logical assignment (<code>||=</code>/<code>&amp;&amp;=</code>/<code>??=</code>) over verbose <code>if</code>-checks.</li>
                    <li>Add parentheses when combining <code>??</code> with <code>||</code>/<code>&amp;&amp;</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
