"use client";

import ProtectRoute from "@/hooks/protectRoute";
import Link from "next/link";

export default function page() {
  const user = ProtectRoute();
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold text-gray-700">
                  Dashboard del Profesional
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <Link
                      className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                      href="/home/calendar"
                    >
                      Mi Calendario
                    </Link>
                    <Link
                      className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                      href="/mis-citas"
                    >
                      Mis Citas
                    </Link>
                    <Link
                      className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
                      href="/cancelaciones"
                    >
                      Cancelaciones
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
