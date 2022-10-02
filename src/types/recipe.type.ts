import { Ingredient } from './ingredient.type';

export type Recipe = {
  key?: string;
  id?: string;
  title?: string;
  imageUrl?: string;
  cookingTime?: number;
  ingredients?: Ingredient[];
  servings?: number;
  publisher?: string;
  sourceUrl?: string;
  bookmarked?: boolean;
};

export type API_Recipe = {
  key?: string;
  id?: string;
  title?: string;
  image_url?: string;
  cooking_time?: number;
  ingredients?: Ingredient[];
  servings?: number;
  publisher?: string;
  source_url?: string;
  bookmarked?: boolean;
};
