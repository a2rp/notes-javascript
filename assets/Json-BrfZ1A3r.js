import{j as e}from"./index-Cps9Yqi0.js";import{S as s,B as n}from"./index-Da5ERLYl.js";import{B as r}from"./Breadcrumbs-DTCNvS__.js";function c(){return e.jsxs(s.Wrapper,{children:[e.jsx(r,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:n}),e.jsx(s.Heading,{children:"JSON"}),e.jsxs(s.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," JSON is a text data format: ",e.jsx("i",{children:"objects"})," (","), ",e.jsx("i",{children:"arrays"})," ([]), strings, numbers, booleans, and ",e.jsx("code",{children:"null"}),". In JS, use",e.jsx("code",{children:" JSON.stringify"})," (object → string) and ",e.jsx("code",{children:" JSON.parse"})," (string → object)."]}),e.jsx("h2",{children:"Basics"}),e.jsx(s.Pre,{children:`const obj = { id: 1, name: "Ada", tags: ["js","notes"] };
const s = JSON.stringify(obj);   // '{"id":1,"name":"Ada","tags":["js","notes"]}'
const back = JSON.parse(s);      // { id:1, name:"Ada", tags:[...] }`}),e.jsx("h2",{children:"What serializes / what doesn’t"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Kept:"})," objects, arrays, numbers, strings, booleans, ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Omitted/altered:"})," ",e.jsx("code",{children:"undefined"}),", functions, symbols (dropped in objects; become ",e.jsx("code",{children:"null"})," in arrays)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Special numbers:"})," ",e.jsx("code",{children:"NaN"}),", ",e.jsx("code",{children:"Infinity"}),", ",e.jsx("code",{children:"-Infinity"})," → ",e.jsx("code",{children:"null"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Date"})," becomes ISO string (via ",e.jsx("code",{children:"toJSON()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BigInt"})," not supported → must convert yourself."]})]}),e.jsx(s.Pre,{children:`JSON.stringify({ a: undefined, b(){}, c: Symbol() }); // '{}'
JSON.stringify([1, undefined, NaN, Infinity]);       // '[1,null,null,null]'
JSON.stringify({ d: new Date("2025-09-13Z") });      // '{"d":"2025-09-13T00:00:00.000Z"}'`}),e.jsx("h2",{children:"Pretty print"}),e.jsx("ul",{children:e.jsx("li",{children:"3rd arg is indent (number 0..10 or a pad string)."})}),e.jsx(s.Pre,{children:`JSON.stringify(obj, null, 2);
/*
{
  "id": 1,
  "name": "Ada",
  "tags": ["js", "notes"]
}
*/`}),e.jsx("h2",{children:"Replacer (filter/transform on stringify)"}),e.jsx("ul",{children:e.jsx("li",{children:"Array form = whitelist of keys. Function form = transform values."})}),e.jsx(s.Pre,{children:`// whitelist keys
JSON.stringify(obj, ["id","name"]);  // '{"id":1,"name":"Ada"}'

// function replacer (hide secrets)
const redacted = JSON.stringify(user, (k, v) => k === "password" ? "***" : v, 2);`}),e.jsx("h2",{children:"Reviver (transform while parsing)"}),e.jsx("ul",{children:e.jsx("li",{children:"Great for restoring Dates, Maps, custom types."})}),e.jsx(s.Pre,{children:`const s2 = '{"when":"2025-09-13T12:00:00.000Z"}';
const revived = JSON.parse(s2, (k, v) =>
  typeof v === "string" && /^\\d{4}-\\d{2}-\\d{2}T/.test(v) ? new Date(v) : v
);
// revived.when instanceof Date === true`}),e.jsx("h2",{children:"Cycles (safe stringify)"}),e.jsx("ul",{children:e.jsxs("li",{children:["Plain ",e.jsx("code",{children:"JSON.stringify"})," throws on cyclic graphs; use a ",e.jsx("b",{children:"WeakSet"})," to skip repeats."]})}),e.jsx(s.Pre,{children:`function safeStringify(value, space=0){
  const seen = new WeakSet();
  return JSON.stringify(value, (k, v) => {
    if (typeof v === "object" && v !== null){
      if (seen.has(v)) return "[Circular]";
      seen.add(v);
    }
    return v;
  }, space);
}`}),e.jsx("h2",{children:"BigInt interop"}),e.jsx("ul",{children:e.jsx("li",{children:"Convert on the way out/in (stringify/parse) intentionally."})}),e.jsx(s.Pre,{children:`// out: BigInt → string
const out = JSON.stringify({ id: 123n }, (_k, v) =>
  typeof v === "bigint" ? v.toString() : v
); // '{"id":"123"}'

// in: revive strings → BigInt (if desired)
const back = JSON.parse(out, (k, v) =>
  k === "id" && /^[0-9]+$/.test(v) ? BigInt(v) : v
);`}),e.jsx("h2",{children:"Custom toJSON"}),e.jsx("ul",{children:e.jsxs("li",{children:["If an object has ",e.jsx("code",{children:"toJSON()"}),", JSON uses its return value."]})}),e.jsx(s.Pre,{children:`class Point {
  constructor(x,y){ this.x=x; this.y=y; }
  toJSON(){ return { type:"Point", x:this.x, y:this.y }; }
}
JSON.stringify(new Point(1,2)); // '{"type":"Point","x":1,"y":2}'`}),e.jsx("h2",{children:"Order & stable stringify"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Property order in JSON follows JS enumeration rules (integer-like keys first, then insertion order for strings)."}),e.jsxs("li",{children:["For hashing/diffs, produce a ",e.jsx("b",{children:"stable"})," string by sorting keys."]})]}),e.jsx(s.Pre,{children:`function stableStringify(obj, space=0){
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
}`}),e.jsx("h2",{children:"Converting non-JSON types"}),e.jsx(s.Pre,{children:`// Map ⇄ JSON
const m = new Map([["a",1],["b",2]]);
const json = JSON.stringify([...m]);         // '[["a",1],["b",2]]'
const m2 = new Map(JSON.parse(json));        // Map again

// Set ⇄ JSON
const set = new Set([1,2,3]);
const jsonSet = JSON.stringify([...set]);    // '[1,2,3]'
const set2 = new Set(JSON.parse(jsonSet));`}),e.jsx("h2",{children:"Fetch & JSON"}),e.jsx(s.Pre,{children:`// Browser
const data = await fetch("/api/items").then(r => r.json());

// Node (fetch or libraries): same .json() API in modern runtimes`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"stringify(value, replacer?, space?)"})," • ",e.jsx("code",{children:"parse(text, reviver?)"}),"."]}),e.jsxs("li",{children:["Dates → ISO strings; ",e.jsx("code",{children:"NaN/±Infinity"})," → ",e.jsx("code",{children:"null"}),"; ",e.jsx("code",{children:"undefined"}),"/fn/symbol dropped (or ",e.jsx("code",{children:"null"})," in arrays)."]}),e.jsx("li",{children:"No BigInt/Map/Set/cycles by default - convert manually or use helpers."}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"reviver"})," to restore types (e.g., Date); use ",e.jsx("b",{children:"replacer"})," to filter/redact."]}),e.jsx("li",{children:"Pretty print with indent; for hashing/diffs, prefer a stable (key-sorted) stringify."}),e.jsxs("li",{children:["Never use ",e.jsx("code",{children:"eval"})," for JSON; always ",e.jsx("code",{children:"JSON.parse"})," (wrap in try/catch if input is untrusted)."]})]})]})]})}export{c as default};
