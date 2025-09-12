import styled, { css, keyframes } from "styled-components";

/* ---------- Design tokens (dark) ---------- */
const tokens = {
    accent: "orangered",
    fg: "#ddd",
    muted: "#aaa",
    cardBg: "hsl(0 0% 100% / 0.04)",
    border: "1px solid hsl(0 0% 100% / 0.10)",
    radius: "16px",
    pad: "18px",
};

/* subtle enter */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* link hover */
const linkHover = css`
    color: ${tokens.accent};
    text-decoration: underline;
`;

/* ---------- Shared components ---------- */
export const Styled = {
    /* Page wrapper for every topic/overview page */
    Wrapper: styled.div`
        padding: 50px;
        color: ${tokens.fg};
        @media (width < 900px) {
            padding: 15px;
        }
        animation: ${fadeIn} 0.2s ease-out;
    `,

    Heading: styled.h1`
        margin: 0 0 30px;
        font-weight: 700;
        letter-spacing: 0.4px;
    `,

    SubHeading: styled.h2`
        margin: 28px 0 12px;
        font-size: 1.25rem;
    `,

    /* Grid list used on section overview pages */
    ListWrapper: styled.div``,
    List: styled.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 15px;

        li {
            width: 250px;
            list-style: none;

            a {
                display: flex;
                color: ${tokens.muted};
                text-decoration: none;

                &:hover {
                    ${linkHover}
                }
                &.active {
                    color: ${tokens.accent};
                    text-decoration: none;
                }
            }
        }
    `,

    /* Rich text wrapper for note pages (keeps prose consistent) */
    Prose: styled.div`
        line-height: 1.7;
        color: ${tokens.fg};

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
            color: ${tokens.muted};
            text-decoration: none;
            &:hover {
                ${linkHover}
            }
        }

        code {
            background: hsl(0 0% 100% / 0.06);
            border: ${tokens.border};
            padding: 2px 0.5rem;
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
                "Liberation Mono", "Courier New", monospace;
            font-size: 0.95em;
            color: ${tokens.fg};
        }

        blockquote {
            margin: 12px 0;
            border-left: 3px solid ${tokens.accent};
            padding: 8px 12px;
            background: ${tokens.cardBg};
            border-radius: 10px;
        }

        hr {
            border: 0;
            border-top: ${tokens.border};
            margin: 18px 0;
        }
    `,

    /* Code block */
    Pre: styled.pre`
        background: #0f0f0f;
        border: ${tokens.border};
        border-radius: ${tokens.radius};
        padding: 14px;
        overflow: auto;
        margin: 12px 0;
        font-size: 0.95rem;
        line-height: 1.55;
    `,

    /* Small keyboard hint */
    Kbd: styled.kbd`
        padding: 2px 6px;
        border: ${tokens.border};
        border-bottom-width: 2px;
        border-radius: 6px;
        background: hsl(0 0% 100% / 0.06);
        font-size: 0.9em;
    `,

    /* Card / Callout */
    Card: styled.div`
        background: ${tokens.cardBg};
        border: ${tokens.border};
        border-radius: ${tokens.radius};
        padding: ${tokens.pad};
    `,

    Callout: styled.div`
        border-left: 4px solid ${tokens.accent};
        background: ${tokens.cardBg};
        border-radius: 12px;
        padding: 12px 14px;
        margin: 12px 0;
    `,

    Table: styled.table`
        width: 100%;
        border-collapse: collapse;
        margin: 12px 0;
        th,
        td {
            border: ${tokens.border};
            padding: 8px 10px;
            text-align: left;
        }
        th {
            background: hsl(0 0% 100% / 0.06);
        }
    `,
};
