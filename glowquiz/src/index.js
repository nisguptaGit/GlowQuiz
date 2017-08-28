import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as WatchWorkQuizSagas from './sagas/sagas';



const initialState = {};
const store = configureStore(initialState);
WatchWorkQuizSagas.default.map(store.runSaga)
//WatchWorkQuizSagas.forEach(saga => runSaga( saga(store.getState), store )) 
ReactDOM.render(
  <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);
