"use client";
import React, { useState, useEffect } from "react";
import { userService } from "@/services/userService";
import Link from "next/link";
import Image from "next/image";

export default function ClientPage() {
  const [users, setUsers] = useState([]);

  console.log(users, "de aca");

  useEffect(() => {
    userService
      .getAllUsers()
      .then((response) => {
        console.log(response);
        // Filtra solo a los usuarios con rol 'professional'
        const professionals = response.data.users.filter(
          (user: any) => user.role === "professional"
        );
        setUsers(professionals);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="p-4 bg-gray-500 h-max">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Lista de Profesionales
      </h2>
      {users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user: any) => (
            <Link
              className="bg-white shadow-md rounded-lg p-4 block"
              href={`/home/client/professional/${user._id}`}
              key={user.email}
            >
              <Image
                src={user.photoUrl}
                width={100}
                height={100}
                alt="profesional"
              />
              <h3 className="text-lg font-bold text-black">{user.name}</h3>
              <p className="text-black">Email: {user.email}</p>
              <p className="text-black">Rol: {user.role}</p>
              {user.phone && (
                <p className="text-black">Teléfono: {user.phone}</p>
              )}
              {user.country && (
                <p className="text-black">País: {user.country}</p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-white">No hay profesionales.</p>
      )}
    </div>
  );
}
