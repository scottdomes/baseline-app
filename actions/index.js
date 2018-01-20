export const setRecords = records => ({
  type: "SET_RECORDS",
  payload: records
});

export const login = user => ({
  type: "LOGIN",
  payload: user
});

export const logout = () => ({
  type: "LOGOUT"
});
