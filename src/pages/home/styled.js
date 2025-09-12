import styled from "styled-components";

const maxw = "1080px";

export const Styled = {
    Wrapper: styled.div`
        padding: 24px;

        h1 {
            margin-bottom: 30px;
        }

        fieldset {
            padding: 15px;
            margin: 15px 0;
            border: 1px solid #333;

            legend {
                padding: 0 15px;
                font-size: 16px;
                color: #64493d;
            }
            p {
                display: block;
                margin-bottom: 15px;
                max-width: 900px;
            }
        }
    `,
};
