import icons from '../assets/icons.svg';
import { Recipe } from './../types';

export default class MainView {
  protected data!: Recipe | Recipe[];
  protected parentContainer: HTMLElement;
  protected msg = `Start searching for your favourit recipe.</br> Have fun!`;
  protected errorMsg = `No recipes were found for your query. Please try again!`;

  constructor(parentSelector: string) {
    this.parentContainer = document.querySelector(
      parentSelector as string
    ) as HTMLElement;
  }

  protected renderMarkup(_data?: any) {}

  render(data?: () => Recipe | Recipe[], shouldInsert = true) {
    if (data) this.data = data() as Recipe | Recipe[];
    this.clear();
    if (!shouldInsert) return this.renderMarkup();
    this.parentContainer.insertAdjacentHTML(
      'afterbegin',
      this.renderMarkup() as any
    );
  }

  // OPTIONAL method to update the DOM partially
  // It solves a problem with images being flickering after updating a recipe servings
  renderPartially(data?: () => Recipe | Recipe[] | void) {
    if (data) this.data = data() as Recipe | Recipe[];
    this.clear();
    this.parentContainer.insertAdjacentHTML(
      'afterbegin',
      this.renderMarkup() as any
    );

    const newDom = document
      .createRange()
      .createContextualFragment(this.renderMarkup() as any);
    const newDomElements = [...newDom.querySelectorAll('*')];
    const curDomElements = [...this.parentContainer.querySelectorAll('*')];

    newDomElements.forEach((elem, i) => {
      const curElem = curDomElements[i];
      if (
        !elem.isEqualNode(curElem) && // check only for the changed elements
        elem.firstChild?.nodeValue?.trim() !== '' // and only for the actual node value
      ) {
        // replace current text content with the updated ones
        curElem.textContent = elem.textContent;
      }
      // update the button data attributes [data-servings]
      if (!elem.isEqualNode(curElem)) {
        Array.from(elem.attributes).forEach((attr) => {
          curElem.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderSpinner() {
    this.clear();
    const content = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-spinner"></use>
        </svg>
      </div>
    `;
    this.parentContainer.insertAdjacentHTML('afterbegin', content);
  }

  renderMessage({ msg = this.msg, svg = '', svgColor = '' }) {
    this.clear();
    const content = `
      <div class="message">
        <div>
          <svg style="fill: ${svgColor ? svgColor : ''}">
            <use href="${icons}#icon-${svg ? svg : 'food'}"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    this.parentContainer.insertAdjacentHTML('afterbegin', content);
  }

  renderError({ msg = this.errorMsg, svg = '', svgColor = '' }) {
    this.clear();
    const content = `
      <div class="error">
        <div>
          <svg style="fill: ${svgColor ? svgColor : ''}">
            <use href="${icons}#icon-${svg ? svg : 'warning'}"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>
    `;
    this.parentContainer.insertAdjacentHTML('afterbegin', content);
  }

  clear() {
    this.parentContainer.innerHTML = '';
  }
}
