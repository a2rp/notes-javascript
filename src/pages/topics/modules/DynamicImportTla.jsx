import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MOD_TOPICS } from "./topics.meta";

export default function DynamicImportTla() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Modules"
                sectionPath="/modules"
                topics={MOD_TOPICS}
            />

            <Styled.Heading>Dynamic import & TLA</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>import()</code> loads a module <b>dynamically at runtime</b> and
                    returns a <b>Promise</b>. <b>Top-level await (TLA)</b> lets a module <code>await</code> at
                    the top level—its dependents wait until it finishes evaluating.
                </p>

                <h2>Dynamic <code>import()</code> (lazy load / code-split)</h2>
                <ul>
                    <li>Works anywhere (inside handlers, conditions, loops).</li>
                    <li>Resolves to the module namespace object.</li>
                    <li>Useful for big libs, rarely used routes, feature flags.</li>
                </ul>
                <Styled.Pre>{`// Lazy-load on demand (browser)
btn.addEventListener("click", async () => {
  const { default: _ } = await import("lodash");
  console.log(_.chunk([1,2,3,4], 2));
});

// Build a specifier at runtime (validated!)
const lang = navigator.language.startsWith("hi") ? "hi" : "en";
const msgs = await import(\`./i18n/\${lang}.js\`);`}</Styled.Pre>

                <h2>Error handling & preloading</h2>
                <Styled.Pre>{`try {
  const mod = await import("./charts.js");
  mod.draw();
} catch (e) { /* fallback UI */ }

// Hint the browser to fetch early (while keeping lazy execution)
{/* <link rel="modulepreload" href="/charts.js" /> */}`}</Styled.Pre>

                <h2>JSON & assertions/attributes (runtime import)</h2>
                <p>
                    Import JSON modules with an assertion/attribute (platform-dependent syntax).
                </p>
                <Styled.Pre>{`// Dynamic JSON import (Node & modern browsers)
const data = await import("./data.json", { assert: { type: "json" } });
// or: { with: { type: "json" } } in some environments
data.default; // parsed object`}</Styled.Pre>

                <h2>Node examples</h2>
                <Styled.Pre>{`// ESM file in Node
const { readFile } = await import("node:fs/promises");
const txt = await readFile(new URL("./README.md", import.meta.url), "utf8");`}</Styled.Pre>

                <h2>Top-level await (TLA)</h2>
                <ul>
                    <li>Allowed only in <b>modules</b>. Makes the module async; importers wait for it.</li>
                    <li>Great for config/bootstrap, but heavy use can create waterfalls.</li>
                </ul>
                <Styled.Pre>{`// config.js (module)
const res = await fetch("/config.json");
export const config = await res.json();

// any importer waits until config.js finishes evaluating
import { config } from "./config.js";
console.log(config.apiBase);`}</Styled.Pre>

                <h2>How TLA affects the graph</h2>
                <ul>
                    <li>If A imports B and B has TLA, A's evaluation pauses until B resolves.</li>
                    <li>Prefer parallelizing (kick off promises early, await once) to avoid sequential chains.</li>
                </ul>
                <Styled.Pre>{`// Parallelize in a TLA module
const p1 = fetch("/a.json").then(r => r.json());
const p2 = fetch("/b.json").then(r => r.json());
export const [a, b] = await Promise.all([p1, p2]);`}</Styled.Pre>

                <h2><code>import.meta</code> (context)</h2>
                <ul>
                    <li><code>import.meta.url</code> = URL of the current module (useful for file-relative URLs).</li>
                    <li>Tooling may add fields (e.g., <code>import.meta.env</code>), but that's platform-specific.</li>
                </ul>
                <Styled.Pre>{`new URL("./assets/logo.svg", import.meta.url).href;`}</Styled.Pre>

                <h2>Common gotchas</h2>
                <ul>
                    <li>Dynamic import is async; don't use it where synchronous availability is required.</li>
                    <li>TLA delays dependents—avoid long, serial awaits across many modules.</li>
                    <li>Bundle tools need static analysis for tree-shaking; keep most imports static.</li>
                    <li>When building specifiers dynamically, validate inputs to avoid unexpected requests.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>import()</code> → Promise that resolves to the module namespace; great for lazy loading.</li>
                    <li>Use TLA for one-time bootstrap/config; parallelize work with <code>Promise.all</code>.</li>
                    <li><code>import.meta.url</code> gives you the module's base URL for resource paths.</li>
                    <li>For JSON modules at runtime, pass the assertion/attribute object.</li>
                    <li>Preload heavy modules with <code>modulepreload</code> if interaction must feel instant.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
