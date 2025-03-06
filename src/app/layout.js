"use client";
import Navbar from "@/components/Navbar";
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import AuthProvider from "@/context/authProvider";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </AuthProvider >
      </body>
    </html>
  );
}
