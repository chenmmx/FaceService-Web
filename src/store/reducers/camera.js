import { GET_CAMERA_LIST } from '../actions/camera';

const defaultState = {
  cameraList: [],
  total: 0
};

export default (state = defaultState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_CAMERA_LIST:
      newState.cameraList = action.data.list;
      newState.total = action.data.total;
      return newState;
    default:
      return newState;
  }
};
