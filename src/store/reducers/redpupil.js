import { GET_REDPUPIL_LIST } from '../actions/redpupil';

const defaultState = {
  redpupilList: [],
  total: 0
};

export default (state = defaultState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_REDPUPIL_LIST:
      newState.redpupilList = action.data.list;
      newState.total = action.data.total;
      return newState;
    default:
      return newState;
  }
};
