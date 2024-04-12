import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import SideBar from "@/components/sidebar/sidebar";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meet Point",
  description: "Created By Ariel Eitner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <UserProvider>
          <body>{children}</body>
        </UserProvider>
      </StoreProvider>
    </html>
  );
}
