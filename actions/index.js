export const setRecords = records => {
  return {
    type: "SET_RECORDS",
    payload: records
  };
};

export const setTags = tags => {
  return {
    type: "SET_TAGS",
    payload: tags
  };
};

export const login = user => ({
  type: "LOGIN",
  payload: user
});

export const logout = () => ({
  type: "LOGOUT"
});

export const selectNewRecordValue = value => ({
  type: "SELECT_NEW_RECORD_VALUE",
  payload: value
});

export const addNewRecordTag = value => ({
  type: "ADD_NEW_RECORD_TAG",
  payload: value
});

export const removeNewRecordTag = value => ({
  type: "REMOVE_NEW_RECORD_TAG",
  payload: value
});

export const submitNewTag = value => ({
  type: "SUBMIT_NEW_TAG",
  payload: value
});

