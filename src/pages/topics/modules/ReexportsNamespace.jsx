import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MOD_TOPICS } from "./topics.meta";

export default function ReexportsNamespace() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Modules"
                sectionPath="/modules"
                topics={MOD_TOPICS}
            />

            <Styled.Heading>Re-exports & namespace</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Re-exports let a module <i>forward</i> bindings from other modules to
                    its own public surface. A <b>module namespace object</b> (from <code>import * as ns</code>)
                    is a frozen bag of live getters for all exports of a module.
                </p>

                <h2>Re-export patterns</h2>
                <Styled.Pre>{`// 1) Selective named re-export (with rename)
export { add, sub as minus } from "./math.js";

// 2) Re-export default under a name
export { default as HttpClient } from "./http/Client.js";

// 3) Export everything (except default & star conflicts)
export * from "./strings.js";

// 4) Export * under a namespace (ES2020)
export * as Strings from "./strings.js";`}</Styled.Pre>
                <ul>
                    <li>Re-exports are <b>live</b> bindings (not copies) and tree-shake well.</li>
                    <li>
                        <code>export * from</code> skips conflicting names; explicit named exports win.
                    </li>
                </ul>

                <h2>"Barrel" module (index.js)</h2>
                <p>Collect and re-expose a folder's API via a single entry.</p>
                <Styled.Pre>{`// src/lib/index.js
export * from "./math.js";
export { default as HttpClient } from "./http/Client.js";
export * as Strings from "./strings.js";

// consumer
import { add, HttpClient, Strings } from "lib";`}</Styled.Pre>

                <h2>Module namespace objects</h2>
                <ul>
                    <li>Created with <code>import * as pkg from "./mod.js"</code>.</li>
                    <li>They're frozen, read-only, with <b>live</b> getters (updates propagate).</li>
                    <li>Access default as <code>pkg.default</code> (if a default export exists).</li>
                </ul>
                <Styled.Pre>{`// file: config.js
export let mode = "dev";
export function setMode(m){ mode = m; }

// file: app.js
import * as cfg from "./config.js";
cfg.mode;         // "dev"
cfg.setMode("prod");
cfg.mode;         // "prod" (live)
cfg.mode = "x";   // ❌ TypeError: read-only
Object.isFrozen(cfg); // true`}</Styled.Pre>

                <h2>How it loads (mental model)</h2>
                <ul>
                    <li>
                        <code>export … from "x"</code> is like "import then re-export", but optimized by the
                        module loader. The current module still evaluates normally when imported.
                    </li>
                    <li>There's one evaluated instance per URL; all importers share it.</li>
                </ul>

                <h2>Common gotchas</h2>
                <ul>
                    <li>
                        <b>Name clashes:</b> if two star-exports provide the same name, neither is re-exported
                        unless you name it explicitly.
                    </li>
                    <li>
                        <b>Side effects:</b> re-exporting a module still loads/evaluates it once — don't hide
                        heavy side effects behind barrels.
                    </li>
                    <li>
                        <b>Cycles:</b> re-export chains can create cycles; reference functions/factories rather
                        than values that must exist at init time.
                    </li>
                    <li>
                        <b>No "export default from" syntax:</b> use{" "}
                        <code>export &#123; default as Name &#125; from "./mod.js"</code>.
                    </li>
                </ul>

                <h2>Small utilities</h2>
                <Styled.Pre>{`// create a typed "pick" barrel (explicit names aid tree-shaking)
export { sum, mean } from "./math/stat.js";

// rename to create a stable public API
export { internalFoo as foo } from "./internals.js";`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Use barrels (<code>index.js</code>) to provide a clean, stable import path.</li>
                    <li>
                        Prefer explicit named re-exports for clarity; use <code>export *</code> sparingly due to
                        conflicts.
                    </li>
                    <li>
                        <code>import * as ns</code> yields a frozen, read-only, live namespace object; access
                        default via <code>ns.default</code>.
                    </li>
                    <li>Re-exports are live and tree-shake; they still load the target once per URL.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
