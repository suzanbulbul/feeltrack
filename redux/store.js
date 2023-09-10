import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './authSlice';
import infoReducer from './infoSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedInfoReducer = persistReducer(persistConfig, infoReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    info: persistedInfoReducer,
  },
});

export const persistor = persistStore(store);

export default store;