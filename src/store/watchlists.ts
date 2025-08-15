

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type Watchlist = { id: string; name: string; symbols: string[]; createdAt: number };

type State = {
  lists: Watchlist[];
  createList: (name: string) => void;
  addSymbol: (listId: string, symbol: string) => void;
  removeSymbol: (listId: string, symbol: string) => void;
  isInAnyList: (symbol: string) => boolean;
  hydrate: () => Promise<void>;
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

const STORAGE_KEY = 'WATCHLISTS_V1';

export const useWatchlists = create<State>((set, get) => ({
  lists: [],

  createList: (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Invalid Name', 'Watchlist name cannot be empty.');
      return;
    }
    const alreadyExists = get().lists.some(
      (list) => list.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      Alert.alert('Duplicate Watchlist', 'A watchlist with this name already exists.');
      return;
    }

    set((state) => ({
      lists: [
        ...state.lists,
        { id: generateId(), name: trimmedName, symbols: [], createdAt: Date.now() },
      ],
    }));
  },

  addSymbol: (listId, symbol) =>
    set((state) => ({
      lists: state.lists.map((l) => {
        if (l.id === listId) {
          if (l.symbols.includes(symbol)) {
            Alert.alert('Already Present', `${symbol} is already in this watchlist.`);
            return l;
          }
          return { ...l, symbols: [...l.symbols, symbol] };
        }
        return l;
      }),
    })),

  removeSymbol: (listId, symbol) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? { ...l, symbols: l.symbols.filter((s) => s !== symbol) }
          : l
      ),
    })),

  isInAnyList: (symbol) => get().lists.some((l) => l.symbols.includes(symbol)),

  hydrate: async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      set({ lists: JSON.parse(raw) });
    }
  },
}));

useWatchlists.subscribe(async (state) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.lists));
});
