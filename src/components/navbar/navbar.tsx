"use client";
import Image from "next/image";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export const MainNavbar = () => {
  const { user, error, isLoading } = useUser();

  return (
    <nav className="bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span className="font-bold">Meet Point</span>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-1"></div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link className="flex items-center space-x-2" href="/home">
                  <span className="text-gray-700">{user.name}</span>
                  {user.picture && (
                    <Image
                      src={user.picture || ""}
                      alt="User Image"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                </Link>
                <a
                  href="/api/auth/logout"
                  className="font-semibold text-gray-900 cursor-pointer"
                >
                  Logout
                </a>
              </>
            ) : (
              <>
                <a
                  href="/api/auth/login"
                  className="font-semibold text-gray-900 cursor-pointer"
                >
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
