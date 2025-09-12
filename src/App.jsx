import ScrollToTop from './components/ScrollToTop'
import { Styled } from './App.styled'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'
import { MdMenuOpen } from 'react-icons/md'
import { CircularProgress } from '@mui/material'
import Footer from './components/footer'
import NavList from './components/navList'

/* Pages */
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/notFound'));
const About = lazy(() => import('./pages/about'));

/* Topics (each folder has index.jsx) */
const Async = lazy(() => import('./pages/topics/async'));
const Builtins = lazy(() => import('./pages/topics/builtins'));
const ErrorsRobustness = lazy(() => import('./pages/topics/errors-robustness'));
const FunctionsThis = lazy(() => import('./pages/topics/functions-this'));
const LanguageFundamentals = lazy(() => import('./pages/topics/language-fundamentals'));
const MetaAdvanced = lazy(() => import('./pages/topics/meta-advanced'));
const Modules = lazy(() => import('./pages/topics/modules'));
const ObjectsPrototypes = lazy(() => import('./pages/topics/objects-prototypes'));

const App = () => {
    const [displayNav, setDisplayNav] = useState(true);
    const handleDisplayNav = () => setDisplayNav(prev => !prev);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.NavLinkWrapper onClick={handleDisplayNav}>
                    <MdMenuOpen size={20} />
                </Styled.NavLinkWrapper>
                <Styled.Heading><NavLink to="/">a2rp: JavaScript Notes</NavLink></Styled.Heading>
            </Styled.Header>

            <Styled.Main>
                <Styled.NavWrapper className={`${displayNav ? "active" : ""}`}>
                    <div className="navInner">
                        <NavList />
                    </div>
                </Styled.NavWrapper>

                <Styled.ContentWrapper id="scroll-root" data-scroll-root>
                    <Styled.RoutesWrapper>
                        <Suspense fallback={<CircularProgress />}>
                            <Routes>
                                {/* Basics */}
                                <Route path="/" element={<Navigate to="/home" />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/about" element={<About />} />

                                <Route path="/async" element={<Async />} />
                                <Route path="/async/:topic_name" element={<Async />} />

                                <Route path="/builtins" element={<Builtins />} />
                                <Route path="/builtins/:topic_name" element={<Builtins />} />

                                <Route path="/errors-robustness" element={<ErrorsRobustness />} />
                                <Route path="/errors-robustness/:topic_name" element={<ErrorsRobustness />} />

                                <Route path="/functions-this" element={<FunctionsThis />} />
                                <Route path="/functions-this/:topic_name" element={<FunctionsThis />} />

                                <Route path="/language-fundamentals" element={<LanguageFundamentals />} />
                                <Route path="/language-fundamentals/:topic_name" element={<LanguageFundamentals />} />

                                <Route path="/meta-advanced" element={<MetaAdvanced />} />
                                <Route path="/meta-advanced/:topic_name" element={<MetaAdvanced />} />

                                <Route path="/modules" element={<Modules />} />
                                <Route path="/modules/:topic_name" element={<Modules />} />

                                <Route path="/objects-prototypes" element={<ObjectsPrototypes />} />
                                <Route path="/objects-prototypes/:topic_name" element={<ObjectsPrototypes />} />

                                {/* 404 */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </Styled.RoutesWrapper>

                    <Styled.Footer>
                        <Footer />
                    </Styled.Footer>
                </Styled.ContentWrapper>
            </Styled.Main>

            <ScrollToTop />
        </Styled.Wrapper>
    )
}

export default App
