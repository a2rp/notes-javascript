import React from "react";
import { StyledTopic as Styled } from "./styled";

/**
 * Program structure & ASI
 */
export default function ProgramStructureAsi() {
    return (
        <Styled.Wrapper>
            <Styled.Heading>Program structure & ASI</Styled.Heading>

            <Styled.Prose>
                <p><b>Definition.</b> A program is a sequence of <i>statements</i> (steps). Expressions produce values.
                    JavaScript may <b>auto-insert semicolons</b> (ASI) at certain line breaks to recover a valid parse.</p>

                <Styled.SubHeading>Rules you actually need</Styled.SubHeading>
                <ul>
                    <li><b>ASI inserts</b> at end-of-input, before <code>{`}`}</code>, or when the next token can't continue the current statement.</li>
                    <li><b>NoLineTerminatorHere</b> (newline <u>not allowed</u> after): <code>return</code>, <code>throw</code>, <code>break</code>, <code>continue</code>, and between an operand and postfix <code>++/--</code>.</li>
                    <li><b>Not inserted</b> inside <code>for(;;)</code> headers - the semicolons are mandatory.</li>
                    <li>A newline <b>doesn't end</b> the statement if the next token can legally attach to the previous line (e.g., starting with <code>(</code> or <code>{`[`}</code> for call/index).</li>
                </ul>

                <Styled.SubHeading>Tiny examples (burn these in)</Styled.SubHeading>
                <Styled.Pre>{`// 1) Restricted keywords
function f() {
  return
  1           // ⇒ returns undefined (ASI placed after 'return')
}

function g() {
  throw
  new Error() // ❌ SyntaxError (newline after 'throw')
}`}</Styled.Pre>

                <Styled.Pre>{`// 2) Postfix operators
let a = 1
a
++            // ❌ Unexpected token: newline splits operand from '++'
`}</Styled.Pre>

                <Styled.Pre>{`// 3) Line starts with '(' or '[' keeps flowing from previous line
const b = fn
(1, 2)        // parsed as: fn(1, 2) - NOT two separate statements

obj = arr
[0] = 42      // parsed as: (obj = arr)[0] = 42
`}</Styled.Pre>

                <Styled.Pre>{`// 4) No ASI inside for-header
for (let i = 0   // you must write semicolons here
; i < 3
; i++) console.log(i)
`}</Styled.Pre>

                <Styled.SubHeading>Defensive patterns</Styled.SubHeading>
                <ul>
                    <li><b>End statements with ';'</b> - simplest rule, least surprises.</li>
                    <li>Never newline after <code>return/throw/break/continue</code>.</li>
                    <li>When a line intentionally begins with <code>{`(`}</code> or <code>{`[`}</code> (IIFE, array access), prefix it with a <b>leading semicolon</b>:
                        <Styled.Pre>{`;(() => {/* IIFE */})()
;[1,2].forEach(()=>{})`}</Styled.Pre>
                    </li>
                    <li>Add parentheses to make intent explicit when splitting long expressions across lines.</li>
                </ul>

                <Styled.SubHeading>Senior checklist</Styled.SubHeading>
                <ul>
                    <li>If a line starts with <code>{`(`}</code> / <code>{`[`}</code> right after an expression, will it accidentally call/index the previous line?</li>
                    <li>Any newline after <code>return/throw/…</code>? If yes, fix it.</li>
                    <li>Any postfix <code>++/--</code> separated by newline? If yes, fix it.</li>
                    <li>Prettier/ESLint: enable <code>semi: true</code> and <code>no-unexpected-multiline</code>.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
