import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definición del estado inicial y del tipo de datos
interface BusinessHoursState {
  // Asume una estructura similar a la de tu respuesta
  _id: string;
  professionalId: string;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
}

const initialState: BusinessHoursState = {
  _id: "",
  professionalId: "",
  daysOfWeek: [],
  startTime: "",
  endTime: "",
};

export const businessHoursSlice = createSlice({
  name: "businessHours",
  initialState,
  reducers: {
    setBusinessHours: (state, action: PayloadAction<BusinessHoursState>) => {
      // Actualiza el estado con la nueva información
      const { _id, professionalId, daysOfWeek, startTime, endTime } =
        action.payload;
      state._id = _id;
      state.professionalId = professionalId;
      state.daysOfWeek = daysOfWeek;
      state.startTime = startTime;
      state.endTime = endTime;
    },
  },
});

export const { setBusinessHours } = businessHoursSlice.actions;

export default businessHoursSlice.reducer;
