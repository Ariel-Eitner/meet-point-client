"use client";
import { setUserInformation } from "@/app/lib/features/userInformation/userSlice";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { userService } from "@/services/userService";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/app/lib/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
export default function InformationPage() {
  const { user, isLoading } = useUser();
  const dispatch = useAppDispatch();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const userInformation = useAppSelector((state) => state.user.userInformation);

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

  const handleDeleteUser = async () => {
    const confirmDelete = confirm(
      "Esta acción es irreversible y eliminará todos tus datos, incluyendo email, citas, horarios, etc. ¿Deseas continuar?"
    );
    if (confirmDelete) {
      try {
        if (userInformation.photoUrl) {
          const photoRef = ref(storage, userInformation.photoUrl);
          await deleteObject(photoRef);
        }
        await userService.deleteUser(userInformation._id);
        alert("Usuario eliminado correctamente.");
        setFormData({});
        dispatch(setUserInformation({}));
        router.push("/api/auth/logout");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert("Error al eliminar el usuario.");
      }
    }
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert("File is too large. Maximum size is 2MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    setFile(file);
    setIsUploading(true);
    try {
      if (userInformation.photoUrl) {
        const photoRef = ref(storage, userInformation.photoUrl);
        await deleteObject(photoRef);
      }
      const fileRef = ref(storage, `profileImages/${uuidv4()}`);
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);

      setFormData((prevState: any) => ({
        ...prevState,
        photoUrl: photoURL,
      }));

      console.log(photoURL);
      console.log(formData);
    } catch (error) {
      console.error("Error uploading file: ", error);
      alert("Error uploading file");
    }
    setIsUploading(false); // Finaliza el indicador de carga
  };
  useEffect(() => {
    const updateUserData = async () => {
      if (formData.photoUrl) {
        // Asegúrate de que photoUrl no esté vacío
        try {
          // Llama a userService.updateUser con la última versión de formData
          const response = await userService.updateUser(
            userInformation._id,
            formData
          );
          console.log(response);
          dispatch(setUserInformation(response.data.user));
          console.log("User updated with new photo URL");
        } catch (error) {
          console.error("Error updating user: ", error);
          alert("Error updating user");
        }
      }
    };

    updateUserData();
  }, [formData.photoUrl]);

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

    // if (file) {
    //   try {
    //     const fileRef = ref(storage, `profileImages/${uuidv4()}`);
    //     const snapshot = await uploadBytes(fileRef, file);
    //     const photoURL = await getDownloadURL(snapshot.ref);
    //     console.log(photoURL);

    //     // Actualizar el formData con la nueva photoURL
    //     updatedFormData.photoUrl = photoURL;
    //     console.log(updatedFormData);

    //     setFile(null);
    //   } catch (error) {
    //     console.error("Error uploading file:", error);
    //     alert("Error uploading file");
    //     return; // Salir de la función en caso de error
    //   }
    // }

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
          <div className="flex flex-col items-center justify-center space-y-4 text-black">
            <Image
              src={userInformation.photoUrl}
              alt="User Image"
              width={150}
              height={150}
              className="rounded-full object-cover text-black"
            />
            {isUploading ? (
              <div className="text-black">Cargando...</div>
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
                  accept="image/jpeg, image/png"
                />
                <p className="text-xs mt-2">
                  Tamaño máximo: 2MB. Formatos permitidos: JPG, PNG.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-black">
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
                  accept="image/jpeg, image/png"
                />
                <p className="text-xs mt-2">
                  Tamaño máximo: 2MB. Formatos permitidos: JPG, PNG.
                </p>
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
        <button
          onClick={handleDeleteUser}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Eliminar Usuario
        </button>
      </div>
    </div>
  );
}
