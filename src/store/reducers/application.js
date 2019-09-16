
const defaultState = {
  id: ''
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  console.log(action);
  return newState;
};
