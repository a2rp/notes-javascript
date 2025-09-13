import{j as e}from"./index-COrpvOC4.js";import{S as r,E as s}from"./index-Beb4QShp.js";import{B as n}from"./Breadcrumbs-DQDVi04u.js";function a(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Errors & Robustness",sectionPath:"/errors-robustness",topics:s}),e.jsx(r.Heading,{children:"Guards & assertions"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("i",{children:"Guards"})," are runtime checks that reject bad inputs early.",e.jsx("i",{children:" Assertions"})," stop execution when an invariant is broken. Use them to keep failures close to the cause and to make error messages actionable."]}),e.jsx("h2",{children:"Guard clauses (early-return pattern)"}),e.jsx("ul",{children:e.jsx("li",{children:"Fail fast at the top of a function instead of nesting deeply."})}),e.jsx(r.Pre,{children:`function createUser(input){
  if (!input)            throw new Error("input is required");
  if (typeof input.name !== "string" || !input.name.trim())
    throw new Error("name must be a non-empty string");
  if (!Number.isInteger(input.age) || input.age < 0)
    throw new Error("age must be a non-negative integer");

  // happy path stays flat
  return { id: crypto.randomUUID(), ...input };
}`}),e.jsx("h2",{children:"Common guard helpers"}),e.jsx(r.Pre,{children:`export const isRecord = (v) => v !== null && typeof v === "object";
export const isString = (v) => typeof v === "string";
export const isInteger = (v) => Number.isInteger(v);

// usage
function setTitle(x){
  if (!isString(x)) throw new TypeError("title must be string");
  document.title = x;
}`}),e.jsx("h2",{children:"Assertion helpers (invariants)"}),e.jsx("ul",{children:e.jsx("li",{children:'Use for "this must never happen" conditions; they throw on failure.'})}),e.jsx(r.Pre,{children:`export function invariant(cond, msg = "Invariant violated"){
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
}`}),e.jsx("h2",{children:"Exhaustiveness checks"}),e.jsx("ul",{children:e.jsx("li",{children:"Ensure all cases are handled; throw in the default branch."})}),e.jsx(r.Pre,{children:`function iconFor(kind){
  switch (kind){
    case "success": return "✔";
    case "error":   return "✖";
    case "info":    return "ℹ";
    default:        throw new Error("Unknown kind: " + kind);
  }
}`}),e.jsx("h2",{children:"Parsing results: don't crash on input"}),e.jsx("ul",{children:e.jsx("li",{children:"Return structured results instead of throwing for expected user errors."})}),e.jsx(r.Pre,{children:`export function tryParseJSON(text){
  try { return { ok: true,  value: JSON.parse(text) }; }
  catch (e){ return { ok: false, error: new SyntaxError("Invalid JSON", { cause: e }) }; }
}

// usage
const res = tryParseJSON(payload);
if (!res.ok) return showError(res.error.message);
doWork(res.value);`}),e.jsx("h2",{children:"Shape checks (lightweight)"}),e.jsx("p",{children:"Validate only what you use; reject unknown/unsafe shapes."}),e.jsx(r.Pre,{children:`function isUser(v){
  return isRecord(v)
    && isString(v.name)
    && Number.isInteger(v.age);
}

function handle(data){
  if (!isUser(data)) throw new Error("Bad payload: expected {name:string, age:int}");
  // ...
}`}),e.jsx("h2",{children:"Abort & timeouts (defensive I/O)"}),e.jsx(r.Pre,{children:`// Guard long tasks with AbortController
const ac = new AbortController();
const timeout = setTimeout(() => ac.abort(), 8000);
try {
  const r = await fetch(url, { signal: ac.signal });
  return await r.json();
} finally {
  clearTimeout(timeout);
}`}),e.jsx("h2",{children:'"Safe by default" small patterns'}),e.jsx(r.Pre,{children:`// Optional chains + defaults
const city = user?.address?.city ?? "Unknown";

// Numeric guard
function toPositiveInt(x){
  if (!Number.isInteger(x) || x <= 0) throw new RangeError("must be +int");
  return x;
}`}),e.jsx("h2",{children:"When to throw vs return error objects"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Throw"})," for programming/contract violations (bad arguments, invariants)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Return structured result"})," for expected user mistakes (validation messages)."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Put ",e.jsx("b",{children:"guard clauses"})," at the top; keep happy path flat."]}),e.jsxs("li",{children:["Use small reusable ",e.jsx("b",{children:"type/shape guards"})," (",e.jsx("code",{children:"isString"}),", ",e.jsx("code",{children:"isRecord"}),"…)."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"assertions"})," for impossible states; fail loudly and early."]}),e.jsx("li",{children:"Validate inputs at boundaries; prefer clear, actionable messages."}),e.jsxs("li",{children:["For I/O, protect with ",e.jsx("b",{children:"timeouts/AbortController"})," and clean up in ",e.jsx("code",{children:"finally"}),"."]}),e.jsxs("li",{children:["Decide: ",e.jsx("b",{children:"throw"})," for contract bugs, ",e.jsx("b",{children:"return results"})," for user-facing validation."]})]})]})]})}export{a as default};
