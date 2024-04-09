import { MainNavbar } from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MainNavbar />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center mt-2">
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold">Bienvenido a Meet Point</h1>
            <p className="mt-4">
              Meet Point no es solo una plataforma en línea; es una revolución
              en el acceso que une a pacientes y profesionales en un entorno
              digital seguro y amigable. Descubre lo que puedes hacer en Meet
              Point:
            </p>
            <ul className="list-disc pl-5 mt-4">
              <li>
                <strong>Expandir Alcance:</strong> Si eres un profesional de
                cualquier rubro, regístrate y proyecta tus servicios a una
                comunidad en línea creciente, llegando a clientes que realmente
                necesitan tu experiencia.
              </li>
              <li>
                <strong>Conexión Directa:</strong> Como cliente, accede a un
                directorio extenso de profesionales, encuentra el que mejor se
                ajuste a tus necesidades y comunícate con ellos de manera
                sencilla y directa.
              </li>
            </ul>
            <p className="mt-4">
              En Meet Point, la seguridad y la privacidad de tu información son
              nuestra máxima prioridad. Adoptamos protocolos de seguridad
              avanzados y garantizamos que tu historial se guarda en un ambiente
              encriptado, otorgándote el control total sobre quién puede verlo.
              Con nosotros, tu información están en las mejores manos.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-4 flex justify-center"></div>
        </div>
        <div className="mt-12 mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Conozca a nuestros profesionales
            </h2>
            <p className="mt-2">
              Breve descripción de los profesionales y sus especialidades.
            </p>
          </div>
          <div className="flex items-center justify-between mt-8">
            <div className="flex justify-center items-center w-10"></div>
            <div className="flex overflow-hidden justify-center items-center">
              <div className="flex space-x-4"></div>
            </div>
            <div className="flex justify-center items-center w-10"></div>
          </div>
        </div>
      </div>
    </>
  );
}
