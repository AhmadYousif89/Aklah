import './sass/main.scss';

import {
  renderRecipe,
  renderBookmarks,
  renderSearchResult,
  renderRecipesByPages,
} from './controllers';
import { Pagination, Search, Recipes, Bookmarks } from './views';

function init() {
  Recipes.viewHandler(renderRecipe);
  Bookmarks.viewHandler(renderBookmarks);
  Search.viewHandler(renderSearchResult);
  Pagination.viewHandler(renderRecipesByPages);
}

init();
