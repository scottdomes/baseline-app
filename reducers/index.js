const initialState = {
  user: false,
  records: [],
  newRecord: {
    value: null,
    tags: []
  }
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, { user: action.payload });
    case "LOGOUT":
      return Object.assign({}, state, { user: null });
    case "SET_RECORDS":
      return Object.assign({}, state, { records: action.payload });
    case "SELECT_NEW_RECORD_VALUE":
      const newRecord = Object.assign({}, state.newRecord);
      newRecord.value = action.payload;
      return Object.assign({}, state, { newRecord });
    default:
      return state;
  }
}

export default rootReducer;
