import { getRecipesByPages, getRecipesBySearchQuery } from '../models';
import { Search, Pagination } from '../views';

export const renderSearchResult = async (query: string) => {
  try {
    const data = await getRecipesBySearchQuery(query);
    if (!data || data.length === 0) {
      Pagination.clear();
      Search.renderError({});
      return;
    }

    Search.render(() => getRecipesByPages(1)); // must set value to (1) to reset page count
    Pagination.render();
  } catch (err) {
    Search.renderError({ msg: (err as Error).message });
  }
};
