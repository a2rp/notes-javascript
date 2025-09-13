import{d as o,l as d,m as a}from"./index-Cps9Yqi0.js";const r={accent:"orangered",fg:"#ddd",muted:"#aaa",cardBg:"hsl(0 0% 100% / 0.04)",border:"1px solid hsl(0 0% 100% / 0.10)",radius:"16px",pad:"18px"},t=a`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`,e=d`
    color: ${r.accent};
    text-decoration: underline;
`,i={Wrapper:o.div`
        padding: 50px;
        color: ${r.fg};
        @media (width < 900px) {
            padding: 15px;
        }
        animation: ${t} 0.2s ease-out;
    `,Heading:o.h1`
        margin: 0 0 30px;
        font-weight: 700;
        letter-spacing: 0.4px;
    `,SubHeading:o.h2`
        margin: 28px 0 12px;
        font-size: 1.25rem;
    `,ListWrapper:o.div``,List:o.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        li {
            width: 250px;
            list-style: none;

            a {
                display: flex;
                color: ${r.muted};
                text-decoration: none;

                &:hover {
                    ${e}
                }
                &.active {
                    color: ${r.accent};
                    text-decoration: none;
                }
            }
        }
    `,Prose:o.div`
        line-height: 1.7;
        color: ${r.fg};

        p,
        ul,
        ol {
            margin: 0 0 10px;
        }
        ul,
        ol {
            padding-left: 1.25rem;
        }

        a {
            color: ${r.muted};
            text-decoration: none;
            &:hover {
                ${e}
            }
        }

        code {
            background: hsl(0 0% 100% / 0.06);
            border: ${r.border};
            padding: 2px 0.5rem;
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
            font-size: 0.95em;
            color: ${r.fg};
        }

        blockquote {
            margin: 12px 0;
            border-left: 3px solid ${r.accent};
            padding: 8px 12px;
            background: ${r.cardBg};
            border-radius: 10px;
        }

        hr {
            border: 0;
            border-top: ${r.border};
            margin: 18px 0;
        }
    `,Pre:o.pre`
        background: #0f0f0f;
        border: ${r.border};
        border-radius: ${r.radius};
        padding: 14px;
        overflow: auto;
        margin: 12px 0;
        font-size: 0.95rem;
        line-height: 1.55;
    `,Kbd:o.kbd`
        padding: 2px 6px;
        border: ${r.border};
        border-bottom-width: 2px;
        border-radius: 6px;
        background: hsl(0 0% 100% / 0.06);
        font-size: 0.9em;
    `,Card:o.div`
        background: ${r.cardBg};
        border: ${r.border};
        border-radius: ${r.radius};
        padding: ${r.pad};
    `,Callout:o.div`
        border-left: 4px solid ${r.accent};
        background: ${r.cardBg};
        border-radius: 12px;
        padding: 12px 14px;
        margin: 12px 0;
    `,Table:o.table`
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
        th,
        td {
            border: ${r.border};
            padding: 8px 10px;
            text-align: left;
        }
        th {
            background: hsl(0 0% 100% / 0.06);
        }
    `};export{i as S};
