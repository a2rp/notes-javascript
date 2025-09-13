const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/PerformanceBasics-BPEbZEfo.js","assets/index-4OJNB7vi.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-BWCvk1iJ.js","assets/MemoryGcBasics-Dcx2bXbJ.js","assets/ProxyReflect-BcPQnQ41.js","assets/EvalFunction-dBYzK2Hz.js","assets/OperatorMisc-Bwnd7wCW.js"])))=>i.map(i=>d[i]);
import{d as t,u as l,r as n,j as e,_ as o,N as d}from"./index-4OJNB7vi.js";import{B as p}from"./Breadcrumbs-BWCvk1iJ.js";const a={Wrapper:t.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:t.h1`
        margin-bottom: 30px;
    `,List:t.ul`
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
    `,Prose:t.div`
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
    `,Pre:t.pre`
        background: #121212;
        padding: 14px 16px;
        border-radius: 10px;
        overflow: auto;
        font-size: 0.92rem;
        line-height: 1.5;
    `},u=[{slug:"performance-basics",title:"Performance basics"},{slug:"memory-gc",title:"Memory & GC basics"},{slug:"proxy-reflect",title:"Proxy & Reflect"},{slug:"eval-function",title:"Eval & Function constructor"},{slug:"operator-misc",title:"Operators often missed"}],c=[{slug:"performance-basics",title:"Performance basics",loader:()=>o(()=>import("./PerformanceBasics-BPEbZEfo.js"),__vite__mapDeps([0,1,2,3]))},{slug:"memory-gc",title:"Memory & GC basics",loader:()=>o(()=>import("./MemoryGcBasics-Dcx2bXbJ.js"),__vite__mapDeps([4,1,2,3]))},{slug:"proxy-reflect",title:"Proxy & Reflect",loader:()=>o(()=>import("./ProxyReflect-BcPQnQ41.js"),__vite__mapDeps([5,1,2,3]))},{slug:"eval-function",title:"Eval & Function constructor",loader:()=>o(()=>import("./EvalFunction-dBYzK2Hz.js"),__vite__mapDeps([6,1,2,3]))},{slug:"operator-misc",title:"Operators often missed",loader:()=>o(()=>import("./OperatorMisc-Bwnd7wCW.js"),__vite__mapDeps([7,1,2,3]))}],x=Object.fromEntries(c.map(r=>[r.slug,r.loader]));function m(){return e.jsxs(a.Wrapper,{children:[e.jsx(p,{sectionLabel:"Meta & Advanced",sectionPath:"/meta-advanced",topics:u}),e.jsx(a.Heading,{children:"Meta & Advanced"}),e.jsx(a.List,{children:c.map(({slug:r,title:i})=>e.jsx("li",{children:e.jsx(d,{to:`/meta-advanced/${r}`,children:i})},r))})]})}function _(){return e.jsxs(a.Wrapper,{children:[e.jsx("h3",{children:"Topic not found"}),e.jsxs("p",{children:["Go back to ",e.jsx(d,{to:"/meta-advanced",children:"Meta & Advanced"}),"."]})]})}function g(){const{topic_name:r}=l(),i=n.useMemo(()=>{if(!r)return m;const s=x[r];return s?n.lazy(s):_},[r]);return e.jsx(n.Suspense,{fallback:e.jsx("div",{style:{padding:24},children:"Loading…"}),children:e.jsx(i,{})})}const h=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));export{u as M,a as S,h as i};
