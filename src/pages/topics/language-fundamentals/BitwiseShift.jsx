import React from "react";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

export default function BitwiseShift() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Bitwise & shift</Styled.Heading>

            <Styled.Prose>
                <p>
                    <b>Definition.</b> Bitwise ops work on <b>signed 32-bit integers</b> (values are
                    truncated/wrapped to int32). Useful for flags, masks, and fast math.
                </p>

                <h2 style={{ margin: "28px 0 12px" }}>Operators</h2>
                <ul>
                    <li><code>&amp;</code> AND, <code>|</code> OR, <code>^</code> XOR, <code>~</code> NOT.</li>
                    <li>
                        Shifts: <code>&lt;&lt;</code> left, <code>&gt;&gt;</code> right (sign-propagating),
                        <code> &gt;&gt;&gt;</code> unsigned right (zero-fill).
                    </li>
                    <li>
                        Coercion: numbers → int32; bits beyond 32 drop. <code>~n</code> equals <code>-(n+1)</code>.
                    </li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Tiny examples</h2>
                <Styled.Pre>{`// Basics
5 & 3      // 1   (0101 & 0011 = 0001)
5 | 2      // 7   (0101 | 0010 = 0111)
5 ^ 1      // 4   (0101 ^ 0001 = 0100)
~0         // -1
1 << 3     // 8
8 >> 1     // 4
-8 >> 1    // -4   (sign bit kept)
-8 >>> 1   // 2147483644  (unsigned right shift)

// Force unsigned 32-bit (handy for hashes)
( -1 >>> 0 )        // 4294967295

// Truncation to int32
(1e9 << 2)          // wraps within 32-bit range`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Flags & masks (common pattern)</h2>
                <Styled.Pre>{`// bit positions
const READ = 1 << 0;   // 0001
const WRITE = 1 << 1;  // 0010
const EXEC = 1 << 2;   // 0100

let perms = 0;
perms |= READ | WRITE;         // set flags
(perms & READ) !== 0;          // has READ?
perms &= ~WRITE;               // clear WRITE
perms ^= EXEC;                 // toggle EXEC`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Extracting bytes</h2>
                <Styled.Pre>{`const color = 0x123456;
const r = (color >>> 16) & 0xff;  // 0x12
const g = (color >>> 8)  & 0xff;  // 0x34
const b =  color         & 0xff;  // 0x56`}</Styled.Pre>

                <h2 style={{ margin: "28px 0 12px" }}>Notes on BigInt</h2>
                <ul>
                    <li>
                        BigInt supports <code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>,{" "}
                        <code>&lt;&lt;</code>, <code>&gt;&gt;</code> (no unsigned <code>&gt;&gt;&gt;</code>).
                    </li>
                    <li>Don’t mix Number and BigInt in one op—cast intentionally.</li>
                </ul>

                <h2 style={{ margin: "28px 0 12px" }}>Must-know (checklist)</h2>
                <ul>
                    <li>All bitwise ops coerce to <b>signed int32</b>; beware overflow/wrap.</li>
                    <li>
                        <code>&gt;&gt;</code> keeps sign; <code>&gt;&gt;&gt;</code> zero-fills and yields an
                        unsigned 32-bit result.
                    </li>
                    <li>Use masks for set/clear/toggle checks; use <code>&amp; 0xff</code> to clamp a byte.</li>
                    <li>
                        For pure unsigned math on Numbers, coerce with <code>x &gt;&gt;&gt; 0</code> (returns 0…2³²-1).
                    </li>
                    <li>Prefer BigInt when you truly need more than 32 bits or exact integer math.</li>
                </ul>
            </Styled.Prose>
        </Styled.Wrapper>
    );
}
