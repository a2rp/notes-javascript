import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function ObjectUtilities() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Object utilities</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Handy static helpers on <code>Object</code> for reading keys,
                    cloning/merging, converting to/from entries, and checking ownership. Most operate on{" "}
                    <i>own</i> properties only (not the prototype).
                </p>

                <h2>Keys / values / entries</h2>
                <ul>
                    <li><code>Object.keys(o)</code> → own <b>enumerable</b> string keys.</li>
                    <li><code>Object.values(o)</code> → matching values.</li>
                    <li><code>Object.entries(o)</code> → array of <code>[key, value]</code> pairs.</li>
                </ul>
                <Styled.Pre>{`const o = { a: 1, b: 2 };
Object.keys(o);      // ["a","b"]
Object.values(o);    // [1,2]
Object.entries(o);   // [["a",1],["b",2]]`}</Styled.Pre>

                <h2>fromEntries (pairs → object)</h2>
                <ul>
                    <li>Inverse of <code>entries</code>. Great for <b>pick/omit/map</b> transforms.</li>
                </ul>
                <Styled.Pre>{`// pick keys
const pick = (obj, keys) =>
  Object.fromEntries(keys.filter(k => k in obj).map(k => [k, obj[k]]));

pick({a:1,b:2,c:3}, ["a","c"]);   // { a:1, c:3 }

// map values
const mapValues = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, fn(v, k)]));

mapValues({a:1,b:2}, x => x*10);  // { a:10, b:20 }`}</Styled.Pre>

                <h2>assign & spread (shallow)</h2>
                <ul>
                    <li><code>Object.assign(target, ...sources)</code> copies own <b>enumerable</b> props (values only).</li>
                    <li>Spread <code>{`{ ...a, ...b }`}</code> is similar; later sources win on conflicts.</li>
                    <li>Both are <b>shallow</b>: nested objects are shared references.</li>
                </ul>
                <Styled.Pre>{`const a = { user: { id: 1 }, x: 1 };
const b = { x: 2, y: 3 };
const m1 = Object.assign({}, a, b);  // { user:{id:1}, x:2, y:3 }
const m2 = { ...a, ...b };           // same result
m1.user === a.user; // true (shallow)`}</Styled.Pre>

                <h2>hasOwn (ownership check)</h2>
                <ul>
                    <li><code>Object.hasOwn(obj, key)</code> → true for own props only (better than using <code>hasOwnProperty.call</code>).</li>
                    <li><code>in</code> checks own <i>and inherited</i> keys.</li>
                </ul>
                <Styled.Pre>{`const o = Object.create({ inherited: 1 });
o.own = 2;
Object.hasOwn(o, "own");        // true
Object.hasOwn(o, "inherited");  // false
"inherited" in o;               // true (because on prototype)`}</Styled.Pre>

                <h2>Reading all own keys (incl. non-enum / symbols)</h2>
                <ul>
                    <li><code>Object.getOwnPropertyNames(o)</code> → own string keys (even non-enum).</li>
                    <li><code>Object.getOwnPropertySymbols(o)</code> → own symbol keys.</li>
                    <li><code>Reflect.ownKeys(o)</code> → both (strings + symbols).</li>
                </ul>
                <Styled.Pre>{`const S = Symbol("s");
const o = Object.defineProperty({ x:1, [S]:2 }, "hidden", { value: 9, enumerable:false });
Object.getOwnPropertyNames(o);  // ["x","hidden"]
Object.getOwnPropertySymbols(o);// [Symbol(s)]
Reflect.ownKeys(o);             // ["x","hidden", Symbol(s)]`}</Styled.Pre>

                <h2>Descriptors helpers</h2>
                <ul>
                    <li><code>Object.getOwnPropertyDescriptor(obj, key)</code> for one key.</li>
                    <li><code>Object.getOwnPropertyDescriptors(obj)</code> for a full snapshot (great for exact clones).</li>
                </ul>
                <Styled.Pre>{`// exact clone: preserves flags & prototype
const cloneExact = (obj) =>
  Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));`}</Styled.Pre>

                <h2>Prototype helpers</h2>
                <ul>
                    <li><code>Object.getPrototypeOf(obj)</code> / <code>Object.setPrototypeOf(obj, proto)</code>.</li>
                    <li>Prefer composition over changing prototype at runtime; setting proto may deopt performance.</li>
                </ul>
                <Styled.Pre>{`const proto = { greet(){ return "hi"; } };
const o = Object.create(proto);
Object.getPrototypeOf(o) === proto; // true`}</Styled.Pre>

                <h2>Immutability quick refs</h2>
                <ul>
                    <li><code>Object.preventExtensions(o)</code> → no new props.</li>
                    <li><code>Object.seal(o)</code> → no add/remove; props non-configurable.</li>
                    <li><code>Object.freeze(o)</code> → also makes data props non-writable (shallow).</li>
                </ul>

                <h2>Converting Object ⇆ Map</h2>
                <Styled.Pre>{`// Object → Map
const m = new Map(Object.entries({ a:1, b:2 }));

// Map → Object (string keys only)
const obj = Object.fromEntries(new Map([["a",1],["b",2]]));`}</Styled.Pre>

                <h2>Structured clone (deep copy for plain data)</h2>
                <ul>
                    <li><code>structuredClone(value)</code> deep-clones supported data types (no functions/prototypes kept).</li>
                    <li>Good for JSON-like data; preserves Map/Set/typed arrays/Date/RegExp.</li>
                </ul>
                <Styled.Pre>{`const deep = structuredClone({ a: { b: 1 }, m: new Map([["k",1]]) });
deep.a === deep.a;          // true (new object)
deep.m instanceof Map;      // true`}</Styled.Pre>

                <h2>Patterns (immutable updates)</h2>
                <Styled.Pre>{`// shallow field update
const next = { ...state, status: "ready" };

// nested update (copy each level you touch)
const next2 = {
  ...state,
  user: { ...state.user, name: "Ada" }
};

// remove key (omit)
const { secret, ...publicPart } = state;

// sort object by keys (new object)
const sortByKey = (obj) =>
  Object.fromEntries(Object.entries(obj).sort(([a],[b]) => a.localeCompare(b)));`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><b>entries ⇄ fromEntries</b> enable expressive pick/omit/map transforms.</li>
                    <li><b>assign/spread are shallow</b>; nested objects remain shared unless you copy those levels.</li>
                    <li>Use <b>Object.hasOwn</b> for ownership checks; <code>in</code> sees prototypes.</li>
                    <li>Use <b>getOwnPropertyDescriptors + Object.create</b> for an exact clone with flags & prototype.</li>
                    <li><b>structuredClone</b> for deep copies of data-only structures (not functions/classes).</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
