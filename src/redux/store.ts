import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import themeReducer from './slices/themeSlice';

// Storage can be unavailable in private browsing or when server rendering.
const storage = {
  async getItem(key: string) {
    try { return typeof window === 'undefined' ? null : window.localStorage.getItem(key); } catch { return null; }
  },
  async setItem(key: string, value: string) {
    try { window.localStorage.setItem(key, value); } catch { /* Keep the in-memory preference. */ }
  },
  async removeItem(key: string) {
    try { window.localStorage.removeItem(key); } catch { /* Storage is optional. */ }
  },
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const persistConfig = {
  key: 'portfolio-leon-v1', // Alterado para evitar conflitos com estados antigos (como o 'auth')
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor: ReturnType<typeof persistStore> | undefined;

export function initializePersistence() {
  // Start after hydration so the server and first client render share the same theme.
  persistor ??= persistStore(store);
  return persistor;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
