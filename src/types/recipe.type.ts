import { Ingredient } from './ingredient.type';

type RecipeInfo = {
  key?: string;
  id?: string;
  title?: string;
  ingredients?: Ingredient[];
  servings?: number;
  publisher?: string;
  bookmarked?: boolean;
};

export interface Recipe extends RecipeInfo {
  imageUrl?: string;
  cookingTime?: number;
  sourceUrl?: string;
}

export interface API_Recipe extends RecipeInfo {
  image_url?: string;
  cooking_time?: number;
  source_url?: string;
}
