import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";
import { userService } from "@/services/userService";

export function useCreateUser() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [createUserForm, setCreateUser] = useState<CreateUser>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: "",
    role: "client",
  });

  useEffect(() => {
    if (user && !isLoading) {
      setCreateUser((prevState: any) => ({
        ...prevState,
        firstName: user.given_name || prevState.firstName,
        lastName: user.family_name || prevState.lastName,
        email: user.email || prevState.email,
      }));
    }
  }, [user, isLoading]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCreateUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.entries(createUserForm).reduce(
      (acc: any, [key, value]) => {
        // Solo normaliza los campos de tipo string
        acc[key] = typeof value === "string" ? value.toLowerCase() : value;
        return acc;
      },
      {} as CreateUser
    );
    try {
      const response = await userService.createUser(formData);
      if (response.status === 201 || response.status === 200) {
        router.push("/home");
      } else {
        console.error("Error al crear usuario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  return { createUserForm, handleChange, handleSubmit };
}
