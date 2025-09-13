import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";

export default function FunctionForms() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />

            <Styled.Heading>Function forms</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JavaScript offers multiple ways to create functions. Each form differs
                    in hoisting, naming, <code>this</code>, and return type. Pick the form that matches the job.
                </p>

                <h2>1) Function declaration (FD)</h2>
                <ul>
                    <li>Hoisted: callable before its line. In strict/modules, block-scoped inside a block.</li>
                    <li>The function name is available inside for recursion.</li>
                </ul>
                <Styled.Pre>{`greet();                    // "hi" (hoisted)
function greet(){ console.log("hi"); }

{
  function local(){ return 1; }   // block-scoped in strict/modules
}
// local(); // ReferenceError (outside block)
`}</Styled.Pre>

                <h2>2) Function expression (FE)</h2>
                <ul>
                    <li>Not hoisted as a function; only the variable hoists.</li>
                    <li>Can be anonymous or named (named helps stack traces & self-recursion).</li>
                </ul>
                <Styled.Pre>{`const add = function(a, b){ return a + b; };
const fact = function factorial(n){ return n <= 1 ? 1 : n * factorial(n-1); };

console.log(add(2,3));  // 5
// console.log(mult(2,3)); // ReferenceError (not declared yet)
`}</Styled.Pre>

                <h2>3) Method shorthand (object/class)</h2>
                <ul>
                    <li>Object literal: concise method syntax. In classes, similar method form.</li>
                    <li>Methods are just functions stored on an object; name is inferred.</li>
                </ul>
                <Styled.Pre>{`const user = {
  name: "A",
  greet(){ return "hi " + this.name; } // method shorthand
};
user.greet(); // "hi A"
`}</Styled.Pre>

                <h2>4) Arrow function <small>(separate deep-dive later)</small></h2>
                <ul>
                    <li>Concise syntax, <b>lexical this</b>, no <code>arguments</code>, not constructible.</li>
                    <li>Great for callbacks; avoid for methods that need dynamic <code>this</code>.</li>
                </ul>
                <Styled.Pre>{`const inc = x => x + 1;
const pair = (a, b) => ({ a, b });  // returns object
// new inc(); // TypeError (arrows can't be used with new)
`}</Styled.Pre>

                <h2>5) Generator function</h2>
                <ul>
                    <li><code>function* g(){ }</code> yields values and returns an <b>iterator</b>.</li>
                    <li>Use <code>yield</code> to pause; consume with <code>for…of</code> or <code>next()</code>.</li>
                </ul>
                <Styled.Pre>{`function* range(n){
  for (let i = 0; i < n; i++) yield i;
}
for (const x of range(3)) { /* 0,1,2 */ }
`}</Styled.Pre>

                <h2>6) Async function</h2>
                <ul>
                    <li><code>async function f(){ }</code> returns a <b>Promise</b>; inside you can <code>await</code>.</li>
                    <li>There are async arrows too: <code>const f = async () =&gt; { }</code>.</li>
                </ul>
                <Styled.Pre>{`async function load(){
  const res = await fetch("/api");
  return res.ok;
}
load().then(console.log);
`}</Styled.Pre>

                <h2>7) Async generator</h2>
                <ul>
                    <li><code>async function* g(){ }</code> yields Promises/values; consume with <code>for await…of</code>.</li>
                </ul>
                <Styled.Pre>{`async function* lines(stream){
  for await (const chunk of stream) yield String(chunk);
}
`}</Styled.Pre>

                <h2>8) IIFE (Immediately-Invoked Function Expression)</h2>
                <ul>
                    <li>Creates a one-off scope; less needed with <code>let/const</code> and modules, still handy in scripts.</li>
                </ul>
                <Styled.Pre>{`(function(){
  const secret = 42;
  console.log("init once");
})();  // runs immediately
`}</Styled.Pre>

                <h2>9) Function constructor</h2>
                <ul>
                    <li><code>new Function("a","b","return a+b")</code> builds from strings; executes in the global scope.</li>
                    <li>Avoid in application code (security, performance, no closure access).</li>
                </ul>
                <Styled.Pre>{`const sum = new Function("a","b","return a+b");
sum(2,3); // 5   // but avoid this pattern
`}</Styled.Pre>

                <h2>10) Getters / Setters</h2>
                <ul>
                    <li>Accessor functions on objects/classes; act like properties when used.</li>
                </ul>
                <Styled.Pre>{`const p = {
  _x: 1,
  get x(){ return this._x; },
  set x(v){ this._x = v; }
};
p.x = 7; p.x; // 7
`}</Styled.Pre>

                <h2>Name inference & <code>Function.name</code></h2>
                <ul>
                    <li>Anonymous function expressions get a name from their binding: <code>const fn = function(){ }; fn.name === "fn"</code>.</li>
                    <li>Method shorthand names come from the key; bound functions show <code>"bound "</code> prefix.</li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Need hoisting or recursion? Use a <b>function declaration</b>.</li>
                    <li>Need a value in an expression or to pass around? Use a <b>function expression</b> (often with <b>const</b>).</li>
                    <li>Callbacks → prefer <b>arrow</b> (lexical <code>this</code>); object/class methods → method syntax (not arrows).</li>
                    <li>Streams/iterables → <b>generators</b>; async workflows → <b>async</b> (and async generators).</li>
                    <li>Avoid <b>Function constructor</b> unless you truly need dynamic code generation.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
