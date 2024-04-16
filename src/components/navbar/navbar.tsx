"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export const MainNavbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{ backgroundColor: "#EFEFE8" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            {/* Logo and website name */}
            <a href="/" className="py-5 px-2 text-gray-700 hover:text-gray-900">
              <span className="font-bold">Meet Point</span>
            </a>
          </div>

          {/* Menu button for mobile view */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  color="#000000"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div
            className={`md:flex items-center space-x-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            {user ? (
              <>
                <Link
                  className="flex items-center space-x-2 text-gray-700"
                  href="/home"
                >
                  <span>{user.name}</span>
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
              <a
                href="/api/auth/login"
                className="md:hidden font-semibold text-gray-900 cursor-pointer"
              >
                Login
              </a>
            )}
          </div>
          {/* Show login button on md screens and above */}
          {!user && (
            <a
              href="/api/auth/login"
              className="hidden md:block font-semibold text-gray-900 cursor-pointer"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};
