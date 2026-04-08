import type { StateStorage } from "zustand/middleware";

export const CALENDAR_STORAGE_KEY = "wall-calendar-state-v1";

const memoryStorage = new Map<string, string>();

export const localStorageAdapter: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") {
      return memoryStorage.get(name) ?? null;
    }
    return window.localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") {
      memoryStorage.set(name, value);
      return;
    }
    window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") {
      memoryStorage.delete(name);
      return;
    }
    window.localStorage.removeItem(name);
  }
};
