import React from 'react';
import ReactDOM from 'react-dom/client';

import AuthReducer from './State';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

// CONSIDERATIONS FOR PERSISTING DATA TO LOCAL STORAGE 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// CONFIGURATIONS FOR PERSISTING DATA TO LOCAL STORAGE
const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, AuthReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

// CREATE ROOT ELEMENT 
const root = ReactDOM.createRoot(document.getElementById('root'));

// RENDER ROOT
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
