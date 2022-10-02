import './sass/main.scss';

import {
  renderBookmarks,
  renderRecipe,
  renderRecipesByPages,
  renderSearchResult,
} from './controllers';
import { Pagination, Search, Recipes, Bookmarks } from './views';

function init() {
  Recipes.viewHandler(renderRecipe);
  Bookmarks.viewHandler(renderBookmarks);
  Search.viewHandler(renderSearchResult);
  Pagination.viewHandler(renderRecipesByPages);
}

init();
