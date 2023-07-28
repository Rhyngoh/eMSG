'use client';

import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { RoomsContextProvider } from "@/context/RoomsContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="@/app/favicon.ico" />
      </Head>
      <body className={montserrat.className + ' bg-gray-900'}>
        <AuthContextProvider>
          <RoomsContextProvider>
          <Navbar />
            {children}
          </RoomsContextProvider>
        </AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
