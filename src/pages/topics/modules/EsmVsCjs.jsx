import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MOD_TOPICS } from "./topics.meta";

export default function EsmVsCjs() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Modules"
                sectionPath="/modules"
                topics={MOD_TOPICS}
            />

            <Styled.Heading>ESM vs CJS (interop)</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <b>ESM</b> (ECMAScript Modules) uses <code>import/export</code>,
                    supports static analysis, live bindings, and top-level <code>await</code>.{" "}
                    <b>CJS</b> (CommonJS) uses <code>require/module.exports</code>, evaluates synchronously,
                    and is Node-centric. Browsers run ESM; CJS is not supported in browsers.
                </p>

                <h2>File types & package mode (Node)</h2>
                <Styled.Pre>{`// package.json
{ "type": "module" }   // .js files are ESM; use .cjs for CJS

// Without "type":"module": .js is CJS; use .mjs for ESM

// Dual files (explicit):
index.mjs  // ESM
index.cjs  // CJS`}</Styled.Pre>

                <h2>Exports field (dual package)</h2>
                <Styled.Pre>{`// package.json (conditional exports)
{
  "name": "lib",
  "exports": {
    "import": "./dist/index.mjs",   // ESM entry
    "require": "./dist/index.cjs"   // CJS entry
  }
}`}</Styled.Pre>

                <h2>ESM ↔ CJS interop (how to actually import)</h2>
                <h3>ESM importing CJS</h3>
                <ul>
                    <li>Import the CJS module as a <b>default</b> binding, then destructure.</li>
                    <li>Some runtimes expose “named” re-exports from CJS, but it's not portable. Prefer default.</li>
                </ul>
                <Styled.Pre>{`// esm.mjs
import pkg from "cjs-lib";      // pkg === module.exports
const { foo, bar } = pkg;       // pull named properties

// Or: create a CJS wrapper that exports ESM-style names`}</Styled.Pre>

                <h3>CJS importing ESM</h3>
                <ul>
                    <li><code>require()</code> cannot load ESM. Use dynamic <code>import()</code> (async).</li>
                </ul>
                <Styled.Pre>{`// cjs.cjs
(async () => {
  const mod = await import("./esm.mjs");
  // default & named
  const util = mod.default;
  const { sum } = mod;
  console.log(util, sum(1,2));
})();`}</Styled.Pre>

                <h3>Using require inside an ESM file</h3>
                <Styled.Pre>{`// esm.mjs
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const cjs = require("./legacy.cjs");`}</Styled.Pre>

                <h2>Semantics differences (quick)</h2>
                <ul>
                    <li><b>Bindings:</b> ESM imports are <b>live, read-only</b> views; CJS gets a snapshot object (the shared <code>module.exports</code>). </li>
                    <li><b>Scope:</b> ESM has module scope; top-level <code>this</code> is <code>undefined</code>. CJS top-level <code>this</code> is <code>module.exports</code>.</li>
                    <li><b>Async:</b> ESM supports top-level <code>await</code>; CJS evaluates synchronously.</li>
                    <li><b>Cache:</b> Both are singletons per URL/resolved path (first load, then cached).</li>
                </ul>

                <h2>Paths & __dirname in ESM</h2>
                <Styled.Pre>{`// ESM replacement for __filename/__dirname
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);`}</Styled.Pre>

                <h2>Typical wrappers</h2>
                <h3>Wrap a CJS lib for ESM</h3>
                <Styled.Pre>{`// cjs-wrapper.mjs
import pkg from "../legacy.cjs";
export const foo = pkg.foo;
export default pkg;`}</Styled.Pre>

                <h3>Wrap an ESM lib for CJS</h3>
                <Styled.Pre>{`// esm-wrapper.cjs
module.exports = (async () => {
  const mod = await import("./modern.mjs");
  return { default: mod.default, ...mod };
})(); 
// consumer: (await require("./esm-wrapper.cjs")).default`}</Styled.Pre>

                <h2>Browser notes</h2>
                <ul>
                    <li>Use <code>&lt;script type="module"&gt;</code>; paths are real URLs (CORS rules apply).</li>
                    <li>CJS doesn't run in browsers without a bundler/transform.</li>
                </ul>

                <h2>Gotchas</h2>
                <ul>
                    <li><b>Don't mix</b> default vs named expectations: CJS → import default; ESM → can export default or named.</li>
                    <li>Dynamic <code>import()</code> is async; refactor call sites accordingly.</li>
                    <li>Keep the public API stable via <code>"exports"</code> mapping; avoid deep imports.</li>
                    <li>Tree-shaking only works with ESM static imports; CJS and dynamic patterns reduce shakeability.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>"type":"module"</code> flips <code>.js</code> to ESM in Node; otherwise use <code>.mjs</code> for ESM and <code>.cjs</code> for CJS.</li>
                    <li>ESM→CJS: import the CJS module as <b>default</b>; CJS→ESM: use <b>dynamic import()</b>.</li>
                    <li>Use <code>createRequire</code> inside ESM when you must call a CJS-only API.</li>
                    <li>Replace <code>__dirname/__filename</code> via <code>import.meta.url</code> utils in ESM.</li>
                    <li>Prefer dual entry points with conditional <code>"exports"</code> for clean interop.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
