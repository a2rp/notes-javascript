import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

export default function AsyncIterators() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />

            <Styled.Heading>Async iterators</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Async iterables implement <code>Symbol.asyncIterator</code> and are
                    consumed with <b><code>for&nbsp;await&nbsp;…&nbsp;of</code></b>. Each step can arrive later
                    (promises), making them perfect for streams, paginated APIs, and event sources.
                </p>

                <h2>Protocol & consumption</h2>
                <Styled.Pre>{`// any object with [Symbol.asyncIterator]() → { next(): Promise<{value, done}> }
for await (const item of asyncIterable) {
  // runs as chunks/values arrive
}`}</Styled.Pre>

                <h2>Async generator (easiest way to create)</h2>
                <ul>
                    <li><code>async function*</code> yields values over time; <code>yield</code> can await.</li>
                </ul>
                <Styled.Pre>{`// count with delays
async function* counter(max, ms = 300){
  for (let i = 1; i <= max; i++){
    await new Promise(r => setTimeout(r, ms));
    yield i;
  }
}

for await (const n of counter(3, 100)) {
  console.log(n); // 1, 2, 3 (over time)
}`}</Styled.Pre>

                <h2>Transforming async iterables</h2>
                <Styled.Pre>{`// map
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
}`}</Styled.Pre>

                <h2>From events → async iterable</h2>
                <p>Adapt callback/event APIs to async iteration (with abort support).</p>
                <Styled.Pre>{`function fromEvents(target, { add, remove, signal }){
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
// later: ac.abort();`}</Styled.Pre>

                <h2>Node streams (built-in async iterable)</h2>
                <ul>
                    <li><code>Readable</code> streams in Node are async-iterable out of the box.</li>
                </ul>
                <Styled.Pre>{`import { createReadStream } from "node:fs";
const stream = createReadStream("log.txt", "utf8");
for await (const chunk of stream) {
  // process chunk
}`}</Styled.Pre>

                <h2>Web streams (browser) quick pattern</h2>
                <p>ReadableStream via reader loop → async generator wrapper.</p>
                <Styled.Pre>{`async function* streamText(readable, decoder = new TextDecoder()){
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
}`}</Styled.Pre>

                <h2>Collect helpers</h2>
                <Styled.Pre>{`async function toArray(iter){
  const out = [];
  for await (const x of iter) out.push(x);
  return out;
}`}</Styled.Pre>

                <h2>Concurrency note</h2>
                <ul>
                    <li><code>for await…of</code> consumes <b>sequentially</b> by design.</li>
                    <li>To process in parallel, collect N chunks, then <code>await Promise.all</code> on mapped work.</li>
                </ul>
                <Styled.Pre>{`// batch parallelism
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
}`}</Styled.Pre>

                <h2>Cancellation & cleanup</h2>
                <ul>
                    <li>Design sources to respect <code>AbortSignal</code> or provide a custom <code>return()</code> in your generator.</li>
                </ul>
                <Styled.Pre>{`async function* source(signal){
  try { /* yield values while !signal.aborted */ }
  finally { /* cleanup resources */ }
}`}</Styled.Pre>

                <h2>Must-know (checklist)</h2>
                <ul>
                    <li>Use <b>async generators</b> to build streams; consume with <b>for&nbsp;await…of</b>.</li>
                    <li>Wrap events/streams into async iterables to unify consumption.</li>
                    <li>Sequential by default; for parallel work, buffer and <code>Promise.all</code>.</li>
                    <li>Support <b>abort/cleanup</b> (AbortController or generator <code>finally</code>).</li>
                    <li>Node Readable streams are async-iterable; Web streams need a reader loop.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
