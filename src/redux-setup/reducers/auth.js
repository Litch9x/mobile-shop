import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  infoCustomer: {
    currentCustomer: null,
    loggedIn: false,
    error: false,
    // tokenRefreshed: false,
  },
};
const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.infoCustomer.currentCustomer = action.payload;
      state.infoCustomer.loggedIn = true;
    },
    updateInfo: (state, action) => {
      state.infoCustomer.currentCustomer.fullName = action.payload.fullName;
      state.infoCustomer.currentCustomer.phone = action.payload.phone;
      state.infoCustomer.currentCustomer.address = action.payload.address;
    },
    updateToken: (state, action) => {
      state.infoCustomer.currentCustomer.accessToken = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.infoCustomer.currentCustomer = null; // Đặt currentCustomer về null
      state.infoCustomer.loggedIn = false; // Đặt loggedIn về false
      state.infoCustomer.error = false; // Đặt error về false nếu cần
    },
  },
});
export const {
  loginSuccess,
  updateInfo,
  logoutSuccess,
  updateToken,
  refreshTokenSuccess,
} = authReducer.actions;
export default authReducer.reducer;
