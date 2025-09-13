import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

export default function TypedArrays() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />

            <Styled.Heading>Typed arrays & buffers</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> <code>ArrayBuffer</code> is a fixed-length raw byte store.
                    <b> TypedArray</b> views (<code>Int8Array</code>, <code>Uint8Array</code>, <code>Float32Array</code>, ...)
                    interpret bytes as numeric elements. <code>DataView</code> is a flexible reader/writer for mixed
                    types and endianness.
                </p>

                <h2>Creating buffers & views</h2>
                <Styled.Pre>{`// 16 bytes of zeroed memory
const buf = new ArrayBuffer(16);

// View as 32-bit signed ints (4 bytes per element)
const i32 = new Int32Array(buf);     // length = 16 / 4 = 4
i32[0] = 42;

// View same buffer with different type/offset
const u8 = new Uint8Array(buf, 0, 8); // first 8 bytes (8 elements)
u8[0]; // lowest byte of i32[0] (endianness-dependent)`}</Styled.Pre>

                <h2>Direct construction & from existing data</h2>
                <Styled.Pre>{`// Allocate + fill
const f32 = new Float32Array(3);      // [0,0,0]
f32.set([1.5, 2.5], 1);               // [0,1.5,2.5]

// From regular array/iterable (copies)
const u16 = Uint16Array.from([500, 65535]); // clamp/truncate per type

// Subarray is a view (no copy)
const head = u16.subarray(0, 1);`}</Styled.Pre>

                <h2>TypedArray toolbox</h2>
                <ul>
                    <li>All have <code>length</code>, <code>byteLength</code>, <code>byteOffset</code>, <code>buffer</code>, <code>BYTES_PER_ELEMENT</code>.</li>
                    <li>Methods: <code>set</code>, <code>slice</code> (copy), <code>subarray</code> (view), <code>fill</code>, <code>copyWithin</code>,
                        and most array extras (<code>map</code>, <code>forEach</code>, <code>reduce</code>, <code>find</code> …).</li>
                    <li><code>sort</code> is in-place and compares numerically (not lexicographically).</li>
                </ul>

                <h2>Endianness & DataView</h2>
                <ul>
                    <li>TypedArrays use the platform's endianness (usually little-endian).</li>
                    <li><code>DataView</code> lets you read/write with explicit endianness.</li>
                </ul>
                <Styled.Pre>{`const dv = new DataView(buf);
dv.setUint16(0, 0x1234, /*littleEndian*/ true);
dv.getUint16(0, true);   // 0x1234
dv.getUint16(0, false);  // 0x3412 (byte-swapped)`}</Styled.Pre>

                <h2>Fetching binary data</h2>
                <Styled.Pre>{`// Browser: fetch → ArrayBuffer → view
const res = await fetch("/file.bin");
const ab  = await res.arrayBuffer();
const bytes = new Uint8Array(ab);

// Text encode/decode
const enc = new TextEncoder().encode("hello");   // Uint8Array
const str = new TextDecoder("utf-8").decode(bytes);`}</Styled.Pre>

                <h2>Clamped bytes (canvas/image)</h2>
                <p><code>Uint8ClampedArray</code> clamps writes to <code>[0,255]</code> and rounds, useful for RGBA pixels.</p>
                <Styled.Pre>{`const rgba = new Uint8ClampedArray(4);
rgba.set([ -20, 260, 127.5, 255 ]); // → [0,255,128,255]`}</Styled.Pre>

                <h2>Packing a simple struct</h2>
                <Styled.Pre>{`// struct { u16 id; i16 temp; f32 ratio; } little-endian
const ab = new ArrayBuffer(8);
const v = new DataView(ab);
v.setUint16(0, 500, true);
v.setInt16 (2, -12, true);
v.setFloat32(4, 0.75, true);

// Read back
const id   = v.getUint16(0, true);
const temp = v.getInt16 (2, true);
const ratio= v.getFloat32(4, true);`}</Styled.Pre>

                <h2>Transfer & performance notes</h2>
                <ul>
                    <li>Buffers are fixed-length. <code>slice()</code> copies bytes; <code>subarray()</code> is zero-copy.</li>
                    <li>PostMessage/Workers can <b>transfer</b> buffers for zero-copy handoff (structured clone).</li>
                    <li>Prefer one large buffer with multiple views over many small allocations in hot paths.</li>
                    <li>Typed arrays are dense; no holes; values are clamped/truncated to the element type.</li>
                </ul>

                <h2>Types (quick table)</h2>
                <Styled.Pre>{`Int8Array / Uint8Array / Uint8ClampedArray
Int16Array / Uint16Array
Int32Array / Uint32Array
BigInt64Array / BigUint64Array
Float32Array / Float64Array`}</Styled.Pre>

                <h2>Node note</h2>
                <p>In Node.js, <code>Buffer</code> is a subclass of <code>Uint8Array</code> with extra APIs (I/O, encoding helpers).</p>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li><code>ArrayBuffer</code> = bytes; <code>TypedArray</code> = typed numeric view; <code>DataView</code> = mixed/endianness-aware.</li>
                    <li><code>subarray()</code> is a view; <code>slice()</code> copies; <code>set()</code> blits efficiently.</li>
                    <li>Use <code>TextEncoder/TextDecoder</code> for UTF-8 strings; <code>fetch().arrayBuffer()</code> for binary downloads.</li>
                    <li>For file/network formats, control endianness via <code>DataView</code>.</li>
                    <li>Typed arrays are fixed-size, dense, and numeric; default <code>sort</code> is numeric ascending.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
