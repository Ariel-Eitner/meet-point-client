"use client";
import { setUserInformation } from "@/app/lib/features/userInformation/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { userService } from "@/services/userService";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/lib/firebase/firebase";
import { v4 as uuidv4 } from "uuid";

export default function InformationPage() {
  const { user, isLoading } = useUser();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: any) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsUploading(true); // Inicia el indicador de carga
      try {
        const fileRef = ref(storage, `profileImages/${uuidv4()}`);
        const snapshot = await uploadBytes(fileRef, e.target.files[0]);
        const photoURL = await getDownloadURL(snapshot.ref);

        // Aquí actualizas formData con el nuevo photoURL antes de enviarlo
        setFormData({ ...formData, photoUrl: photoURL });

        // Asumiendo que quieras actualizar inmediatamente el perfil del usuario con la nueva foto
        // Puedes hacer el llamado a la API aquí o más tarde en handleSubmit

        console.log(photoURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
        alert("Error uploading file");
      }
      setIsUploading(false); // Finaliza el indicador de carga
    }
  };

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
    photoUrl: "",
  });
  const userInformation = useAppSelector((state) => state.user.userInformation);
  console.log(userInformation, " que se yooo");

  useEffect(() => {
    setFormData({ ...userInformation });
  }, [userInformation]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Nuevo objeto formData para acumular los datos a enviar
    let updatedFormData = { ...formData };

    if (file) {
      try {
        const fileRef = ref(storage, `profileImages/${uuidv4()}`);
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(snapshot.ref);
        console.log(photoURL);

        // Actualizar el formData con la nueva photoURL
        updatedFormData.photoUrl = photoURL;
        console.log(updatedFormData);

        setFile(null); // Restablecer el archivo después de la carga
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
        return; // Salir de la función en caso de error
      }
    }

    // Usar updatedFormData que incluye la nueva photoUrl si se subió una imagen
    const operation = userService.updateUser(
      userInformation._id,
      updatedFormData
    );

    operation
      .then((response) => {
        alert("Professional information saved successfully");
        console.log(response.data);
        dispatch(setUserInformation(response.data.user));
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
        {userInformation && userInformation.photoUrl ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src={userInformation.photoUrl}
              alt="User Image"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
            {isUploading ? (
              <div>Cargando...</div>
            ) : (
              <>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cambiar foto
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {isUploading ? (
              <div>Cargando...</div>
            ) : (
              <>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Subir foto
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}
          </div>
        )}

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
