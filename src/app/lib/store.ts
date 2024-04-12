import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userInformation/userSlice";
import businessHoursReducer from "./features/businessHours/businessHoursSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      businessHours: businessHoursReducer,
      appointments: appointmentsReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
