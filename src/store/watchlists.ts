import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Watchlist = { id: string; name: string; symbols: string[]; createdAt: number };

type State = {
  lists: Watchlist[];
  createList: (name: string) => void;
  addSymbol: (listId: string, symbol: string) => void;
  removeSymbol: (listId: string, symbol: string) => void;
  isInAnyList: (symbol: string) => boolean;
  hydrate: () => Promise<void>;
};

const STORAGE_KEY = 'WATCHLISTS_V1';

export const useWatchlists = create<State>((set, get) => ({
  lists: [],

  createList: (name) =>
    set((state) => ({
      lists: [
        ...state.lists,
        { id: crypto.randomUUID(), name, symbols: [], createdAt: Date.now() },
      ],
    })),

  addSymbol: (listId, symbol) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId && !l.symbols.includes(symbol)
          ? { ...l, symbols: [...l.symbols, symbol] }
          : l
      ),
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

// Persist to storage
useWatchlists.subscribe(async (state) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state.lists));
});
