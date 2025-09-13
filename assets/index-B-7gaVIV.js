const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EsModules-uJ4Esi2v.js","assets/index-D5VEPJXy.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-_bfjIlB_.js","assets/ReexportsNamespace-CawbNXjG.js","assets/DynamicImportTla-C9WnjZnN.js","assets/EsmVsCjs-CFkfO5tN.js"])))=>i.map(i=>d[i]);
import{d as r,u as p,r as a,j as e,_ as t,N as d}from"./index-D5VEPJXy.js";import{B as c}from"./Breadcrumbs-_bfjIlB_.js";const i={Wrapper:r.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:r.h1`
        margin-bottom: 30px;
    `,List:r.ul`
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
    `,Prose:r.div`
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
    `,Pre:r.pre`
        background: #121212;
        padding: 14px 16px;
        border-radius: 10px;
        overflow: auto;
        font-size: 0.92rem;
        line-height: 1.5;
    `},u=[{slug:"es-modules",title:"ES Modules"},{slug:"reexports-namespace",title:"Re-exports & namespace"},{slug:"dynamic-import-tla",title:"Dynamic import & TLA"},{slug:"esm-vs-cjs",title:"ESM vs CJS (interop)"}],l=[{slug:"es-modules",title:"ES Modules",loader:()=>t(()=>import("./EsModules-uJ4Esi2v.js"),__vite__mapDeps([0,1,2,3]))},{slug:"reexports-namespace",title:"Re-exports & namespace",loader:()=>t(()=>import("./ReexportsNamespace-CawbNXjG.js"),__vite__mapDeps([4,1,2,3]))},{slug:"dynamic-import-tla",title:"Dynamic import & TLA",loader:()=>t(()=>import("./DynamicImportTla-C9WnjZnN.js"),__vite__mapDeps([5,1,2,3]))},{slug:"esm-vs-cjs",title:"ESM vs CJS (interop)",loader:()=>t(()=>import("./EsmVsCjs-CFkfO5tN.js"),__vite__mapDeps([6,1,2,3]))}],m=Object.fromEntries(l.map(o=>[o.slug,o.loader]));function x(){return e.jsxs(i.Wrapper,{children:[e.jsx(c,{sectionLabel:"Modules",sectionPath:"/modules",topics:u}),e.jsx(i.Heading,{children:"Modules"}),e.jsx(i.List,{children:l.map(({slug:o,title:s})=>e.jsx("li",{children:e.jsx(d,{to:`/modules/${o}`,children:s})},o))})]})}function _(){return e.jsxs(i.Wrapper,{children:[e.jsx("h3",{children:"Topic not found"}),e.jsxs("p",{children:["Go back to ",e.jsx(d,{to:"/modules",children:"Modules"}),"."]})]})}function g(){const{topic_name:o}=p(),s=a.useMemo(()=>{if(!o)return x;const n=m[o];return n?a.lazy(n):_},[o]);return e.jsx(a.Suspense,{fallback:e.jsx("div",{style:{padding:24},children:"Loading…"}),children:e.jsx(s,{})})}const f=Object.freeze(Object.defineProperty({__proto__:null,default:g},Symbol.toStringTag,{value:"Module"}));export{u as M,i as S,f as i};
