import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const baseUrl = process.env.AUTH0_BASE_URL;
export const GET = handleAuth({
  login: handleLogin({
    returnTo: `${baseUrl}/home/`,
    authorizationParams: {
      // Añade aquí los scopes que necesitas
      scope: "openid profile email https://www.googleapis.com/auth/calendar",
      // Otros parámetros de autorización pueden ir aquí
    },
  }),
});
