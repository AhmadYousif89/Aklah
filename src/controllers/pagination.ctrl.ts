import { state } from '../state';
import { getRecipesByPages } from '../models';
import { Search, Pagination } from '../views';

export const renderRecipesByPages = (goToPageNum: number) => {
  state.search.curPgNum = goToPageNum;
  Search.render(() => getRecipesByPages());
  Pagination.render();
};
