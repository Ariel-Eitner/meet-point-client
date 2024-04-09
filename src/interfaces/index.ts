export interface CreateUser {
  name: string;
  email: string;
  // password: string;
  phoneNumber?: string;
  country?: string;
  role: "professional" | "client" | "admin";
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  access_token: string;
  role: "client" | "admin";
}

export interface Login {
  email: string;
  password: string;
}

export interface BusinessHour {
  professionalId: string;
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
}

export interface Appointment {
  _id?: string;
  professionalId: string;
  startDate: Date;
  endDate: Date;
  confirmation?: boolean;
  isBlock: boolean;
  meetLink?: string;
  message?: string;
  paymentStatus?: "pending" | "completed" | "canceled";
  userId?: string;
}

export interface AppointmentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  startTimeBlock: string;
  endTimeBlock: string;
  appointmentId?: string;
  userId: string;
  setAppointmentId: (id: string) => void;
  // Y aquí el de toggleFetchTrigger
  toggleFetchTrigger: () => void;
}

export interface CalendarEvent {
  _id: string;
  message: string;
  startDate: string | Date;
  endDate: string | Date;
  professionalId?: string;
  userId?: string;
  confirmation?: boolean;
  paymentStatus?: "pending" | "completed" | "canceled";
  meetLink?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  isBlock: boolean;
}
