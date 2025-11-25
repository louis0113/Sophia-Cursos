"use client";

import { loginGithub, loginGoogle } from "@/app/lib/actions/auth";
import { Button } from "@/components/ui/button";
export const SignInButton = () => {
  return (
    <div>
      <Button size="lg" variant="redsea" onClick={() => loginGithub()}>
        Sign with Github
      </Button>

      <Button onClick={() => loginGoogle()}>Sign with Google</Button>
    </div>
  );
};
