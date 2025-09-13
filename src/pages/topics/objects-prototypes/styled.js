import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        padding: 50px;
        @media (width < 900px) {
            padding: 15px;
        }
    `,
    Heading: styled.h1`
        margin-bottom: 24px;
    `,
    List: styled.ul`
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
    `,
    Prose: styled.div`
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
    `,
    Pre: styled.pre`
        background: #0f0f0f;
        border: 1px solid #222;
        border-radius: 8px;
        padding: 14px 16px;
        overflow: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 0.95em;
        line-height: 1.55;
        margin: 10px 0 18px;
    `,
};
