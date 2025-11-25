"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  onClick: string;
}

export const LoginButton = ({ children, mode, asChild, onClick }: LoginButtonProps) => {
  const router = useRouter();

  const clicked = () => {
    router.push(onClick);
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
