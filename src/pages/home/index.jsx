import React from 'react'
import { Styled } from './styled'

const Home = () => {


    return (
        <>
            <Styled.Wrapper>
                <h3>JavaScript Notes - last updated: Sep 13, 2025</h3>
                <fieldset>
                    <legend>From WikipediA</legend>
                    <p>
                        JavaScript (JS) is a programming language and core technology of the web platform, alongside HTML and CSS. Ninety-nine percent of websites on the World Wide Web use JavaScript on the client side for webpage behavior.
                    </p>
                    <p>
                        Web browsers have a dedicated JavaScript engine that executes the client code. These engines are also utilized in some servers and a variety of apps. The most popular runtime system for non-browser usage is Node.js.
                    </p>
                    <p>
                        JavaScript is a high-level, often just-in-time-compiled language that conforms to the ECMAScript standard. It has dynamic typing, prototype-based object-orientation, and first-class functions. It is multi-paradigm, supporting event-driven, functional, and imperative programming styles. It has application programming interfaces (APIs) for working with text, dates, regular expressions, standard data structures, and the Document Object Model (DOM).
                    </p>
                    <p>
                        The ECMAScript standard does not include any input/output (I/O), such as networking, storage, or graphics facilities. In practice, the web browser or other runtime system provides JavaScript APIs for I/O.
                    </p>
                    <p>
                        Although Java and JavaScript are similar in name and syntax, the two languages are distinct and differ greatly in design.
                    </p>
                </fieldset>
            </Styled.Wrapper>
        </>
    )
}

export default Home

