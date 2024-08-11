import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement => Object => HTML element

// JSX it is not react
// it is JSX not html, it is HTML or XML like syntax
// use brackets
const JsxHeading  = () => (<h1 className="head" id="heading">
    NamasteReact Using JSX🚀
    </h1>);
const react = <h1>React</h1>
const name = <h1>Hi {react} Element</h1>;

// ReactComponents
// Class based components - old way - uses js classes
// Functional based components - new way - uses js functions

//React Functional Component ==> a function which returna jsx 
const Heading = ()=>{
    return (<div>
        <JsxHeading/> {/*  component Composition */}
        {name}
        <h1>Namaste React Functional Component</h1>
        </div>);
};

// const heading2 = () => <h1>Namaste React Functional Component</h1>; same as above


const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(jsxHeading);
root.render(<Heading/>);
