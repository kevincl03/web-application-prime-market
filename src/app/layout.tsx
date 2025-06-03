import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProviders from "@/services/AuthProviders";
import NavBar from "@/components/Shared/NavBar";
import { ServiceWorkerRegistration, PerformanceDashboard } from "@/components/ClientComponents";

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
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4F46E5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/images/header1.png" as="image" />
        <link rel="preload" href="/images/header2.png" as="image" />
      </head>      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        <PerformanceDashboard isVisible={process.env.NODE_ENV === 'development'} />
        <ToastContainer />
        <AuthProviders>
          <NavBar />
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
