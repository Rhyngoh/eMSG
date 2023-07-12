import "./globals.css";

import Head from "next/head";

import { Toaster } from "react-hot-toast";

import { Montserrat } from "next/font/google";

import { AuthContextProvider } from "@/context/AuthContext";

const mont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Messenger Clone",
  description:
    "Allan Hillman Messenger Clone Project, built with Next.js and Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <description>{metadata.description}</description>
        <link rel="icon" href="allans-messenger/app/favicon.ico" />
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={mont.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
