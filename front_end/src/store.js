import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['openState', 'auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: composeWithDevTools(applyMiddleware(...middleware))
  middleware: [thunk]
});

export const persistor = persistStore(store);