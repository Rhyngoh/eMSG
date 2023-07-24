'use client';

import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from 'react';
import MainLayout from "./MainLayout";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"] });

// export const metadata = {
//   title: "eMSG Chat",
//   description: "Messenger app built with Next.js and Firebase",
// };

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <title>{metadata.title}</title>
        <description>{metadata.description}</description>
        <meta name="description" content={metadata.description} /> */}
        <link rel="icon" href="@/app/favicon.ico" />
      </Head>
      <body className={montserrat.className}>
        <AuthContextProvider>
          <Navbar />
          <MainLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
            {children}
          </MainLayout>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
