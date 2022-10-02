import icons from '../assets/icons.svg';
import { Recipe } from '../types';

class PreviewView {
  renderMarkup(data: Recipe[]) {
    return data.map(this.generatePreviewMarkup).join('');
  }

  private generatePreviewMarkup(recipe: Recipe) {
    const recipeId = window.location.hash.slice(1);
    const actvClass = recipe.id === recipeId ? 'preview__link--active' : '';

    return `
      <li class="preview">
        <a class="preview__link ${actvClass}" href="#${recipe.id}">
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
          </div>
        </a>
      </li>
    `;
  }
}

export const Preview = new PreviewView();
