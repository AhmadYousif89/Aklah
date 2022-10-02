import MainView from './main.view';

class AddRecipeModal extends MainView {
  private overlay = document.querySelector('.overlay') as HTMLElement;
  private modal = document.querySelector('.add-recipe-modal') as HTMLElement;
  private openModalBtn = document.querySelector(
    '.nav__btn--add-recipe'
  ) as HTMLElement;
  private closeModalBtn = document.querySelector(
    '.btn--close-modal'
  ) as HTMLElement;

  msg = 'Recipe uploaded successfully';

  constructor() {
    super('.upload');
    this.modalHandler();
  }

  viewHandler(handler: () => void) {
    handler();
  }

  private modalHandler() {
    this.openModalBtn.onclick = () => {
      this.toggleModal();
    };
    this.closeModalBtn.onclick = () => {
      this.toggleModal();
    };
    this.overlay.onclick = () => {
      this.toggleModal();
    };
  }

  submitFormHandler(handler: (data: any) => void) {
    this.parentContainer.onsubmit = function (e) {
      e.preventDefault();
      const formData = [...new FormData(this as HTMLFormElement)];
      const data = Object.fromEntries(formData);
      handler(data);
    };
  }

  toggleModal() {
    this.modal.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  renderMarkup() {
    return `<form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe info</h3>
          <label>Title</label>
          <input value="" required name="title" type="text" />
          <label>URL</label>
          <input value="" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="" required name="imageUrl" type="text" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value=""
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=""
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/assets/icons.svg#icon-upload"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>`;
  }
}

export const RecipeModal = new AddRecipeModal();
