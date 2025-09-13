import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ER_TOPICS } from "./topics.meta";

export default function GuardsAssertions() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Errors & Robustness"
                sectionPath="/errors-robustness"
                topics={ER_TOPICS}
            />

            <Styled.Heading>Guards & assertions</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <i>Guards</i> are runtime checks that reject bad inputs early.
                    <i> Assertions</i> stop execution when an invariant is broken. Use them to keep failures
                    close to the cause and to make error messages actionable.
                </p>

                <h2>Guard clauses (early-return pattern)</h2>
                <ul>
                    <li>Fail fast at the top of a function instead of nesting deeply.</li>
                </ul>
                <Styled.Pre>{`function createUser(input){
  if (!input)            throw new Error("input is required");
  if (typeof input.name !== "string" || !input.name.trim())
    throw new Error("name must be a non-empty string");
  if (!Number.isInteger(input.age) || input.age < 0)
    throw new Error("age must be a non-negative integer");

  // happy path stays flat
  return { id: crypto.randomUUID(), ...input };
}`}</Styled.Pre>

                <h2>Common guard helpers</h2>
                <Styled.Pre>{`export const isRecord = (v) => v !== null && typeof v === "object";
export const isString = (v) => typeof v === "string";
export const isInteger = (v) => Number.isInteger(v);

// usage
function setTitle(x){
  if (!isString(x)) throw new TypeError("title must be string");
  document.title = x;
}`}</Styled.Pre>

                <h2>Assertion helpers (invariants)</h2>
                <ul>
                    <li>Use for "this must never happen" conditions; they throw on failure.</li>
                </ul>
                <Styled.Pre>{`export function invariant(cond, msg = "Invariant violated"){
  if (!cond) throw new Error(msg);
}

export function assertNonNull(v, msg = "Unexpected null/undefined"){
  if (v === null || v === undefined) throw new Error(msg);
  return v; // convenient pass-through
}

// examples
function getUserName(user){
  assertNonNull(user);
  return user.name; // safe to use
}`}</Styled.Pre>

                <h2>Exhaustiveness checks</h2>
                <ul>
                    <li>Ensure all cases are handled; throw in the default branch.</li>
                </ul>
                <Styled.Pre>{`function iconFor(kind){
  switch (kind){
    case "success": return "✔";
    case "error":   return "✖";
    case "info":    return "ℹ";
    default:        throw new Error("Unknown kind: " + kind);
  }
}`}</Styled.Pre>

                <h2>Parsing results: don't crash on input</h2>
                <ul>
                    <li>Return structured results instead of throwing for expected user errors.</li>
                </ul>
                <Styled.Pre>{`export function tryParseJSON(text){
  try { return { ok: true,  value: JSON.parse(text) }; }
  catch (e){ return { ok: false, error: new SyntaxError("Invalid JSON", { cause: e }) }; }
}

// usage
const res = tryParseJSON(payload);
if (!res.ok) return showError(res.error.message);
doWork(res.value);`}</Styled.Pre>

                <h2>Shape checks (lightweight)</h2>
                <p>Validate only what you use; reject unknown/unsafe shapes.</p>
                <Styled.Pre>{`function isUser(v){
  return isRecord(v)
    && isString(v.name)
    && Number.isInteger(v.age);
}

function handle(data){
  if (!isUser(data)) throw new Error("Bad payload: expected {name:string, age:int}");
  // ...
}`}</Styled.Pre>

                <h2>Abort & timeouts (defensive I/O)</h2>
                <Styled.Pre>{`// Guard long tasks with AbortController
const ac = new AbortController();
const timeout = setTimeout(() => ac.abort(), 8000);
try {
  const r = await fetch(url, { signal: ac.signal });
  return await r.json();
} finally {
  clearTimeout(timeout);
}`}</Styled.Pre>

                <h2>"Safe by default" small patterns</h2>
                <Styled.Pre>{`// Optional chains + defaults
const city = user?.address?.city ?? "Unknown";

// Numeric guard
function toPositiveInt(x){
  if (!Number.isInteger(x) || x <= 0) throw new RangeError("must be +int");
  return x;
}`}</Styled.Pre>

                <h2>When to throw vs return error objects</h2>
                <ul>
                    <li><b>Throw</b> for programming/contract violations (bad arguments, invariants).</li>
                    <li><b>Return structured result</b> for expected user mistakes (validation messages).</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Put <b>guard clauses</b> at the top; keep happy path flat.</li>
                    <li>Use small reusable <b>type/shape guards</b> (<code>isString</code>, <code>isRecord</code>…).</li>
                    <li>Use <b>assertions</b> for impossible states; fail loudly and early.</li>
                    <li>Validate inputs at boundaries; prefer clear, actionable messages.</li>
                    <li>For I/O, protect with <b>timeouts/AbortController</b> and clean up in <code>finally</code>.</li>
                    <li>Decide: <b>throw</b> for contract bugs, <b>return results</b> for user-facing validation.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
