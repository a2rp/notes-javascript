import styled from "styled-components";

export const Styled = {
    Nav: styled.div`
        h3 {
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
