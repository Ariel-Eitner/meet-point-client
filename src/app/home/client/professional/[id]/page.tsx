"use client";
import React, { useState, useEffect } from "react";

import { userService } from "@/services/userService";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProfessionalPage() {
  const [user, setUser] = useState<any>(null);

  const id = useParams().id as string;

  useEffect(() => {
    if (id) {
      userService
        .getUserById(id)
        .then((response) => {
          setUser(response.data.user); // Establece los datos del usuario en el estado 'user'
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          // Maneja el error, por ejemplo, mostrando un mensaje de error
        });
    }
  }, [id]); // Este efecto depende del 'id', por lo que se ejecutará cada vez que 'id' cambie

  if (!user) {
    // Si no hay usuario, podrías mostrar un mensaje de carga o similar
    return <div>Cargando...</div>;
  }
  console.log(user, " del profesional");

  return (
    <div className="bg-gray-100 p-8  shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-black">Perfil Profesional</h1>
      <Image src={user.photoUrl} width={100} height={100} alt="profesional" />
      <p className="mb-2 text-black">
        <span className="font-semibold">Nombre:</span>{" "}
        {user.firstName + " " + user.lastName}
      </p>
      <p className="mb-2 text-black">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="mb-2 text-black">
        <span className="font-semibold">Teléfono:</span> {user.phoneNumber}
      </p>
      <p className="mb-2 text-black">
        <span className="font-semibold">País:</span> {user.country}
      </p>
      {/* Aquí puedes seguir agregando más propiedades si las necesitas */}
    </div>
  );
}
