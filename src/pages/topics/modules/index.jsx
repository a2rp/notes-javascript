import React, { lazy, Suspense, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Styled } from "./styled";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { MOD_TOPICS } from "./topics.meta";

const TOPICS = [
    { slug: "es-modules", title: "ES Modules", loader: () => import("./EsModules.jsx") },
    { slug: "reexports-namespace", title: "Re-exports & namespace", loader: () => import("./ReexportsNamespace.jsx") },
    { slug: "dynamic-import-tla", title: "Dynamic import & TLA", loader: () => import("./DynamicImportTla.jsx") },
    { slug: "esm-vs-cjs", title: "ESM vs CJS (interop)", loader: () => import("./EsmVsCjs.jsx") },
];

const loaders = Object.fromEntries(TOPICS.map(t => [t.slug, t.loader]));

function Overview() {
    return (
        <Styled.Wrapper>
            <Breadcrumbs
                sectionLabel="Modules"
                sectionPath="/modules"
                topics={MOD_TOPICS}
            />
            <Styled.Heading>Modules</Styled.Heading>

            <Styled.List>
                {TOPICS.map(({ slug, title }) => (
                    <li key={slug}>
                        <NavLink to={`/modules/${slug}`}>{title}</NavLink>
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
                Go back to <NavLink to="/modules">Modules</NavLink>.
            </p>
        </Styled.Wrapper>
    );
}

export default function Modules() {
    const { topic_name } = useParams(); // /modules/:topic_name

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
