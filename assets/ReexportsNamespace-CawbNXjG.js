import{j as e}from"./index-D5VEPJXy.js";import{S as s,M as r}from"./index-B-7gaVIV.js";import{B as t}from"./Breadcrumbs-_bfjIlB_.js";function n(){return e.jsxs(s.Wrapper,{children:[e.jsx(t,{sectionLabel:"Modules",sectionPath:"/modules",topics:r}),e.jsx(s.Heading,{children:"Re-exports & namespace"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Re-exports let a module ",e.jsx("i",{children:"forward"})," bindings from other modules to its own public surface. A ",e.jsx("b",{children:"module namespace object"})," (from ",e.jsx("code",{children:"import * as ns"}),") is a frozen bag of live getters for all exports of a module."]}),e.jsx("h2",{children:"Re-export patterns"}),e.jsx(s.Pre,{children:`// 1) Selective named re-export (with rename)
export { add, sub as minus } from "./math.js";

// 2) Re-export default under a name
export { default as HttpClient } from "./http/Client.js";

// 3) Export everything (except default & star conflicts)
export * from "./strings.js";

// 4) Export * under a namespace (ES2020)
export * as Strings from "./strings.js";`}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Re-exports are ",e.jsx("b",{children:"live"})," bindings (not copies) and tree-shake well."]}),e.jsxs("li",{children:[e.jsx("code",{children:"export * from"})," skips conflicting names; explicit named exports win."]})]}),e.jsx("h2",{children:'"Barrel" module (index.js)'}),e.jsx("p",{children:"Collect and re-expose a folder's API via a single entry."}),e.jsx(s.Pre,{children:`// src/lib/index.js
export * from "./math.js";
export { default as HttpClient } from "./http/Client.js";
export * as Strings from "./strings.js";

// consumer
import { add, HttpClient, Strings } from "lib";`}),e.jsx("h2",{children:"Module namespace objects"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Created with ",e.jsx("code",{children:'import * as pkg from "./mod.js"'}),"."]}),e.jsxs("li",{children:["They're frozen, read-only, with ",e.jsx("b",{children:"live"})," getters (updates propagate)."]}),e.jsxs("li",{children:["Access default as ",e.jsx("code",{children:"pkg.default"})," (if a default export exists)."]})]}),e.jsx(s.Pre,{children:`// file: config.js
export let mode = "dev";
export function setMode(m){ mode = m; }

// file: app.js
import * as cfg from "./config.js";
cfg.mode;         // "dev"
cfg.setMode("prod");
cfg.mode;         // "prod" (live)
cfg.mode = "x";   // ❌ TypeError: read-only
Object.isFrozen(cfg); // true`}),e.jsx("h2",{children:"How it loads (mental model)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:'export … from "x"'}),' is like "import then re-export", but optimized by the module loader. The current module still evaluates normally when imported.']}),e.jsx("li",{children:"There's one evaluated instance per URL; all importers share it."})]}),e.jsx("h2",{children:"Common gotchas"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Name clashes:"})," if two star-exports provide the same name, neither is re-exported unless you name it explicitly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Side effects:"})," re-exporting a module still loads/evaluates it once — don't hide heavy side effects behind barrels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cycles:"})," re-export chains can create cycles; reference functions/factories rather than values that must exist at init time."]}),e.jsxs("li",{children:[e.jsx("b",{children:'No "export default from" syntax:'})," use"," ",e.jsx("code",{children:'export { default as Name } from "./mod.js"'}),"."]})]}),e.jsx("h2",{children:"Small utilities"}),e.jsx(s.Pre,{children:`// create a typed "pick" barrel (explicit names aid tree-shaking)
export { sum, mean } from "./math/stat.js";

// rename to create a stable public API
export { internalFoo as foo } from "./internals.js";`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use barrels (",e.jsx("code",{children:"index.js"}),") to provide a clean, stable import path."]}),e.jsxs("li",{children:["Prefer explicit named re-exports for clarity; use ",e.jsx("code",{children:"export *"})," sparingly due to conflicts."]}),e.jsxs("li",{children:[e.jsx("code",{children:"import * as ns"})," yields a frozen, read-only, live namespace object; access default via ",e.jsx("code",{children:"ns.default"}),"."]}),e.jsx("li",{children:"Re-exports are live and tree-shake; they still load the target once per URL."})]})]})]})}export{n as default};
