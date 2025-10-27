"use client";
import Btn from "@/UI/BTN/Btn";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import Link from "next/link";

import { MdEmail } from "react-icons/md"
import Image from "next/image";
export default function Home() {
  const token = getCookie("token");
  const role = getCookie("role");
  if (token) {
    if (role === "customer") {
      redirect("/dashboard_customer")
    } else if (role === "owner") {
      redirect("/owner_dashboard")
    }
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src="/tlogo.png"
          alt="Tager.js logo"
          width={180}
          height={38}
        />

        <h1 className="text-5xl sm:text-6xl font-bold text-foreground">
          Tager
        </h1>
        <ol className="flex flex-col gap-4">
          <li>
            <Link href="/Auth/Register/welcome">
              <Btn className="w-full">
                Create Account
              </Btn>
            </Link>
          </li>
          <li>
            <Link href="/Auth/Login">
              <Btn isLight className="w-full">
                <MdEmail />
                <span>Login</span>
              </Btn>
            </Link>
          </li>
          <li>
            <Link href="/dashboard_customer">
              <Btn isLight className="w-full">
                Dashboard of customer
              </Btn>
            </Link>
          </li>
          <li>
            <Link href="/owner_dashboard">
              <Btn isLight className="w-full">
                Dashboard of Owner
              </Btn>
            </Link>
          </li>
        </ol>
      </main>
    </div>
  );
}
