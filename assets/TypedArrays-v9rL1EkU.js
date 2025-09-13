import{j as e}from"./index-Cud8-B-g.js";import{S as r,B as s}from"./index-CIvUdc-C.js";import{B as i}from"./Breadcrumbs-BUXMDEQY.js";function d(){return e.jsxs(r.Wrapper,{children:[e.jsx(i,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:s}),e.jsx(r.Heading,{children:"Typed arrays & buffers"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," ",e.jsx("code",{children:"ArrayBuffer"})," is a fixed-length raw byte store.",e.jsx("b",{children:" TypedArray"})," views (",e.jsx("code",{children:"Int8Array"}),", ",e.jsx("code",{children:"Uint8Array"}),", ",e.jsx("code",{children:"Float32Array"}),", ...) interpret bytes as numeric elements. ",e.jsx("code",{children:"DataView"})," is a flexible reader/writer for mixed types and endianness."]}),e.jsx("h2",{children:"Creating buffers & views"}),e.jsx(r.Pre,{children:`// 16 bytes of zeroed memory
const buf = new ArrayBuffer(16);

// View as 32-bit signed ints (4 bytes per element)
const i32 = new Int32Array(buf);     // length = 16 / 4 = 4
i32[0] = 42;

// View same buffer with different type/offset
const u8 = new Uint8Array(buf, 0, 8); // first 8 bytes (8 elements)
u8[0]; // lowest byte of i32[0] (endianness-dependent)`}),e.jsx("h2",{children:"Direct construction & from existing data"}),e.jsx(r.Pre,{children:`// Allocate + fill
const f32 = new Float32Array(3);      // [0,0,0]
f32.set([1.5, 2.5], 1);               // [0,1.5,2.5]

// From regular array/iterable (copies)
const u16 = Uint16Array.from([500, 65535]); // clamp/truncate per type

// Subarray is a view (no copy)
const head = u16.subarray(0, 1);`}),e.jsx("h2",{children:"TypedArray toolbox"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["All have ",e.jsx("code",{children:"length"}),", ",e.jsx("code",{children:"byteLength"}),", ",e.jsx("code",{children:"byteOffset"}),", ",e.jsx("code",{children:"buffer"}),", ",e.jsx("code",{children:"BYTES_PER_ELEMENT"}),"."]}),e.jsxs("li",{children:["Methods: ",e.jsx("code",{children:"set"}),", ",e.jsx("code",{children:"slice"})," (copy), ",e.jsx("code",{children:"subarray"})," (view), ",e.jsx("code",{children:"fill"}),", ",e.jsx("code",{children:"copyWithin"}),", and most array extras (",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"forEach"}),", ",e.jsx("code",{children:"reduce"}),", ",e.jsx("code",{children:"find"})," …)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"sort"})," is in-place and compares numerically (not lexicographically)."]})]}),e.jsx("h2",{children:"Endianness & DataView"}),e.jsxs("ul",{children:[e.jsx("li",{children:"TypedArrays use the platform's endianness (usually little-endian)."}),e.jsxs("li",{children:[e.jsx("code",{children:"DataView"})," lets you read/write with explicit endianness."]})]}),e.jsx(r.Pre,{children:`const dv = new DataView(buf);
dv.setUint16(0, 0x1234, /*littleEndian*/ true);
dv.getUint16(0, true);   // 0x1234
dv.getUint16(0, false);  // 0x3412 (byte-swapped)`}),e.jsx("h2",{children:"Fetching binary data"}),e.jsx(r.Pre,{children:`// Browser: fetch → ArrayBuffer → view
const res = await fetch("/file.bin");
const ab  = await res.arrayBuffer();
const bytes = new Uint8Array(ab);

// Text encode/decode
const enc = new TextEncoder().encode("hello");   // Uint8Array
const str = new TextDecoder("utf-8").decode(bytes);`}),e.jsx("h2",{children:"Clamped bytes (canvas/image)"}),e.jsxs("p",{children:[e.jsx("code",{children:"Uint8ClampedArray"})," clamps writes to ",e.jsx("code",{children:"[0,255]"})," and rounds, useful for RGBA pixels."]}),e.jsx(r.Pre,{children:`const rgba = new Uint8ClampedArray(4);
rgba.set([ -20, 260, 127.5, 255 ]); // → [0,255,128,255]`}),e.jsx("h2",{children:"Packing a simple struct"}),e.jsx(r.Pre,{children:`// struct { u16 id; i16 temp; f32 ratio; } little-endian
const ab = new ArrayBuffer(8);
const v = new DataView(ab);
v.setUint16(0, 500, true);
v.setInt16 (2, -12, true);
v.setFloat32(4, 0.75, true);

// Read back
const id   = v.getUint16(0, true);
const temp = v.getInt16 (2, true);
const ratio= v.getFloat32(4, true);`}),e.jsx("h2",{children:"Transfer & performance notes"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Buffers are fixed-length. ",e.jsx("code",{children:"slice()"})," copies bytes; ",e.jsx("code",{children:"subarray()"})," is zero-copy."]}),e.jsxs("li",{children:["PostMessage/Workers can ",e.jsx("b",{children:"transfer"})," buffers for zero-copy handoff (structured clone)."]}),e.jsx("li",{children:"Prefer one large buffer with multiple views over many small allocations in hot paths."}),e.jsx("li",{children:"Typed arrays are dense; no holes; values are clamped/truncated to the element type."})]}),e.jsx("h2",{children:"Types (quick table)"}),e.jsx(r.Pre,{children:`Int8Array / Uint8Array / Uint8ClampedArray
Int16Array / Uint16Array
Int32Array / Uint32Array
BigInt64Array / BigUint64Array
Float32Array / Float64Array`}),e.jsx("h2",{children:"Node note"}),e.jsxs("p",{children:["In Node.js, ",e.jsx("code",{children:"Buffer"})," is a subclass of ",e.jsx("code",{children:"Uint8Array"})," with extra APIs (I/O, encoding helpers)."]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"ArrayBuffer"})," = bytes; ",e.jsx("code",{children:"TypedArray"})," = typed numeric view; ",e.jsx("code",{children:"DataView"})," = mixed/endianness-aware."]}),e.jsxs("li",{children:[e.jsx("code",{children:"subarray()"})," is a view; ",e.jsx("code",{children:"slice()"})," copies; ",e.jsx("code",{children:"set()"})," blits efficiently."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:"TextEncoder/TextDecoder"})," for UTF-8 strings; ",e.jsx("code",{children:"fetch().arrayBuffer()"})," for binary downloads."]}),e.jsxs("li",{children:["For file/network formats, control endianness via ",e.jsx("code",{children:"DataView"}),"."]}),e.jsxs("li",{children:["Typed arrays are fixed-size, dense, and numeric; default ",e.jsx("code",{children:"sort"})," is numeric ascending."]})]})]})]})}export{d as default};
