import { MainNavbar } from "@/components/navbar/navbar";
import ClipLogo from "../../public/clip.svg";

export default function Home() {
  return (
    <>
      <MainNavbar />

      <div
        className="flex flex-col items-center justify-evenly h-screen  px-4"
        style={{
          backgroundColor: "#EFEFE8",
          fontFamily: "serif",
          fontWeight: "lighter",
        }}
      >
        <div className="flex items-baseline">
          <h1
            className="text-5xl font-thin"
            style={{ color: "#2D4737", fontWeight: "lighter" }}
          >
            MEET POINT
          </h1>
          <span className="flex m-0 p-0">
            <img
              src="/clip.svg"
              alt="Clip Logo"
              className="w-9 h-9 rotate-12"
            />
            <img
              src="/clip.svg"
              alt="Clip Logo"
              className="w-9 h-9 transform rotate-45 -ml-5 mt-2"
            />
          </span>
        </div>
        <div className="mx-auto max-w-2xl">
          <p
            className="text-center mb-8 text-2xl tracking-widest"
            style={{ color: "#2D4737" }}
          >
            Hola
            <br />
            Somos tu plataforma de encuentro
            <br />
            Nuestro fin es facilitarte la conectividad con
            <br />
            diversas herramientas y servicios.
            <br />
            Sigue scrolleando para cubrir tu necesidad y no
            <br />
            olvides registrarte para mejorar tu experiencia
          </p>
        </div>
        <div className="flex  space-x-32 ">
          <div className="text-center flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full mb-2"
              style={{ backgroundColor: "#2D4737" }}
            ></div>
            <p className="text-gray-700">María Perez</p>
            <p className="text-sm text-gray-600">Psicología integral</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div
              className="w-16 h-16  rounded-full mb-2"
              style={{ backgroundColor: "#2D4737" }}
            ></div>
            <p className="text-gray-700">Sofía Lopez</p>
            <p className="text-sm text-gray-600">Licenciada en Biología</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full mb-2"
              style={{ backgroundColor: "#2D4737" }}
            ></div>
            <p className="text-gray-700">Mario Alonso</p>
            <p className="text-sm text-gray-600">Profesor de Matemáticas</p>
          </div>
        </div>
      </div>
    </>
  );
}
