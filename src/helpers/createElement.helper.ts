import { DOMElement } from '../types';

export const createHtmlElement = (element: DOMElement) => {
  const { tag, classNames, attributes, parentSelector, insertElem } = element;
  const rootElement = document.createElement(tag);

  if (classNames && classNames.length > 0) {
    for (const cssClass of classNames) {
      if (cssClass.trim().length > 0) rootElement.classList.add(cssClass);
    }
  }

  if (attributes && attributes.length > 0) {
    for (const { name, value } of attributes) {
      if (name.trim().length > 0 && value.trim().length > 0)
        rootElement.setAttribute(name, value);
    }
  }

  if (parentSelector && insertElem) {
    document
      .querySelector(parentSelector)
      ?.insertAdjacentElement(insertElem, rootElement);
  }
  if (parentSelector) {
    document.querySelector(parentSelector)?.append(rootElement);
  }

  let elemAttrArray = [];
  const elemAttrNames = rootElement.getAttributeNames();
  for (const attrName of elemAttrNames) {
    elemAttrArray.push({ [attrName]: rootElement.getAttribute(attrName) });
  }

  return {
    elem: rootElement,
    elemAttr: elemAttrArray,
  };
};
