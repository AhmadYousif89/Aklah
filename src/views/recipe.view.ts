import formatQuantity from 'format-quantity';
import icons from '../assets/icons.svg';

import { Ingredient, Recipe } from '../types';
import MainView from './main.view';

class RecipeView extends MainView {
  protected data: Recipe = {};

  constructor() {
    super('.recipe');
  }

  viewHandler(handler: () => void) {
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  servingsHandler(handler: (servings: number) => void) {
    this.parentContainer.addEventListener('click', (e) => {
      const updateBtn = (e.target as HTMLElement).closest(
        '[data-servings]'
      ) as HTMLButtonElement;
      if (updateBtn == null) return;

      const servings = Number(updateBtn.dataset['servings']);
      if (servings < 1) return;
      handler(servings);
    });
  }

  bookmarkHandler(handler: () => void) {
    this.parentContainer.onclick = (e) => {
      const bookmarkBtn = (e.target as HTMLElement).closest(
        '.btn--bookmark'
      ) as HTMLButtonElement;
      if (bookmarkBtn == null) return;

      handler();
    };
  }

  protected renderMarkup() {
    const {
      key,
      title,
      servings,
      imageUrl,
      cookingTime,
      sourceUrl,
      publisher,
      bookmarked,
    } = this.data;

    const ingredients = this.renderIngredients(
      this.data.ingredients as Ingredient[]
    );
    return `
      <figure class="recipe__fig">
        <img src="${imageUrl}" alt="${title}" class="recipe__img"/>
        <h1 class="recipe__title">
          <span>${title}</span>
        </h1>
      </figure>

      <div class="recipe__details">

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-alarm-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${servings}</span>
          <span class="recipe__info-text">servings</span>
          <div class="recipe__info-buttons">
            <button 
              data-servings=${(servings as number) - 1}
              class="btn--tiny">
              <svg><use href="${icons}#icon-minus"></use></svg>
            </button>
            <button 
              data-servings=${(servings as number) + 1}
              class="btn--tiny">
              <svg><use href="${icons}#icon-plus"></use></svg>
            </button>
          </div>
        </div>

        <div class="preview__user-generated ${!key ? 'hidden' : ''}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg>
            <use 
              href="${icons}#icon-bookmark${bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>

      </div>

      <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${ingredients}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${publisher}.</span> 
          Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${sourceUrl}" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  private renderIngredients = (ingsArr: Ingredient[]) => {
    return ingsArr.map(this.generateIngList).join('');
  };

  private generateIngList(ing: Ingredient) {
    const { description, quantity, unit } = ing;
    return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            quantity ? formatQuantity(quantity.toFixed(2)) : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">
              ${unit === 'tbsps' ? 'table-spoon' : unit}
            </span>
            ${description}
          </div>
        </li>
        `;
  }
}

export const Recipes = new RecipeView();
