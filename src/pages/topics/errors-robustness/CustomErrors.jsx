import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ER_TOPICS } from "./topics.meta";

export default function CustomErrors() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Errors & Robustness"
                sectionPath="/errors-robustness"
                topics={ER_TOPICS}
            />

            <Styled.Heading>Custom errors</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Create <i>domain-specific</i> errors by extending <code>Error</code>.
                    Add fields (like <code>code</code>, <code>status</code>, <code>details</code>) and wrap root
                    failures using the <code>cause</code> option.
                </p>

                <h2>Minimal subclass (good defaults)</h2>
                <Styled.Pre>{`class AppError extends Error {
  constructor(message, options){           // options?: { cause?, code?, details? }
    super(message, options);
    this.name = this.constructor.name;     // "AppError" or subclass name
    if (options?.code)    this.code = options.code;
    if (options?.details) this.details = options.details;
  }
}

// usage
throw new AppError("Invalid config", { code: "CFG_INVALID" });`}</Styled.Pre>

                <h2>Common specializations</h2>
                <Styled.Pre>{`class ValidationError extends AppError {}
class NotFoundError   extends AppError {}
class PermissionError extends AppError {}
class HttpError extends AppError {
  constructor(status, message = "HTTP error", body, options){
    super(message, { ...options, code: "HTTP_" + status });
    this.status = status;
    this.body = body;               // parsed payload if any
  }
}`}</Styled.Pre>

                <h2>Wrapping with <code>cause</code> (error chaining)</h2>
                <p>Always keep the original failure — it's gold for debugging.</p>
                <Styled.Pre>{`try {
  JSON.parse(text);
} catch (e) {
  throw new ValidationError("JSON is malformed", { cause: e, details: { text } });
}

// later:
try { loadCfg(); }
catch (err) {
  if (err instanceof ValidationError) log(err.message, err.cause); // root error
  else throw err;
}`}</Styled.Pre>

                <h2>Operational vs programmer errors</h2>
                <ul>
                    <li><b>Operational</b> (expected-at-runtime): timeouts, bad input, 404. Catch & map to UX.</li>
                    <li><b>Programmer</b> (bugs): null deref, wrong types. <i>Let them crash</i> to surface quickly.</li>
                </ul>
                <Styled.Pre>{`function readUser(json){
  let obj;
  try { obj = JSON.parse(json); }
  catch (e) { throw new ValidationError("Bad JSON", { cause: e }); }

  if (typeof obj.name !== "string")
    throw new ValidationError("name must be string", { details: obj });

  return obj;
}`}</Styled.Pre>

                <h2>Batch failures → <code>AggregateError</code></h2>
                <Styled.Pre>{`const results = await Promise.allSettled(tasks.map(t => t()));
const errors = results.filter(r => r.status === "rejected").map(r => r.reason);
if (errors.length) throw new AggregateError(errors, "Some tasks failed");`}</Styled.Pre>

                <h2>Serialize / log safely</h2>
                <ul>
                    <li>Don't rely on <code>stack</code> format for logic; use it only in logs.</li>
                    <li>Expose safe fields over the wire (<code>code</code>, <code>message</code>, <code>details</code>), hide secrets.</li>
                </ul>
                <Styled.Pre>{`function toClient(err){
  return {
    name: err.name,
    message: err.message,
    code: err.code ?? "INTERNAL",
    details: sanitize(err.details),
  };
}`}</Styled.Pre>

                <h2>Best practices</h2>
                <ul>
                    <li>Always <b>extend Error</b>, set <code>name</code>, and attach contextual fields.</li>
                    <li>Use <code>{`new Error(msg, { cause })`}</code> to preserve the original failure.</li>
                    <li>Throw <b>specific</b> subclasses at boundaries (validation, HTTP, DB...).</li>
                    <li>Don't catch-and-ignore; rethrow when you can't handle.</li>
                    <li>Make messages actionable ("expected X, got Y").</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>{`class X extends Error {constructor(m, o){super(m, o); this.name="X"; } }`}</code></li>
                    <li>Add <code>code/status/details</code> fields; keep messages user/dev friendly.</li>
                    <li>Chain errors with <code>cause</code>; log both current and root.</li>
                    <li>Use <code>AggregateError</code> to report multiple failures together.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
