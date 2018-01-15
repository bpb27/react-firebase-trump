import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import * as firebase from 'firebase';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

firebase.initializeApp({
  apiKey: "AIzaSyBmHzEI5-chbl16pluOEBTHHfXHpSwcODA",
  authDomain: "trumptwitterarchive-361e4.firebaseapp.com",
  databaseURL: "https://trumptwitterarchive-361e4.firebaseio.com",
  projectId: "trumptwitterarchive-361e4",
  storageBucket: "",
  messagingSenderId: "758547863119"
});

const db = firebase.database();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const preloadState = { db };
const store = createStore(rootReducer, preloadState, composeEnhancers(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
