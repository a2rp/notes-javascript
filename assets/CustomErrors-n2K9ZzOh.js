import{j as e}from"./index-4OJNB7vi.js";import{S as r,E as s}from"./index-DIV3dVIt.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";function l(){return e.jsxs(r.Wrapper,{children:[e.jsx(i,{sectionLabel:"Errors & Robustness",sectionPath:"/errors-robustness",topics:s}),e.jsx(r.Heading,{children:"Custom errors"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Create ",e.jsx("i",{children:"domain-specific"})," errors by extending ",e.jsx("code",{children:"Error"}),". Add fields (like ",e.jsx("code",{children:"code"}),", ",e.jsx("code",{children:"status"}),", ",e.jsx("code",{children:"details"}),") and wrap root failures using the ",e.jsx("code",{children:"cause"})," option."]}),e.jsx("h2",{children:"Minimal subclass (good defaults)"}),e.jsx(r.Pre,{children:`class AppError extends Error {
  constructor(message, options){           // options?: { cause?, code?, details? }
    super(message, options);
    this.name = this.constructor.name;     // "AppError" or subclass name
    if (options?.code)    this.code = options.code;
    if (options?.details) this.details = options.details;
  }
}

// usage
throw new AppError("Invalid config", { code: "CFG_INVALID" });`}),e.jsx("h2",{children:"Common specializations"}),e.jsx(r.Pre,{children:`class ValidationError extends AppError {}
class NotFoundError   extends AppError {}
class PermissionError extends AppError {}
class HttpError extends AppError {
  constructor(status, message = "HTTP error", body, options){
    super(message, { ...options, code: "HTTP_" + status });
    this.status = status;
    this.body = body;               // parsed payload if any
  }
}`}),e.jsxs("h2",{children:["Wrapping with ",e.jsx("code",{children:"cause"})," (error chaining)"]}),e.jsx("p",{children:"Always keep the original failure — it's gold for debugging."}),e.jsx(r.Pre,{children:`try {
  JSON.parse(text);
} catch (e) {
  throw new ValidationError("JSON is malformed", { cause: e, details: { text } });
}

// later:
try { loadCfg(); }
catch (err) {
  if (err instanceof ValidationError) log(err.message, err.cause); // root error
  else throw err;
}`}),e.jsx("h2",{children:"Operational vs programmer errors"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Operational"})," (expected-at-runtime): timeouts, bad input, 404. Catch & map to UX."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Programmer"})," (bugs): null deref, wrong types. ",e.jsx("i",{children:"Let them crash"})," to surface quickly."]})]}),e.jsx(r.Pre,{children:`function readUser(json){
  let obj;
  try { obj = JSON.parse(json); }
  catch (e) { throw new ValidationError("Bad JSON", { cause: e }); }

  if (typeof obj.name !== "string")
    throw new ValidationError("name must be string", { details: obj });

  return obj;
}`}),e.jsxs("h2",{children:["Batch failures → ",e.jsx("code",{children:"AggregateError"})]}),e.jsx(r.Pre,{children:`const results = await Promise.allSettled(tasks.map(t => t()));
const errors = results.filter(r => r.status === "rejected").map(r => r.reason);
if (errors.length) throw new AggregateError(errors, "Some tasks failed");`}),e.jsx("h2",{children:"Serialize / log safely"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Don't rely on ",e.jsx("code",{children:"stack"})," format for logic; use it only in logs."]}),e.jsxs("li",{children:["Expose safe fields over the wire (",e.jsx("code",{children:"code"}),", ",e.jsx("code",{children:"message"}),", ",e.jsx("code",{children:"details"}),"), hide secrets."]})]}),e.jsx(r.Pre,{children:`function toClient(err){
  return {
    name: err.name,
    message: err.message,
    code: err.code ?? "INTERNAL",
    details: sanitize(err.details),
  };
}`}),e.jsx("h2",{children:"Best practices"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Always ",e.jsx("b",{children:"extend Error"}),", set ",e.jsx("code",{children:"name"}),", and attach contextual fields."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"new Error(msg, { cause })"})," to preserve the original failure."]}),e.jsxs("li",{children:["Throw ",e.jsx("b",{children:"specific"})," subclasses at boundaries (validation, HTTP, DB...)."]}),e.jsx("li",{children:"Don't catch-and-ignore; rethrow when you can't handle."}),e.jsx("li",{children:'Make messages actionable ("expected X, got Y").'})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:e.jsx("code",{children:'class X extends Error {constructor(m, o){super(m, o); this.name="X"; } }'})}),e.jsxs("li",{children:["Add ",e.jsx("code",{children:"code/status/details"})," fields; keep messages user/dev friendly."]}),e.jsxs("li",{children:["Chain errors with ",e.jsx("code",{children:"cause"}),"; log both current and root."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"AggregateError"})," to report multiple failures together."]})]})]})]})}export{l as default};
