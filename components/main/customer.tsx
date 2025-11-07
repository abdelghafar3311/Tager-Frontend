"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CustomerTager() {
    return (
        <main id="customer" className="bg-gray-50 text-center px-6 py-24 text-gray-800">
            <motion.h1 initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-[#097] mb-6"
            >
                Build Your Business, Not the Hassle
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg leading-relaxed"
            >
                With <span className="font-semibold text-[#097]">Tager</span>, finding and renting the right shop
                for your business is easier than ever.
                Manage your products, track your sales, and monitor your performance —
                all in one clear and powerful dashboard.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="mt-10 flex justify-center gap-4"
            >
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
            </motion.div>
        </main>
    )
}