import Btn from "@/UI/BTN/Btn";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <img
          className="inline-block"
          src="/tlogo.png"
          alt="Tager.js logo"
          width={180}
          height={38}
        />

        <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
          Tager
        </h1>

        <div className="flex gap-4 items-center justify-center flex-row w-[100%]">
          <Link href="/Auth/register">
            <Btn isBlock>
              Register
            </Btn>
          </Link>

          <Link href="/">
            <Btn isLight isBlock>
              Login
            </Btn>
          </Link>

        </div>
      </main>
    </div>
  );
}
