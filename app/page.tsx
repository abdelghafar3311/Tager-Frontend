
import Link from "next/link";


import Image from "next/image";

/**
 =========================== 
 components of @main_page
 ===========================
 */

import HomeTager from "@/components/main/home";
import AboutTager from "@/components/main/about";
import CustomerTager from "@/components/main/customer";
import OwnerTager from "@/components/main/owner";
import Join_Us from "@/components/main/Join_Us";

export default function Home() {

  return (
    <div className="">
      <header className="flex items-center justify-between px-4 py-2 gap-1.5 shadow fixed top-0 left-0 right-0 w-full" style={{ backdropFilter: "blur(6px)", backgroundColor: "#ffffff18" }}>
        <div className="flex items-center gap-2 flex-row">
          <Image src="/tlogo.png" alt="logo" width={40} height={40} />
          <h3 className="text-[14px] text-[#097] font-extrabold">Tager</h3>
        </div>
        <div className="flex items-center gap-4">
          <a href="#home" className="text-[12px] text-gray-500 transition hover:text-gray-700">Home</a>
          <a href="#about" className="text-[12px] text-gray-500 transition hover:text-gray-700">About</a>
          <a href="#customer" className="text-[12px] text-gray-500 transition hover:text-gray-700">Customer</a>
          <a href="#owner" className="text-[12px] text-gray-500 transition hover:text-gray-700">Owner</a>
          <a href="#Join_Us" className="text-[12px] text-gray-500 transition hover:text-gray-700">Join Us</a>
        </div>
      </header>
      <HomeTager />
      <AboutTager />
      <CustomerTager />
      <OwnerTager />
      <Join_Us />
      <footer className="w-full py-4 bg-[#111] text-center text-gray-300 text-sm">
        <p>
          Developed by <span className="text-[#09b] font-semibold">Abdelghafar Nagy</span> — Full Stack Developer
        </p>
      </footer>


    </div>
  );
}
