import { CircularProgress } from "@mui/material";
import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

import Breadcrumbs from "../../../components/Breadcrumbs";
import { LF_TOPICS } from "./topics.meta";

const TOPICS = [
    { slug: "program-structure-asi", title: "Program structure & ASI", loader: () => import("./ProgramStructureAsi.jsx") },
    { slug: "identifiers-reserved-words", title: "Identifiers & reserved words", loader: () => import("./IdentifiersReservedWords.jsx") },
    { slug: "strict-mode", title: "Strict mode", loader: () => import("./StrictMode.jsx") },
    { slug: "values-types", title: "Values & types", loader: () => import("./ValuesTypes.jsx") },
    { slug: "type-checks", title: "Type checks", loader: () => import("./TypeChecks.jsx") },
    { slug: "truthy-falsy", title: "Truthy & falsy", loader: () => import("./TruthyFalsy.jsx") },
    { slug: "equality", title: "Equality", loader: () => import("./Equality.jsx") },
    { slug: "type-coercion", title: "Type coercion", loader: () => import("./TypeCoercion.jsx") },
    { slug: "var-let-const", title: "var vs let vs const", loader: () => import("./VarLetConst.jsx") },
    { slug: "scope", title: "Scope", loader: () => import("./Scope.jsx") },
    { slug: "tdz", title: "TDZ", loader: () => import("./Tdz.jsx") },
    { slug: "hoisting", title: "Hoisting", loader: () => import("./Hoisting.jsx") },
    { slug: "closures", title: "Closures", loader: () => import("./Closures.jsx") },
    { slug: "operator-basics-precedence", title: "Operator basics & precedence", loader: () => import("./OperatorBasicsPrecedence.jsx") },
    { slug: "arithmetic-comparison-logical", title: "Arithmetic, comparison, logical", loader: () => import("./ArithmeticComparisonLogical.jsx") },
    { slug: "modern-operators", title: "Modern operators", loader: () => import("./ModernOperators.jsx") },
    { slug: "bitwise-shift", title: "Bitwise & shift", loader: () => import("./BitwiseShift.jsx") },
    { slug: "control-flow", title: "Control flow", loader: () => import("./ControlFlow.jsx") },
    { slug: "loops", title: "Loops", loader: () => import("./Loops.jsx") },
    { slug: "forof-forin", title: "for…of vs for…in", loader: () => import("./ForOfForIn.jsx") },
    { slug: "labels-break-continue", title: "Labels, break, continue", loader: () => import("./LabelsBreakContinue.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

/** Index page for the section (topics grid) */
function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Language Fundamentals"
                sectionPath="/language-fundamentals"
                topics={LF_TOPICS}
            />

            <Styled.Heading>Language Fundamentals</Styled.Heading>

            <Styled.ListWrapper>
                <Styled.List>
                    {TOPICS.map(({ slug, title }) => (
                        <li key={slug}>
                            <NavLink to={`/language-fundamentals/${slug}`}>{title}</NavLink>
                        </li>
                    ))}
                </Styled.List>
            </Styled.ListWrapper>
        </Styled.Wrapper>
    );
}

function TopicNotFound() {
    return (
        <Styled.Wrapper>
            <h3>Topic not found</h3>
            <p>
                Go back to{" "}
                <NavLink to="/language-fundamentals">Language Fundamentals</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

const LanguageFundamentals = () => {
    const { topic_name } = useParams();

    const Component = useMemo(() => {
        if (!topic_name) return Overview;
        const load = loaders[topic_name];
        return load ? lazy(load) : TopicNotFound;
    }, [topic_name]);

    return (
        <Suspense fallback={<div style={{ padding: 24 }}>
            <CircularProgress />
        </div>}>
            <Component />
        </Suspense>
    );
};

export default LanguageFundamentals;

/* ---------- styles ---------- */
const Styled = {
    Wrapper: styled.div`
    padding: 50px;
    @media (width < 900px) { padding: 15px; }
  `,
    Heading: styled.h1`
    margin-bottom: 30px;
  `,
    ListWrapper: styled.div``,
    List: styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    li {
      width: 250px;

      a {
        display: flex;
        color: #aaa;
        text-decoration: none;

        &:hover { color: orangered; }
      }
    }
  `,
};
