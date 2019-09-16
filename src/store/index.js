import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReduer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(applyMiddleware(thunk));

const store = createStore(rootReduer, enhancer);
export default store;
