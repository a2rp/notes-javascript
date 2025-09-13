const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/FunctionForms-kqxkILyD.js","assets/index-Cud8-B-g.js","assets/index-CrsJ3uMt.css","assets/Breadcrumbs-BUXMDEQY.js","assets/ArrowFunctions-vNhBELhE.js","assets/Parameters-BVSw1ACM.js","assets/ThisBindingRules-BQGiXiSk.js","assets/CallApplyBind-Bw27vFXM.js","assets/ReturnPatterns-UP68nRch.js"])))=>i.map(i=>d[i]);
import{d as r,u as p,r as s,j as t,C as u,_ as i,N as l}from"./index-Cud8-B-g.js";import{B as c}from"./Breadcrumbs-BUXMDEQY.js";const n={Wrapper:r.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,Heading:r.h1`
        margin-bottom: 24px;
    `,List:r.ul`
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
    `,Prose:r.div`
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
    `,Pre:r.pre`
        background: #0f0f0f;
        border: 1px solid #222;
        border-radius: 8px;
        padding: 14px 16px;
        overflow: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.95em;
        line-height: 1.55;
        margin: 10px 0 18px;
    `},x=[{slug:"function-forms",title:"Function forms"},{slug:"arrow-functions",title:"Arrow functions"},{slug:"parameters",title:"Parameters"},{slug:"this-binding-rules",title:"this binding rules"},{slug:"call-apply-bind",title:"call / apply / bind"},{slug:"return-patterns",title:"Return patterns"}],d=[{slug:"function-forms",title:"Function forms",loader:()=>i(()=>import("./FunctionForms-kqxkILyD.js"),__vite__mapDeps([0,1,2,3]))},{slug:"arrow-functions",title:"Arrow functions",loader:()=>i(()=>import("./ArrowFunctions-vNhBELhE.js"),__vite__mapDeps([4,1,2,3]))},{slug:"parameters",title:"Parameters",loader:()=>i(()=>import("./Parameters-BVSw1ACM.js"),__vite__mapDeps([5,1,2,3]))},{slug:"this-binding-rules",title:"this binding rules",loader:()=>i(()=>import("./ThisBindingRules-BQGiXiSk.js"),__vite__mapDeps([6,1,2,3]))},{slug:"call-apply-bind",title:"call / apply / bind",loader:()=>i(()=>import("./CallApplyBind-Bw27vFXM.js"),__vite__mapDeps([7,1,2,3]))},{slug:"return-patterns",title:"Return patterns",loader:()=>i(()=>import("./ReturnPatterns-UP68nRch.js"),__vite__mapDeps([8,1,2,3]))}],m=Object.fromEntries(d.map(e=>[e.slug,e.loader]));function g(){return t.jsxs(n.Wrapper,{children:[t.jsx(c,{sectionLabel:"Functions & this",sectionPath:"/functions-this",topics:x}),t.jsx(n.Heading,{children:"Functions & this"}),t.jsx(n.List,{children:d.map(({slug:e,title:o})=>t.jsx("li",{children:t.jsx(l,{to:`/functions-this/${e}`,children:o})},e))})]})}function f(){return t.jsxs(n.Wrapper,{children:[t.jsx("h3",{children:"Topic not found"}),t.jsxs("p",{children:["Go back to ",t.jsx(l,{to:"/functions-this",children:"Functions & this"}),"."]})]})}const _=()=>{const{topic_name:e}=p(),o=s.useMemo(()=>{if(!e)return g;const a=m[e];return a?s.lazy(a):f},[e]);return t.jsx(s.Suspense,{fallback:t.jsx("div",{style:{padding:24},children:t.jsx(u,{})}),children:t.jsx(o,{})})},j=Object.freeze(Object.defineProperty({__proto__:null,default:_},Symbol.toStringTag,{value:"Module"}));export{x as F,n as S,j as i};
