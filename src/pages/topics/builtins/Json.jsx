import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function Json() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>JSON</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> JSON is a text data format: <i>objects</i> ({ }), <i>arrays</i> ([]),
                    strings, numbers, booleans, and <code>null</code>. In JS, use
                    <code> JSON.stringify</code> (object → string) and <code> JSON.parse</code> (string → object).
                </p>

                <h2>Basics</h2>
                <Styled.Pre>{`const obj = { id: 1, name: "Ada", tags: ["js","notes"] };
const s = JSON.stringify(obj);   // '{"id":1,"name":"Ada","tags":["js","notes"]}'
const back = JSON.parse(s);      // { id:1, name:"Ada", tags:[...] }`}</Styled.Pre>

                <h2>What serializes / what doesn’t</h2>
                <ul>
                    <li><b>Kept:</b> objects, arrays, numbers, strings, booleans, <code>null</code>.</li>
                    <li>
                        <b>Omitted/altered:</b> <code>undefined</code>, functions, symbols (dropped in objects; become <code>null</code> in arrays).
                    </li>
                    <li>
                        <b>Special numbers:</b> <code>NaN</code>, <code>Infinity</code>, <code>-Infinity</code> → <code>null</code>.
                    </li>
                    <li><b>Date</b> becomes ISO string (via <code>toJSON()</code>).</li>
                    <li><b>BigInt</b> not supported → must convert yourself.</li>
                </ul>
                <Styled.Pre>{`JSON.stringify({ a: undefined, b(){}, c: Symbol() }); // '{}'
JSON.stringify([1, undefined, NaN, Infinity]);       // '[1,null,null,null]'
JSON.stringify({ d: new Date("2025-09-13Z") });      // '{"d":"2025-09-13T00:00:00.000Z"}'`}</Styled.Pre>

                <h2>Pretty print</h2>
                <ul>
                    <li>3rd arg is indent (number 0..10 or a pad string).</li>
                </ul>
                <Styled.Pre>{`JSON.stringify(obj, null, 2);
/*
{
  "id": 1,
  "name": "Ada",
  "tags": ["js", "notes"]
}
*/`}</Styled.Pre>

                <h2>Replacer (filter/transform on stringify)</h2>
                <ul>
                    <li>Array form = whitelist of keys. Function form = transform values.</li>
                </ul>
                <Styled.Pre>{`// whitelist keys
JSON.stringify(obj, ["id","name"]);  // '{"id":1,"name":"Ada"}'

// function replacer (hide secrets)
const redacted = JSON.stringify(user, (k, v) => k === "password" ? "***" : v, 2);`}</Styled.Pre>

                <h2>Reviver (transform while parsing)</h2>
                <ul>
                    <li>Great for restoring Dates, Maps, custom types.</li>
                </ul>
                <Styled.Pre>{`const s2 = '{"when":"2025-09-13T12:00:00.000Z"}';
const revived = JSON.parse(s2, (k, v) =>
  typeof v === "string" && /^\\d{4}-\\d{2}-\\d{2}T/.test(v) ? new Date(v) : v
);
// revived.when instanceof Date === true`}</Styled.Pre>

                <h2>Cycles (safe stringify)</h2>
                <ul>
                    <li>Plain <code>JSON.stringify</code> throws on cyclic graphs; use a <b>WeakSet</b> to skip repeats.</li>
                </ul>
                <Styled.Pre>{`function safeStringify(value, space=0){
  const seen = new WeakSet();
  return JSON.stringify(value, (k, v) => {
    if (typeof v === "object" && v !== null){
      if (seen.has(v)) return "[Circular]";
      seen.add(v);
    }
    return v;
  }, space);
}`}</Styled.Pre>

                <h2>BigInt interop</h2>
                <ul>
                    <li>Convert on the way out/in (stringify/parse) intentionally.</li>
                </ul>
                <Styled.Pre>{`// out: BigInt → string
const out = JSON.stringify({ id: 123n }, (_k, v) =>
  typeof v === "bigint" ? v.toString() : v
); // '{"id":"123"}'

// in: revive strings → BigInt (if desired)
const back = JSON.parse(out, (k, v) =>
  k === "id" && /^[0-9]+$/.test(v) ? BigInt(v) : v
);`}</Styled.Pre>

                <h2>Custom toJSON</h2>
                <ul>
                    <li>If an object has <code>toJSON()</code>, JSON uses its return value.</li>
                </ul>
                <Styled.Pre>{`class Point {
  constructor(x,y){ this.x=x; this.y=y; }
  toJSON(){ return { type:"Point", x:this.x, y:this.y }; }
}
JSON.stringify(new Point(1,2)); // '{"type":"Point","x":1,"y":2}'`}</Styled.Pre>

                <h2>Order & stable stringify</h2>
                <ul>
                    <li>Property order in JSON follows JS enumeration rules (integer-like keys first, then insertion order for strings).</li>
                    <li>For hashing/diffs, produce a <b>stable</b> string by sorting keys.</li>
                </ul>
                <Styled.Pre>{`function stableStringify(obj, space=0){
  const seen = new WeakSet();
  const sort = (v) => {
    if (v && typeof v === "object"){
      if (Array.isArray(v)) return v.map(sort);
      if (seen.has(v)) return "[Circular]";
      seen.add(v);
      return Object.fromEntries(
        Object.keys(v).sort().map(k => [k, sort(v[k])])
      );
    }
    return v;
  };
  return JSON.stringify(sort(obj), null, space);
}`}</Styled.Pre>

                <h2>Converting non-JSON types</h2>
                <Styled.Pre>{`// Map ⇄ JSON
const m = new Map([["a",1],["b",2]]);
const json = JSON.stringify([...m]);         // '[["a",1],["b",2]]'
const m2 = new Map(JSON.parse(json));        // Map again

// Set ⇄ JSON
const set = new Set([1,2,3]);
const jsonSet = JSON.stringify([...set]);    // '[1,2,3]'
const set2 = new Set(JSON.parse(jsonSet));`}</Styled.Pre>

                <h2>Fetch & JSON</h2>
                <Styled.Pre>{`// Browser
const data = await fetch("/api/items").then(r => r.json());

// Node (fetch or libraries): same .json() API in modern runtimes`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>stringify(value, replacer?, space?)</code> • <code>parse(text, reviver?)</code>.</li>
                    <li>Dates → ISO strings; <code>NaN/±Infinity</code> → <code>null</code>; <code>undefined</code>/fn/symbol dropped (or <code>null</code> in arrays).</li>
                    <li>No BigInt/Map/Set/cycles by default - convert manually or use helpers.</li>
                    <li>Use <b>reviver</b> to restore types (e.g., Date); use <b>replacer</b> to filter/redact.</li>
                    <li>Pretty print with indent; for hashing/diffs, prefer a stable (key-sorted) stringify.</li>
                    <li>Never use <code>eval</code> for JSON; always <code>JSON.parse</code> (wrap in try/catch if input is untrusted).</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
