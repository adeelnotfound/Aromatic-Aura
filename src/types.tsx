export interface Ingredient {
  name: string;
  measure: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  ingredients: Ingredient[];
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  source?: string;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}
