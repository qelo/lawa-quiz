import { appendElement, a } from "./append";

export function text(text: string) {
  appendElement(text);
}

export function h1(header: string) {
  a('h1', null, () => {
    text(header);
  });
}