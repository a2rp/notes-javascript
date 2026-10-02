import{u as p,j as e,N as i,d as m}from"./index-VTWgicr1.js";function h({homePath:l="/home",sectionLabel:o,sectionPath:t,topics:s=[],slugParam:c="topic_name"}){var a;const r=p(),n=r==null?void 0:r[c],d=((a=s.find(x=>x.slug===n))==null?void 0:a.title)||(n?decodeURIComponent(n).replace(/-/g," "):"");return e.jsx(u,{"aria-label":"breadcrumb",children:e.jsxs("ol",{children:[e.jsx("li",{children:e.jsx(i,{to:l,children:"Home"})}),e.jsx("li",{children:e.jsx(i,{to:t,children:o})}),n&&e.jsx("li",{"aria-current":"page",children:e.jsx("span",{children:d})})]})})}const u=m.nav`
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
  a:hover { color: #b3b3b3; text-decoration: underline; }
  [aria-current="page"] span { color: #ddd; }
`;export{h as B};
