// layouts/homeLayout.tsx

import SideBar from "@/components/sidebar/sidebar";
import { metadata as rootMetadata } from "../layout";
import type { Metadata } from "next";

// Extiende o sobrescribe los metadatos para la página Home
export const metadata: Metadata = {
  ...rootMetadata,
  title: "Meet Point | Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideBar />
      <main className="flex-1 ml-64">{children}</main>
    </>
  );
}
