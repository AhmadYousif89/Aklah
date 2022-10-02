import { httpRequest } from '../helpers';
import { API_Recipe } from '../types';
import { Search } from '../views';
import { state } from '../state';
import { API_KEY } from '../config';

export const getRecipesBySearchQuery = async (query: string) => {
  try {
    Search.renderSpinner();
    state.search.query.push(query);

    const data = await httpRequest(`?search=${query}&key=${API_KEY}`);
    state.search.recipes = (data as API_Recipe[]).map((recipe: API_Recipe) => ({
      id: recipe.id,
      key: recipe.key,
      title: recipe.title,
      imageUrl: recipe.image_url,
      publisher: recipe.publisher,
    }));

    return state.search.recipes;
  } catch (err) {
    throw err;
  }
};
