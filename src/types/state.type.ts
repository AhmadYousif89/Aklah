import { Bookmarks } from './bookmark.type';
import { Recipe } from './recipe.type';

export type State = {
  bookmarks: Bookmarks;
  recipe: Recipe;
  search: {
    query: string[];
    recipes: Recipe[];
    curPgNum: number;
    numberOfPages: number;
    numberOfRecipesPerPage: number;
  };
};
