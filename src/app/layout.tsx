import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavbar } from "@/components/navbar/navbar";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import SideBar from "@/components/sidebar/sidebar";

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
      <UserProvider>
        <body>
          <MainNavbar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
