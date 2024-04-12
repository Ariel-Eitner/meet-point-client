"use client";
import { BusinessHour } from "@/interfaces";
import { businessHoursService } from "@/services/businessHoursService";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

import { setBusinessHours } from "@/app/lib/features/businessHours/businessHoursSlice";

const diasSemana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export default function BusinessHours() {
  const dispatch = useAppDispatch();
  const businessHours2 = useAppSelector((state) => state.businessHours);
  const userInformation = useAppSelector((state) => state.user.userInformation);
  const router = useRouter();
  const { user } = useUser();

  const [activeDays, setActiveDays] = useState<number[]>(
    businessHours2?.daysOfWeek || []
  );

  const [startTime, setStartTime] = useState<string>(
    businessHours2?.startTime || ""
  );
  const [endTime, setEndTime] = useState<string>(businessHours2?.endTime || "");

  const toggleActiveDay = (day: number) => {
    setActiveDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const businessHourData: BusinessHour = {
      professionalId: userInformation._id,
      daysOfWeek: activeDays,
      startTime,
      endTime,
    };

    try {
      const response = await businessHoursService.create(businessHourData);
      console.log(response.data, " a ver que onda por aca");
      dispatch(setBusinessHours(response.data));
      console.log("Horario laboral actualizado.");
      router.push("/home/calendar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 text-black">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-xl font-semibold">
                Organiza tu Horario laboral, elije que dias y en que horarios
                trabajas.
              </div>
              <div className="grid grid-cols-4 gap-2">
                {diasSemana.map((day, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleActiveDay(index)}
                    className={`px-4 py-2 mt-2 text-sm font-semibold rounded-lg shadow-sm ${
                      activeDays.includes(index)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    } hover:bg-blue-400`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Horario de comienzo:
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Horario de fin:
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Actualizar horario laboral
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
