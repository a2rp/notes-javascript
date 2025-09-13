import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function LabelsBreakContinue() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Labels, break, continue</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>break</code> exits a loop/switch; <code>continue</code> skips to
                    the next loop iteration. A <b>label</b> (<code>name:</code>) can target an outer loop or a
                    labeled block for early exit. Use labels sparingly.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Rules (quick)</h2>
                <ul>
                    <li><b>break;</b> — exits the nearest loop or switch.</li>
                    <li><b>break label;</b> — exits the <i>labeled statement</i> (loop or block).</li>
                    <li><b>continue;</b> — skips to the next iteration of the nearest loop.</li>
                    <li><b>continue label;</b> — jumps to the next iteration of the <i>labeled loop</i> (loops only).</li>
                    <li>Labels prefix any single statement: <code>outer: for (...) &#123; ... &#125;</code></li>
                    <li><code>continue</code> cannot target a plain block or <code>switch</code> (loops only).</li>
                    <li>You can’t jump across function boundaries.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>

                <p><b>1) Exit multiple loops (labeled break)</b></p>
                <Styled.Pre>{`outer:
for (let i = 0; i < A.length; i++) {
  for (let j = 0; j < B.length; j++) {
    if (match(A[i], B[j])) {
      result = [i, j];
      break outer;              // exits both loops
    }
  }
}`}</Styled.Pre>

                <p><b>2) Skip outer loop iteration (labeled continue)</b></p>
                <Styled.Pre>{`rows:
for (let r = 0; r < table.length; r++) {
  for (let c = 0; c < table[r].length; c++) {
    if (isBadCell(table[r][c])) continue rows; // next row
  }
  processRow(table[r]);  // only rows with all good cells reach here
}`}</Styled.Pre>

                <p><b>3) Labeled blocks with break (no continue here)</b></p>
                <Styled.Pre>{`parse:
{
  if (!src) { error = "empty"; break parse; }
  init();
  if (!ok()) { error = "init failed"; break parse; }
  run();
}
if (error) handle(error);`}</Styled.Pre>

                <p><b>4) switch inside a loop — break vs continue</b></p>
                <Styled.Pre>{`for (const t of tokens) {
  switch (t.type) {
    case "skip":
      continue;        // goes to next loop iteration
    case "stop":
      break;           // breaks only the switch, loop continues
    default:
      handle(t);
  }
}`}</Styled.Pre>

                <p><b>5) finally still runs on break/continue/return</b></p>
                <Styled.Pre>{`outer:
for (const x of xs) {
  try {
    if (stop(x)) break outer;
    if (skip(x)) continue outer;
  } finally {
    cleanup(x);        // always runs
  }
}`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>When to use labels (and when not to)</h2>
                <ul>
                    <li><b>Good:</b> rare cases of nested loops where a clean early exit improves clarity.</li>
                    <li><b>Avoid:</b> complex spaghetti flows—prefer extracting to functions + <code>return</code>, or restructure with flags/guards.</li>
                    <li>Linters: consider enabling <code>no-labels</code> / <code>no-extra-label</code> and allow exceptions where helpful.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li><code>continue label</code> targets loops only; <code>break label</code> can target loops or labeled blocks.</li>
                    <li>Don’t jump into a block—labels only jump <i>out</i> of one.</li>
                    <li>Prefer readability: if labels feel confusing, extract logic to a function and use <code>return</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
