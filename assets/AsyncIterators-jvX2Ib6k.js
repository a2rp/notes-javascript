import{j as e}from"./index-COrpvOC4.js";import{S as r,A as s}from"./index-Bl6SJSVb.js";import{B as n}from"./Breadcrumbs-DQDVi04u.js";function i(){return e.jsxs(r.Wrapper,{children:[e.jsx(n,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:s}),e.jsx(r.Heading,{children:"Async iterators"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," Async iterables implement ",e.jsx("code",{children:"Symbol.asyncIterator"})," and are consumed with ",e.jsx("b",{children:e.jsx("code",{children:"for await … of"})}),". Each step can arrive later (promises), making them perfect for streams, paginated APIs, and event sources."]}),e.jsx("h2",{children:"Protocol & consumption"}),e.jsx(r.Pre,{children:`// any object with [Symbol.asyncIterator]() → { next(): Promise<{value, done}> }
for await (const item of asyncIterable) {
  // runs as chunks/values arrive
}`}),e.jsx("h2",{children:"Async generator (easiest way to create)"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"async function*"})," yields values over time; ",e.jsx("code",{children:"yield"})," can await."]})}),e.jsx(r.Pre,{children:`// count with delays
async function* counter(max, ms = 300){
  for (let i = 1; i <= max; i++){
    await new Promise(r => setTimeout(r, ms));
    yield i;
  }
}

for await (const n of counter(3, 100)) {
  console.log(n); // 1, 2, 3 (over time)
}`}),e.jsx("h2",{children:"Transforming async iterables"}),e.jsx(r.Pre,{children:`// map
async function* mapAsync(iter, fn){
  for await (const x of iter) yield await fn(x);
}

// filter
async function* filterAsync(iter, pred){
  for await (const x of iter) if (await pred(x)) yield x;
}

// usage
const src = counter(5, 50);
for await (const v of filterAsync(mapAsync(src, x => x*2), x => x % 4 === 0)){
  console.log(v); // 4, 8
}`}),e.jsx("h2",{children:"From events → async iterable"}),e.jsx("p",{children:"Adapt callback/event APIs to async iteration (with abort support)."}),e.jsx(r.Pre,{children:`function fromEvents(target, { add, remove, signal }){
  return (async function* () {
    const q = [];
    let resolve;
    const onEvent = (ev) => (resolve ? (resolve(ev), resolve=null) : q.push(ev));
    add.call(target, onEvent);
    try {
      while (!signal?.aborted){
        if (q.length) yield q.shift();
        else await new Promise(r => (resolve = r));
      }
    } finally {
      remove.call(target, onEvent);
    }
  })();
}

// usage (DOM)
const ac = new AbortController();
const clicks = fromEvents(
  document, { add: document.addEventListener, remove: document.removeEventListener, signal: ac.signal }
);
(async () => {
  for await (const ev of clicks) console.log(ev.clientX, ev.clientY);
})(); 
// later: ac.abort();`}),e.jsx("h2",{children:"Node streams (built-in async iterable)"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"Readable"})," streams in Node are async-iterable out of the box."]})}),e.jsx(r.Pre,{children:`import { createReadStream } from "node:fs";
const stream = createReadStream("log.txt", "utf8");
for await (const chunk of stream) {
  // process chunk
}`}),e.jsx("h2",{children:"Web streams (browser) quick pattern"}),e.jsx("p",{children:"ReadableStream via reader loop → async generator wrapper."}),e.jsx(r.Pre,{children:`async function* streamText(readable, decoder = new TextDecoder()){
  const reader = readable.getReader();
  try {
    while (true){
      const { value, done } = await reader.read();
      if (done) break;
      yield decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
}

// usage
const res = await fetch("/large.txt");
for await (const textChunk of streamText(res.body)) {
  console.log(textChunk.length);
}`}),e.jsx("h2",{children:"Collect helpers"}),e.jsx(r.Pre,{children:`async function toArray(iter){
  const out = [];
  for await (const x of iter) out.push(x);
  return out;
}`}),e.jsx("h2",{children:"Concurrency note"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"for await…of"})," consumes ",e.jsx("b",{children:"sequentially"})," by design."]}),e.jsxs("li",{children:["To process in parallel, collect N chunks, then ",e.jsx("code",{children:"await Promise.all"})," on mapped work."]})]}),e.jsx(r.Pre,{children:`// batch parallelism
async function* batches(iter, size=5){
  let buf = [];
  for await (const x of iter){
    buf.push(x);
    if (buf.length === size){ yield buf; buf = []; }
  }
  if (buf.length) yield buf;
}

for await (const group of batches(counter(20), 4)) {
  await Promise.all(group.map(doWork)); // process 4 at a time
}`}),e.jsx("h2",{children:"Cancellation & cleanup"}),e.jsx("ul",{children:e.jsxs("li",{children:["Design sources to respect ",e.jsx("code",{children:"AbortSignal"})," or provide a custom ",e.jsx("code",{children:"return()"})," in your generator."]})}),e.jsx(r.Pre,{children:`async function* source(signal){
  try { /* yield values while !signal.aborted */ }
  finally { /* cleanup resources */ }
}`}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"async generators"})," to build streams; consume with ",e.jsx("b",{children:"for await…of"}),"."]}),e.jsx("li",{children:"Wrap events/streams into async iterables to unify consumption."}),e.jsxs("li",{children:["Sequential by default; for parallel work, buffer and ",e.jsx("code",{children:"Promise.all"}),"."]}),e.jsxs("li",{children:["Support ",e.jsx("b",{children:"abort/cleanup"})," (AbortController or generator ",e.jsx("code",{children:"finally"}),")."]}),e.jsx("li",{children:"Node Readable streams are async-iterable; Web streams need a reader loop."})]})]})]})}export{i as default};
