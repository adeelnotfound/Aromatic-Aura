import axios from 'axios';
import { Meal, Category, Ingredient } from '../types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const parseMealIngredients = (mealData: any): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name, measure: measure || '' });
    }
  }
  return ingredients;
};

export const mealApi = {
  async searchRecipes(query: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    const data = response.data;
    return (data.meals || []).map((meal: any) => ({
      ...meal,
      ingredients: parseMealIngredients(meal)
    }));
  },

  async getCategories(): Promise<Category[]> {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    const data = response.data;
    return data.categories || [];
  },

  async filterByCategory(category: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    const data = response.data;
    // Filter results only provide basic info, details need lookup
    return data.meals || [];
  },

  async filterByIngredient(ingredient: string): Promise<Meal[]> {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = response.data;
    return data.meals || [];
  },

  async getMealById(id: string): Promise<Meal | null> {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    const data = response.data;
    if (!data.meals) return null;
    const meal = data.meals[0];
    return {
      ...meal,
      ingredients: parseMealIngredients(meal)
    };
  },

  async getRandomMeal(): Promise<Meal | null> {
    const response = await axios.get(`${BASE_URL}/random.php`);
    const data = response.data;
    if (!data.meals) return null;
    const meal = data.meals[0];
    return {
      ...meal,
      ingredients: parseMealIngredients(meal)
    };
  }
};
