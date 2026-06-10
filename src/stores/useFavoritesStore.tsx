import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeAsyncStorage } from '../lib/safeStorage';
import { Meal } from '../types';

interface FavoritesState {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (meal) => set((state) => ({ favorites: [...state.favorites, meal] })),
      removeFavorite: (id) => set((state) => ({ 
        favorites: state.favorites.filter((m) => m.idMeal !== id) 
      })),
      isFavorite: (id) => get().favorites.some((m) => m.idMeal === id),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => safeAsyncStorage),
    }
  )
);
