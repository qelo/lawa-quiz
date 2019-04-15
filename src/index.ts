import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { a, append } from "./append/append";
import { switchRoutes, route } from "./append/router";
import { h1, text } from "./append/html";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const _ = React.createElement;

function main() {
  // a(BrowserRouter, null, () => {
  //   a(Switch, null, () => {
  //     a(Route, { key: "a", path: "/a", render: () => append(routeA) });
  //     a(Route, { key: "b", path: "/b", render: () => append(routeB) });
  //   });
  // });

  return _(BrowserRouter, null, [
    _(Switch, null, [
      _(Route, { key: "a", path: "/a", component: RouteA }),
      _(Route, { key: "b", path: "/b", component: routeB })
    ])
  ]);
}

class RouteA extends Component {
  render() {
    return [_("h1", null, "Hello"), "world"];
  }
}

function routeB() {
  return _("h1", null, "Just hello");
}

// TODO: Remove extra wrapping in React.Fragment
ReactDOM.render(React.createElement(main), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
