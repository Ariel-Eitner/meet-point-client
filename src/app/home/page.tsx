"use client";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-70 flex-col space-y-4 bg-gray-500 pr-10">
      <p className="text-4xl">Cargando información...</p>
      <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-blue-800"></div>
    </div>
  );
}
