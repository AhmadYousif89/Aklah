import icons from '../assets/icons.svg';
import { createHtmlElement } from '../helpers';
import { Recipe } from '../types';
import MainView from './main.view';

export class PreviewView extends MainView {
  renderMarkup(recipe: Recipe) {
    const recipeId = window.location.hash.slice(1);
    const actvClass = recipe.id === recipeId ? 'preview__link--active' : null;

    const list = createHtmlElement({
      tag: 'li',
      classNames: ['preview'],
    });

    const preview = createHtmlElement({
      tag: 'a',
      parentSelector: '.preview',
      classNames: ['preview__link', `${actvClass}`],
      attributes: [{ name: 'href', value: `#${recipe.id}` }],
    });

    const content = `
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${!recipe.key ? 'hidden' : ''}">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div> `;

    if (preview) preview.elem.innerHTML = content;
    list?.elem.append(preview?.elem as HTMLElement);
    this.parentContainer.append(list?.elem as HTMLElement);
  }
}
