"use client";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
