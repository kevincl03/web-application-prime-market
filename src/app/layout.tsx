import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProviders from "@/services/AuthProviders";
import NavBar from "@/components/Shared/NavBar";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prime Market",
  description: "Prime Market E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <AuthProviders>
          <NavBar />
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
