import { state } from '../state';
import { Recipe } from '../types';

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
    bookedRecipe.ingredients?.forEach((ing) => {
      const oldServings = bookedRecipe.servings as number;
      ing.quantity =
        ((ing.quantity as number) * (recipe.servings as number)) / oldServings;
    });
    const updatedBookmarks = [...state.bookmarks];
    const updatedBookmark = { ...bookedRecipe, servings: recipe.servings };
    updatedBookmarks[bookedRecipeIdx] = updatedBookmark;

    state.bookmarks = updatedBookmarks;
  } else return;
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
