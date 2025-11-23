"use client";

import { logout } from "@/app/lib/actions/auth";

export const SignOutButton = () => {
  return (
    <button
      className="bg-green-200 radius p-10"
      onClick={() => {
        logout();
      }}
    >
      Logout
    </button>
  );
};
