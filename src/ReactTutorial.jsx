// import styled from "styled-components";
// import ReactDefinition from "./topics/setup_and_local_dev/ReactDefinition";

// import ViteInstall from "./topics/setup_and_local_dev/ViteInstall";
// import ProjectTree from "./topics/setup_and_local_dev/ProjectTree";
// import EditorSetup from "./topics/setup_and_local_dev/EditorSetup";
// import EnvFiles from "./topics/setup_and_local_dev/EnvFiles";
// import ImportExportBasics from "./topics/setup_and_local_dev/ImportExportBasics";

// import LetVsConst from "./pages/es6_i_actually_use_daily/LetVsConst";
// import ArrowFunctions from "./pages/es6_i_actually_use_daily/ArrowFunctions";
// import Destructuring from "./pages/es6_i_actually_use_daily/Destructuring";
// import RestAndSpread from "./pages/es6_i_actually_use_daily/RestAndSpread";
// import TemplateLiterals from "./pages/es6_i_actually_use_daily/TemplateLiterals";
// import DefaultParameters from "./pages/es6_i_actually_use_daily/DefaultParameters";
// import OptionalChaining from "./pages/es6_i_actually_use_daily/OptionalChaining";
// import NullishCoalescing from "./pages/es6_i_actually_use_daily/NullishCoalescing";
// import MapFilterReduce from "./pages/es6_i_actually_use_daily/MapFilterReduce";
// import FindSomeEvery from "./pages/es6_i_actually_use_daily/FindSomeEvery";
// import SortNoMutate from "./pages/es6_i_actually_use_daily/SortNoMutate";
// import FlatAndFlatMap from "./pages/es6_i_actually_use_daily/FlatAndFlatMap";
// import ObjectUtilities from "./pages/es6_i_actually_use_daily/ObjectUtilities";
// import SetsAndMaps from "./pages/es6_i_actually_use_daily/SetsAndMaps";
// import PromisesAsyncAwait from "./pages/es6_i_actually_use_daily/PromisesAsyncAwait";
// import FetchBasicsJSON from "./pages/es6_i_actually_use_daily/FetchBasicsJSON";
// import Timers from "./pages/es6_i_actually_use_daily/Timers";

// import JSXSyntaxRules from "./pages/topics/jsxRulesAndPatterns/JSXSyntaxRules";
// import HTMLvsJSX from "./pages/topics/jsxRulesAndPatterns/HTMLvsJSX";
// import InlineStyles from "./pages/topics/jsxRulesAndPatterns/InlineStyles";
// import Fragments from "./pages/topics/jsxRulesAndPatterns/Fragments";
// import CommentsInJSX from "./pages/topics/jsxRulesAndPatterns/CommentsInJSX";
// import ExpressionsVsStatements from "./pages/topics/jsxRulesAndPatterns/ExpressionsVsStatements";
// import ConditionalAnd from "./pages/topics/jsxRulesAndPatterns/ConditionalAnd";
// import ConditionalTernary from "./pages/topics/jsxRulesAndPatterns/ConditionalTernary";
// import EarlyReturn from "./pages/topics/jsxRulesAndPatterns/EarlyReturn";
// import RenderingLists from "./pages/topics/jsxRulesAndPatterns/RenderingLists";
// import KeysStableIdentity from "./pages/topics/jsxRulesAndPatterns/KeysStableIdentity";
// import DangerousHTML from "./pages/topics/jsxRulesAndPatterns/DangerousHTML";
// import FunctionComponentAnatomy from "./pages/topics/componentsAndProps/FunctionComponentAnatomy";
// import DefaultFallbackProps from "./pages/topics/componentsAndProps/DefaultFallbackProps";
// import ChildrenProp from "./pages/topics/componentsAndProps/ChildrenProp";
// import CompositionOverInheritance from "./pages/topics/componentsAndProps/CompositionOverInheritance";
// import PropDrilling from "./pages/topics/componentsAndProps/PropDrilling";
// import PureVsStateful from "./pages/topics/componentsAndProps/PureVsStateful";
// import ReusableComponentAPIDesign from "./pages/topics/componentsAndProps/ReusableComponentAPIDesign";
// import UseStateBasics from "./pages/topics/state/UseStateBasics";
// import FunctionalUpdates from "./pages/topics/state/FunctionalUpdates";
// import InitialStateFunction from "./pages/topics/state/InitialStateFunction";
// import MultipleStateVariables from "./pages/topics/state/MultipleStateVariables";
// import ObjectsInState from "./pages/topics/state/ObjectsInState";
// import ArraysInState from "./pages/topics/state/ArraysInState";
// import DerivedStateVsCompute from "./pages/topics/state/DerivedStateVsCompute";
// import BatchingStateUpdates from "./pages/topics/state/BatchingStateUpdates";
// import AntiPatterns from "./pages/topics/state/AntiPatterns";

// export default function ReactTutorial() {
//     return (
//         <Styled.Wrapper>
//             <h1>ReactJS Handbook</h1>
//             <fieldset
//                 style={{ padding: "0 15px 15px 30px", marginBottom: 15 }}
//             >
//                 <legend style={{ padding: 15 }}>From Wikipedia - last updated: Sep 02, 2025</legend>
//                 <p>
//                     React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library that aims to make building user interfaces based on components more "seamless". It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.
//                 </p>
//                 <br />
//                 <p>
//                     React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next.js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality. A key advantage of React is that it only re-renders those parts of the page that have changed, avoiding unnecessary re-rendering of unchanged DOM elements.
//                 </p>
//             </fieldset>

//             <h1 style={{ marginTop: "30px" }}>My Notes</h1>
//             <h3>last updated: Sep 03, 2025</h3>

//             <div className="divider"></div>
//             <h3>0. Setup & Local Dev</h3>
//             <>
//                 <ReactDefinition />
//                 <ViteInstall />
//                 <ProjectTree />
//                 <EditorSetup />
//                 <EnvFiles />
//                 <ImportExportBasics />
//             </>

//             <h3 style={{ marginTop: 50 }}>1. ES6+ I actually use daily</h3>
//             <>
//                 <LetVsConst />
//                 <ArrowFunctions />
//                 <Destructuring />
//                 <RestAndSpread />
//                 <TemplateLiterals />
//                 <DefaultParameters />
//                 <OptionalChaining />
//                 <NullishCoalescing />
//                 <MapFilterReduce />
//                 <FindSomeEvery />
//                 <SortNoMutate />
//                 <FlatAndFlatMap />
//                 <ObjectUtilities />
//                 <SetsAndMaps />
//                 <PromisesAsyncAwait />
//                 <FetchBasicsJSON />
//                 <Timers />
//             </>

//             <h3 style={{ marginTop: 50 }}>2. JSX: Rules and Patterns</h3>
//             <>
//                 <JSXSyntaxRules />
//                 <HTMLvsJSX />
//                 <InlineStyles />
//                 <Fragments />
//                 <CommentsInJSX />
//                 <ExpressionsVsStatements />
//                 <ConditionalAnd />
//                 <ConditionalTernary />
//                 <EarlyReturn />
//                 <RenderingLists />
//                 <KeysStableIdentity />
//                 <DangerousHTML />
//             </>

//             <h3 style={{ marginTop: 50 }}>3. Components & Props</h3>
//             <>
//                 <FunctionComponentAnatomy />
//                 <DefaultFallbackProps />
//                 <ChildrenProp />
//                 <CompositionOverInheritance />
//                 <PropDrilling />
//                 <PureVsStateful />
//                 <ReusableComponentAPIDesign />
//             </>

//             <h3 style={{ marginTop: 50 }}>4. State (useState) - fundamentals</h3>
//             <>
//                 <UseStateBasics />
//                 <FunctionalUpdates />
//                 <InitialStateFunction />
//                 <MultipleStateVariables />
//                 <ObjectsInState />
//                 <ArraysInState />
//                 <DerivedStateVsCompute />
//                 <BatchingStateUpdates />
//                 <AntiPatterns />
//             </>
//         </Styled.Wrapper>
//     );
// }

// const Styled = {
//     Wrapper: styled.div`
//     --bg: #0d0f14;
//     --text: #e5e7eb;
//     min-height: 100vh;
//     background: var(--bg);
//     color: var(--text);
//     padding: 10px;
//     font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
//       Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
//       "Segoe UI Emoji";
//     line-height: 1.55;
//     max-width: 900px;
//     margin: auto;

//     .divider {
//         margin: 30px 15px;
//         height: 1px;
//         background-color: #333;
//     }
//   `,
// };


import React from 'react'

const ReactTutorial = () => {
    return (
        <div>ReactTutorial</div>
    )
}

export default ReactTutorial