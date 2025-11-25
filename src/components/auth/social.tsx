"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { loginGoogle, loginGithub } from "@/app/lib/actions/auth";

export const Social = () => {
  return (
    <div className=" flex items-center gap-x-2 w-full">
      <Button
        size="lg"
        className="w-45"
        variant="outline"
        onClick={loginGoogle}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>

      <Button
        size="lg"
        className="w-45"
        variant="outline"
        onClick={loginGithub}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
