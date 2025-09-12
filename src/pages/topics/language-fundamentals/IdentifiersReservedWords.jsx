import { Styled } from "./styled";

export default function IdentifiersReservedWords() {
    return (
        <Styled.Wrapper>
            <Styled.Heading>Identifiers & reserved words</Styled.Heading>

            <Styled.Prose>
                <p><b>Definition.</b> Identifiers name variables, functions, params, classes, etc. They follow Unicode rules and must not be reserved words.</p>

                <h2 style={{ margin: '28px 0 12px' }}>Rules (remember)</h2>
                <ul>
                    <li><b>Start chars:</b> <code>$</code>, <code>_</code>, or any Unicode letter (ID_Start). <b>Not</b> a digit.</li>
                    <li><b>Next chars:</b> letters, digits, <code>$</code>, <code>_</code>, combining marks (ID_Continue).</li>
                    <li>Escapes allowed: <code>\u0061</code> ≡ <code>a</code>.</li>
                    <li><b>Strict mode:</b> don't bind <code>eval</code>/<code>arguments</code>; <code>yield</code> reserved in generators; <code>await</code> reserved in modules/async.</li>
                </ul>

                <h2 style={{ margin: '28px 0 12px' }}>Tiny examples</h2>
                <Styled.Pre>{`// Valid
const $x_1 = 10;
const café = 1;
const π = 3.1415;
const \\u0061lpha = 42; // "alpha"

// Invalid (SyntaxError)
// const 1abc = 0;
// const class = 1;
// In modules/async: let await = 1; // SyntaxError
`}</Styled.Pre>

                <Styled.Pre>{`// Reserved words are ok as *property* names
const obj = { default: 1, "with": 2 };
obj.class = 3;     // ok
// But as identifiers: const default = 1; // ❌
`}</Styled.Pre>

                <h2 style={{ margin: '28px 0 12px' }}>Must-know</h2>
                <ul>
                    <li>Prefer ASCII; <b>camelCase</b> for vars/functions, <b>PascalCase</b> for classes.</li>
                    <li>Avoid Unicode confusables (Latin <code>O</code> vs Cyrillic <code>О</code>).</li>
                </ul>

                {/* ======== ADD-ON: full reserved words with 1–2 line notes ======== */}
                <h2 style={{ margin: '28px 0 12px' }}>Reserved words — quick notes</h2>

                <h3>Always-reserved keywords</h3>
                <ul>
                    <li><code>break</code> — Exit a loop/switch.</li>
                    <li><code>case</code> — Branch in <code>switch</code>.</li>
                    <li><code>catch</code> — Handle errors from <code>try</code>.</li>
                    <li><code>class</code> — Declare class.</li>
                    <li><code>const</code> — Block-scoped, not reassignable.</li>
                    <li><code>continue</code> — Next loop iteration.</li>
                    <li><code>debugger</code> — DevTools breakpoint.</li>
                    <li><code>default</code> — Fallback in <code>switch</code> / default export.</li>
                    <li><code>delete</code> — Remove object property.</li>
                    <li><code>do</code> — Start <code>do…while</code> loop.</li>
                    <li><code>else</code> — Alternative branch for <code>if</code>.</li>
                    <li><code>export</code> — Expose bindings from module.</li>
                    <li><code>extends</code> — Class inheritance.</li>
                    <li><code>finally</code> — Always runs after <code>try/catch</code>.</li>
                    <li><code>for</code> — Loop (<code>for</code>, <code>for…of</code>, <code>for…in</code>).</li>
                    <li><code>function</code> — Function declaration/expression.</li>
                    <li><code>if</code> — Conditional.</li>
                    <li><code>import</code> — Bring bindings into a module.</li>
                    <li><code>in</code> — Key presence in object/prototype chain.</li>
                    <li><code>instanceof</code> — Prototype-chain check.</li>
                    <li><code>new</code> — Construct instance; allocates <code>this</code>.</li>
                    <li><code>return</code> — Exit function with value.</li>
                    <li><code>super</code> — Parent class access.</li>
                    <li><code>switch</code> — Multi-branch by value.</li>
                    <li><code>this</code> — Receiver object (call-site bound).</li>
                    <li><code>throw</code> — Raise exception.</li>
                    <li><code>try</code> — Attempt block for errors.</li>
                    <li><code>typeof</code> — Type query (string).</li>
                    <li><code>var</code> — Function-scoped binding (avoid in modern code).</li>
                    <li><code>void</code> — Discard value; yields <code>undefined</code>.</li>
                    <li><code>while</code> — Loop while condition is true.</li>
                    <li><code>with</code> — Scope hack; disallowed in strict mode.</li>
                    <li><code>yield</code> — Pause/resume in generators.</li>
                    <li><code>let</code> — Block-scoped, reassignable.</li>
                </ul>

                <h3>Context-dependent reserved</h3>
                <ul>
                    <li><code>await</code> — Reserved in modules & inside <code>async</code> fns (await Promises).</li>
                    <li><code>enum</code> — Future-reserved (do not use as identifier).</li>
                    <li><code>implements</code>, <code>interface</code>, <code>package</code>, <code>private</code>, <code>protected</code>, <code>public</code> — Reserved in strict mode for potential future features.</li>
                </ul>

                <h3>Literals (never identifiers)</h3>
                <ul>
                    <li><code>null</code> — Intentional “no value”.</li>
                    <li><code>true</code>, <code>false</code> — Boolean literals.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
