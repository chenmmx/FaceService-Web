import { GET_NODE_LIST } from '../actions/node';

const defaultState = {
  nodeList: [],
  total: 0
};

export default (state = defaultState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_NODE_LIST:
      newState.nodeList = action.data.list;
      newState.total = action.data.total;
      return newState;
    default:
      return newState;
  }
};
