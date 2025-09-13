import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function Parameters() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>Parameters</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Parameters define a function's inputs. JS supports positional params,
                    default values, rest (<code>...args</code>), and destructuring. Defaults run
                    <b> left → right</b> on each call and only apply when the passed value is{" "}
                    <code>undefined</code>.
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`function sum(a, b) { return a + b; }
sum(2, 3)        // 5
sum(2)           // NaN  (b is undefined)`}</Styled.Pre>

                <h2>Default parameters</h2>
                <ul>
                    <li>Used when the argument is <code>undefined</code> (not for <code>null</code> or <code>0</code>).</li>
                    <li>Evaluated per call (fresh objects, fresh dates, etc.).</li>
                </ul>
                <Styled.Pre>{`function greet(name = "stranger"){ return "Hi " + name; }
greet()           // "Hi stranger"
greet(undefined)  // "Hi stranger"
greet(null)       // "Hi null" (default NOT used)

function addItem(list = []) { list.push("x"); return list; }
addItem(); addItem(); // ["x"], ["x"]  (different arrays each call)`}</Styled.Pre>

                <h2>Evaluation order & TDZ in defaults</h2>
                <ul>
                    <li>Params evaluate left → right. A default can see earlier params, not later ones.</li>
                    <li>Referring to a later param in an earlier default throws (TDZ).</li>
                </ul>
                <Styled.Pre>{`function f(a = 1, b = a + 1){ return [a, b]; }
f()              // [1, 2]

// function g(a = b, b = 1) {}  // ❌ ReferenceError (b is in TDZ when a's default runs)`}</Styled.Pre>

                <h2>Rest vs spread</h2>
                <ul>
                    <li><b>Rest (parameters):</b> collects extra args into an <i>array</i>.</li>
                    <li><b>Spread (call site):</b> expands an iterable into individual args.</li>
                </ul>
                <Styled.Pre>{`function collect(first, ...rest){ return [first, rest]; }
collect(1,2,3)   // [1, [2,3]]

const nums = [1,2,3];
Math.max(...nums)  // 3  (spread at call site)`}</Styled.Pre>

                <h2>Destructuring parameters (named args pattern)</h2>
                <ul>
                    <li>Great for many options; supports defaults & renaming.</li>
                    <li>Use <code>= {`{}`}</code> to make the whole object optional.</li>
                </ul>
                <Styled.Pre>{`function connect(
  { host = "localhost", port = 5432, ssl = false } = {}
){ return { host, port, ssl }; }

connect()                 // {host:"localhost", port:5432, ssl:false}
connect({ port: 3306 })   // {host:"localhost", port:3306, ssl:false}

function pickId({ id: userId }) { return userId; }
pickId({ id: 10 })        // 10`}</Styled.Pre>

                <h2><code>arguments</code> vs rest</h2>
                <ul>
                    <li><code>arguments</code> is array-like, not a real array. In strict mode (modules), it's
                        not “linked” to parameter variables. Prefer <b>rest</b>.</li>
                </ul>
                <Styled.Pre>{`function bad(){
  // arguments is array-like; changes don't sync to params in strict mode
  return Array.prototype.slice.call(arguments);
}
const good = (...args) => args;   // real array`}</Styled.Pre>

                <h2>Required parameter pattern</h2>
                <Styled.Pre>{`const required = (name) => { throw new Error(name + " required"); };
function createUser(name = required("name")) {
  return { name };
}
// createUser(); // throws "name required"`}</Styled.Pre>

                <h2><code>Function.length</code> (arity)</h2>
                <ul>
                    <li>Number of params <i>before</i> the first default/rest parameter.</li>
                </ul>
                <Styled.Pre>{`function a(x, y, z){ }      a.length // 3
function b(x, y = 1, z){ }  b.length // 1
function c(...rest){ }      c.length // 0`}</Styled.Pre>

                <h2>Parameter scope notes</h2>
                <ul>
                    <li>Defaults run in a scope <i>before</i> the function body; accessing body locals there
                        can cause TDZ errors.</li>
                    <li>Duplicate parameter names are disallowed in strict mode.</li>
                    <li>Trailing commas are allowed in parameter lists.</li>
                </ul>
                <Styled.Pre>{`function h(x = y){   // y is from parameter scope or outer scope
  const y = 2;
  // x uses 'y' from outside the body; 'const y' here is not visible yet
}
// h(); // ReferenceError if no outer 'y' exists`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Defaults apply only for <code>undefined</code>; use <code>??</code> inside when you want nullish handling.</li>
                    <li>Prefer <b>rest</b> over <code>arguments</code>; it's a real array and clearer.</li>
                    <li>For many options, use an <b>object parameter with destructuring defaults</b>.</li>
                    <li>Beware TDZ in defaults (left→right evaluation); don't reference later params.</li>
                    <li>Function <code>.length</code> drops params after the first default/rest; don't use it as a validator.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
