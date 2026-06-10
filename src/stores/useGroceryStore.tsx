import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { safeAsyncStorage } from '../lib/safeStorage';
import { GroceryItem } from '../types';

interface GroceryState {
  items: GroceryItem[];
  addItem: (name: string, quantity: string, source?: string) => void;
  addMultipleItems: (items: { name: string; quantity: string; source?: string }[]) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearChecked: () => void;
  toggleAll: (checked: boolean) => void;
  clearAll: () => void;
}

export const useGroceryStore = create<GroceryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (name, quantity, source) => set((state) => ({
        items: [...state.items, { id: Math.random().toString(36).substr(2, 9), name, quantity, checked: false, source }]
      })),
      addMultipleItems: (newItems) => set((state) => {
        const processedItems = newItems.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          ...item,
          checked: false
        }));
        return { items: [...state.items, ...processedItems] };
      }),
      toggleItem: (id) => set((state) => ({
        items: state.items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
      })),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      clearChecked: () => set((state) => ({
        items: state.items.filter(item => !item.checked)
      })),
      toggleAll: (checked) => set((state) => ({
        items: state.items.map(item => ({ ...item, checked }))
      })),
      clearAll: () => set({ items: [] }),
    }),
    {
       name: 'grocery-storage',
       storage: createJSONStorage(() => safeAsyncStorage),
    }
  )
);
