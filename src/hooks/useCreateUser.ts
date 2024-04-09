import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
// import { userService } from "@/services/userService/userService";
import { CreateUser } from "@/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";
import { userService } from "@/services/userService";

export function useCreateUser() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [createUserForm, setCreateUser] = useState<CreateUser>({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    role: "client",
  });

  useEffect(() => {
    if (user && !isLoading) {
      setCreateUser((prevState) => ({
        ...prevState,
        name: user.given_name + " " + user.family_name || prevState.name,
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
    try {
      const response = await userService.createUser(createUserForm);
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
