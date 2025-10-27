// next
import type { Metadata } from "next";
// fonts
import { Geist, Geist_Mono } from "next/font/google";
// styles
import "./globals.css";
// messages
import { ToastContainer, Zoom } from 'react-toastify';
// providers
import Providers from "@/Redux/providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tager",
  description: "Tager main page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <ToastContainer
          theme="light"
          position="bottom-right"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
        />
      </body>
    </html>
  );
}
