import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'

import authSlice from './authSlice'
import themeSlice from './themeSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['theme', api.reducerPath],
}

const rootReducer = combineReducers({
  theme: themeSlice,
  auth: authSlice,
  [api.reducerPath]: api.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        warnAfter: 128,
      },
    }).concat(api.middleware),
})

setupListeners(store.dispatch)

export { store }
