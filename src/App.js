import { Provider } from 'react-redux'
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import {store} from "./store";
import {persistor} from "./store";
import React, { Component } from 'react';
import './App.css';
import Nav from './User/Views/Nav';
import routes from './routes';
function App() {
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HashRouter><Nav/>{routes}</HashRouter>
        </PersistGate>
      </Provider>
  );
}

export default App;