import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { userService } from "../services/userService";

export default function ProtectRoute() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        userService
          .findByEmail(user.email)
          .then((response) => {
            // Asume que la respuesta incluye el rol del usuario en response.data.user.role
            const role = response.data.user.role;

            // Redirige basado en el rol del usuario
            switch (role) {
              case "professional":
                router.push("/home/calendar");
                break;
              case "client":
                router.push("/home/client");
                break;
              default:
                console.log(
                  "Rol no reconocido, redirigiendo a la página principal..."
                );
                router.push("/"); // O cualquier página por defecto para roles no manejados
                break;
            }
          })
          .catch((error) => {
            console.error("Error buscando al usuario", error);
            router.push("/");
          });
      } else {
        router.push("/");
      }
    }
  }, [user, isLoading, router]);

  return user;
}
