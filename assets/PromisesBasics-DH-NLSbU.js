import{j as e}from"./index-COrpvOC4.js";import{S as r,A as s}from"./index-Bl6SJSVb.js";import{B as n}from"./Breadcrumbs-DQDVi04u.js";function c(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:s}),e.jsx(r.Heading,{children:"Promises: basics"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," A ",e.jsx("code",{children:"Promise"})," represents a value that may arrive later. It has 3 states: ",e.jsx("b",{children:"pending → fulfilled"})," (value) or ",e.jsx("b",{children:"rejected"})," (reason). Callbacks are queued with ",e.jsx("code",{children:"then"}),"/",e.jsx("code",{children:"catch"}),"/",e.jsx("code",{children:"finally"})," and run as"," ",e.jsx("b",{children:"microtasks"}),"."]}),e.jsx("h2",{children:"Create"}),e.jsx(r.Pre,{children:`// From callback API
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(42), 200);
});

// From existing value / error
Promise.resolve(5);            // fulfilled
Promise.reject(new Error("x"));`}),e.jsx("h2",{children:"Consume"}),e.jsx(r.Pre,{children:`p.then(v => v * 2)           // chain (returns a new promise)
 .then(x => console.log(x))
 .catch(err => console.error(err))  // handles any prior rejection
 .finally(() => console.log("done"));`}),e.jsx("h2",{children:"Chaining & return rules"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Return a value → next ",e.jsx("code",{children:"then"})," gets it."]}),e.jsxs("li",{children:["Return a promise → chain ",e.jsx("i",{children:"awaits"})," it."]}),e.jsxs("li",{children:["Throw / return rejected promise → jumps to next ",e.jsx("code",{children:"catch"}),"."]})]}),e.jsx(r.Pre,{children:`Promise.resolve(2)
  .then(x => x + 1)             // 3
  .then(x => Promise.resolve(x * 10)) // 30
  .then(console.log)            // 30
  .catch(console.error);`}),e.jsx("h2",{children:"Error propagation"}),e.jsx(r.Pre,{children:`Promise.resolve()
  .then(() => { throw new Error("boom"); })
  .then(() => console.log("won't run"))
  .catch(e => console.log("caught:", e.message))
  .then(() => console.log("continues"));`}),e.jsx("h2",{children:"Thenables (interop)"}),e.jsxs("p",{children:["Any object with ",e.jsx("code",{children:"then(resolve, reject)"})," is a ",e.jsx("i",{children:"thenable"}),". Promises assimilate it."]}),e.jsx(r.Pre,{children:`const thenable = { then: (res) => res("ok") };
Promise.resolve(thenable).then(console.log); // "ok"`}),e.jsx("h2",{children:"Microtask timing"}),e.jsx(r.Pre,{children:`console.log("A");
Promise.resolve().then(() => console.log("micro"));
setTimeout(() => console.log("timer"));
console.log("B");
// A, B, micro, timer`}),e.jsx("h2",{children:"Converting callbacks → promises (promisify)"}),e.jsx(r.Pre,{children:`// Node-style: (args..., cb(err, result))
const promisify = (fn) => (...args) => new Promise((res, rej) =>
  fn(...args, (err, val) => err ? rej(err) : res(val))
);`}),e.jsx("h2",{children:"Common gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forgot return:"})," always ",e.jsx("code",{children:"return"})," the inner promise in a ",e.jsx("code",{children:"then"})," ","chain (or use ",e.jsx("code",{children:"async/await"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Double handlers:"})," either chain with ",e.jsx("code",{children:"then().catch()"})," ",e.jsx("i",{children:"or"})," ","pass both callbacks to one ",e.jsx("code",{children:"then(onFulfilled, onRejected)"}),", not both."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unreturned setTimeout:"})," work done inside timers isn't part of the chain unless you wrap/return a promise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unhandled rejections:"})," attach a ",e.jsx("code",{children:"catch"}),"; envs report them globally."]})]}),e.jsx("h2",{children:"Small patterns"}),e.jsx(r.Pre,{children:`// 1) Wrap fetch with helpful errors
const getJSON = (url) =>
  fetch(url).then(async r => {
    if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
    return r.json();
  });

// 2) Timeout a promise
const withTimeout = (p, ms) => new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error("Timeout")), ms);
  p.then(v => { clearTimeout(t); res(v); },
         e => { clearTimeout(t); rej(e); });
});

// 3) Sequential vs parallel
const seq = async (urls) => {
  const out = [];
  for (const u of urls) out.push(await getJSON(u)); // sequential
  return out;
};
const par = (urls) => Promise.all(urls.map(getJSON)); // parallel`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["States: pending → fulfilled/rejected; callbacks run as ",e.jsx("b",{children:"microtasks"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"then"})," chains; return values/promises appropriately; ",e.jsx("code",{children:"catch"})," handles prior errors."]}),e.jsxs("li",{children:["Promises assimilate ",e.jsx("b",{children:"thenables"}),"."]}),e.jsxs("li",{children:["Always end chains with ",e.jsx("code",{children:"catch"})," (or use ",e.jsx("code",{children:"try/await/catch"}),")."]}),e.jsxs("li",{children:["Prefer parallelizing with ",e.jsx("code",{children:"Promise.all"})," where possible; use timeouts for I/O."]})]})]})]})}export{c as default};
