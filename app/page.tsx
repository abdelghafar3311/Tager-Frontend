
import Link from "next/link";


import Image from "next/image";



export default function Home() {

  return (
    <div className="">
      <header className="flex items-center justify-between px-4 py-2 gap-1.5 shadow fixed top-0 left-0 right-0 w-full" style={{ backdropFilter: "blur(6px)", backgroundColor: "#ffffff18" }}>
        <div className="flex items-center gap-2 flex-row">
          <Image src="/tlogo.png" alt="logo" width={40} height={40} />
          <h3 className="text-[14px] text-[#097] font-extrabold">Tager</h3>
        </div>
        <div className="flex items-center gap-4">
          <a href="#home" className="text-[14px] text-gray-500 transition hover:text-gray-700">Home</a>
          <a href="#about" className="text-[14px] text-gray-500 transition hover:text-gray-700">About</a>
          <a href="#customer" className="text-[14px] text-gray-500 transition hover:text-gray-700">Customer</a>
          <a href="#owner" className="text-[14px] text-gray-500 transition hover:text-gray-700">Owner</a>
          <a href="#Join_Us" className="text-[14px] text-gray-500 transition hover:text-gray-700">Join Us</a>
        </div>
      </header>
      <main id="home" className="flex flex-col mt-[56px] h-[calc(100vh-56px)] items-center justify-center gap-6 text-center bg-white">
        <h3 className="text-4xl font-bold text-gray-700">Welcome To</h3>
        <h1 className="text-6xl font-extrabold text-[#009977]">Tager Platform</h1>
        <p className="text-2xl text-gray-500">Let's get started</p>

        <div className="flex gap-4 mt-6">
          <Link href="/Auth/Login">
            <button className="px-6 cursor-pointer py-3 rounded-xl text-lg font-semibold text-white transition bg-[#009977] hover:bg-[#008066]">
              Login
            </button>
          </Link>
          <Link href="/Auth/Register/welcome">
            <button className="px-6 cursor-pointer py-3 rounded-xl text-lg font-semibold text-[#009977] bg-gray-100 hover:bg-gray-200 transition">
              Create New Account
            </button>
          </Link>
        </div>
      </main>
      <main id="about" className="flex flex-col mt-[56px] p-2 items-center justify-center px-6 sm:px-16 text-center bg-[#f2f8f7]">
        <h1 className="text-5xl font-extrabold text-[#009977] mb-6">Who Tager?</h1>

        <h3 className="max-w-4xl text-lg sm:text-xl leading-relaxed text-gray-700">
          <span className="font-semibold text-[#009977]">Tager</span> is one of the most promising projects I’ve been developing —
          it’s designed to bridge the gap between <span className="font-medium">shop owners</span> and
          <span className="font-medium">entrepreneurs</span> looking to start or expand their businesses.
          <br /><br />
          It helps <span className="text-[#009977] font-medium">land and shop owners</span> list and rent out their properties, generating steady income with ease.
          On the other side, it empowers <span className="text-[#009977] font-medium">customers</span> to find suitable shops to rent,
          helping them establish and grow their businesses effectively.
          <br /><br />
          <span className="font-semibold text-[#009977]">Tager</span> acts as a trusted link — allowing owners to make use of underutilized spaces,
          while giving entrepreneurs affordable and practical options to bring their ideas to life.
          <br /><br />
          After leasing, customers get access to a <span className="font-medium">simple, user-friendly dashboard</span>
          to manage products, track sales, and view detailed reports that help them evaluate and scale their performance.
          <br /><br />
          The platform even allows users to <span className="font-medium">rent multiple spaces</span> at once, supported by a
          <span className="text-[#009977] font-semibold"> smart, efficient system</span> that monitors every detail seamlessly.
        </h3>
      </main>

      <main id="customer" className="bg-gray-50 text-center px-6 py-24 text-gray-800">
        <h1 className="text-4xl font-bold text-[#097] mb-6">
          Build Your Business, Not the Hassle
        </h1>

        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          With <span className="font-semibold text-[#097]">Tager</span>, finding and renting the right shop
          for your business is easier than ever.
          Manage your products, track your sales, and monitor your performance —
          all in one clear and powerful dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/Auth/Register/re-customer">
            <button className="bg-[#097] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-90 transition cursor-pointer">
              Let's Create Your Project
            </button>
          </Link>
          <Link href="/Auth/Login">
            <button className="border-2 border-[#097] text-[#097] font-semibold py-3 px-6 rounded-xl hover:bg-[#097]/10 transition cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </main>

      <main id="owner" className="bg-[#c0cdda] text-center px-6 py-24 text-gray-800">
        <h1 className="text-4xl font-bold text-[#097] mb-6">
          Turn Your Space Into Steady Income
        </h1>

        <p className="max-w-2xl mx-auto text-lg leading-relaxed">
          With <span className="font-semibold text-[#097]">Tager</span>,
          your unused shops or spaces can start working for you.
          List your properties, connect with reliable renters,
          and manage everything through a clear and powerful owner dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/Auth/Register/re-owner">
            <button className="bg-[#097] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:opacity-90 transition cursor-pointer">
              List Your Property
            </button>
          </Link>
          <Link href="/Auth/Login">
            <button className="border-2 border-[#097] text-[#097] font-semibold py-3 px-6 rounded-xl hover:bg-[#097]/10 transition cursor-pointer">
              View Owner Dashboard
            </button>
          </Link>
        </div>
      </main>

      <main id="Join_Us" className="bg-[#097] text-white text-center px-6 py-24 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">
          Ready to Experience the Future of Smart Business?
        </h1>
        <p className="text-lg max-w-xl leading-relaxed mb-10">
          Join <span className="font-semibold">Tager</span> today and take the first step
          toward managing your shop, products, and growth — all in one simple platform.
        </p>
        <Link href="/Auth/Register/welcome">
          <button className="bg-white text-[#097] font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-gray-100 transition cursor-pointer">
            Get Started
          </button>
        </Link>
      </main>

      <footer className="w-full py-4 bg-[#111] text-center text-gray-300 text-sm">
        <p>
          Developed by <span className="text-[#09b] font-semibold">Abdelghafar Nagy</span> — Full Stack Developer
        </p>
      </footer>


    </div>
  );
}
