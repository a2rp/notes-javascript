import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { FT_TOPICS } from "./topics.meta";
import { CircularProgress } from "@mui/material";

/** Slugs → titles → dynamic imports (files live in this folder) */
const TOPICS = [
    { slug: "function-forms", title: "Function forms", loader: () => import("./FunctionForms.jsx") },
    { slug: "arrow-functions", title: "Arrow functions", loader: () => import("./ArrowFunctions.jsx") },
    { slug: "parameters", title: "Parameters", loader: () => import("./Parameters.jsx") },
    { slug: "this-binding-rules", title: "this binding rules", loader: () => import("./ThisBindingRules.jsx") },
    { slug: "call-apply-bind", title: "call / apply / bind", loader: () => import("./CallApplyBind.jsx") },
    { slug: "return-patterns", title: "Return patterns", loader: () => import("./ReturnPatterns.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

/* ---------- Overview (topics list) ---------- */
function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Functions & this"
                sectionPath="/functions-this"
                topics={FT_TOPICS}
            />
            <Styled.Heading>Functions & this</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/functions-this/${slug}`}>{title}</NavLink>
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
            <p>Go back to <NavLink to="/functions-this">Functions & this</NavLink>.</p>
        </Styled.Wrapper>
    );
}

const FunctionsThis = () => {
    const { topic_name } = useParams();
    const Component = useMemo(() => {
        if (!topic_name) return Overview;
        const load = loaders[topic_name];
        return load ? lazy(load) : TopicNotFound;
    }, [topic_name]);

    return (
        <Suspense fallback={<div style={{ padding: 24 }}><CircularProgress /></div>}>
            <Component />
        </Suspense>
    );
};

export default FunctionsThis;
