"use client"
import { useState } from "react"
import Image from "next/image"
import { BsList } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";

import { motion, Variants } from "framer-motion"

const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Customer", id: "customer" },
    { label: "Owner", id: "Owner" },
    { label: "Join Us", id: "Join_Us" }
];

const container: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            staggerChildren: 0.12,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.25, ease: "easeOut" },
    },
};

export default function HeaderMainPage() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-row">
                        <Image src="/tlogo.png" alt="logo" width={40} height={40} />
                        <h3 className="text-[14px] text-[#097] font-extrabold">Tager</h3>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
                        {navLinks.map((link) => (
                            <a
                                href={`#${link.id}`}
                                key={link.id}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="https://portfolio-abdelghafar.vercel.app/"
                            target="_blank"
                            className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            My Portfolio
                        </a>
                    </div>
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <RiCloseFill className="h-6 w-6" /> : <BsList className="h-6 w-6" />}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden mt-4 pb-4"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >
                        {navLinks.map((link) => (
                            <motion.a
                                href={`#${link.id}`}
                                key={link.id}
                                variants={item}
                                className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        <motion.a
                            href="https://portfolio-abdelghafar.vercel.app/"
                            target="_blank"
                            variants={item}
                            className="block w-full text-left py-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            My Portfolio
                        </motion.a>
                    </motion.div>

                )}
            </div>
        </nav>
    )
}