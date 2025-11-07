"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function OwnerTager() {
    return (
        <main id="owner" className="bg-[#c0cdda] text-center px-6 py-24 text-gray-800">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-[#097] mb-6"
            >
                Turn Your Space Into Steady Income
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-lg leading-relaxed"
            >
                With <span className="font-semibold text-[#097]">Tager</span>,
                your unused shops or spaces can start working for you.
                List your properties, connect with reliable renters,
                and manage everything through a clear and powerful owner dashboard.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="mt-10 flex justify-center gap-4"
            >
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
            </motion.div>
        </main>
    )
}