"use client";
import ProtectRoute from "@/hooks/protectRoute";
import { userService } from "@/services/userService";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SideBar() {
  const user = ProtectRoute();

  const [userRole, setUserRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) {
        return;
      }

      try {
        const userResponse = await userService.findByEmail(user.email);
        if (userResponse.data.users && userResponse.data.users[0].role) {
          const role = userResponse.data.users[0].role;
          setUserRole(role);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error al buscar los datos del usuario:", error);
      }
    };
    fetchUser();
  }, [user]);

  const renderLinks = () => {
    if (userRole === "professional") {
      return (
        <>
          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className="flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300 "
            href="/home/calendar"
          >
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Calendario
          </Link>

          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className="flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
            href="/home/business"
          >
            <svg
              width="23px"
              height="23px"
              viewBox="-0.5 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z"
                transform="translate(-107 -152)"
              />
            </svg>
            Organizar horarios
          </Link>

          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className=" flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
            href="/home/appointments"
          >
            <svg
              fill="#000000"
              width="25px"
              height="25px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M84 0v1423.143h437.875V1920l621.235-496.857h692.39V0H84Zm109.469 109.464H1726.03V1313.57h-621.235l-473.452 378.746V1313.57H193.469V109.464Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Citas
          </Link>
          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className="flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
            href="/home/information"
          >
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12.75 15V16.5H11.25V15H12.75ZM10.5 10.4318C10.5 9.66263 11.1497 9 12 9C12.8503 9 13.5 9.66263 13.5 10.4318C13.5 10.739 13.3151 11.1031 12.9076 11.5159C12.5126 11.9161 12.0104 12.2593 11.5928 12.5292L11.25 12.7509V14.25H12.75V13.5623C13.1312 13.303 13.5828 12.9671 13.9752 12.5696C14.4818 12.0564 15 11.3296 15 10.4318C15 8.79103 13.6349 7.5 12 7.5C10.3651 7.5 9 8.79103 9 10.4318H10.5Z"
                fill="#080341"
              />
            </svg>
            Informacion Personal
          </Link>
        </>
      );
    } else if (userRole === "client") {
      return (
        <>
          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className="flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
            href="/home/client"
          >
            <svg
              width="23px"
              height="23px"
              viewBox="-0.5 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                fill-rule="evenodd"
                d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z"
                transform="translate(-107 -152)"
              />
            </svg>
            Buscar profesionales
          </Link>
          <Link
            style={{ alignItems: "center", gap: "10px" }}
            className="flex px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg shadow-sm hover:bg-gray-300"
            href="/home/appointments"
          >
            <svg
              width="23px"
              height="23px"
              viewBox="-0.5 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                fill-rule="evenodd"
                d="M107,154.006845 C107,153.45078 107.449949,153 108.006845,153 L119.993155,153 C120.54922,153 121,153.449949 121,154.006845 L121,165.993155 C121,166.54922 120.550051,167 119.993155,167 L108.006845,167 C107.45078,167 107,166.550051 107,165.993155 L107,154.006845 Z M108,157 L120,157 L120,166 L108,166 L108,157 Z M116.5,163.5 L116.5,159.5 L115.757485,159.5 L114.5,160.765367 L114.98503,161.275112 L115.649701,160.597451 L115.649701,163.5 L116.5,163.5 Z M112.5,163.5 C113.412548,163.5 114,163.029753 114,162.362119 C114,161.781567 113.498099,161.473875 113.110266,161.433237 C113.532319,161.357765 113.942966,161.038462 113.942966,160.550798 C113.942966,159.906386 113.395437,159.5 112.505703,159.5 C111.838403,159.5 111.359316,159.761248 111.051331,160.115385 L111.456274,160.632075 C111.724335,160.370827 112.055133,160.231495 112.425856,160.231495 C112.819392,160.231495 113.13308,160.382438 113.13308,160.690131 C113.13308,160.974601 112.847909,161.102322 112.425856,161.102322 C112.28327,161.102322 112.020913,161.102322 111.952471,161.096517 L111.952471,161.839623 C112.009506,161.833817 112.26616,161.828012 112.425856,161.828012 C112.956274,161.828012 113.190114,161.967344 113.190114,162.275036 C113.190114,162.565312 112.93346,162.768505 112.471483,162.768505 C112.10076,162.768505 111.684411,162.605951 111.427757,162.327286 L111,162.87881 C111.279468,163.227141 111.804183,163.5 112.5,163.5 Z M110,152.5 C110,152.223858 110.214035,152 110.504684,152 L111.495316,152 C111.774045,152 112,152.231934 112,152.5 L112,153 L110,153 L110,152.5 Z M116,152.5 C116,152.223858 116.214035,152 116.504684,152 L117.495316,152 C117.774045,152 118,152.231934 118,152.5 L118,153 L116,153 L116,152.5 Z"
                transform="translate(-107 -152)"
              />
            </svg>
            Mis Citas 12
          </Link>
        </>
      );
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col bg-white shadow-lg w-64 z-50">
      <div className="px-4 py-6">
        <h1 className="text-xl font-semibold text-gray-700">{user?.name}</h1>
      </div>
      <div className="flex flex-col px-4">{renderLinks()}</div>
      <div className="mt-auto px-4 py-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center space-x-2 font-semibold bg-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 w-full"
        >
          {user?.picture && (
            <Image
              src={user.picture}
              alt="User Image"
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
          <span className="text-gray-900">{user?.name}</span>
        </button>

        {isMenuOpen && (
          <div className="absolute  bottom-20 mt-2 w-56 bg-gray-200  hover:bg-gray-100 rounded-md shadow-lg z-50">
            <ul className="py-1 z-50">
              <li>
                <a
                  href="/api/auth/logout"
                  // onClick={handleLogout}
                  className="block px-4 py-2 font-semibold text-sm text-gray-700  z-50"
                >
                  Cerrar sesión
                </a>
              </li>
              {/* Agrega aquí más opciones al menú si es necesario */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
