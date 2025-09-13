import{j as e}from"./index-D5VEPJXy.js";import{S as s,M as i}from"./index-B-7gaVIV.js";import{B as r}from"./Breadcrumbs-_bfjIlB_.js";function n(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Modules",sectionPath:"/modules",topics:i}),e.jsx(s.Heading,{children:"Dynamic import & TLA"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"import()"})," loads a module ",e.jsx("b",{children:"dynamically at runtime"})," and returns a ",e.jsx("b",{children:"Promise"}),". ",e.jsx("b",{children:"Top-level await (TLA)"})," lets a module ",e.jsx("code",{children:"await"})," at the top level—its dependents wait until it finishes evaluating."]}),e.jsxs("h2",{children:["Dynamic ",e.jsx("code",{children:"import()"})," (lazy load / code-split)"]}),e.jsxs("ul",{children:[e.jsx("li",{children:"Works anywhere (inside handlers, conditions, loops)."}),e.jsx("li",{children:"Resolves to the module namespace object."}),e.jsx("li",{children:"Useful for big libs, rarely used routes, feature flags."})]}),e.jsx(s.Pre,{children:`// Lazy-load on demand (browser)
btn.addEventListener("click", async () => {
  const { default: _ } = await import("lodash");
  console.log(_.chunk([1,2,3,4], 2));
});

// Build a specifier at runtime (validated!)
const lang = navigator.language.startsWith("hi") ? "hi" : "en";
const msgs = await import(\`./i18n/\${lang}.js\`);`}),e.jsx("h2",{children:"Error handling & preloading"}),e.jsx(s.Pre,{children:`try {
  const mod = await import("./charts.js");
  mod.draw();
} catch (e) { /* fallback UI */ }

// Hint the browser to fetch early (while keeping lazy execution)
{/* <link rel="modulepreload" href="/charts.js" /> */}`}),e.jsx("h2",{children:"JSON & assertions/attributes (runtime import)"}),e.jsx("p",{children:"Import JSON modules with an assertion/attribute (platform-dependent syntax)."}),e.jsx(s.Pre,{children:`// Dynamic JSON import (Node & modern browsers)
const data = await import("./data.json", { assert: { type: "json" } });
// or: { with: { type: "json" } } in some environments
data.default; // parsed object`}),e.jsx("h2",{children:"Node examples"}),e.jsx(s.Pre,{children:`// ESM file in Node
const { readFile } = await import("node:fs/promises");
const txt = await readFile(new URL("./README.md", import.meta.url), "utf8");`}),e.jsx("h2",{children:"Top-level await (TLA)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Allowed only in ",e.jsx("b",{children:"modules"}),". Makes the module async; importers wait for it."]}),e.jsx("li",{children:"Great for config/bootstrap, but heavy use can create waterfalls."})]}),e.jsx(s.Pre,{children:`// config.js (module)
const res = await fetch("/config.json");
export const config = await res.json();

// any importer waits until config.js finishes evaluating
import { config } from "./config.js";
console.log(config.apiBase);`}),e.jsx("h2",{children:"How TLA affects the graph"}),e.jsxs("ul",{children:[e.jsx("li",{children:"If A imports B and B has TLA, A's evaluation pauses until B resolves."}),e.jsx("li",{children:"Prefer parallelizing (kick off promises early, await once) to avoid sequential chains."})]}),e.jsx(s.Pre,{children:`// Parallelize in a TLA module
const p1 = fetch("/a.json").then(r => r.json());
const p2 = fetch("/b.json").then(r => r.json());
export const [a, b] = await Promise.all([p1, p2]);`}),e.jsxs("h2",{children:[e.jsx("code",{children:"import.meta"})," (context)"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"import.meta.url"})," = URL of the current module (useful for file-relative URLs)."]}),e.jsxs("li",{children:["Tooling may add fields (e.g., ",e.jsx("code",{children:"import.meta.env"}),"), but that's platform-specific."]})]}),e.jsx(s.Pre,{children:'new URL("./assets/logo.svg", import.meta.url).href;'}),e.jsx("h2",{children:"Common gotchas"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Dynamic import is async; don't use it where synchronous availability is required."}),e.jsx("li",{children:"TLA delays dependents—avoid long, serial awaits across many modules."}),e.jsx("li",{children:"Bundle tools need static analysis for tree-shaking; keep most imports static."}),e.jsx("li",{children:"When building specifiers dynamically, validate inputs to avoid unexpected requests."})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"import()"})," → Promise that resolves to the module namespace; great for lazy loading."]}),e.jsxs("li",{children:["Use TLA for one-time bootstrap/config; parallelize work with ",e.jsx("code",{children:"Promise.all"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"import.meta.url"})," gives you the module's base URL for resource paths."]}),e.jsx("li",{children:"For JSON modules at runtime, pass the assertion/attribute object."}),e.jsxs("li",{children:["Preload heavy modules with ",e.jsx("code",{children:"modulepreload"})," if interaction must feel instant."]})]})]})]})}export{n as default};
