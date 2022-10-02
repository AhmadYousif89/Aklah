import { RECIPES_PER_PAGE } from './config';
import { State } from './types/index';

export const state: State = {
  recipe: {},
  bookmarks: [],
  search: {
    query: [],
    recipes: [],
    curPgNum: 1,
    numberOfRecipesPerPage: RECIPES_PER_PAGE,
    get numberOfPages() {
      return Math.ceil(this.recipes.length / this.numberOfRecipesPerPage); // e.g (56 / 10) = 6 pages to paginate
    },
  },
};
