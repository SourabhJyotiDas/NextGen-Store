"use client";
import { appWithTranslation } from "next-i18next";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import AuthProvider from "@/context/authProvider";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout);
