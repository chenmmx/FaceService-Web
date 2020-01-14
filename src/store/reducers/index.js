import { combineReducers } from 'redux';
import application from './application';
import redpupil from './redpupil';
import camera from './camera';
import node from './node';
import common from './common';

// reducer过滤器
function createFilteredReducer(reducerFunction, reducerPredicate) {
  return (state, action) => {
    const isInitializationCall = state === undefined;
    const shouldRunWrappedReducer = reducerPredicate(action) || isInitializationCall;
    return shouldRunWrappedReducer ? reducerFunction(state, action) : state;
  };
}

const rootReducer = combineReducers({
  common: createFilteredReducer(common, (action) => action.name === 'common'),
  application: createFilteredReducer(application, (action) => action.name === 'application'),
  redpupil: createFilteredReducer(redpupil, (action) => action.actionName === 'redpupil'),
  camera: createFilteredReducer(camera, (action) => action.actionName === 'camera'),
  node: createFilteredReducer(node, (action) => action.actionName === 'node')
});

export default rootReducer;
