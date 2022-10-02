import { state } from '../state';

export const getRecipesByPages = (page = state.search.curPgNum) => {
  const { recipes, numberOfRecipesPerPage } = state.search;
  state.search.curPgNum = page;

  const startCount = (page - 1) * numberOfRecipesPerPage; // e.g (1 - 1) * 10 = 0
  const endCount = page * numberOfRecipesPerPage; // e.g 1 * 10 = 10

  return recipes.slice(startCount, endCount); // end is not included i.e 10 = 9  recipe[9]
};
