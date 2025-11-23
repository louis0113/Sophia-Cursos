"use client";

import { loginGithub, loginGoogle } from "@/app/lib/actions/auth";
export const SignInButton = () => {
  return (
    <div>
      <button className="bg-blue-200 " onClick={() => loginGithub()}>
        Sign with Github
      </button>

      <button className="bg-red-200" onClick={() => loginGoogle()}>
        Sign with Google
      </button>
    </div>
  );
};
