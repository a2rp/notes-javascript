import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { BI_TOPICS } from "./topics.meta";

/** Slugs → titles → dynamic imports (files live in this folder) */
const TOPICS = [
    { slug: "arrays-basics", title: "Arrays: basics", loader: () => import("./ArraysBasics.jsx") },
    { slug: "array-map-filter-reduce", title: "Array: map / filter / reduce", loader: () => import("./ArrayMapFilterReduce.jsx") },
    { slug: "sorting", title: "Sorting correctly", loader: () => import("./Sorting.jsx") },
    { slug: "strings-unicode", title: "Strings & Unicode", loader: () => import("./StringsUnicode.jsx") },
    { slug: "numbers-basics", title: "Numbers basics", loader: () => import("./NumbersBasics.jsx") },
    { slug: "bigint", title: "BigInt", loader: () => import("./BigIntBasics.jsx") },
    { slug: "math-essentials", title: "Math essentials", loader: () => import("./MathEssentials.jsx") },
    { slug: "dates-intl", title: "Dates & Intl overview", loader: () => import("./DatesIntl.jsx") },
    { slug: "regexp", title: "RegExp", loader: () => import("./RegExp.jsx") },
    { slug: "json", title: "JSON", loader: () => import("./Json.jsx") },
    { slug: "map-set", title: "Map/Set vs Object/Array", loader: () => import("./MapSet.jsx") },
    { slug: "weakmap-weakset", title: "WeakMap/WeakSet", loader: () => import("./WeakMapWeakSet.jsx") },
    { slug: "typed-arrays", title: "Typed arrays & buffers", loader: () => import("./TypedArrays.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

/* ---------- Overview (topics list) ---------- */
function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Data Structures & Built-ins"
                sectionPath="/builtins"
                topics={BI_TOPICS}
            />
            <Styled.Heading>Data Structures &amp; Built-ins</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/builtins/${slug}`}>{title}</NavLink>
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
                Go back to <NavLink to="/builtins">Data Structures &amp; Built-ins</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

export default function Builtins() {
    const { topic_name } = useParams(); // route: /builtins/:topic_name

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
