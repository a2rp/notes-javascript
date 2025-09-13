const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ErrorTypes-lKVuDiAZ.js","assets/index-D5VEPJXy.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-_bfjIlB_.js","assets/TryCatchFinally-DwJb5yRN.js","assets/CustomErrors-BG2Ys3Ot.js","assets/GuardsAssertions-BdxKFYoZ.js"])))=>i.map(i=>d[i]);
import{d as s,u as p,r as a,j as r,C as c,_ as t,N as l}from"./index-D5VEPJXy.js";import{B as u}from"./Breadcrumbs-_bfjIlB_.js";const o={Wrapper:s.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:s.h1`
        margin-bottom: 30px;
    `,List:s.ul`
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
    `,Prose:s.div`
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
    `,Pre:s.pre`
        background: #121212;
        padding: 14px 16px;
        border-radius: 10px;
        overflow: auto;
        font-size: 0.92rem;
        line-height: 1.5;
    `},x=[{slug:"error-types",title:"Error types"},{slug:"try-catch-finally",title:"try/catch/finally"},{slug:"custom-errors",title:"Custom errors"},{slug:"guards-assertions",title:"Guards & assertions"}],d=[{slug:"error-types",title:"Error types",loader:()=>t(()=>import("./ErrorTypes-lKVuDiAZ.js"),__vite__mapDeps([0,1,2,3]))},{slug:"try-catch-finally",title:"try/catch/finally",loader:()=>t(()=>import("./TryCatchFinally-DwJb5yRN.js"),__vite__mapDeps([4,1,2,3]))},{slug:"custom-errors",title:"Custom errors",loader:()=>t(()=>import("./CustomErrors-BG2Ys3Ot.js"),__vite__mapDeps([5,1,2,3]))},{slug:"guards-assertions",title:"Guards & assertions",loader:()=>t(()=>import("./GuardsAssertions-BdxKFYoZ.js"),__vite__mapDeps([6,1,2,3]))}],g=Object.fromEntries(d.map(e=>[e.slug,e.loader]));function m(){return r.jsxs(o.Wrapper,{children:[r.jsx(u,{sectionLabel:"Errors & Robustness",sectionPath:"/errors-robustness",topics:x}),r.jsx(o.Heading,{children:"Errors & Robustness"}),r.jsx(o.List,{children:d.map(({slug:e,title:i})=>r.jsx("li",{children:r.jsx(l,{to:`/errors-robustness/${e}`,children:i})},e))})]})}function _(){return r.jsxs(o.Wrapper,{children:[r.jsx("h3",{children:"Topic not found"}),r.jsxs("p",{children:["Go back to ",r.jsx(l,{to:"/errors-robustness",children:"Errors & Robustness"}),"."]})]})}function h(){const{topic_name:e}=p(),i=a.useMemo(()=>{if(!e)return m;const n=g[e];return n?a.lazy(n):_},[e]);return r.jsx(a.Suspense,{fallback:r.jsx("div",{style:{padding:24},children:r.jsx(c,{})}),children:r.jsx(i,{})})}const j=Object.freeze(Object.defineProperty({__proto__:null,default:h},Symbol.toStringTag,{value:"Module"}));export{x as E,o as S,j as i};
