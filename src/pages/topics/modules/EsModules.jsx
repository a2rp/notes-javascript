import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MOD_TOPICS } from "./topics.meta";

export default function EsModules() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Modules"
                sectionPath="/modules"
                topics={MOD_TOPICS}
            />

            <Styled.Heading>ES Modules</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> ES Modules (ESM) are the native module system in JS. They use{" "}
                    <code>import</code>/<code>export</code>, run in <b>module scope</b> (not global), are{" "}
                    <b>strict mode</b> by default, and provide <b>live read-only bindings</b>.
                </p>

                <h2>Exporting</h2>
                <Styled.Pre>{`// named exports
export const PI = 3.14;
export function area(r){ return PI * r * r; }
const hidden = 42;
export { hidden as ANSWER };  // rename on export

// default export (one per module)
export default class Circle { constructor(r){ this.r = r; } }`}</Styled.Pre>

                <h2>Importing</h2>
                <Styled.Pre>{`// named imports (must match names, can alias)
import { PI, area as circleArea } from "./math.js";

// default + named together
import Circle, { PI as π } from "./math.js";

// namespace import (bag of exports)
import * as M from "./math.js";
M.area(2); M.PI;

// side-effect only (no bindings)
import "./polyfills.js";`}</Styled.Pre>

                <h2>Live bindings (important)</h2>
                <ul>
                    <li>Imports are <b>views</b> over the exporter's variables; they update when the exporter changes.</li>
                    <li>Imports are read-only — you can't reassign them.</li>
                </ul>
                <Styled.Pre>{`// math.js
export let count = 0;
export function inc(){ count++; }

// app.js
import { count, inc } from "./math.js";
inc(); console.log(count); // 1 (updated)
count = 5;                 // ❌ TypeError: read-only`}</Styled.Pre>

                <h2>Module characteristics</h2>
                <ul>
                    <li><b>Module scope:</b> top-level <code>this</code> is <code>undefined</code>; vars don't leak to global.</li>
                    <li><b>Strict mode:</b> always on.</li>
                    <li><b>Once-per-URL:</b> a module is evaluated once and cached; subsequent imports share the instance (singleton per URL).</li>
                    <li><b>Static structure:</b> <code>import</code>/<code>export</code> must be top-level (enables tree-shaking).</li>
                </ul>

                <h2>Browser usage</h2>
                <Styled.Pre>{`<!-- index.html -->
<script type="module">
  import { start } from "./app.js";
  start();
</script>

<!-- Modules are deferred by default and use CORS/URL rules.
     Use absolute/relative URLs or import maps for bare specifiers. -->`}</Styled.Pre>

                <h2>Re-export (forwarding)</h2>
                <Styled.Pre>{`// api.js
export { area, PI } from "./math.js";        // re-export named
export { default as Circle } from "./math.js";`}</Styled.Pre>

                <h2>Circular deps (quick note)</h2>
                <ul>
                    <li>ESM loads in dependency order; during a cycle, modules expose <b>partially initialized</b> bindings.</li>
                    <li>Avoid using values before they're initialized; prefer functions/factories to break cycles.</li>
                </ul>

                <h2>File specifiers</h2>
                <ul>
                    <li>Use explicit extensions in the browser (<code>.js</code>, <code>.mjs</code>).</li>
                    <li>Node details (package <code>type</code>, <code>.mjs</code>/<code>.cjs</code>) are covered in "ESM vs CJS".</li>
                </ul>

                <h2>Small patterns</h2>
                <Styled.Pre>{`// Barrel module (index.js) to centralize exports
export * from "./math.js";
export { default as Circle } from "./math.js";

// Env-dependent entry (choose at build or via import maps)
// import './devtools.js' in dev only, keep prod lean`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>One module instance per URL; imports are <b>live, read-only</b> views.</li>
                    <li>Top-level only <code>import</code>/<code>export</code>; use <code>export default</code> for the main thing, named exports for the rest.</li>
                    <li>Modules are always <b>strict</b> and have their own scope.</li>
                    <li>Browser: <code>&lt;script type="module"&gt;</code>; use real URLs or import maps.</li>
                    <li>Re-exports create clean public surfaces ("barrels").</li>
                    <li>Interop with CommonJS + dynamic <code>import()</code> and TLA are in the next topics.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
