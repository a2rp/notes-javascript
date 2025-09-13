import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { OP_TOPICS } from "./topics.meta";

/** Slugs → titles → dynamic imports (files live in this folder) */
const TOPICS = [
    { slug: "object-literals", title: "Object literals", loader: () => import("./ObjectLiterals.jsx") },
    { slug: "property-descriptors", title: "Property descriptors", loader: () => import("./PropertyDescriptors.jsx") },
    { slug: "object-utilities", title: "Object utilities", loader: () => import("./ObjectUtilities.jsx") },
    { slug: "prototype-chain", title: "Prototype chain", loader: () => import("./PrototypeChain.jsx") },
    { slug: "inheritance", title: "Inheritance patterns", loader: () => import("./InheritancePatterns.jsx") },
    { slug: "classes", title: "Classes", loader: () => import("./Classes.jsx") },
    { slug: "class-fields", title: "Class fields", loader: () => import("./ClassFields.jsx") },
    { slug: "encapsulation", title: "Encapsulation", loader: () => import("./Encapsulation.jsx") },
    { slug: "symbols", title: "Symbols", loader: () => import("./Symbols.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

/* ---------- Overview (topics list) ---------- */
function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Objects & Prototypes"
                sectionPath="/objects-prototypes"
                topics={OP_TOPICS}
            />
            <Styled.Heading>Objects & Prototypes</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/objects-prototypes/${slug}`}>{title}</NavLink>
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
                Go back to <NavLink to="/objects-prototypes">Objects & Prototypes</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

const ObjectsPrototypes = () => {
    const { topic_name } = useParams(); // route: /objects-prototypes/:topic_name

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
};

export default ObjectsPrototypes;
