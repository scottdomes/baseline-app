import FirebaseResource from "../resources/FirebaseResource";

const initialState = {
  user: false,
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
      return Object.assign({}, state, { user: action.payload });
    case "LOGOUT":
      return Object.assign({}, state, { user: null });
    case "SET_RECORDS":
      return Object.assign({}, state, { records: action.payload });
    case "SET_TAGS":
      return Object.assign({}, state, { tags: action.payload });
    case "SELECT_NEW_RECORD_VALUE":
      newRecord.value = action.payload;
      return Object.assign({}, state, { newRecord });
    case "SUBMIT_NEW_TAG":
      FirebaseResource.submitNewTag(action.payload, state.user.uid);
    case "REMOVE_NEW_RECORD_TAG":
      newRecord.tags.splice(tags.indexOf(action.payload), 1);
      return Object.assign({}, state, { newRecord });
    case "ADD_NEW_RECORD_TAG":
      newRecord.tags.push(action.payload);
      return Object.assign({}, state, { newRecord });
    default:
      return state;
  }
}

export default rootReducer;
