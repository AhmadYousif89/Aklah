import { renderBookmarks } from './bookmark.ctrl';
import {
  getRecipe,
  addBookmark,
  removeBookmark,
  updateRecipeServings,
  updateBookmarkServings,
} from '../models';
import { state } from '../state';
import { Recipes, Search } from '../views';

export const renderRecipe = async () => {
  try {
    Recipes.renderSpinner();
    const recipe = await getRecipe();

    if (!recipe) return Recipes.renderMessage({});

    Search.render();
    renderBookmarks();
    Recipes.render(() => state.recipe);
  } catch (err) {
    Recipes.renderError({});
  }
};

// HANDLERS : update servings quantities and bookmark recipes

Recipes.servingsHandler((servingQuantity: number) => {
  updateRecipeServings(servingQuantity);
  updateBookmarkServings(state.recipe);
  Recipes.render(() => state.recipe);
});

Recipes.bookmarkHandler(() => {
  state.bookmarks.some((b) => b.id === state.recipe.id)
    ? removeBookmark(state.recipe)
    : addBookmark(state.recipe);
  renderBookmarks();
  Recipes.render(() => state.recipe);
});
