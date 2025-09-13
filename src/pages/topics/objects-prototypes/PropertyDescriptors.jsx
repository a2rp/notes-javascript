import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

export default function PropertyDescriptors() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />

            <Styled.Heading>Property descriptors</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Every property has <i>attributes</i> (descriptor):{" "}
                    <code>writable</code>, <code>enumerable</code>, <code>configurable</code> and either{" "}
                    <code>value</code> (data prop) <i>or</i> <code>get/set</code> (accessor prop).
                </p>

                <h2>Shapes</h2>
                <ul>
                    <li>
                        <b>Data</b>: <code>&#123; value, writable, enumerable, configurable &#125;</code>
                    </li>
                    <li>
                        <b>Accessor</b>: <code>&#123; get, set, enumerable, configurable &#125;</code> (no{" "}
                        <code>value/writable</code>).
                    </li>
                </ul>

                <h2>Inspect & define</h2>
                <Styled.Pre>{`const o = { x: 1 };
Object.getOwnPropertyDescriptor(o, "x");
// { value:1, writable:true, enumerable:true, configurable:true } (from literals/assignment)

Object.defineProperty(o, "hidden", {
  value: 42,
  enumerable: false,
  writable: false,
  configurable: false
});
// defineProperty defaults: missing flags => false/undefined`}</Styled.Pre>

                <h2>Accessor properties</h2>
                <Styled.Pre>{`let _n = 0;
Object.defineProperty(o, "n", {
  get(){ return _n; },
  set(v){ if (Number.isInteger(v)) _n = v; },
  enumerable: true
});
o.n = 5; o.n; // 5`}</Styled.Pre>

                <h2>Define many / clone with flags</h2>
                <Styled.Pre>{`Object.defineProperties(o, {
  id:   { value: 100, writable:false, enumerable:true, configurable:false },
  name: { value: "Ada", writable:true, enumerable:true, configurable:true }
});

// Clone while preserving descriptors & prototype
const clone = Object.create(
  Object.getPrototypeOf(o),
  Object.getOwnPropertyDescriptors(o)
);`}</Styled.Pre>

                <h2>Sealing / freezing</h2>
                <ul>
                    <li>
                        <b>preventExtensions(obj)</b>: block new props (existing unchanged).
                    </li>
                    <li>
                        <b>seal(obj)</b>: no add/remove; sets all own props <code>configurable:false</code>.
                    </li>
                    <li>
                        <b>freeze(obj)</b>: like seal + set data props <code>writable:false</code>. (Shallow.)
                    </li>
                </ul>
                <Styled.Pre>{`Object.isExtensible(o); Object.preventExtensions(o);
Object.isSealed(o);      Object.seal(o);
Object.isFrozen(o);      Object.freeze(o);`}</Styled.Pre>

                <h2>Rules & gotchas</h2>
                <ul>
                    <li>
                        Once <code>configurable:false</code>, you can’t change the descriptor type or{" "}
                        <code>enumerable</code>. For data props you may flip <code>writable:true→false</code>{" "}
                        (not back to true) and change <code>value</code> while writable.
                    </li>
                    <li>
                        <b>defineProperty defaults to non-writable/non-enumerable/non-configurable</b> — set
                        flags explicitly if you need normal behavior.
                    </li>
                    <li>
                        <b>Spread/assign copy values only</b>: accessors are invoked and copied as <i>data</i>{" "}
                        props with fresh (writable/enumerable/configurable) defaults.
                    </li>
                </ul>
                <Styled.Pre>{`const src = {
  get val(){ console.log("get"); return 7; }
};
const a = { ...src };    // logs "get"; a.val === 7 (data prop now)
const b = Object.assign({}, src); // same effect`}</Styled.Pre>

                <h2>Enumerability quick refs</h2>
                <ul>
                    <li>
                        <code>Object.keys(obj)</code> → own <b>enumerable</b> string keys.
                    </li>
                    <li>
                        <code>Object.getOwnPropertyNames(obj)</code> → own string keys (incl. non-enum).
                    </li>
                    <li>
                        <code>Object.getOwnPropertySymbols(obj)</code> → own symbol keys.
                    </li>
                    <li>
                        <code>Reflect.ownKeys(obj)</code> → all own keys (strings + symbols).
                    </li>
                    <li>
                        <code>for…in</code> → enumerable string keys, <i>including inherited</i>.
                    </li>
                </ul>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Data vs Accessor: you can’t mix <code>value/writable</code> with <code>get/set</code>.</li>
                    <li>Literals/assignment create props that are <b>writable, enumerable, configurable</b>.</li>
                    <li>
                        Use <code>defineProperty</code> for read-only, hidden (non-enumerable), or accessor
                        props.
                    </li>
                    <li>
                        <code>freeze</code> is shallow; nested objects remain mutable unless frozen too.
                    </li>
                    <li>Use descriptors clone pattern to keep flags and prototype intact.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
