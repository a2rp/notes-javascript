import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { ASYNC_TOPICS } from "./topics.meta";

const TOPICS = [
    { slug: "event-loop", title: "Event loop", loader: () => import("./EventLoop.jsx") },
    { slug: "promises", title: "Promises: basics", loader: () => import("./PromisesBasics.jsx") },
    { slug: "promise-utilities", title: "Promise utilities", loader: () => import("./PromiseUtilities.jsx") },
    { slug: "async-await", title: "async/await patterns", loader: () => import("./AsyncAwaitPatterns.jsx") },
    { slug: "async-iterators", title: "Async iterators", loader: () => import("./AsyncIterators.jsx") },
    { slug: "timers", title: "Timers", loader: () => import("./Timers.jsx") },
    { slug: "abortcontroller", title: "AbortController", loader: () => import("./AbortController.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Asynchrony Model"
                sectionPath="/async"
                topics={ASYNC_TOPICS}
            />
            <Styled.Heading>Asynchrony Model</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/async/${slug}`}>{title}</NavLink>
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
                Go back to <NavLink to="/async">Asynchrony Model</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

export default function Async() {
    const { topic_name } = useParams(); // /async/:topic_name

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
