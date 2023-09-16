import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);

export default store;