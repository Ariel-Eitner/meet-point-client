"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function ProtectRoute() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (!user && !isLoading) {
    router.push("/");
  }
  return user;
}
