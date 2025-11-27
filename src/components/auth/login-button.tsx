"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const clicked = () => {
    router.push("/login");
  };

  if (mode == "modal") {
    return <span>TODO: implement modal mode</span>;
  }

  return (
    <span onClick={clicked} className="cursor-pointer">
      {children}
    </span>
  );
};
