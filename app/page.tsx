import Image from "next/image";
import InputField from "./InputField";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">SavefromJahk</h1>
      <div className="flex flex-col gap-20 items-center mt-20">
      <InputField />
      <h3 className="absolute bottom-5">Free video downloader</h3>
      </div>
    </main>
  );
}
