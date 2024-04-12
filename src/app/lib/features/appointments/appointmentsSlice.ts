import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarEvent } from "@/interfaces"; // Asegúrate de que la ruta sea correcta

interface AppointmentsState {
  appointments: CalendarEvent[];
}

const initialState: AppointmentsState = {
  appointments: [],
};

export const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.appointments = action.payload;
    },
    addAppointment: (state, action: PayloadAction<CalendarEvent>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (appointment) => appointment._id === action.payload._id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment._id !== action.payload
      );
    },
  },
});

export const {
  setAppointments,
  updateAppointment,
  deleteAppointment,
  addAppointment,
} = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
