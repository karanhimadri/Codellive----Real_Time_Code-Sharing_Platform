import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    user_id: null,
    name: "",
    email: "",
    password: "",
    email_verified: false,
    profile_picture: "",
    given_name: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUserDetails: (state, action) => {
      Object.assign(state.user, action.payload)
      console.log(state.user.user_id)
    },
  },
});

export const { setAuthUserDetails } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
