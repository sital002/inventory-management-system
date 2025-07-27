import React from "react";
import { LoginPage } from "./_components/login-page";
import { isAuthenticated } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) redirect("/dashboard");
  return (
    <div>
      <LoginPage />
    </div>
  );
}
