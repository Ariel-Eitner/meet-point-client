"use client";
import React from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CreateUser() {
  const { createUserForm, handleChange, handleSubmit } = useCreateUser();
  const { user, error, isLoading } = useUser();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-gray-600">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-gray-600">
            Únete a nuestra creciente comunidad
          </p>
          <p className="mt-2 text-gray-600">Completa tus datos</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label htmlFor="firstName" className=" text-black">
            Primer Nombre <span className="text-red-500">*</span>
            <input
              type="text"
              name="firstName"
              placeholder="Primer Nombre"
              onChange={handleChange}
              defaultValue={(user?.given_name || "") as string}
              required
              className="appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="middleName" className=" text-black">
            Segundo Nombre
            <input
              type="text"
              name="middleName"
              placeholder="Segundo Nombre"
              onChange={handleChange}
              defaultValue={""}
              className="appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="lastName" className=" text-black">
            Apellido <span className="text-red-500">*</span>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              onChange={handleChange}
              defaultValue={(user?.family_name || "") as string}
              required
              className="appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="email" className=" text-black">
            Email <span className="text-red-500">*</span>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              onChange={handleChange}
              value={user?.email || ""}
              required
              disabled
              className="appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>

          <label htmlFor="phoneNumber" className=" text-black">
            Numero Móvil
            <input
              type="text"
              name="phoneNumber"
              placeholder="Número de Teléfono"
              onChange={handleChange}
              value={createUserForm.phoneNumber}
              className="appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="country" className="text-black">
            País
            <input
              type="text"
              name="country"
              placeholder="País"
              onChange={handleChange}
              value={createUserForm.country || ""}
              className="appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="role" className="text-black">
            Tipo de Usuario <span className="text-red-500">*</span>
            <select
              name="role"
              onChange={handleChange}
              value={createUserForm.role}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="professional">Profesional</option>
              <option value="client">Cliente</option>
            </select>
          </label>
          <hr className="my-4" />

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
