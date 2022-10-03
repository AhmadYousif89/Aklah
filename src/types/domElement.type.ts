export type InsertElemPos =
  | 'afterbegin'
  | 'afterend'
  | 'beforebegin'
  | 'beforeend';

export type DOMElement = {
  tag: string;
  classNames?: string[];
  parentSelector?: string;
  insertElem?: InsertElemPos;
  attributes?: { name: string; value: string }[];
};
