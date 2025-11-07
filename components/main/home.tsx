"use client"
import { motion } from "framer-motion"
import Link from "next/link"


export default function HomeTager() {
    return (
        <main id="home" className="flex flex-col mt-[56px] h-[calc(100vh-56px)] items-center justify-center gap-6 text-center bg-white">
            <motion.h3 initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-700">
                Welcome To
            </motion.h3>
            <motion.h1 initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-6xl font-extrabold text-[#009977]"
            >
                Tager Platform
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-2xl text-gray-500"
            >
                Let's get started
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="flex gap-4 mt-6"
            >
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
            </motion.div>
        </main>
    )
}