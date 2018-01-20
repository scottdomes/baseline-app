export const setRecords = records => {
  return {
    type: "SET_RECORDS",
    payload: records
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