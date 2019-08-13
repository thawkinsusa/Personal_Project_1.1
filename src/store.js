
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import notifyReducer from 'react-redux-notify';

import userReducer from './User/Container/userReducer'
import teamReducer from './Team/Container/teamReducer';
import heroReducer from "./Hero/Container/heroReducer";

const rootReducer = combineReducers({
  notifications: notifyReducer,
  user: userReducer,
  team: teamReducer,
  heroes: heroReducer

});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(promiseMiddleware)
  )
);
export const persistor = persistStore(store);
