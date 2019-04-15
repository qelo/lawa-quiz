import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const _ = React.createElement;

function Home() {
  return _(React.Fragment, null, [
    _("h1", null, "Home"), //
    "Hello world"
  ]);
}

function App() {
  return _(BrowserRouter, null, [
    _(Switch, null, [
      _(Route, { path: "/", exact: true, component: Home }) //
    ])
  ]);
}

ReactDOM.render(_(App), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Next step:
// - Material UI?
