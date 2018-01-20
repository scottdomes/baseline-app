const initialState = {
  user: false,
  records: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, { user: action.payload });
    case "LOGOUT":
      return Object.assign({}, state, { user: null });
    case "SET_RECORDS":
      return Object.assign({}, state, { records: action.payload });
    default:
      return state;
  }
}

export default rootReducer;
