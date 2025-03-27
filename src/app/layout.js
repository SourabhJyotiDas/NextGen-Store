"use client";
import { appWithTranslation } from "next-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import AuthProvider from "@/context/authProvider";
import i18n from "@/app/i18n"; // Import i18n
import { useEffect } from "react";

function RootLayout({ children }) {

  useEffect(() => {
    i18n.changeLanguage(i18n.language || "en");
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout);
