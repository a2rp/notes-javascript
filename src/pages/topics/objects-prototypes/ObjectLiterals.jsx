import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function ObjectLiterals() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Object literals</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> The <i>object literal</i> is the shortest way to create objects:
                    keys → values, with support for <b>shorthand props</b>, <b>concise methods</b>,{" "}
                    <b>computed keys</b>, <b>getters/setters</b>, and <b>object spread</b>.
                </p>

                <h2>Basic & shorthand</h2>
                <ul>
                    <li>Shorthand uses the variable name as both key and value.</li>
                    <li>Concise method syntax defines a function value under a key.</li>
                </ul>
                <Styled.Pre>{`const name = "Ada", age = 36;
const user = {
  name,           // shorthand property
  age,
  greet(){ return "Hi " + this.name; } // concise method
};
user.greet(); // "Hi Ada"`}</Styled.Pre>

                <h2>Computed keys & Symbol keys</h2>
                <ul>
                    <li>Use <code>[expr]</code> to compute a property name at runtime.</li>
                    <li><code>Symbol</code> keys never collide with string keys.</li>
                </ul>
                <Styled.Pre>{`const K = "id";
const S = Symbol("secret");
const obj = {
  [K]: 101,              // "id": 101
  ["a" + "b"]: 2,        // "ab": 2
  [S]: "hidden"          // symbol-keyed
};
Object.keys(obj);        // ["id", "ab"]
Object.getOwnPropertySymbols(obj); // [S]`}</Styled.Pre>

                <h2>Getters & setters (accessors)</h2>
                <ul>
                    <li>Accessors act like properties but run code on get/set.</li>
                    <li>Data property and accessor with the same key can't coexist (last one wins).</li>
                </ul>
                <Styled.Pre>{`const point = {
  _x: 0,
  get x(){ return this._x; },
  set x(v){ if (Number.isFinite(v)) this._x = v; }
};
point.x = 7;   // runs setter
point.x;       // 7 (runs getter)`}</Styled.Pre>

                <h2>Object spread (copy/merge)</h2>
                <ul>
                    <li><code>...</code> copies own <b>enumerable</b> props (shallow). Later props overwrite earlier ones.</li>
                    <li>Like <code>Object.assign</code>: getters are <b>invoked</b> and the result is copied as a <b>data</b> prop.</li>
                </ul>
                <Styled.Pre>{`const a = { n: 1 }, b = { n: 2, m: 3 };
const c = { ...a, ...b, k: 9 }; // { n:2, m:3, k:9 }  (b overwrites a)
const clone = { ...c };         // shallow clone (nested objects are shared)`}</Styled.Pre>

                <h2>Property name rules & duplicates</h2>
                <ul>
                    <li>Keys are strings or symbols (number literals become strings, e.g., <code>1</code> → <code>"1"</code>).</li>
                    <li>Duplicate string keys: the <b>last</b> definition wins.</li>
                </ul>
                <Styled.Pre>{`const o = { x: 1, x: 2 };  // x becomes 2
Object.keys({ 1: "a", "1": "b" }); // ["1"]`}</Styled.Pre>

                <h2>Proto & creation notes</h2>
                <ul>
                    <li>To control prototype, prefer <code>Object.create(proto)</code>.</li>
                    <li>Need a “dictionary” with no prototype collisions? Use <code>Object.create(null)</code>.</li>
                </ul>
                <Styled.Pre>{`const dict = Object.create(null);
dict["toString"];  // undefined (safe, no proto)
const obj = Object.create(Array.prototype); // custom prototype`}</Styled.Pre>

                <h2>JSON vs object literals</h2>
                <ul>
                    <li>JSON is a <b>data format</b>: keys must be strings, values must be data (no functions/symbols/undefined).</li>
                    <li>Object literals are full JS: methods, symbols, getters/setters are allowed.</li>
                </ul>

                <h2>Small patterns</h2>
                <ul>
                    <li><b>Conditional add:</b> spread conditionally when merging.</li>
                    <li><b>Renaming on build:</b> compute a different key while keeping the source name.</li>
                </ul>
                <Styled.Pre>{`// Conditional add
const base = { a: 1 };
const withFlag = { 
  ...base, 
  ...(enabled ? { flag: true } : {}) 
};

// Renaming via computed key
const key = "user_" + id;
const record = { [key]: payload };`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Use <b>shorthand</b> and <b>concise methods</b> for readable objects.</li>
                    <li>Prefer <b>computed keys</b> (<code>[expr]</code>) for dynamic or <code>Symbol</code> keys.</li>
                    <li><b>Spread</b> is shallow and copies values; later props win; accessors become data.</li>
                    <li>For custom prototypes or null-prototype maps, use <code>Object.create</code>.</li>
                    <li>Avoid relying on legacy <code>__proto__</code> in literals; it's better to use the APIs above.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
