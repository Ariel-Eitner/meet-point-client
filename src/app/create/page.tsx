"use client";
import React from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CreateUser() {
  const { createUserForm, handleChange, handleSubmit } = useCreateUser();
  const { user, error, isLoading } = useUser();
  console.log(user);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-gray-600"
      style={{ fontFamily: "serif", fontWeight: "lighter" }}
    >
      <div
        className="max-w-md w-full space-y-8 p-10  shadow-lg rounded-3xl text-center"
        style={{ backgroundColor: "#EFEFE8", borderColor: "#2D4737" }}
      >
        <div className="text-center">
          <h2
            className="mt-6 text-3xl font-extrabold"
            style={{ color: "#2D4737" }}
          >
            Crear Cuenta
          </h2>
          <p className="mt-2 " style={{ color: "#2D4737" }}>
            Únete a nuestra creciente comunidad
          </p>
          <p className="mt-2 " style={{ color: "#2D4737" }}>
            Completa tus datos
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label htmlFor="firstName" className=" " style={{ color: "#2D4737" }}>
            Primer Nombre <span className="text-red-500">*</span>
            <input
              type="text"
              name="firstName"
              placeholder="Primer Nombre"
              onChange={handleChange}
              defaultValue={(user?.given_name || "") as string}
              required
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className="appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center"
            />
          </label>
          <label
            htmlFor="middleName"
            className=" "
            style={{ color: "#2D4737" }}
          >
            Segundo Nombre
            <input
              type="text"
              name="middleName"
              placeholder="Segundo Nombre"
              onChange={handleChange}
              defaultValue={""}
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className=" text-center appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="lastName" className="" style={{ color: "#2D4737" }}>
            Apellido <span className="text-red-500">*</span>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              onChange={handleChange}
              defaultValue={(user?.family_name || "") as string}
              required
              style={{ backgroundColor: "#EFEFE8" }}
              className="text-center appearance-none rounded-none relative block w-full px-3 mb-5 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="email" className=" " style={{ color: "#2D4737" }}>
            Email <span className="text-red-500">*</span>
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              onChange={handleChange}
              value={user?.email || ""}
              required
              disabled
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>

          <label
            htmlFor="phoneNumber"
            className=" "
            style={{ color: "#2D4737" }}
          >
            Numero Móvil
            <input
              type="text"
              name="phoneNumber"
              placeholder="Número de Teléfono"
              onChange={handleChange}
              value={createUserForm.phoneNumber}
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="country" className="" style={{ color: "#2D4737" }}>
            País
            <input
              type="text"
              name="country"
              placeholder="País"
              onChange={handleChange}
              value={createUserForm.country || ""}
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </label>
          <label htmlFor="role" className="" style={{ color: "#2D4737" }}>
            Tipo de Usuario <span className="text-red-500">*</span>
            <select
              name="role"
              onChange={handleChange}
              value={createUserForm.role}
              required
              style={{ backgroundColor: "#EFEFE8", color: "#2D4737" }}
              className="text-center appearance-none rounded-none relative block w-full px-3 py-2 mb-5 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
