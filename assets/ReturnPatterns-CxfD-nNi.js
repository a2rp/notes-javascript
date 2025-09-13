import{j as e}from"./index-D5VEPJXy.js";import{S as r,F as n}from"./index-DihtLOMk.js";import{B as s}from"./Breadcrumbs-_bfjIlB_.js";function c(){return e.jsxs(r.Wrapper,{children:[e.jsx(s,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:n}),e.jsx(r.Heading,{children:"Return patterns"}),e.jsxs(r.Prose,{children:[e.jsxs("p",{children:[e.jsx("b",{children:"Definition."})," A function either returns a value or finishes without one (result is"," ",e.jsx("code",{children:"undefined"}),"). Use clear, predictable return shapes; prefer early returns over deep nesting."]}),e.jsx("h2",{children:"Basics"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["If execution hits a ",e.jsx("code",{children:"return expr"}),", that value is produced."]}),e.jsxs("li",{children:["No ",e.jsx("code",{children:"return"})," → result is ",e.jsx("code",{children:"undefined"}),"."]}),e.jsxs("li",{children:["Arrows: expression body has ",e.jsx("b",{children:"implicit return"}),"; block body needs explicit ",e.jsx("code",{children:"return"}),"."]})]}),e.jsx(r.Pre,{children:`function f(){ }         // undefined
const inc = x => x + 1;      // implicit return
const obj = (a,b) => ({ a, b }); // return object needs ( )`}),e.jsx("h2",{children:"Early-return (guard clauses)"}),e.jsx("ul",{children:e.jsx("li",{children:"Fail-fast at the top; keeps the “happy path” unindented and readable."})}),e.jsx(r.Pre,{children:`function save(user){
  if (!user) return { ok:false, error:"no user" };
  if (!user.id) return { ok:false, error:"missing id" };
  // happy path
  return { ok:true };
}`}),e.jsx("h2",{children:"Returning objects vs arrays"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Objects"})," for named fields (order-free, self-documenting)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Arrays"})," for small, fixed tuples where position is obvious."]})]}),e.jsx(r.Pre,{children:`function stats(nums){
  const sum = nums.reduce((a,b)=>a+b,0);
  const avg = sum / nums.length || 0;
  return { sum, avg };             // named fields
}
// tuple style:
const pair = () => [200, "OK"];    // [status, message]`}),e.jsx("h2",{children:"Error vs value"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Throw"})," for exceptional situations; let caller handle with try/catch."]}),e.jsxs("li",{children:["For expected failures, return a ",e.jsx("b",{children:"Result"}),"-like shape (",e.jsx("code",{children:"{ ok:boolean, value|error }"}),")."]}),e.jsx("li",{children:"Don't mix patterns within the same API."})]}),e.jsx(r.Pre,{children:`// 1) Throwing API
function parseJson(s){
  if (typeof s !== "string") throw new TypeError("string required");
  return JSON.parse(s);
}
try { parseJson("x"); } catch (e) { /* handle */ }

// 2) Result API
function safeParse(s){
  try { return { ok:true, value: JSON.parse(s) }; }
  catch (e) { return { ok:false, error:e }; }
}`}),e.jsx("h2",{children:"Async returns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"async"})," functions always return a ",e.jsx("code",{children:"Promise"}),"."]}),e.jsxs("li",{children:["To catch errors inside, you must ",e.jsx("b",{children:"await"}),"; returning a promise without awaiting won't hit local ",e.jsx("code",{children:"catch"}),"."]})]}),e.jsx(r.Pre,{children:`async function load(){
  // both lines make the returned promise adopt fetch()'s state
  // but only the first lets try/catch see the rejection here
  try {
    const res = await fetch("/api"); // local try/catch can handle
    return res.ok;
  } catch (e) {
    return false;
  }
}
// vs:
async function load2(){
  try { return fetch("/api"); }       // returning promise directly
  catch { return false; }             // won't catch fetch rejection here
}`}),e.jsx("h2",{children:"Generators & return"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"return value"})," in a generator sets ",e.jsx("code",{children:"done:true"})," with a final value."]}),e.jsxs("li",{children:["Consumers using ",e.jsx("code",{children:"for…of"})," ignore that final value; it's visible via ",e.jsx("code",{children:"iter.next()"}),"."]})]}),e.jsx(r.Pre,{children:`function* g(){ yield 1; return 99; }
const it = g();
it.next();      // { value:1, done:false }
it.next();      // { value:99, done:true }  // not seen by for…of`}),e.jsx("h2",{children:"try/finally interaction"}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"finally"})," runs even after ",e.jsx("code",{children:"return"}),". If ",e.jsx("code",{children:"finally"})," itself returns/throws, it ",e.jsx("b",{children:"overrides"})," the earlier return."]})}),e.jsx(r.Pre,{children:`function demo(){
  try { return 1; }
  finally { return 2; } // overrides
}
demo(); // 2`}),e.jsx("h2",{children:"Loops & callbacks"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"return"})," exits the entire function, not just the loop."]}),e.jsxs("li",{children:[e.jsx("code",{children:"Array.prototype.forEach"})," ignores ",e.jsx("code",{children:"return"}),"/",e.jsx("code",{children:"break"}),"; use a loop or ",e.jsx("code",{children:"some"}),"/",e.jsx("code",{children:"every"}),"/",e.jsx("code",{children:"find"}),"."]})]}),e.jsx(r.Pre,{children:`function hasZero(a){
  for (const x of a) if (x === 0) return true; // early exit
  return false;
}
// forEach can't early-return outer function:
function hasZeroBad(a){
  a.forEach(x => { if (x === 0) return true; }); // returns from callback only
  return false;
}`}),e.jsx("h2",{children:"Small patterns"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Nullish default inside:"})," ",e.jsx("code",{children:"return (v ?? 0);"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Short-circuit:"})," ",e.jsx("code",{children:"if (!ok) return;"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Void"})," to signal “intentionally no value”: ",e.jsx("code",{children:"return void 0;"})," (rare; usually just ",e.jsx("code",{children:"return;"}),")."]})]}),e.jsx("h2",{children:"Must-know (checklist)"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Keep returns consistent in shape and meaning; prefer early returns."}),e.jsxs("li",{children:["When returning objects from arrows, wrap in ",e.jsx("code",{children:"( )"})," for implicit return."]}),e.jsxs("li",{children:["Pick one failure strategy: throw ",e.jsx("i",{children:"or"})," Result-type, not both."]}),e.jsxs("li",{children:["In async functions, ",e.jsx("b",{children:"await"})," if you want local try/catch to handle errors."]}),e.jsxs("li",{children:["Avoid ",e.jsx("code",{children:"forEach"})," for early exits; use loops or ",e.jsx("code",{children:"some/every/find"}),"."]})]})]})]})}export{c as default};
