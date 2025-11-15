"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutTager() {
    return (
        <main id="about" className="flex flex-col mt-[56px] p-2 justify-center items-center px-6 sm:px-16 text-center bg-[#f2f8f7]">
            <motion.h1 initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="text-5xl text-center font-extrabold text-[#009977] mb-6"
            >
                Who Tager?
            </motion.h1>

            <h3 className="max-w-4xl text-lg sm:text-xl leading-relaxed text-gray-700 flex flex-col gap-4">
                <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    <span className="font-semibold text-[#009977]">Tager</span> is one of the most promising projects I’ve been developing —
                    it’s designed to bridge the gap between <span className="font-medium">shop owners</span> and
                    <span className="font-medium">entrepreneurs</span> looking to start or expand their businesses.

                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    It helps <span className="text-[#009977] font-medium">land and shop owners</span> list and rent out their properties, generating steady income with ease.
                    On the other side, it empowers <span className="text-[#009977] font-medium">customers</span> to find suitable shops to rent,
                    helping them establish and grow their businesses effectively.
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    <span className="font-semibold text-[#009977]">Tager</span> acts as a trusted link — allowing owners to make use of underutilized spaces,
                    while giving entrepreneurs affordable and practical options to bring their ideas to life.
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    After leasing, customers get access to a <span className="font-medium">simple, user-friendly dashboard</span>
                    to manage products, track sales, and view detailed reports that help them evaluate and scale their performance.
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                >
                    The platform even allows users to <span className="font-medium">rent multiple spaces</span> at once, supported by a
                    <span className="text-[#009977] font-semibold"> smart, efficient system</span> that monitors every detail seamlessly.
                </motion.div>

            </h3>
        </main>
    )
}