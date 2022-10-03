import { RecipeModal, Recipes } from '../views';
import { MODAL_TIMEOUT } from '../config';
import { uploadRecipe } from '../models';
import { API_Recipe } from '../types';
import { state } from '../state';
import { renderBookmarks } from './';

const ctrlModalTimeout = () => {
  setTimeout(() => {
    RecipeModal.closeModal();
  }, MODAL_TIMEOUT * 1000);

  setTimeout(() => {
    RecipeModal.render(() => [], false);
  }, MODAL_TIMEOUT * 1500);
};

const ctrlRecipeUpload = async (newRecipe: API_Recipe) => {
  try {
    RecipeModal.renderSpinner();

    await uploadRecipe(newRecipe);

    RecipeModal.renderMessage({ svg: 'success', svgColor: '#55aa6c' });

    window.history.pushState(null, '', `#${state.recipe.id}`);

    ctrlModalTimeout();
    renderBookmarks();
    Recipes.render(() => state.recipe);
  } catch (err) {
    RecipeModal.renderError({ msg: (err as Error).message });
    ctrlModalTimeout();
  }
};

RecipeModal.submitFormHandler(ctrlRecipeUpload);
