import { a } from './append';
import { Switch } from 'react-router-dom';
import { SwitchProps, RouteProps, Route } from 'react-router';
import { ClassAttributes } from 'react';

export function switchRoutes(props: SwitchProps, children: Function) {
  a(Switch, props, children);
}

export function route(props: RouteProps|ClassAttributes<HTMLElement>) {
  a(Route, props);
}