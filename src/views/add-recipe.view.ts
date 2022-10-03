import { API_Recipe } from '../types';
import MainView from './main.view';

class AddRecipeModal extends MainView {
  private modal = document.querySelector('.add-recipe-modal') as HTMLElement;
  private overlay = document.querySelector('.overlay') as HTMLElement;
  protected msg = 'Recipe uploaded successfully';
  private openModalBtn = document.querySelector(
    '.nav__btn--add-recipe'
  ) as HTMLElement;
  private closeModalBtn = document.querySelector(
    '.btn--close-modal'
  ) as HTMLElement;

  constructor() {
    super('.upload');
    this.modalHandler();
  }

  submitFormHandler(handler: (data: API_Recipe) => void) {
    this.parentContainer.onsubmit = function (e: {
      preventDefault: () => void;
    }) {
      e.preventDefault();
      const formData = [...new FormData(this as HTMLFormElement)];
      const data = Object.fromEntries(formData);
      handler(data);
    };
  }

  openModal() {
    this.modal.classList.remove('hidden');
    this.overlay.classList.remove('hidden');
  }
  closeModal() {
    this.modal.classList.add('hidden');
    this.overlay.classList.add('hidden');
  }

  private modalHandler() {
    this.openModalBtn.onclick = () => {
      this.openModal();
    };
    this.closeModalBtn.onclick = () => {
      this.closeModal();
    };
    this.overlay.onclick = () => {
      this.closeModal();
    };
  }

  protected renderMarkup() {
    const content = `  
        <div class="upload__column">
          <h3 class="upload__heading">Recipe info</h3>
          <label>Title</label>
          <input required name="title" type="text" placeholder="Recipe Title" />
          <label>URL</label>
          <input
            required
            name="sourceUrl"
            type="text"
            placeholder="Recipe URL"
          />
          <label>Image URL</label>
          <input
            required
            name="imageUrl"
            type="text"
            placeholder="Recipe Image URL"
          />
          <label>Publisher</label>
          <input
            required
            name="publisher"
            type="text"
            placeholder="Recipe Publisher"
          />
          <label>Prep time</label>
          <input
            required
            name="cookingTime"
            type="number"
            placeholder="Prepration time"
          />
          <label>Servings</label>
          <input
            required
            name="servings"
            type="number"
            placeholder="Number Of Servings"
          />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description"
          />
          <label>Ingredient 2</label>
          <input
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description"
          />
          <label>Ingredient 3</label>
          <input
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/assets/icons.svg#icon-upload"></use>
          </svg>
          <span>Upload</span>
        </button>`;

    this.parentContainer.remove();
    this.parentContainer.insertAdjacentHTML('afterbegin', content);
    this.modal.append(this.parentContainer);
  }
}
export const RecipeModal = new AddRecipeModal();
