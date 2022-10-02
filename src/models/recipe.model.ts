import { API_Recipe, Recipe } from './../types';
import { httpRequest } from '../helpers';
import { API_KEY } from '../config';
import { state } from '../state';
import { addBookmark } from './';

const createRecipeObj = (data: API_Recipe) => {
  return {
    id: data.id,
    title: data.title,
    imageUrl: data.image_url,
    sourceUrl: data.source_url,
    cookingTime: data.cooking_time,
    ingredients: data.ingredients,
    publisher: data.publisher,
    servings: data.servings,
    ...(data.key && { key: data.key }),
  };
};

export const getRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const receivedRecipe = (await httpRequest(`/${id}`)) as API_Recipe;

    if (receivedRecipe.key === API_KEY) {
      addBookmark(createRecipeObj(receivedRecipe));
      state.recipe = state.bookmarks.at(-1) as Recipe;
      state.recipe.bookmarked = true;
      return state.recipe;
    }

    state.bookmarks.some((b) => b.id === id)
      ? (state.recipe = state.bookmarks.find((b) => b.id === id) as Recipe)
      : (state.recipe = createRecipeObj(receivedRecipe));

    return state.recipe;
  } catch (err) {
    throw err;
  }
};

export const uploadRecipe = async (newRecipe: any) => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map((ings: any[]) => {
        const ingArr = ings[1].split(',');
        const [quantity, unit, description] = ingArr;

        if (ingArr.length !== 3)
          throw new Error(
            'Invalid ingredient format, please format your ingredients as follow :</br> Quantity, Unit, Description'
          );

        const newIng = {
          quantity: quantity ? parseInt(quantity) : null,
          description,
          unit,
        };
        return newIng;
      });

    const recipe: API_Recipe = {
      title: newRecipe.title,
      image_url: newRecipe.imageUrl,
      source_url: newRecipe.sourceUrl,
      cooking_time: newRecipe.cookingTime,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      ingredients,
    };

    const data = (await httpRequest(`?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify(recipe),
    })) as API_Recipe;

    state.recipe = createRecipeObj(data);
    addBookmark(state.recipe);
    return state.recipe;
  } catch (error) {
    throw error;
  }
};

export const updateRecipeServings = (newServings: number) => {
  state.recipe.ingredients?.forEach((ing) => {
    const oldServings = state.recipe.servings as number;
    ing.quantity = ((ing.quantity as number) * newServings) / oldServings;
  });
  state.recipe.servings = newServings;
};
