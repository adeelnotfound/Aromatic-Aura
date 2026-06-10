import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const safeAsyncStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch (_) {}
      return null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {}
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } catch (_) {}
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (isWeb) {
      try {
        window.localStorage.removeItem(key);
      } catch (e) {}
      return;
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (_) {}
    }
  }
};
