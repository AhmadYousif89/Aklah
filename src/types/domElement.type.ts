export type InsertElemPos =
  | 'afterbegin'
  | 'afterend'
  | 'beforebegin'
  | 'beforeend';

export type DOMElement = {
  tag: string;
  innerHtml?: string;
  cssClassies?: [string];
  attributes?: [{ name: string; value: string }];
  insertOptions?: { parentElemSelector: string; insertElem: InsertElemPos };
};
