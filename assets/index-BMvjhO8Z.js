const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ObjectLiterals-67g2g-5I.js","assets/index-COrpvOC4.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-DQDVi04u.js","assets/PropertyDescriptors-vjZeVr26.js","assets/ObjectUtilities-HcuGF6K6.js","assets/PrototypeChain-CyDrTdns.js","assets/InheritancePatterns-DVWaKq5v.js","assets/Classes-CDo7KoKZ.js","assets/ClassFields-BuqvWEZh.js","assets/Encapsulation-DZ7tBY8R.js","assets/Symbols-Dts3ziPN.js"])))=>i.map(i=>d[i]);
import{d as i,u as d,r as l,j as e,_ as o,N as n}from"./index-COrpvOC4.js";import{B as c}from"./Breadcrumbs-DQDVi04u.js";const s={Wrapper:i.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:i.h1`
        margin-bottom: 24px;
    `,List:i.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 0;
        margin: 0;

        li {
            width: 200px;
        }

        li a {
            color: #aaa;
            text-decoration: none;
        }
        li a:hover {
            color: orangered;
            text-decoration: underline;
        }
    `,Prose:i.div`
        max-width: 860px;
        color: #cfcfcf;
        line-height: 1.6;

        h2 {
            margin: 28px 0 12px;
        }
        h3 {
            margin: 22px 0 10px;
        }
        ul {
            padding-left: 18px;
        }
        code {
            background: #111;
            padding: 1px 5px;
            border-radius: 4px;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-size: 0.95em;
        }
    `,Pre:i.pre`
        background: #0f0f0f;
        border: 1px solid #222;
        border-radius: 8px;
        padding: 14px 16px;
        overflow: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.95em;
        line-height: 1.55;
        margin: 10px 0 18px;
    `},u=[{slug:"object-literals",title:"Object literals"},{slug:"property-descriptors",title:"Property descriptors"},{slug:"object-utilities",title:"Object utilities"},{slug:"prototype-chain",title:"Prototype chain"},{slug:"inheritance",title:"Inheritance patterns"},{slug:"classes",title:"Classes"},{slug:"class-fields",title:"Class fields"},{slug:"encapsulation",title:"Encapsulation"},{slug:"symbols",title:"Symbols"}],p=[{slug:"object-literals",title:"Object literals",loader:()=>o(()=>import("./ObjectLiterals-67g2g-5I.js"),__vite__mapDeps([0,1,2,3]))},{slug:"property-descriptors",title:"Property descriptors",loader:()=>o(()=>import("./PropertyDescriptors-vjZeVr26.js"),__vite__mapDeps([4,1,2,3]))},{slug:"object-utilities",title:"Object utilities",loader:()=>o(()=>import("./ObjectUtilities-HcuGF6K6.js"),__vite__mapDeps([5,1,2,3]))},{slug:"prototype-chain",title:"Prototype chain",loader:()=>o(()=>import("./PrototypeChain-CyDrTdns.js"),__vite__mapDeps([6,1,2,3]))},{slug:"inheritance",title:"Inheritance patterns",loader:()=>o(()=>import("./InheritancePatterns-DVWaKq5v.js"),__vite__mapDeps([7,1,2,3]))},{slug:"classes",title:"Classes",loader:()=>o(()=>import("./Classes-CDo7KoKZ.js"),__vite__mapDeps([8,1,2,3]))},{slug:"class-fields",title:"Class fields",loader:()=>o(()=>import("./ClassFields-BuqvWEZh.js"),__vite__mapDeps([9,1,2,3]))},{slug:"encapsulation",title:"Encapsulation",loader:()=>o(()=>import("./Encapsulation-DZ7tBY8R.js"),__vite__mapDeps([10,1,2,3]))},{slug:"symbols",title:"Symbols",loader:()=>o(()=>import("./Symbols-Dts3ziPN.js"),__vite__mapDeps([11,1,2,3]))}],_=Object.fromEntries(p.map(t=>[t.slug,t.loader]));function x(){return e.jsxs(s.Wrapper,{children:[e.jsx(c,{sectionLabel:"Objects & Prototypes",sectionPath:"/objects-prototypes",topics:u}),e.jsx(s.Heading,{children:"Objects & Prototypes"}),e.jsx(s.List,{children:p.map(({slug:t,title:r})=>e.jsx("li",{children:e.jsx(n,{to:`/objects-prototypes/${t}`,children:r})},t))})]})}function g(){return e.jsxs(s.Wrapper,{children:[e.jsx("h3",{children:"Topic not found"}),e.jsxs("p",{children:["Go back to ",e.jsx(n,{to:"/objects-prototypes",children:"Objects & Prototypes"}),"."]})]})}const m=()=>{const{topic_name:t}=d(),r=l.useMemo(()=>{if(!t)return x;const a=_[t];return a?l.lazy(a):g},[t]);return e.jsx(l.Suspense,{fallback:e.jsx("div",{style:{padding:24},children:"Loading…"}),children:e.jsx(r,{})})},h=Object.freeze(Object.defineProperty({__proto__:null,default:m},Symbol.toStringTag,{value:"Module"}));export{u as O,s as S,h as i};
