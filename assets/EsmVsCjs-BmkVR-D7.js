import{j as e}from"./index-4OJNB7vi.js";import{S as s,M as r}from"./index-Tlvygucx.js";import{B as i}from"./Breadcrumbs-BWCvk1iJ.js";function d(){return e.jsxs(s.Wrapper,{children:[e.jsx(i,{sectionLabel:"Modules",sectionPath:"/modules",topics:r}),e.jsx(s.Heading,{children:"ESM vs CJS (interop)"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("b",{children:"ESM"})," (ECMAScript Modules) uses ",e.jsx("code",{children:"import/export"}),", supports static analysis, live bindings, and top-level ",e.jsx("code",{children:"await"}),"."," ",e.jsx("b",{children:"CJS"})," (CommonJS) uses ",e.jsx("code",{children:"require/module.exports"}),", evaluates synchronously, and is Node-centric. Browsers run ESM; CJS is not supported in browsers."]}),e.jsx("h2",{children:"File types & package mode (Node)"}),e.jsx(s.Pre,{children:`// package.json
{ "type": "module" }   // .js files are ESM; use .cjs for CJS

// Without "type":"module": .js is CJS; use .mjs for ESM

// Dual files (explicit):
index.mjs  // ESM
index.cjs  // CJS`}),e.jsx("h2",{children:"Exports field (dual package)"}),e.jsx(s.Pre,{children:`// package.json (conditional exports)
{
  "name": "lib",
  "exports": {
    "import": "./dist/index.mjs",   // ESM entry
    "require": "./dist/index.cjs"   // CJS entry
  }
}`}),e.jsx("h2",{children:"ESM ↔ CJS interop (how to actually import)"}),e.jsx("h3",{children:"ESM importing CJS"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Import the CJS module as a ",e.jsx("b",{children:"default"})," binding, then destructure."]}),e.jsx("li",{children:"Some runtimes expose “named” re-exports from CJS, but it's not portable. Prefer default."})]}),e.jsx(s.Pre,{children:`// esm.mjs
import pkg from "cjs-lib";      // pkg === module.exports
const { foo, bar } = pkg;       // pull named properties

// Or: create a CJS wrapper that exports ESM-style names`}),e.jsx("h3",{children:"CJS importing ESM"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"require()"})," cannot load ESM. Use dynamic ",e.jsx("code",{children:"import()"})," (async)."]})}),e.jsx(s.Pre,{children:`// cjs.cjs
(async () => {
  const mod = await import("./esm.mjs");
  // default & named
  const util = mod.default;
  const { sum } = mod;
  console.log(util, sum(1,2));
})();`}),e.jsx("h3",{children:"Using require inside an ESM file"}),e.jsx(s.Pre,{children:`// esm.mjs
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cjs = require("./legacy.cjs");`}),e.jsx("h2",{children:"Semantics differences (quick)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Bindings:"})," ESM imports are ",e.jsx("b",{children:"live, read-only"})," views; CJS gets a snapshot object (the shared ",e.jsx("code",{children:"module.exports"}),"). "]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," ESM has module scope; top-level ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"undefined"}),". CJS top-level ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"module.exports"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async:"})," ESM supports top-level ",e.jsx("code",{children:"await"}),"; CJS evaluates synchronously."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache:"})," Both are singletons per URL/resolved path (first load, then cached)."]})]}),e.jsx("h2",{children:"Paths & __dirname in ESM"}),e.jsx(s.Pre,{children:`// ESM replacement for __filename/__dirname
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);`}),e.jsx("h2",{children:"Typical wrappers"}),e.jsx("h3",{children:"Wrap a CJS lib for ESM"}),e.jsx(s.Pre,{children:`// cjs-wrapper.mjs
import pkg from "../legacy.cjs";
export const foo = pkg.foo;
export default pkg;`}),e.jsx("h3",{children:"Wrap an ESM lib for CJS"}),e.jsx(s.Pre,{children:`// esm-wrapper.cjs
module.exports = (async () => {
  const mod = await import("./modern.mjs");
  return { default: mod.default, ...mod };
})(); 
// consumer: (await require("./esm-wrapper.cjs")).default`}),e.jsx("h2",{children:"Browser notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("code",{children:'<script type="module">'}),"; paths are real URLs (CORS rules apply)."]}),e.jsx("li",{children:"CJS doesn't run in browsers without a bundler/transform."})]}),e.jsx("h2",{children:"Gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Don't mix"})," default vs named expectations: CJS → import default; ESM → can export default or named."]}),e.jsxs("li",{children:["Dynamic ",e.jsx("code",{children:"import()"})," is async; refactor call sites accordingly."]}),e.jsxs("li",{children:["Keep the public API stable via ",e.jsx("code",{children:'"exports"'})," mapping; avoid deep imports."]}),e.jsx("li",{children:"Tree-shaking only works with ESM static imports; CJS and dynamic patterns reduce shakeability."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:'"type":"module"'})," flips ",e.jsx("code",{children:".js"})," to ESM in Node; otherwise use ",e.jsx("code",{children:".mjs"})," for ESM and ",e.jsx("code",{children:".cjs"})," for CJS."]}),e.jsxs("li",{children:["ESM→CJS: import the CJS module as ",e.jsx("b",{children:"default"}),"; CJS→ESM: use ",e.jsx("b",{children:"dynamic import()"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"createRequire"})," inside ESM when you must call a CJS-only API."]}),e.jsxs("li",{children:["Replace ",e.jsx("code",{children:"__dirname/__filename"})," via ",e.jsx("code",{children:"import.meta.url"})," utils in ESM."]}),e.jsxs("li",{children:["Prefer dual entry points with conditional ",e.jsx("code",{children:'"exports"'})," for clean interop."]})]})]})]})}export{d as default};
