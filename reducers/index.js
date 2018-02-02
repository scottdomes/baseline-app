import FirebaseResource from "../resources/FirebaseResource";

const initialState = {
  user: false,
  userLoaded: false,
  records: [],
  newRecord: {
    value: null,
    tags: []
  },
  tags: []
};

function rootReducer(state = initialState, action) {
  const newRecord = Object.assign({}, state.newRecord);
  switch (action.type) {
    case "LOGIN":
      return Object.assign({}, state, { user: action.payload, userLoaded: true });
    case "LOGOUT":
      return Object.assign({}, state, { user: null, userLoaded: true });
    case "SET_RECORDS":
      return Object.assign({}, state, { records: action.payload });
    case "SET_TAGS":
      return Object.assign({}, state, { tags: action.payload });
    case "SELECT_NEW_RECORD_VALUE":
      newRecord.value = action.payload;
      return Object.assign({}, state, { newRecord });
    case "REMOVE_NEW_RECORD_TAG":
      newRecord.tags.splice(newRecord.tags.indexOf(action.payload), 1);
      return Object.assign({}, state, { newRecord });
    case "ADD_NEW_RECORD_TAG":
      const newR = Object.assign({}, state.newRecord);
      newR.tags.push(action.payload);
      return Object.assign({}, state, { newRecord });
    case "RESET_RECORD":
      return Object.assign({}, state, { newRecord: { value: null, tags: [] } });
    default:
      return state;
  }
}

export default rootReducer;
