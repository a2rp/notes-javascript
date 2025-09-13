const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EventLoop-CilUAGqA.js","assets/index-COrpvOC4.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-DQDVi04u.js","assets/PromisesBasics-DH-NLSbU.js","assets/PromiseUtilities-XWUNM2Rd.js","assets/AsyncAwaitPatterns-CE2m-FaE.js","assets/AsyncIterators-jvX2Ib6k.js","assets/Timers-D7XB4BSw.js","assets/AbortController-CkvZU9z8.js"])))=>i.map(i=>d[i]);
import{d as i,u as p,r as a,j as e,_ as r,N as n}from"./index-COrpvOC4.js";import{B as c}from"./Breadcrumbs-DQDVi04u.js";const o={Wrapper:i.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:i.h1`
        margin-bottom: 30px;
    `,List:i.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        li {
            width: 320px;
        }

        a {
            display: inline-flex;
            color: #aaa;
            text-decoration: none;
        }
        a:hover {
            color: orangered;
            text-decoration: underline;
        }
    `,Prose:i.div`
        max-width: 900px;
        line-height: 1.75;
        color: #bbb;

        h2 {
            margin-top: 28px;
        }
        ul {
            padding-left: 18px;
        }
        li {
            margin: 4px 0;
        }
        code {
            background: #1c1c1c;
            padding: 1px 4px;
            border-radius: 4px;
        }
    `,Pre:i.pre`
        background: #121212;
        padding: 14px 16px;
        border-radius: 10px;
        overflow: auto;
        font-size: 0.92rem;
        line-height: 1.5;
    `},u=[{slug:"event-loop",title:"Event loop"},{slug:"promises",title:"Promises: basics"},{slug:"promise-utilities",title:"Promise utilities"},{slug:"async-await",title:"async/await patterns"},{slug:"async-iterators",title:"Async iterators"},{slug:"timers",title:"Timers"},{slug:"abortcontroller",title:"AbortController"}],d=[{slug:"event-loop",title:"Event loop",loader:()=>r(()=>import("./EventLoop-CilUAGqA.js"),__vite__mapDeps([0,1,2,3]))},{slug:"promises",title:"Promises: basics",loader:()=>r(()=>import("./PromisesBasics-DH-NLSbU.js"),__vite__mapDeps([4,1,2,3]))},{slug:"promise-utilities",title:"Promise utilities",loader:()=>r(()=>import("./PromiseUtilities-XWUNM2Rd.js"),__vite__mapDeps([5,1,2,3]))},{slug:"async-await",title:"async/await patterns",loader:()=>r(()=>import("./AsyncAwaitPatterns-CE2m-FaE.js"),__vite__mapDeps([6,1,2,3]))},{slug:"async-iterators",title:"Async iterators",loader:()=>r(()=>import("./AsyncIterators-jvX2Ib6k.js"),__vite__mapDeps([7,1,2,3]))},{slug:"timers",title:"Timers",loader:()=>r(()=>import("./Timers-D7XB4BSw.js"),__vite__mapDeps([8,1,2,3]))},{slug:"abortcontroller",title:"AbortController",loader:()=>r(()=>import("./AbortController-CkvZU9z8.js"),__vite__mapDeps([9,1,2,3]))}],_=Object.fromEntries(d.map(t=>[t.slug,t.loader]));function m(){return e.jsxs(o.Wrapper,{children:[e.jsx(c,{sectionLabel:"Asynchrony Model",sectionPath:"/async",topics:u}),e.jsx(o.Heading,{children:"Asynchrony Model"}),e.jsx(o.List,{children:d.map(({slug:t,title:s})=>e.jsx("li",{children:e.jsx(n,{to:`/async/${t}`,children:s})},t))})]})}function x(){return e.jsxs(o.Wrapper,{children:[e.jsx("h3",{children:"Topic not found"}),e.jsxs("p",{children:["Go back to ",e.jsx(n,{to:"/async",children:"Asynchrony Model"}),"."]})]})}function g(){const{topic_name:t}=p(),s=a.useMemo(()=>{if(!t)return m;const l=_[t];return l?a.lazy(l):x},[t]);return e.jsx(a.Suspense,{fallback:e.jsx("div",{style:{padding:24},children:"Loading…"}),children:e.jsx(s,{})})}const b=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));export{u as A,o as S,b as i};
