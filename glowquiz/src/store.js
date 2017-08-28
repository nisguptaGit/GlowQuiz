import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
   const middlewares = [
     sagaMiddleware
   ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];
const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

    
  const store = createStore(
    combineReducers({reducer}),
    fromJS(initialState),
    composeEnhancers(...enhancers)
    );
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry


  return store;
}
