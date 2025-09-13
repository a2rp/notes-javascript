import{u as p,j as e,N as i,d as m}from"./index-4OJNB7vi.js";function h({homePath:o="/home",sectionLabel:l,sectionPath:t,topics:s=[],slugParam:c="topic_name"}){var a;const r=p(),n=r==null?void 0:r[c],d=((a=s.find(x=>x.slug===n))==null?void 0:a.title)||(n?decodeURIComponent(n).replace(/-/g," "):"");return e.jsx(g,{"aria-label":"breadcrumb",children:e.jsxs("ol",{children:[e.jsx("li",{children:e.jsx(i,{to:o,children:"Home"})}),e.jsx("li",{children:e.jsx(i,{to:t,children:l})}),n&&e.jsx("li",{"aria-current":"page",children:e.jsx("span",{children:d})})]})})}const g=m.nav`
  margin: 0 0 12px;
  font-size: .95rem;
  color: #aaa;

  ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: inline-flex;
    align-items: center;
  }
  li + li::before {
    content: "›";
    margin: 0 6px;
    color: #666;
  }
  a {
    color: #aaa;
    text-decoration: none;
  }
  a:hover { color: orangered; text-decoration: underline; }
  [aria-current="page"] span { color: #ddd; }
`;export{h as B};
