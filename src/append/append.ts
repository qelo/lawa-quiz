import React, { ReactElement, FunctionComponent, ComponentClass, ReactHTML, ClassAttributes } from 'react';

type Element = ReactElement|string;

const stack: Array<Array<Element>> = [];

export function appendMany(renderFn: Function): Element[] {
  stack.push([]);
  const lengthBefore = stack.length;
  renderFn();
  if (!stack.length || stack.length != lengthBefore) {
    throw new Error('unfinished renders?');
  }
  return stack.pop()!;
}

export function append(renderFn: Function): Element {
  const elements = appendMany(renderFn);
  if (!elements.length) {
    throw new Error('empty render')
  } else if (elements.length == 1) {
    return elements[0];
  } else {
    return React.createElement(React.Fragment, null, ...elements);
  }
}

// TODO: Type using infer?
// type TagType = typeof React.createElement extends (tag: infer T) => any ? T : never;
// type PropsType<P> = typeof React.createElement extends (tag: any, props: infer T) => any ? T : never;

export function a<P>(tag: keyof ReactHTML|FunctionComponent<P>|ComponentClass<P>, 
    props: ClassAttributes<HTMLElement>&P|null, childrenFn?: Function) {
  const children = childrenFn ? appendMany(childrenFn) : [];
  appendElement(React.createElement(tag, props, ...children));
}

export function appendElement(element: Element) {
  stack[stack.length - 1].push(element);
}

// function appendElement(
//     type: "input",
//     props?: InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> | null,
//     ...children: ReactNode[]): DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
// function appendElement<P extends HTMLAttributes<T>, T extends HTMLElement>(
//     type: keyof ReactHTML,
//     props?: ClassAttributes<T> & P | null,
//     ...children: ReactNode[]): DetailedReactHTMLElement<P, T>;
// function appendElement<P extends SVGAttributes<T>, T extends SVGElement>(
//     type: keyof ReactSVG,
//     props?: ClassAttributes<T> & P | null,
//     ...children: ReactNode[]): ReactSVGElement;
// function appendElement<P extends DOMAttributes<T>, T extends Element>(
//     type: string,
//     props?: ClassAttributes<T> & P | null,
//     ...children: ReactNode[]): DOMElement<P, T>;

// // Custom components

// function appendElement<P extends {}>(
//     type: FunctionComponent<P>,
//     props?: Attributes & P | null,
//     ...children: ReactNode[]): FunctionComponentElement<P>;
// function appendElement<P extends {}>(
//     type: ClassType<P, ClassicComponent<P, ComponentState>, ClassicComponentClass<P>>,
//     props?: ClassAttributes<ClassicComponent<P, ComponentState>> & P | null,
//     ...children: ReactNode[]): CElement<P, ClassicComponent<P, ComponentState>>;
// function appendElement<P extends {}, T extends Component<P, ComponentState>, C extends ComponentClass<P>>(
//     type: ClassType<P, T, C>,
//     props?: ClassAttributes<T> & P | null,
//     ...children: ReactNode[]): CElement<P, T>;
// function appendElement<P extends {}>(
//     type: FunctionComponent<P> | ComponentClass<P> | string,
//     props?: Attributes & P | null,
//     ...children: ReactNode[]): ReactElement<P>;