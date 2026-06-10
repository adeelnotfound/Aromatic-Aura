import { create } from 'zustand';
import { Meal, Category } from '../types';
import { mealApi } from '../api/mealdb';

interface RecipeState {
  searchResults: Meal[];
  categories: Category[];
  trending: Meal[];
  isLoading: boolean;
  search: (query: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTrending: () => Promise<void>;
  filterByCategory: (category: string) => Promise<void>;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  searchResults: [],
  categories: [],
  trending: [],
  isLoading: false,
  search: async (query) => {
    set({ isLoading: true });
    try {
      const results = await mealApi.searchRecipes(query);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  fetchCategories: async () => {
    try {
      const categories = await mealApi.getCategories();
      set({ categories });
    } catch (error) {
      console.error(error);
    }
  },
  fetchTrending: async () => {
    set({ isLoading: true });
    try {
      // Small hack: search for common ingredient to get some initial data
      const results = await mealApi.searchRecipes('a');
      set({ trending: results.slice(0, 10), isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },
  filterByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const results = await mealApi.filterByCategory(category);
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  }
}));
