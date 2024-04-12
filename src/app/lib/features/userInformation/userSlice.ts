// Asumiendo que este es tu userSlice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInformation: any; // Ajusta según tu estructura de datos
}

const initialState: UserState = {
  userInformation: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInformation: (
      state,
      action: PayloadAction<UserState["userInformation"]>
    ) => {
      state.userInformation = action.payload;
    },
  },
});

export const { setUserInformation } = userSlice.actions;

export default userSlice.reducer;
