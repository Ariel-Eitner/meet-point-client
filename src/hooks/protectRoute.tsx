import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { userService } from "../services/userService";
import { useAppDispatch } from "@/app/lib/hooks";
import { setUserInformation } from "@/app/lib/features/userInformation/userSlice";
import { useDispatch } from "react-redux";
import { businessHoursService } from "@/services/businessHoursService";
import { setBusinessHours } from "@/app/lib/features/businessHours/businessHoursSlice";
import { appointmentService } from "@/services/appointmentService";
import { setAppointments } from "@/app/lib/features/appointments/appointmentsSlice";

export default function ProtectRoute() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && user?.email) {
      userService
        .findByEmail(user.email)
        .then(async (userResponse) => {
          const userData = userResponse.data.users[0];
          if (!userData) {
            console.log("Usuario no encontrado, llevando a crear usuario");
            router.push("/create");
            return;
          }
          dispatch(setUserInformation(userData));

          if (userData.role === "professional") {
            try {
              const businessHourResponse =
                await businessHoursService.findByProfessionalId(userData._id);

              if (businessHourResponse.data) {
                dispatch(setBusinessHours(businessHourResponse.data));
              } else {
                // Si no hay horas de negocio, redirigir sin error
                console.log(
                  "No se encontraron horas de negocio, redirigiendo para configuración"
                );
                router.push("/home/business");
                return;
              }

              const appointmentResponse =
                await appointmentService.findAllByUser(userData._id);
              if (appointmentResponse.data) {
                dispatch(setAppointments(appointmentResponse.data));
              }

              router.push("/home/calendar");
            } catch (error: any) {
              if (error.response && error.response.status === 404) {
                // Manejo específico para el caso de 404
                console.log(
                  "No se encontraron horas de negocio, redirigiendo para configuración"
                );
                router.push("/home/business");
              } else {
                // Manejo de otros errores inesperados
                console.error("Error cargando horas de negocio:", error);
              }
            }
          } else if (userData.role === "client") {
            router.push("/home/client");
          } else {
            console.log("No hay rol, llevando a crear usuario");
            router.push("/create");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Si la búsqueda de usuario falla por no encontrarlo, redirigir para crearlo
            console.log("Usuario no encontrado, llevando a crear usuario");
            router.push("/create");
          } else {
            // Manejo de otros errores inesperados
            console.error("Error realizando la búsqueda del usuario:", error);
          }
        });
    }
  }, [user, isLoading, router, dispatch]);

  return user;
}
