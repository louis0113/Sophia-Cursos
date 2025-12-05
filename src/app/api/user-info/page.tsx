import { auth } from "@/auth";
import Image from "next/image";
import { SignOutButton } from "@/components/sign-out-button";

export default async function UserInfo() {
  const session = await auth();

  return (
    <div className="bg-gray-100">
      <h1>NextJS 15 e NextAuth V5</h1>
      <p>User signed with name {session?.user?.name}</p>
      <p> User signed with email {session?.user?.email}</p>
      <p>Your role is "{session?.user?.role}"</p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={100}
          height={100}
          alt={session.user.name ?? "Avatar"}
          style={{ borderRadius: "50%" }}
        ></Image>
      )}
      <SignOutButton />
    </div>
  );
}
