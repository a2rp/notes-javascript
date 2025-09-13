import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Styled } from "./styled";

const NavListCore = () => {
    const navRef = useRef(null);
    const { pathname } = useLocation();

    // Keep the active NavLink centered/visible in the sidebar
    useEffect(() => {
        const el = navRef.current?.querySelector("a.active");
        if (!el) return;

        // small delay so NavLink receives the .active class after route update
        const id = requestAnimationFrame(() => {
            try {
                el.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
            } catch {
                // older browsers fallback
                el.scrollIntoView();
            }
        });
        return () => cancelAnimationFrame(id);
    }, [pathname]);

    return (
        <Styled.Nav ref={navRef} aria-label="JavaScript Core navigation">
            <h3 style={{ margin: 0 }}>
                <NavLink
                    to="/home"
                    title="Home"
                    style={{
                        display: "block",
                        padding: 0,
                        margin: 0
                    }}
                >
                    Home
                </NavLink>
            </h3>

            {/* =====================
          JavaScript — CORE
         ====================== */}
            <h3>Language Fundamentals</h3>
            <ul>
                <li><NavLink to="/language-fundamentals" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/language-fundamentals/program-structure-asi" title="Statements vs expressions; Automatic Semicolon Insertion">Program structure & ASI</NavLink></li>
                <li><NavLink to="/language-fundamentals/identifiers-reserved-words" title="Valid names; reserved keywords">Identifiers & reserved words</NavLink></li>
                <li><NavLink to="/language-fundamentals/strict-mode" title="What 'use strict' changes & why">Strict mode</NavLink></li>
                <li><NavLink to="/language-fundamentals/values-types" title="Primitives vs objects; identity vs reference">Values & types</NavLink></li>
                <li><NavLink to="/language-fundamentals/type-checks" title="typeof, instanceof, Array.isArray, Object.prototype.toString">Type checks</NavLink></li>
                <li><NavLink to="/language-fundamentals/truthy-falsy" title="Complete truthy/falsy list">Truthy & falsy</NavLink></li>
                <li><NavLink to="/language-fundamentals/equality" title="=== vs == vs Object.is">Equality</NavLink></li>
                <li><NavLink to="/language-fundamentals/type-coercion" title="ToPrimitive, valueOf/toString, unary +">Type coercion</NavLink></li>
                <li><NavLink to="/language-fundamentals/var-let-const" title="Scopes, lifetimes, when to use">var vs let vs const</NavLink></li>
                <li><NavLink to="/language-fundamentals/scope" title="Global, function, block scope">Scope</NavLink></li>
                <li><NavLink to="/language-fundamentals/tdz" title="Temporal Dead Zone for let/const/class">TDZ</NavLink></li>
                <li><NavLink to="/language-fundamentals/hoisting" title="Vars, functions, classes">Hoisting</NavLink></li>
                <li><NavLink to="/language-fundamentals/closures" title="Lexical environment; capturing variables">Closures</NavLink></li>
                <li><NavLink to="/language-fundamentals/operator-basics-precedence" title="Operators, precedence, associativity">Operator basics & precedence</NavLink></li>
                <li><NavLink to="/language-fundamentals/arithmetic-comparison-logical" title="+ - * / **; &lt; &gt; &lt;= &gt;=; && || !">Arithmetic, comparison, logical</NavLink></li>
                <li><NavLink to="/language-fundamentals/modern-operators" title="?? ?. &&= ||= ??=">Modern operators</NavLink></li>
                <li><NavLink to="/language-fundamentals/bitwise-shift" title="Bitwise ops & shifts">Bitwise & shift</NavLink></li>
                <li><NavLink to="/language-fundamentals/control-flow" title="if/else, switch, ternary">Control flow</NavLink></li>
                <li><NavLink to="/language-fundamentals/loops" title="for, while, do…while">Loops</NavLink></li>
                <li><NavLink to="/language-fundamentals/forof-forin" title="Iterables vs keys; when to use each">for…of vs for…in</NavLink></li>
                <li><NavLink to="/language-fundamentals/labels-break-continue" title="Labels; break; continue; pitfalls">Labels, break, continue</NavLink></li>
            </ul>

            <h3>Functions & this</h3>
            <ul>
                <li><NavLink to="/functions-this" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/functions-this/function-forms" title="Declaration vs expression">Function forms</NavLink></li>
                <li><NavLink to="/functions-this/arrow-functions" title="Lexical this; concise bodies; pitfalls">Arrow functions</NavLink></li>
                <li><NavLink to="/functions-this/parameters" title="Default, rest, destructured params">Parameters</NavLink></li>
                <li><NavLink to="/functions-this/this-binding-rules" title="Default, implicit, explicit, new, arrow">this binding rules</NavLink></li>
                <li><NavLink to="/functions-this/call-apply-bind" title="Patterns with call/apply/bind">call / apply / bind</NavLink></li>
                <li><NavLink to="/functions-this/return-patterns" title="Return values; early returns">Return patterns</NavLink></li>
            </ul>

            <h3>Objects & Prototypes</h3>
            <ul>
                <li><NavLink to="/objects-prototypes" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/objects-prototypes/object-literals" title="Computed props; concise methods; access">Object literals</NavLink></li>
                <li><NavLink to="/objects-prototypes/property-descriptors" title="writable; enumerable; configurable">Property descriptors</NavLink></li>
                <li><NavLink to="/objects-prototypes/object-utilities" title="assign; keys/values/entries; fromEntries; hasOwn">Object utilities</NavLink></li>
                <li><NavLink to="/objects-prototypes/prototype-chain" title="Delegation; getPrototypeOf; setPrototypeOf">Prototype chain</NavLink></li>
                <li><NavLink to="/objects-prototypes/inheritance" title="Patterns and trade-offs">Inheritance patterns</NavLink></li>
                <li><NavLink to="/objects-prototypes/classes" title="constructor; extends; super">Classes</NavLink></li>
                <li><NavLink to="/objects-prototypes/class-fields" title="public; #private; static; getters/setters">Class fields</NavLink></li>
                <li><NavLink to="/objects-prototypes/encapsulation" title="Closures vs #private fields">Encapsulation</NavLink></li>
                <li><NavLink to="/objects-prototypes/symbols" title="Symbols & well-known symbols">Symbols</NavLink></li>
            </ul>

            <h3>Data Structures & Built-ins</h3>
            <ul>
                <li><NavLink to="/builtins" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/builtins/arrays-basics" title="Creation; holes; iteration">Arrays: basics</NavLink></li>
                <li><NavLink to="/builtins/array-map-filter-reduce" title="Transform patterns">Array: map / filter / reduce</NavLink></li>
                <li><NavLink to="/builtins/sorting" title="Comparators; stable sort; immutability via copy">Sorting correctly</NavLink></li>
                <li><NavLink to="/builtins/strings-unicode" title="UTF-16; code points; normalize">Strings & Unicode</NavLink></li>
                <li><NavLink to="/builtins/numbers-basics" title="IEEE-754; NaN; Infinity; -0; precision">Numbers basics</NavLink></li>
                <li><NavLink to="/builtins/bigint" title="When to use; caveats mixing with Number">BigInt</NavLink></li>
                <li><NavLink to="/builtins/math-essentials" title="Rounding; random; clamp; min/max">Math essentials</NavLink></li>
                <li><NavLink to="/builtins/dates-intl" title="Date pitfalls; Intl.NumberFormat/DateTimeFormat">Dates & Intl overview</NavLink></li>
                <li><NavLink to="/builtins/regexp" title="Flags u/s/m/y; named groups; lookaround; matchAll">RegExp</NavLink></li>
                <li><NavLink to="/builtins/json" title="parse/stringify; reviver/replacer">JSON</NavLink></li>
                <li><NavLink to="/builtins/map-set" title="When Map/Set beat Object/Array">Map/Set vs Object/Array</NavLink></li>
                <li><NavLink to="/builtins/weakmap-weakset" title="GC-friendly caches">WeakMap/WeakSet</NavLink></li>
                <li><NavLink to="/builtins/typed-arrays" title="ArrayBuffer; DataView; typed arrays">Typed arrays & buffers</NavLink></li>
            </ul>

            <h3>Modules</h3>
            <ul>
                <li><NavLink to="/modules" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/modules/es-modules" title="import/export; default vs named">ES Modules</NavLink></li>
                <li><NavLink to="/modules/reexports-namespace" title="Re-exports; namespace imports">Re-exports & namespace</NavLink></li>
                <li><NavLink to="/modules/dynamic-import-tla" title="import() and top-level await">Dynamic import & TLA</NavLink></li>
                <li><NavLink to="/modules/esm-vs-cjs" title="Interop notes: ESM vs CommonJS">ESM vs CJS (interop)</NavLink></li>
            </ul>

            <h3>Errors & Robustness</h3>
            <ul>
                <li><NavLink to="/errors-robustness" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/errors-robustness/error-types" title="Error, TypeError, RangeError, etc.">Error types</NavLink></li>
                <li><NavLink to="/errors-robustness/try-catch-finally" title="try/catch/finally; rethrow; cause">try/catch/finally</NavLink></li>
                <li><NavLink to="/errors-robustness/custom-errors" title="Extending Error cleanly">Custom errors</NavLink></li>
                <li><NavLink to="/errors-robustness/guards-assertions" title="Guard clauses; assertions">Guards & assertions</NavLink></li>
            </ul>

            <h3>Asynchrony Model</h3>
            <ul>
                <li><NavLink to="/async" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/async/event-loop" title="Call stack; tasks vs microtasks">Event loop</NavLink></li>
                <li><NavLink to="/async/promises" title="States; chaining; thenables; errors">Promises: basics</NavLink></li>
                <li><NavLink to="/async/promise-utilities" title="all, race, allSettled, any">Promise utilities</NavLink></li>
                <li><NavLink to="/async/async-await" title="Sequential vs parallel patterns">async/await patterns</NavLink></li>
                <li><NavLink to="/async/async-iterators" title="Async iterators; for await…of">Async iterators</NavLink></li>
                <li><NavLink to="/async/timers" title="setTimeout; setInterval; clamping; cleanup">Timers</NavLink></li>
                <li><NavLink to="/async/abortcontroller" title="AbortController; abort signals with fetch">AbortController</NavLink></li>
            </ul>

            <h3>Meta & Advanced</h3>
            <ul>
                <li><NavLink to="/meta-advanced" end title="Overview">Overview</NavLink></li>
                <li><NavLink to="/meta-advanced/performance-basics" title="Avoid accidental N²; immutability costs; batching">Performance basics</NavLink></li>
                <li><NavLink to="/meta-advanced/memory-gc" title="Leaks via closures/DOM; WeakRef; FinalizationRegistry">Memory & GC basics</NavLink></li>
                <li><NavLink to="/meta-advanced/proxy-reflect" title="Meta-ops; traps; Reflect helpers">Proxy & Reflect</NavLink></li>
                <li><NavLink to="/meta-advanced/eval-function" title="Why to avoid eval and new Function">Eval & Function constructor</NavLink></li>
                <li><NavLink to="/meta-advanced/operator-misc" title="in, delete, new, typeof, instanceof">Operators often missed</NavLink></li>
            </ul>
        </Styled.Nav>
    );
};

export default NavListCore;
