"use client";
import { userService } from "@/services/userService";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect, useState } from "react";

export default function InformationPage() {
  const { user, isLoading } = useUser();

  const [formData, setFormData] = useState<any>({
    field: "",
    phoneNumber: "",
    specialty: "",
    experience: "",
    studies: "",
    licenseNumber: "",
    linkedInUrl: "",
    facebookUrl: "",
    githubUrl: "",
    websiteUrl: "",
    bio: "",
  });

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
      userService
        .findByEmail(user.email)
        .then((response: any) => {
          console.log(response.data);
          setFormData({ ...response.data.users[0] });
          setUserId(response.data.users[0]._id);
        })
        .catch((error) =>
          console.error("Error loading professional information", error)
        );
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const operation = userService.updateUser(userId, formData);

    operation
      .then((response) => {
        alert("Professional information saved successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Failed to save professional information", error);
        alert("Failed to save professional information");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Información Profesional
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Completa los siguientes datos para actualizar tu perfil.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {[
              { id: "field", label: "Rubro/Industria", type: "text" },
              { id: "specialty", label: "Especialidad", type: "text" },
              { id: "experience", label: "Años de Experiencia", type: "text" },
              { id: "studies", label: "Estudios", type: "text" },
              { id: "licenseNumber", label: "Matrícula", type: "text" },
              { id: "linkedInUrl", label: "LinkedIn", type: "url" },
              { id: "facebookUrl", label: "Facebook", type: "url" },
              { id: "githubUrl", label: "GitHub", type: "url" },
              { id: "phoneNumber", label: "Numero personal", type: "text" },
              { id: "websiteUrl", label: "Portafolio/Página Web", type: "url" },
            ].map((input) => (
              <div key={input.id} className="py-2">
                <label htmlFor={input.id} className="sr-only">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.id}
                  id={input.id}
                  value={formData?.[input.id] || ""}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={input.label}
                />
              </div>
            ))}
            <div className="py-2">
              <label htmlFor="bio" className="sr-only">
                Biografía / Más Información
              </label>
              <textarea
                name="bio"
                id="bio"
                defaultValue={formData?.bio}
                onChange={handleChange}
                rows={4}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Biografía / Más Información"
              ></textarea>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
