import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MA_TOPICS } from "./topics.meta";

const TOPICS = [
    { slug: "performance-basics", title: "Performance basics", loader: () => import("./PerformanceBasics.jsx") },
    { slug: "memory-gc", title: "Memory & GC basics", loader: () => import("./MemoryGcBasics.jsx") },
    { slug: "proxy-reflect", title: "Proxy & Reflect", loader: () => import("./ProxyReflect.jsx") },
    { slug: "eval-function", title: "Eval & Function constructor", loader: () => import("./EvalFunction.jsx") },
    { slug: "operator-misc", title: "Operators often missed", loader: () => import("./OperatorMisc.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Meta & Advanced"
                sectionPath="/meta-advanced"
                topics={MA_TOPICS}
            />
            <Styled.Heading>Meta & Advanced</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/meta-advanced/${slug}`}>{title}</NavLink>
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
                Go back to <NavLink to="/meta-advanced">Meta & Advanced</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

export default function MetaAdvanced() {
    const { topic_name } = useParams(); // /meta-advanced/:topic_name

    const Component = useMemo(() => {
        if (!topic_name) return Overview;
        const load = loaders[topic_name];
        return load ? lazy(load) : TopicNotFound;
    }, [topic_name]);

    return (
        <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
            <Component />
        </Suspense>
    );
}
