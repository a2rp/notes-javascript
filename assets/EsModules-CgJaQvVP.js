import{j as e}from"./index-COrpvOC4.js";import{S as r,M as s}from"./index-Dgso4y6A.js";import{B as i}from"./Breadcrumbs-DQDVi04u.js";function t(){return e.jsxs(r.Wrapper,{children:[e.jsx(i,{sectionLabel:"Modules",sectionPath:"/modules",topics:s}),e.jsx(r.Heading,{children:"ES Modules"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ES Modules (ESM) are the native module system in JS. They use"," ",e.jsx("code",{children:"import"}),"/",e.jsx("code",{children:"export"}),", run in ",e.jsx("b",{children:"module scope"})," (not global), are"," ",e.jsx("b",{children:"strict mode"})," by default, and provide ",e.jsx("b",{children:"live read-only bindings"}),"."]}),e.jsx("h2",{children:"Exporting"}),e.jsx(r.Pre,{children:`// named exports
export const PI = 3.14;
export function area(r){ return PI * r * r; }
const hidden = 42;
export { hidden as ANSWER };  // rename on export

// default export (one per module)
export default class Circle { constructor(r){ this.r = r; } }`}),e.jsx("h2",{children:"Importing"}),e.jsx(r.Pre,{children:`// named imports (must match names, can alias)
import { PI, area as circleArea } from "./math.js";

// default + named together
import Circle, { PI as π } from "./math.js";

// namespace import (bag of exports)
import * as M from "./math.js";
M.area(2); M.PI;

// side-effect only (no bindings)
import "./polyfills.js";`}),e.jsx("h2",{children:"Live bindings (important)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Imports are ",e.jsx("b",{children:"views"})," over the exporter's variables; they update when the exporter changes."]}),e.jsx("li",{children:"Imports are read-only — you can't reassign them."})]}),e.jsx(r.Pre,{children:`// math.js
export let count = 0;
export function inc(){ count++; }

// app.js
import { count, inc } from "./math.js";
inc(); console.log(count); // 1 (updated)
count = 5;                 // ❌ TypeError: read-only`}),e.jsx("h2",{children:"Module characteristics"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Module scope:"})," top-level ",e.jsx("code",{children:"this"})," is ",e.jsx("code",{children:"undefined"}),"; vars don't leak to global."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Strict mode:"})," always on."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Once-per-URL:"})," a module is evaluated once and cached; subsequent imports share the instance (singleton per URL)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Static structure:"})," ",e.jsx("code",{children:"import"}),"/",e.jsx("code",{children:"export"})," must be top-level (enables tree-shaking)."]})]}),e.jsx("h2",{children:"Browser usage"}),e.jsx(r.Pre,{children:`<!-- index.html -->
<script type="module">
  import { start } from "./app.js";
  start();
<\/script>

<!-- Modules are deferred by default and use CORS/URL rules.
     Use absolute/relative URLs or import maps for bare specifiers. -->`}),e.jsx("h2",{children:"Re-export (forwarding)"}),e.jsx(r.Pre,{children:`// api.js
export { area, PI } from "./math.js";        // re-export named
export { default as Circle } from "./math.js";`}),e.jsx("h2",{children:"Circular deps (quick note)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["ESM loads in dependency order; during a cycle, modules expose ",e.jsx("b",{children:"partially initialized"})," bindings."]}),e.jsx("li",{children:"Avoid using values before they're initialized; prefer functions/factories to break cycles."})]}),e.jsx("h2",{children:"File specifiers"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use explicit extensions in the browser (",e.jsx("code",{children:".js"}),", ",e.jsx("code",{children:".mjs"}),")."]}),e.jsxs("li",{children:["Node details (package ",e.jsx("code",{children:"type"}),", ",e.jsx("code",{children:".mjs"}),"/",e.jsx("code",{children:".cjs"}),') are covered in "ESM vs CJS".']})]}),e.jsx("h2",{children:"Small patterns"}),e.jsx(r.Pre,{children:`// Barrel module (index.js) to centralize exports
export * from "./math.js";
export { default as Circle } from "./math.js";

// Env-dependent entry (choose at build or via import maps)
// import './devtools.js' in dev only, keep prod lean`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["One module instance per URL; imports are ",e.jsx("b",{children:"live, read-only"})," views."]}),e.jsxs("li",{children:["Top-level only ",e.jsx("code",{children:"import"}),"/",e.jsx("code",{children:"export"}),"; use ",e.jsx("code",{children:"export default"})," for the main thing, named exports for the rest."]}),e.jsxs("li",{children:["Modules are always ",e.jsx("b",{children:"strict"})," and have their own scope."]}),e.jsxs("li",{children:["Browser: ",e.jsx("code",{children:'<script type="module">'}),"; use real URLs or import maps."]}),e.jsx("li",{children:'Re-exports create clean public surfaces ("barrels").'}),e.jsxs("li",{children:["Interop with CommonJS + dynamic ",e.jsx("code",{children:"import()"})," and TLA are in the next topics."]})]})]})]})}export{t as default};
