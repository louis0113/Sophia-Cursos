import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-blue-600">
      <Image src="/logo.png" alt="logo" height={300} width={300}></Image>'{" "}
      <h1 className="p-12"></h1>'
    </div>
  );
}
