
const defaultState = {
  id: ''
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    default: return newState;
  }
};
