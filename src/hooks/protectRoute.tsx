import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { userService } from "../services/userService";

export default function ProtectRoute() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.email) {
      userService
        .findByEmail(user?.email)
        .then((response: any) => {
          if (response.data.users.length > 0) {
            const role = response.data.users[0].role;
            switch (role) {
              case "professional":
                router.push("/home/calendar");
                break;
              case "client":
                router.push("/home/client");
                break;
              default:
                console.log("no hay rol, llevando a crear usuario");
                router.push("/create");
                break;
            }
          } else {
            console.log("Usuario no encontrado, llevando a crear usuario");
            router.push("/create");
          }
        })
        .catch((error) => {
          console.error("Error realizando la búsqueda del usuario", error);
          router.push("/create");
        });
    }
  }, [user, isLoading, router]);

  return user;
}
