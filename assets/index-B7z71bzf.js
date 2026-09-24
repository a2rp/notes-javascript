const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ArraysBasics-vxMLw7fw.js","assets/index-DhSfFbXE.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-DQYxiy7w.js","assets/ArrayMapFilterReduce-DuPi5rZ3.js","assets/Sorting-Bto5vczs.js","assets/StringsUnicode-T4M3OIAL.js","assets/NumbersBasics-VJzfnix3.js","assets/BigIntBasics-BqP8Ms4W.js","assets/MathEssentials-qkZZtnGl.js","assets/DatesIntl-BKFdJ49J.js","assets/RegExp-BTTd0Ro2.js","assets/Json-BkjS2cj4.js","assets/MapSet-CUkiV2Br.js","assets/WeakMapWeakSet-G2tZoLT-.js","assets/TypedArrays-DUyqN9Ly.js"])))=>i.map(i=>d[i]);
import{d as i,u,r as l,j as t,_ as e,N as n}from"./index-DhSfFbXE.js";import{B as p}from"./Breadcrumbs-DQYxiy7w.js";const s={Wrapper:i.div`
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
    `},_=[{slug:"arrays-basics",title:"Arrays: basics"},{slug:"array-map-filter-reduce",title:"Array: map / filter / reduce"},{slug:"sorting",title:"Sorting correctly"},{slug:"strings-unicode",title:"Strings & Unicode"},{slug:"numbers-basics",title:"Numbers basics"},{slug:"bigint",title:"BigInt"},{slug:"math-essentials",title:"Math essentials"},{slug:"dates-intl",title:"Dates & Intl overview"},{slug:"regexp",title:"RegExp"},{slug:"json",title:"JSON"},{slug:"map-set",title:"Map/Set vs Object/Array"},{slug:"weakmap-weakset",title:"WeakMap/WeakSet"},{slug:"typed-arrays",title:"Typed arrays & buffers"}],d=[{slug:"arrays-basics",title:"Arrays: basics",loader:()=>e(()=>import("./ArraysBasics-vxMLw7fw.js"),__vite__mapDeps([0,1,2,3]))},{slug:"array-map-filter-reduce",title:"Array: map / filter / reduce",loader:()=>e(()=>import("./ArrayMapFilterReduce-DuPi5rZ3.js"),__vite__mapDeps([4,1,2,3]))},{slug:"sorting",title:"Sorting correctly",loader:()=>e(()=>import("./Sorting-Bto5vczs.js"),__vite__mapDeps([5,1,2,3]))},{slug:"strings-unicode",title:"Strings & Unicode",loader:()=>e(()=>import("./StringsUnicode-T4M3OIAL.js"),__vite__mapDeps([6,1,2,3]))},{slug:"numbers-basics",title:"Numbers basics",loader:()=>e(()=>import("./NumbersBasics-VJzfnix3.js"),__vite__mapDeps([7,1,2,3]))},{slug:"bigint",title:"BigInt",loader:()=>e(()=>import("./BigIntBasics-BqP8Ms4W.js"),__vite__mapDeps([8,1,2,3]))},{slug:"math-essentials",title:"Math essentials",loader:()=>e(()=>import("./MathEssentials-qkZZtnGl.js"),__vite__mapDeps([9,1,2,3]))},{slug:"dates-intl",title:"Dates & Intl overview",loader:()=>e(()=>import("./DatesIntl-BKFdJ49J.js"),__vite__mapDeps([10,1,2,3]))},{slug:"regexp",title:"RegExp",loader:()=>e(()=>import("./RegExp-BTTd0Ro2.js"),__vite__mapDeps([11,1,2,3]))},{slug:"json",title:"JSON",loader:()=>e(()=>import("./Json-BkjS2cj4.js"),__vite__mapDeps([12,1,2,3]))},{slug:"map-set",title:"Map/Set vs Object/Array",loader:()=>e(()=>import("./MapSet-CUkiV2Br.js"),__vite__mapDeps([13,1,2,3]))},{slug:"weakmap-weakset",title:"WeakMap/WeakSet",loader:()=>e(()=>import("./WeakMapWeakSet-G2tZoLT-.js"),__vite__mapDeps([14,1,2,3]))},{slug:"typed-arrays",title:"Typed arrays & buffers",loader:()=>e(()=>import("./TypedArrays-DUyqN9Ly.js"),__vite__mapDeps([15,1,2,3]))}],c=Object.fromEntries(d.map(r=>[r.slug,r.loader]));function g(){return t.jsxs(s.Wrapper,{children:[t.jsx(p,{sectionLabel:"Data Structures & Built-ins",sectionPath:"/builtins",topics:_}),t.jsx(s.Heading,{children:"Data Structures & Built-ins"}),t.jsx(s.List,{children:d.map(({slug:r,title:a})=>t.jsx("li",{children:t.jsx(n,{to:`/builtins/${r}`,children:a})},r))})]})}function m(){return t.jsxs(s.Wrapper,{children:[t.jsx("h3",{children:"Topic not found"}),t.jsxs("p",{children:["Go back to ",t.jsx(n,{to:"/builtins",children:"Data Structures & Built-ins"}),"."]})]})}function x(){const{topic_name:r}=u(),a=l.useMemo(()=>{if(!r)return g;const o=c[r];return o?l.lazy(o):m},[r]);return t.jsx(l.Suspense,{fallback:t.jsx("div",{style:{padding:24},children:"Loading…"}),children:t.jsx(a,{})})}const v=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));export{_ as B,s as S,v as i};
