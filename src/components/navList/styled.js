import styled from "styled-components";

export const Styled = {
    Nav: styled.div`
        a {
            text-decoration: none;
            color: #666;
            &.active {
                color: orangered;
            }
            &:hover {
                color: orangered;
            }
        }

        h3 {
            /* spacing if needed */
        }

        ul {
            li {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                a {
                    display: flex;
                    align-items: center;
                    height: 25px;
                    text-decoration: none;
                    color: #666;

                    &.active {
                        color: orangered;
                    }
                    &:hover {
                        color: orangered;
                    }
                }
            }
        }
    `,
};
