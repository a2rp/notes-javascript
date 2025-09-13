import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function CallApplyBind() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>call / apply / bind</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Utilities on <code>Function.prototype</code> to control{" "}
                    <code>this</code> and pass arguments.
                </p>

                <h2>What they do</h2>
                <ul>
                    <li>
                        <b><code>fn.call(thisArg, ...args)</code></b> — invoke now, pass args one by one.
                    </li>
                    <li>
                        <b><code>fn.apply(thisArg, argsArrayLike)</code></b> — invoke now, pass an array/array-like.
                    </li>
                    <li>
                        <b><code>fn.bind(thisArg, ...preset)</code></b> — returns a <i>new</i> function with{" "}
                        <code>this</code> and leading args locked in (partial application).
                    </li>
                </ul>

                <h2>Tiny examples</h2>
                <Styled.Pre>{`function who(prefix){ return prefix + (this?.name ?? "??"); }
who.call({ name: "A" }, "@")    // "@A"
who.apply({ name: "B" }, ["#"]) // "#B"

const bound = who.bind({ name: "C" }, "!");
bound()                          // "!C"  (later args append after "!")
`}</Styled.Pre>

                <h2>Using arrays with apply vs spread</h2>
                <Styled.Pre>{`const nums = [1, 9, 3];
Math.max.apply(null, nums)  // 9
Math.max(...nums)           // 9  (modern & clearer)

// Borrowing array methods for array-likes:
function argsToArray(){ return Array.prototype.slice.call(arguments); }
function better(...args){ return args; } // rest is simpler

// Or with Reflect.apply (explicit 'this'):
Reflect.apply(Array.prototype.slice, arguments, [0])`}</Styled.Pre>

                <h2>Binding rules (important)</h2>
                <ul>
                    <li>
                        <b>new beats bind:</b> <code>new (Ctor.bind(obj, 1))()</code> creates a new instance;{" "}
                        the bound <code>thisArg</code> is ignored, but preset args are used.
                    </li>
                    <li>
                        <b>Bound functions can’t be re-bound:</b>{" "}
                        <code>bound.call(other)</code> keeps the original <code>this</code>.
                    </li>
                    <li>
                        <b>Arrows ignore call/apply/bind for <code>this</code>:</b> they capture lexical{" "}
                        <code>this</code>.
                    </li>
                </ul>

                <Styled.Pre>{`function Ctor(x){ this.x = x; }
const B = Ctor.bind({ fake: true }, 10);
const inst = new B();       // 'this' is the new instance, not {fake:true}
inst.x                      // 10 (preset arg still applied)`}</Styled.Pre>

                <h2>Strict vs non-strict</h2>
                <ul>
                    <li>
                        In <b>strict</b> code, <code>thisArg</code> is used as-is (can be a primitive or{" "}
                        <code>undefined</code>).
                    </li>
                    <li>
                        In <b>sloppy</b> code, <code>null/undefined</code> become the global object and
                        primitives get boxed.
                    </li>
                </ul>
                <Styled.Pre>{`(function(){ "use strict"; return this; }).call(5) // 5
(function(){ return this;            }).call(5) // Number(5) boxed in sloppy`}</Styled.Pre>

                <h2>Partial application with bind</h2>
                <Styled.Pre>{`const add = (a,b,c) => a+b+c;
const add5 = add.bind(null, 5);
add5(2,3) // 10

// Preserve methods with bound 'this'
const logger = {
  tag: "[L]",
  log(msg){ console.log(this.tag, msg); }
};
const print = logger.log.bind(logger);
print("ready"); // [L] ready`}</Styled.Pre>

                <h2>Method extraction (fix “lost this”)</h2>
                <Styled.Pre>{`const btn = {
  id: "ok",
  click(){ return this.id; }
};

const fn = btn.click;
try { fn(); } catch{}          // 'this' lost (undefined in strict/modules)

const safe = btn.click.bind(btn);
safe();                        // "ok"`}</Styled.Pre>

                <h2>Meta: name & length of bound functions</h2>
                <ul>
                    <li>
                        <code>boundFn.name</code> usually prefixes with <code>"bound "</code>.
                    </li>
                    <li>
                        <code>boundFn.length</code> = <code>Math.max(0, target.length - presetCount)</code>.
                    </li>
                </ul>
                <Styled.Pre>{`function f(a,b,c){} 
const g = f.bind(null, 1);
g.length   // 2
g.name     // "bound f"`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>call</code> → now (variadic), <code>apply</code> → now (array), <code>bind</code> → later (locks this + args).</li>
                    <li>Prefer spread over <code>apply</code> in modern code; use <code>Reflect.apply</code> for explicit borrowing.</li>
                    <li>Extracted methods lose their receiver — fix with <code>bind</code> or wrap in an arrow.</li>
                    <li><code>new</code> overrides a bound <code>this</code>, but not bound arguments.</li>
                    <li>Don’t bind inside hot loops/renders; create once and reuse.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
