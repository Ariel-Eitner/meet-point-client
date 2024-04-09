"use client";
import { professionalInfoService } from "@/services/professionalInfoService";
import React, { useEffect, useState } from "react";

export default function InformationPage() {
  // Definir el estado inicial para almacenar los datos del formulario
  const [formData, setFormData] = useState<any>({
    _id: "",
    field: "",
    specialty: "",
    experience: "",
    studies: "",
    licenseNumber: "",
    linkedin: "",
    facebook: "",
    github: "",
    portfolio: "",
    biography: "",
  });
  const userId = "66156fe98b1a0027d5565891"; // Este valor debe obtenerse dinámicamente

  useEffect(() => {
    professionalInfoService
      .findOneByUserId(userId) // Cambia aquí para usar el nuevo método
      .then((response) => {
        const data = response.data.professionalInfo; // Ajusta según la estructura de tu respuesta
        console.log(data, " de aca");
        // No es necesario verificar si data.length > 0, ya que se espera un objeto, no un array
        setFormData(data);
      })
      .catch((error) =>
        console.error("Error loading professional information", error)
      );
  }, [userId]); // Asume que `userId` es una dependencia de este efecto

  // Manejar el cambio en los campos del formulario
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Asumiendo que formData incluye un campo `_id` si se está editando un registro existente.
    const operation = formData._id
      ? professionalInfoService.update(formData._id, { ...formData, userId })
      : professionalInfoService.create({ ...formData, userId });

    operation
      .then((response) => {
        alert("Professional information saved successfully");
        console.log(response.data);
        // Actualiza el estado con la información recién creada/actualizada para incluir el _id, etc.
        setFormData(response.data.data);
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
              { id: "field", label: "Rubro", type: "text" },
              { id: "specialty", label: "Especialidad", type: "text" },
              { id: "experience", label: "Años de Experiencia", type: "text" },
              { id: "studies", label: "Estudios", type: "text" },
              { id: "licenseNumber", label: "Matrícula", type: "text" },
              { id: "linkedin", label: "LinkedIn", type: "url" },
              { id: "facebook", label: "Facebook", type: "url" },
              { id: "github", label: "GitHub", type: "url" },
              { id: "portfolio", label: "Portafolio", type: "url" },
            ].map((input) => (
              <div key={input.id} className="py-2">
                <label htmlFor={input.id} className="sr-only">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.id}
                  id={input.id}
                  value={formData[input.id]}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder={input.label}
                />
              </div>
            ))}
            <div className="py-2">
              <label htmlFor="biography" className="sr-only">
                Biografía / Más Información
              </label>
              <textarea
                name="biography"
                id="biography"
                defaultValue={formData.biography}
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
