import { Toaster } from "react-hot-toast";
import "./globals.css";

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
      <body className={mont.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
