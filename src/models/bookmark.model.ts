import { state } from '../state';
import { Ingredient, Recipe } from '../types';

export const addBookmark = (recipe: Recipe) => {
  if (state.bookmarks.some((b) => b.id === recipe.id)) return;
  recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const removeBookmark = (recipe: Recipe) => {
  recipe.bookmarked = false;
  state.bookmarks = state.bookmarks.filter((rec) => rec.id !== recipe.id);
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const updateBookmarkServings = (recipe: Recipe) => {
  const bookedRecipeIdx = state.bookmarks.findIndex((b) => b.id === recipe.id);
  const bookedRecipe = state.bookmarks.find((b) => b.id === recipe.id);

  if (bookedRecipe) {
    const updatedBookmarks = [...state.bookmarks];
    const updatedBookmark = { ...bookedRecipe, servings: recipe.servings };
    const updatedBookmarkIngs = updatedBookmark.ingredients as Ingredient[];

    updatedBookmarkIngs.forEach((ing) => {
      const oldServings = bookedRecipe.servings as number;
      if (ing.quantity != null)
        ing.quantity =
          ((ing.quantity as number) * (recipe.servings as number)) /
          oldServings;
    });

    updatedBookmarks[bookedRecipeIdx] = updatedBookmark;
    state.bookmarks = updatedBookmarks;
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
  }
};
