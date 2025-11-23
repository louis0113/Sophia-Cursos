import Image from "next/image";
import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";
import { SignIn } from "@/components/sign-in";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <Link className="bg-gray-100" href="/api/user-info">
          {" "}
          Profile
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-yellow-700">
      <div className="bg-blue-600">
        <Image src="/logo.png" alt="logo" height={300} width={300}></Image>
        <h1 className="p-12"></h1>
      </div>
      <SignIn />
      <SignInButton />
      <Link className="text-gray-50" href="/api/auth/register">
        Sign up with us
      </Link>
    </div>
  );
}
