"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Join_Us() {
    return (
        <main id="Join_Us" className="bg-[#097] text-white text-center px-6 py-24 flex flex-col items-center justify-center">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-6"
            >
                Ready to Experience the Future of Smart Business?
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-lg max-w-xl leading-relaxed mb-10"
            >
                Join <span className="font-semibold">Tager</span> today and take the first step
                toward managing your shop, products, and growth — all in one simple platform.
            </motion.p>
            <Link href="/Auth/Register/welcome">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white text-[#097] font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-gray-100 transition cursor-pointer">
                    Get Started
                </motion.button>
            </Link>
        </main>
    )
}