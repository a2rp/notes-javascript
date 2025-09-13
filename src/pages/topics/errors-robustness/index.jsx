import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ER_TOPICS } from "./topics.meta";
import { CircularProgress } from "@mui/material";

const TOPICS = [
    { slug: "error-types", title: "Error types", loader: () => import("./ErrorTypes.jsx") },
    { slug: "try-catch-finally", title: "try/catch/finally", loader: () => import("./TryCatchFinally.jsx") },
    { slug: "custom-errors", title: "Custom errors", loader: () => import("./CustomErrors.jsx") },
    { slug: "guards-assertions", title: "Guards & assertions", loader: () => import("./GuardsAssertions.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Errors & Robustness"
                sectionPath="/errors-robustness"
                topics={ER_TOPICS}
            />
            <Styled.Heading>Errors & Robustness</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/errors-robustness/${slug}`}>{title}</NavLink>
                    </li>
                ))}
            </Styled.List>
        </Styled.Wrapper>
    );
}

function TopicNotFound() {
    return (
        <Styled.Wrapper>
            <h3>Topic not found</h3>
            <p>
                Go back to <NavLink to="/errors-robustness">Errors & Robustness</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

export default function ErrorsRobustness() {
    const { topic_name } = useParams(); // /errors-robustness/:topic_name

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
}
