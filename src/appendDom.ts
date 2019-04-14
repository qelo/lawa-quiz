import React, { ReactElement } from 'react';

type Element = ReactElement;

const stack: Array<Array<Element>> = [];

export function render(renderFn: Function): Element {
  stack.push([]);
  const lengthBefore = stack.length;
  renderFn();
  if (!stack.length || stack.length != lengthBefore) {
    throw new Error('unfinished renders?');
  }
  const elements = stack.pop()!;
  if (!elements.length) {
    throw new Error('empty render')
  } else if (elements.length == 1) {
    return elements[0];
  } else {
    return React.createElement(React.Fragment, null, ...elements);
  }
}

function appendElement(tag: any, props: any, ...children: Array<any>) {
  const element = React.createElement(tag, props, ...children);
  stack[stack.length - 1].push(element);
}

export function h1(text: string) {
  appendElement('h1', null, text);
}